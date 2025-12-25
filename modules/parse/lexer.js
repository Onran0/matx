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

import Types from "../constructions/types.js"
import Keywords from "../constructions/keywords.js"
import SpecialSyms from "../constructions/special_syms.js"
import {RegularOperators, AssignOperators, OperatorsCharacters} from "../constructions/operators.js"

export const Token = Object.freeze({
    NAME: "name",
    NUMBER: "number",
    COMMENT: "comment",

    ASSIGN: AssignOperators.ASSIGN,
    ADD: RegularOperators.ADD,
    SUB: RegularOperators.SUB,
    MOD: RegularOperators.MOD,
    MUL: RegularOperators.MUL,
    DIV: RegularOperators.DIV,
    INT_DIV: RegularOperators.INT_DIV,
    POW: RegularOperators.POW,

    XOR: RegularOperators.XOR,
    OR: RegularOperators.OR,
    AND: RegularOperators.AND,
    NOT: RegularOperators.NOT,
    LSHIFT: RegularOperators.LSHIFT,
    RSHIFT: RegularOperators.RSHIFT,

    INCREMENT: RegularOperators.INCREMENT,
    DECREMENT: RegularOperators.DECREMENT,

    ASSIGN_ADD: AssignOperators.ASSIGN_ADD,
    ASSIGN_SUB: AssignOperators.ASSIGN_SUB,
    ASSIGN_MOD: AssignOperators.ASSIGN_MOD,
    ASSIGN_MUL: AssignOperators.ASSIGN_MUL,
    ASSIGN_DIV: AssignOperators.ASSIGN_DIV,
    ASSIGN_INT_DIV: AssignOperators.ASSIGN_INT_DIV,
    ASSIGN_POW: AssignOperators.ASSIGN_POW,

    ASSIGN_XOR: AssignOperators.ASSIGN_XOR,
    ASSIGN_OR: AssignOperators.ASSIGN_OR,
    ASSIGN_AND: AssignOperators.ASSIGN_AND,
    ASSIGN_LSHIFT: AssignOperators.ASSIGN_LSHIFT,
    ASSIGN_RSHIFT: AssignOperators.ASSIGN_RSHIFT,

    EQL: RegularOperators.EQL,
    NEQL: RegularOperators.NEQL,
    GRTR: RegularOperators.GRTR,
    LESS: RegularOperators.LESS,
    GRTR_OR_EQL: RegularOperators.GRTR_OR_EQL,
    LESS_OR_EQL: RegularOperators.LESS_OR_EQL,
    LOGIC_AND: RegularOperators.LOGIC_AND,
    LOGIC_OR: RegularOperators.LOGIC_OR,
    LOGIC_NOT: RegularOperators.LOGIC_NOT,

    TYPE_INT: Types.INT,
    TYPE_FLOAT: Types.NUM,
    TYPE_BOOL: Types.BOOL,
    TYPE_VEC2: Types.VEC2,
    TYPE_VEC3: Types.VEC3,
    TYPE_VEC4: Types.VEC4,
    TYPE_MAT3: Types.MAT3,
    TYPE_MAT4: Types.MAT4,
    TYPE_QUAT: Types.QUAT,

    L_BRACKET: SpecialSyms.L_BRACKET,
    R_BRACKET: SpecialSyms.R_BRACKET,
    LF_BRACKET: SpecialSyms.LF_BRACKET,
    RF_BRACKET: SpecialSyms.RF_BRACKET,
    LSQ_BRACKET: SpecialSyms.LSQ_BRACKET,
    RSQ_BRACKET: SpecialSyms.RSQ_BRACKET,
    COMMA: SpecialSyms.COMMA,
    SEMICOLON: SpecialSyms.SEMICOLON,
    COLON: SpecialSyms.COLON,

    LAMBDA: SpecialSyms.LAMBDA,
    FUNCTION: Keywords.FUNCTION,

    EOF: "eof",
    RETURN: Keywords.RETURN,

    TRUE: Keywords.TRUE,
    FALSE: Keywords.FALSE,

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

const EndOfCharacters = " \t\n" + SpecialSyms.SEMICOLON

// quiet in the sense that they are not added to tokens like regular eof
const SilentEndOfCharacters = " \t"

const Characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_."

const Digits = "0123456789"
const Dot = "."

const ReservedSequences = Object.freeze([
    ...Object.values(Types),
    ...Object.values(RegularOperators),
    ...Object.values(AssignOperators),
    ...Object.values(SpecialSyms).filter(x => x !== SpecialSyms.SEMICOLON),
    ...Object.values(Keywords)
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
    name: new TokenizerTemplate(
        [ Characters, Digits ],
        [ Characters ],
        function(i, buffer, pushToken) {
            if(ReservedSequences.includes(buffer))
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
            if(ReservedSequences.includes(buffer)) {
                pushToken(buffer) // buffer passed as token type
            } else {
                pushError(`invalid operator '${buffer}'`)
            }
        },
        function(buffer) {
            return ReservedSequences.includes(buffer)
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
            line: line,
            source: "lexer"
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