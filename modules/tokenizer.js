export const Token = Object.freeze({
    LITERAL: "literal",
    NUMBER: "number",
    COMMENT: "comment",

    ASSIGN: "=",
    ADD: "+",
    SUB: "-",
    MOD: "%",
    MUL: "*",
    DIV: "/",
    INT_DIV: "//",
    POW: "**",

    XOR: "^",
    OR: "|",
    AND: "&",
    NOT: "~",
    LSHIFT: "<<",
    RSHIFT: ">>",

    EQL: "==",
    GRTR: ">",
    LESS: "<",
    GRTR_OR_EQL: ">=",
    LESS_OR_EQL: "<=",
    LOGIC_AND: "&&",
    LOGIC_OR: "||",

    TYPE_INT: "int",
    TYPE_FLOAT: "num",
    TYPE_BOOL: "bool",
    TYPE_VEC2: "vec2",
    TYPE_VEC3: "vec3",
    TYPE_VEC4: "vec4",
    TYPE_MAT3: "mat3",
    TYPE_MAT4: "mat4",
    TYPE_QUAT: "quat",

    L_BRACKET: "(",
    R_BRACKET: ")",
    LF_BRACKET: "{",
    RF_BRACKET: "}",
    LSQ_BRACKET: "[",
    RSQ_BRACKET: "]",
    COMMA: ",",
    SEMI: ";",
    DOT: ".",

    LAMBDA: "=>",
    FUNCTION: "fun",

    EOF: "eof",
    RETURN: "return",
})

const EndOfCharacters = " \t\n;"

// quiet in the sense that they are not added to tokens like eof
const SilentEndOfCharacters = " \t"

const Characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_"

const Digits = "0123456789"
const Dot = "."

const Operators = Object.freeze([
    Token.ASSIGN,

    Token.ADD,
    Token.SUB,
    Token.MOD,
    Token.MUL,
    Token.DIV,
    Token.INT_DIV,
    Token.POW,

    Token.XOR,
    Token.OR,
    Token.AND,
    Token.NOT,
    Token.LSHIFT,
    Token.RSHIFT,

    Token.EQL,
    Token.GRTR,
    Token.LESS,
    Token.GRTR_OR_EQL,
    Token.LESS_OR_EQL,
    Token.LOGIC_AND,
    Token.LOGIC_OR,

    Token.L_BRACKET,
    Token.R_BRACKET,
    Token.LF_BRACKET,
    Token.RF_BRACKET,
    Token.LSQ_BRACKET,
    Token.RSQ_BRACKET,

    Token.COMMA,
    Token.DOT,

    Token.FUNCTION,
    Token.LAMBDA,

    Token.RETURN
])

const OperatorsCharacters = ".,+-*/><=|&^~%()[]{}"

const Types = Object.freeze([
    Token.TYPE_INT,
    Token.TYPE_FLOAT,
    Token.TYPE_BOOL,
    Token.TYPE_VEC2,
    Token.TYPE_VEC3,
    Token.TYPE_VEC4,
    Token.TYPE_MAT3,
    Token.TYPE_MAT4,
    Token.TYPE_QUAT,
])

class TokenizerTemplate {
    #allowedCharacters
    #identifyCharacters
    #tokenFunction
    #candidateFunction

    constructor(
        allowedCharacters, identifyCharacters,
        tokenFunction, candidateFunction
    ) {
        this.#allowedCharacters = allowedCharacters
        this.#identifyCharacters = identifyCharacters
        this.#tokenFunction = tokenFunction
        this.#candidateFunction = candidateFunction
    }

    #contains(charactersArray, char) {
        for(const str of charactersArray) {
            if(str.includes(char))
                return true
        }

        return false
    }

    isAllowedCharacter(char) {
        if(typeof this.#allowedCharacters === "function")
            return this.#allowedCharacters(char)
        else
            return this.#contains(this.#allowedCharacters, char)
    }

    canStartFrom(char) {
        return this.#contains(this.#identifyCharacters, char)
    }

    pushToken(i, buffer, pushToken, pushError) {
        this.#tokenFunction(i, buffer, pushToken, pushError)
    }

    isCandidate(buffer) {
        return this.#candidateFunction != null ? this.#candidateFunction(buffer) : true;
    }
}

const Tokenizers = Object.freeze({
    string: new TokenizerTemplate(
        [ Characters, Digits ],
        [ Characters ],
        function(i, buffer, pushToken) {
            if(Operators.includes(buffer) || Types.includes(buffer))
                pushToken(buffer) // buffer passed as token type
            else
                pushToken(Token.LITERAL, buffer)
        }
    ),

    digits: new TokenizerTemplate(
        [ Digits, Dot ],
        [ Digits ],
        function(i, buffer, pushToken, pushError) {
            const num = Number(buffer)

            if(!Number.isNaN(num) && buffer !== '') {
                pushToken(Token.NUMBER, num)
            } else {
                pushError(`invalid number '${buffer}'`)
            }
        }
    ),

    operators: new TokenizerTemplate(
        [ OperatorsCharacters ],
        [ OperatorsCharacters ],
        function(i, buffer, pushToken, pushError) {
            if(Operators.includes(buffer)) {
                pushToken(buffer) // buffer passed as token type
            } else {
                pushError(`invalid operator '${buffer}'`)
            }
        },
        function(buffer) {
            return Operators.includes(buffer)
        }
    ),

    comments: new TokenizerTemplate(
        function(char) {
            return char !== '\n'
        },
        [ "#" ],
        function(i, buffer, pushToken) {
            pushToken(Token.COMMENT, buffer.substring(1))
        }
    )
})

const IgnoredCharacters = Object.freeze([
    EndOfCharacters
])

export function tokenize(code) {
    code = code.replaceAll("\r\n", "\r").replaceAll("\r", "\n") + "\n"

    let errors = [ ]
    let tokens = [ ]

    let currentTokenizer = null

    let buffer = ""

    let column = 1, line = 1;

    const pushError = function(msg) {
        errors.push({
            rawMsg: msg,
            msg: msg + ` at column '${column}', line '${line}'`,
            column: column,
            line: line
        })
    }

    const pushToken = function(type, value, nosub) {
        tokens.push({
            type: type,
            value: value,
            column: column - (nosub ? 0 : buffer.length),
            line: line
        })
    }

    for (let i = 0; i < code.length; i++) {
        const char = code[i]

        if(currentTokenizer !== null) {
            if(
                Tokenizers[currentTokenizer].isAllowedCharacter(char) &&
                (
                    Tokenizers[currentTokenizer].isCandidate(buffer) &&
                    Tokenizers[currentTokenizer].isCandidate(buffer + char)
                )
            ) {
                buffer += char
            } else {
                Tokenizers[currentTokenizer].pushToken(i, buffer, pushToken, pushError)

                if(EndOfCharacters.includes(char) && char !== '\n') {
                    if(!SilentEndOfCharacters.includes(char))
                        pushToken(Token.EOF, null, true)
                } else i--;

                currentTokenizer = null
                buffer = ""
            }
        } else {
            let found = false

            for (const tokenizer in Tokenizers) {
                if(Tokenizers[tokenizer].canStartFrom(char)) {
                    buffer += char
                    currentTokenizer = tokenizer
                    found = true
                    break
                }
            }

            if(!found) {
                let mustIgnore = false

                for(const ignoredSequence of IgnoredCharacters) {
                    if(ignoredSequence.includes(char)) {
                        mustIgnore = true
                        break
                    }
                }

                if(!mustIgnore) {
                    pushError(`unknown character '${char}'`)
                } else if(char === '\n') {
                    column = 0
                    line++;
                }
            }
        }

        column++;
    }

    return [ tokens, errors ]
}