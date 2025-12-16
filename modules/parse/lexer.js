/***

 matx - a programming language that extends and translates into the formula language of the Sandbox World game
 Copyright (C) 2025 Onran

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <https://www.gnu.org/licenses/>.

 ***/

export const Token = Object.freeze({
    NAME: "name",
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

    INCREMENT: "++",
    DECREMENT: "--",

    ASSIGN_ADD: "+=",
    ASSIGN_SUB: "-=",
    ASSIGN_MOD: "%=",
    ASSIGN_MUL: "*=",
    ASSIGN_DIV: "/=",
    ASSIGN_INT_DIV: "//=",
    ASSIGN_POW: "**=",

    ASSIGN_XOR: "^=",
    ASSIGN_OR: "|=",
    ASSIGN_AND: "&=",
    ASSIGN_LSHIFT: "<<=",
    ASSIGN_RSHIFT: ">>=",

    EQL: "==",
    NEQL: "!=",
    GRTR: ">",
    LESS: "<",
    GRTR_OR_EQL: ">=",
    LESS_OR_EQL: "<=",
    LOGIC_AND: "&&",
    LOGIC_OR: "||",
    LOGIC_NOT: "!",

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
    COLON: ":",

    LAMBDA: "=>",
    FUNCTION: "fun",

    EOF: "eof",
    RETURN: "return",

    TRUE: "true",
    FALSE: "false",

    isOperator: function(token) {
        return isOperator(token)
    },

    isAssignOperator: function(token) {
        return isAssignOperator(token)
    },

    convertAssignOperatorToRegular: function(token) {
        return convertAssignOperatorToRegular(token)
    },

    isType: function(token) {
        return isType(token)
    },

    canBeUnaryOperator: function(token) {
        return canBeUnaryOperator(token)
    },

    isNumber: function(token) {
        return token.type === "number"
    },

    isName: function(token) {
        return token.type === "name"
    },

    isBool: function(token) {
        return token.type === Token.TRUE || token.type === Token.FALSE
    },

    isComment: function(token) {
        return token.type === "comment"
    }
})

const EndOfCharacters = " \t\n;"

// quiet in the sense that they are not added to tokens like regular eof
const SilentEndOfCharacters = " \t"

const Characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_."

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

    Token.INCREMENT,
    Token.DECREMENT,

    Token.ASSIGN_ADD,
    Token.ASSIGN_SUB,
    Token.ASSIGN_MOD,
    Token.ASSIGN_MUL,
    Token.ASSIGN_DIV,
    Token.ASSIGN_INT_DIV,
    Token.ASSIGN_POW,

    Token.ASSIGN_XOR,
    Token.ASSIGN_OR,
    Token.ASSIGN_AND,
    Token.ASSIGN_LSHIFT,
    Token.ASSIGN_RSHIFT,

    Token.EQL,
    Token.NEQL,
    Token.GRTR,
    Token.LESS,
    Token.GRTR_OR_EQL,
    Token.LESS_OR_EQL,
    Token.LOGIC_AND,
    Token.LOGIC_OR,
    Token.LOGIC_NOT,

    Token.L_BRACKET,
    Token.R_BRACKET,
    Token.LF_BRACKET,
    Token.RF_BRACKET,
    Token.LSQ_BRACKET,
    Token.RSQ_BRACKET,

    Token.COMMA,
    Token.COLON,

    Token.FUNCTION,
    Token.LAMBDA,

    Token.RETURN,

    Token.TRUE,
    Token.FALSE
])

const AssignOperators = Object.freeze([
    Token.ASSIGN,

    Token.ASSIGN_ADD,
    Token.ASSIGN_SUB,
    Token.ASSIGN_MOD,
    Token.ASSIGN_MUL,
    Token.ASSIGN_DIV,
    Token.ASSIGN_INT_DIV,
    Token.ASSIGN_POW,

    Token.ASSIGN_XOR,
    Token.ASSIGN_OR,
    Token.ASSIGN_AND,
    Token.ASSIGN_LSHIFT,
    Token.ASSIGN_RSHIFT,
])

const AssignOperatorToRegular = Object.freeze({
    [Token.ASSIGN]: "",

    [Token.ASSIGN_ADD]: Token.ADD,
    [Token.ASSIGN_SUB]: Token.SUB,
    [Token.ASSIGN_MOD]: Token.MOD,
    [Token.ASSIGN_MUL]: Token.MUL,
    [Token.ASSIGN_DIV]: Token.DIV,
    [Token.ASSIGN_INT_DIV]: Token.INT_DIV,
    [Token.ASSIGN_POW]: Token.POW,

    [Token.ASSIGN_XOR]: Token.XOR,
    [Token.ASSIGN_OR]: Token.OR,
    [Token.ASSIGN_AND]: Token.AND,
    [Token.ASSIGN_LSHIFT]: Token.LSHIFT,
    [Token.ASSIGN_RSHIFT]: Token.RSHIFT
})

const OperatorsCharacters = ":,+-*/><!=|&^~%()[]{}"

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

const PossibleUnaryOperators = Object.freeze([
    Token.ADD,
    Token.SUB,
    Token.NOT,
    Token.LOGIC_NOT,
    Token.INCREMENT,
    Token.DECREMENT
])

function isOperator(token) {
    return Operators.includes(token?.type ?? token)
}

function isAssignOperator(token) {
    return AssignOperators.includes(token?.type ?? token)
}

function convertAssignOperatorToRegular(token) {
    return AssignOperatorToRegular[token?.type ?? token]
}

function isType(token) {
    return Types.includes(token?.type ?? token)
}

function canBeUnaryOperator(token) {
    return PossibleUnaryOperators.includes(token?.type ?? token)
}

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
    name: new TokenizerTemplate(
        [ Characters, Digits ],
        [ Characters ],
        function(i, buffer, pushToken) {
            if(Operators.includes(buffer) || Types.includes(buffer))
                pushToken(buffer) // buffer passed as token type
            else
                pushToken(Token.NAME, buffer)
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
                    pushError(`unexpected character '${char}'`)
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