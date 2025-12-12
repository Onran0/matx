export const Token = Object.freeze({
    LITERAL: "literal",
    NUMBER: "number",

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

    LAMBDA: "=>",
    FUNCTION: "fun",

    EOF: "eof",
    RETURN: "return",
})

const EndOfCharacters = Object.freeze(
    [
        " ", "\t", "\n", Token.SEMI
    ]
)

// quiet in the sense that they are not added to tokens like eof
const SilentEndOfCharacters = Object.freeze(
    [
        " ", "\t",
    ]
)

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

    Token.FUNCTION,
    Token.LAMBDA,

    Token.RETURN
])

const OperatorsCharacters = ",+-*/><=|&^~%()[]{}"

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

export function tokenize(code) {
    code += ";"

    let errors = [ ]
    let tokens = [ ]

    let parsingString = false
    let parsingDigits = false
    let parsingOperator = false

    let buffer = ""

    for (let i = 0; i < code.length; i++) {
        const char = code[i]

        if(parsingString) {

            if(Characters.includes(char) || Digits.includes(char)) {
                buffer += char
                continue
            } else {
                if(Operators.includes(buffer) || Types.includes(buffer))
                    tokens.push([ buffer ]) // buffer passed as token type
                else
                    tokens.push([ Token.LITERAL, buffer ])

                if(EndOfCharacters.includes(char)) {
                    if(!SilentEndOfCharacters.includes(char))
                        tokens.push([ Token.EOF ])
                } else i--;
            }

            parsingString = false
        } else if(parsingDigits) {
            if(Digits.includes(char) || char === Dot) {
                buffer += char
                continue
            } else {
                const num = Number(buffer)

                if(!Number.isNaN(num) && buffer !== '') {
                    tokens.push([ Token.NUMBER, num ])
                } else {
                    const index = i - buffer.length + 1
                    errors.push(`invalid number '${buffer}' at '${index}'`, index)
                }

                if(EndOfCharacters.includes(char)) {
                    if(!SilentEndOfCharacters.includes(char))
                        tokens.push([ Token.EOF ])
                } else i--;
            }

            parsingDigits = false
        } else if(parsingOperator) {
            if(OperatorsCharacters.includes(char)) {
                buffer += char
                continue
            } else {
                if(Operators.includes(buffer)) {
                    tokens.push([ buffer ]) // buffer passed as token type
                } else {
                    const index = i - buffer.length + 1
                    errors.push(`invalid operator '${buffer}' at '${index}'`, index)
                }

                if(EndOfCharacters.includes(char)) {
                    if(!SilentEndOfCharacters.includes(char))
                        tokens.push([ Token.EOF ])
                } else i--;
            }

            parsingOperator = false
        } else if(OperatorsCharacters.includes(char)) {
            parsingOperator = true
            buffer += char
            continue
        } else if(Characters.includes(char)) {
            parsingString = true
            buffer += char
            continue
        } else if(Digits.includes(char)) {
            parsingDigits = true
            buffer += char
            continue
        }

        buffer = ""
    }

    return [ tokens, errors ]
}