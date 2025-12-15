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

import {tokenize,Token} from "./lexer.js";
import * as statements from "../constructions/statements.js";
import {parseExpression} from "./expressions_parser.js";

class ParserTemplate {
    isEnd(token) {}
    pushStatement(buffer, pushStatement, pushError) {}
    canStartFrom(token, nextToken) {}
    reset() {}
}

class CommentParser extends ParserTemplate {
    isEnd(token) {
        return [ true, true ]
    }

    pushStatement(buffer, pushStatement, pushError) {
        pushStatement(new statements.Comment(buffer[0], buffer[0].value))
    }

    canStartFrom(token) {
        return token.type === Token.COMMENT
    }
}

class VariableDeclarationParser extends ParserTemplate {
    isEnd(token) {
        return [ token.type === Token.EOF ]
    }

    pushStatement(buffer, pushStatement, pushError) {
        const varType = buffer[0]
        const varName = buffer[1]

        if(varName == null || varName.type !== Token.NAME) {
            pushError(varType, "variable name expected")
            return
        }

        let expression

        if(buffer[2] != null && buffer[2].type === Token.ASSIGN) {
            const expressionTokens = buffer.slice(3, buffer.length)

            if(expressionTokens.length === 0) {
                pushError(buffer[2], "expression expected")
                return
            }

            expression = parseExpression(expressionTokens, pushError)
        }

        pushStatement(new statements.VariableDeclaration(buffer[0], buffer[buffer.length - 1], varType.type, varName.value, expression))
    }

    canStartFrom(token) {
        return Token.isType(token);
    }
}

class FunctionDeclarationParser extends ParserTemplate {
    #lambda
    #openingBracketsCount

    constructor() {
        super();
        this.#lambda = false
    }

    isEnd(token) {
        if(token.type === Token.LAMBDA) {
            this.#lambda = true
        } else {
            if(this.#lambda) {
                return [ token.type === Token.EOF]
            } else {
                if(token.type === Token.LF_BRACKET) {
                    this.#openingBracketsCount++
                } else if(token.type === Token.RF_BRACKET) {
                    return [ --this.#openingBracketsCount === 0 ]
                }
            }
        }

        return [ false ]
    }

    pushStatement(buffer, pushStatement, pushError) {
        const funName = buffer[1]

        if(funName == null || funName.type !== Token.NAME) {
            pushError(buffer[0], "function name expected")
            return
        }

        if(buffer[2] == null || buffer[2].type !== Token.L_BRACKET) {
            pushError(buffer[0], "opening bracket expected")
            return
        }

        let argumentsNames = [ ]
        let commaToken, codeStartIndex, error = false

        buffer.every((token, index) => {
            if(index >= 3) {
                if(token.type === Token.R_BRACKET) {
                    codeStartIndex = index + 1
                    return false
                }

                if(token.type === Token.COMMA) {
                    if(commaToken != null) {
                        pushError(token, "argument name expected")
                        error = true
                        return false
                    } else {
                        commaToken = token
                    }
                }

                if(token.type === Token.NAME) {
                    if(commaToken == null && argumentsNames.length > 0) {
                        pushError(token, "comma expected")
                        error = true
                        return false
                    } else {
                        commaToken = null
                        argumentsNames.push(token.value)
                    }
                }
            }

            return true
        })

        if(!error) {
            if(this.#lambda) {
                if(buffer[codeStartIndex] == null || buffer[codeStartIndex].type !== Token.LAMBDA) {
                    pushError(buffer[codeStartIndex] - 1, "lambda expected")
                } else if(buffer[codeStartIndex + 1] == null || buffer[codeStartIndex + 1].type === Token.EOF) {
                    pushError(buffer[codeStartIndex], "expression expected")
                } else {
                    const expression = parseExpression(buffer.slice(codeStartIndex + 1), pushError)

                    if(expression != null) {
                        pushStatement(new statements.FunctionDeclaration(
                            buffer[0],
                            buffer[buffer.length - 1],
                            funName.value,
                            argumentsNames,
                            true,
                            [
                                new statements.Return(
                                    buffer[codeStartIndex + 1],
                                    buffer[buffer.length - 1],
                                    expression
                                )
                            ]
                        ))
                    }
                }
            } else {
                if(buffer[codeStartIndex] == null || buffer[codeStartIndex].type !== Token.LF_BRACKET) {
                    pushError(buffer[codeStartIndex], "'{' expected")
                } else {
                    // parsing statements in function body
                    const bodyStatements = parseTokens(
                        buffer.slice(codeStartIndex + 1, buffer.length),
                        null, pushError
                    )[0]

                    pushStatement(new statements.FunctionDeclaration(
                        buffer[0],
                        buffer[buffer.length - 1],
                        funName.value,
                        argumentsNames,
                        false,
                        bodyStatements.map(statement => statement.statement)
                    ))
                }
            }
        }
    }

    canStartFrom(token) {
        return token.type === Token.FUNCTION
    }

    reset() {
        this.#lambda = false
        this.#openingBracketsCount = 0
    }
}

class ReturnParser extends ParserTemplate {
    isEnd(token) {
        return [ token.type === Token.EOF ]
    }

    pushStatement(buffer, pushStatement, pushError) {
        if(buffer[1] == null || buffer[1].type === Token.EOF) {
            pushError(buffer[0], "expression expected")
        }

        const expression = parseExpression(buffer.slice(1), pushError)

        pushStatement(new statements.Return(
            buffer[0],
            buffer[buffer.length - 1],
            expression
        ))
    }

    canStartFrom(token) {
        return token.type === Token.RETURN
    }
}

class BlockParser extends ParserTemplate {
    #openingBracketsCount

    isEnd(token) {
        if(token.type === Token.LF_BRACKET) {
            this.#openingBracketsCount++
        } else if(token.type === Token.RF_BRACKET) {
            return [ this.#openingBracketsCount-- === 0 ]
        }

        return [ false ]
    }

    pushStatement(buffer, pushStatement, pushError) {
        if(buffer.length === 2) {
            pushStatement(
                new statements.Block(
                    buffer[0], buffer[buffer.length - 1],
                    [ ]
                )
            )
        } else {
            const statementsTokens = buffer.slice(1, buffer.length)

            pushStatement(
                new statements.Block(
                    buffer[0], buffer[buffer.length - 1],
                    parseTokens(statementsTokens, null, pushError)[0].map(
                        statement => statement.statement
                    )
                )
            )
        }
    }

    canStartFrom(token) {
        return token.type === Token.LF_BRACKET
    }

    reset() {
        this.#openingBracketsCount = 0
    }
}

class VariableAssignParser extends ParserTemplate {
    isEnd(token) {
        return [ token.type === Token.EOF ]
    }

    pushStatement(buffer, pushStatement, pushError) {
        const varName = buffer[0]
        let operation

        let indexExpression
        let operatorIndex

        if(buffer[1].type === Token.LSQ_BRACKET) {
            let indexExpressionTokens
            let openingBracketsCount = 0

            if(buffer[2] == null) {
                pushError(buffer[1], `unexpected end`)
                return
            } else if(buffer[2].type === Token.RSQ_BRACKET) {
                pushError(buffer[1], `index expression cant be empty`)
                return
            }

            buffer.every((token, index) => {
                if(index > 1) {
                    if(token.type === Token.LSQ_BRACKET) {
                        openingBracketsCount++
                    } else if(token.type === Token.RSQ_BRACKET) {
                        if(openingBracketsCount-- === 0) {
                            indexExpressionTokens = buffer.slice(2, index)
                            operatorIndex = index + 1
                            return false
                        }
                    }
                }

                return true
            })

            if(indexExpressionTokens == null) {
                pushError(buffer[1], `expected ']' for close index expression`)
                return
            }

            console.log(indexExpressionTokens)

            indexExpression = parseExpression(indexExpressionTokens, pushError)
        } else operatorIndex = 1

        if(buffer[operatorIndex] == null) {
            console.log(operatorIndex)
            pushError(buffer[operatorIndex - 1], `operator expected`)
            return
        } else if(!Token.isAssignOperator(buffer[operatorIndex])) {
            pushError(buffer[operatorIndex], `'${buffer[operatorIndex].type}' is not assign operator`)
            return
        } else operation = buffer[operatorIndex]

        const expressionTokens = buffer.slice(operatorIndex + 1, buffer.length)

        if(expressionTokens.length === 0) {
            pushError(buffer[0], "expression expected")
            return
        }

        const expression = parseExpression(expressionTokens, pushError)

        pushStatement(
            new statements.VariableAssign(
                buffer[0], buffer[buffer.length - 1],
                varName.value, indexExpression, expression,
                Token.convertAssignOperatorToRegular(operation)
            )
        )
    }

    canStartFrom(token) {
        return token.type === Token.NAME
    }
}

function getParsers() {
    return Object.freeze({
        comment_parser: new CommentParser(),
        var_decl_parser: new VariableDeclarationParser(),
        fun_decl_parser: new FunctionDeclarationParser(),
        return_parser: new ReturnParser(),
        block_parser: new BlockParser(),
        var_assign_parser: new VariableAssignParser()
    })
}

const IgnoredTokens = Object.freeze([
    Token.COMMENT
])

function parseTokens(tokens, pushStatement, pushError) {
    const parsers = getParsers()

    let statements = [ ], errors = [ ]

    let buffer = [ ]
    let currentParser = null

    pushError ??= function(token, msg) {
        errors.push({
            rawMsg: msg,
            msg: msg + ` at column '${token.column}', line '${token.line}'`,
            column: token.column,
            line: token.line
        })
    }

    pushStatement ??= function(statement) {
        statements.push({
            statement: statement,

            startToken: buffer[0],
            endToken: buffer[buffer.length - 1],

            column: buffer[0].column,
            line: buffer[0].line,
        })
    }

    for(let i = 0;i < tokens.length;i++) {
        const token = tokens[i]

        if(currentParser != null) {
            let [isEnd, doDecrement] = parsers[currentParser].isEnd(token)

            if(isEnd) {
                parsers[currentParser].pushStatement(buffer, pushStatement, pushError)

                currentParser = null

                if(doDecrement)
                    i--;
            } else buffer.push(token)
        } else {
            let found = false

            for(const parser in parsers) {
                if(parsers[parser].canStartFrom(token, tokens[i + 1])) {
                    buffer = [ token ]
                    parsers[parser].reset()
                    currentParser = parser
                    found = true
                    break
                }
            }

            if(!found) {
                if(!IgnoredTokens.includes(token.type))
                    pushError(token, `unexpected token '${token.type}'`)
            }
        }
    }

    return [ statements, errors ]
}

export function parse(code) {
    let tokens, tokenizerErrors

    if(typeof code == "string") {
        [tokens, tokenizerErrors] = tokenize(code);
    } else tokens = code

    if(tokenizerErrors == null || tokenizerErrors.length === 0) {
        return parseTokens(tokens);
    } else return [ [ ], tokenizerErrors ]
}