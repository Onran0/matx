import {tokenize,Token} from "./lexer.js";
import * as statements from "./statements.js";
import {parseExpression} from "./expressions_parser.js";
import {Statement, VariableDeclaration} from "./statements.js";

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

            expression = parseExpression(expressionTokens)
        }

        pushStatement(new statements.VariableDeclaration(buffer[0], buffer[buffer.length - 1], varType.type, varName.value, expression))
    }

    canStartFrom(token) {
        return Token.isType(token);
    }
}

class FunctionDeclarationParser extends ParserTemplate {
    #lambda

    constructor() {
        super();
        this.#lambda = false
    }

    isEnd(token) {
        if(token.type === Token.LAMBDA) {
            this.#lambda = true
        }

        return [ this.#lambda ? token.type === Token.EOF : token.type === Token.RF_BRACKET ]
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
    isEnd(token) {
        return [ token.type === Token.RF_BRACKET ]
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
}

class VariableAssignParser extends ParserTemplate {
    isEnd(token) {
        return [ token.type === Token.EOF ]
    }

    pushStatement(buffer, pushStatement, pushError) {
        const varName = buffer[0]
        const operation = buffer[1]

        if(!Token.isAssignOperator(operation)) {
            pushError(operation, `'${operation.type}' is not assign operator`)
            return
        }

        const expressionTokens = buffer.slice(2, buffer.length)

        if(expressionTokens.length === 0) {
            pushError(buffer[0], "expression expected")
            return
        }

        const expression = parseExpression(expressionTokens)

        pushStatement(
            new statements.VariableAssign(
                buffer[0], buffer[buffer.length - 1],
                varName.value, expression, Token.convertAssignOperatorToRegular(operation)
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