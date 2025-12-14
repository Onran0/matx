import * as Expressions from "./expressions.js"
import {Token} from "./lexer.js"

const PRECEDENCE = Object.freeze({
    [Token.EOF]: -1,
    [Token.R_BRACKET]: -1,
    [Token.RSQ_BRACKET]: -1,
    [Token.COMMA]: -1,

    /*
    -1 is need to break on:
    - eof
    - function arguments separator
    - function end
    - array declaration end
     */

    [Token.EQL]: 1,
    [Token.NEQL]: 1,
    [Token.GRTR]: 1,
    [Token.LESS]: 1,
    [Token.GRTR_OR_EQL]: 1,
    [Token.LESS_OR_EQL]: 1,
    [Token.LOGIC_OR]: 1,

    [Token.LOGIC_AND]: 2,

    [Token.OR]: 3,

    [Token.XOR]: 4,

    [Token.AND]: 5,

    [Token.LSHIFT]: 6,
    [Token.RSHIFT]: 6,

    [Token.ADD]: 7,
    [Token.SUB]: 7,

    [Token.MOD]: 8,

    [Token.MUL]: 9,
    [Token.DIV]: 9,
    [Token.INT_DIV]: 9,

    [Token.POW]: 10,
    [Token.L_BRACKET]: 11
})

class ExpressionsParser {
    #tokens
    #currentTokenIndex

    constructor() {
        this.#tokens = []
        this.#currentTokenIndex = 0
    }

    #currentToken() {
        if (this.#currentTokenIndex >= this.#tokens.length) {
            return { type: Token.EOF }
        }
        return this.#tokens[this.#currentTokenIndex]
    }

    #consumeToken(expectedTypes, pushError) {
        const current = this.#currentToken()
        if (current.type === Token.EOF || !expectedTypes.includes(current.type)) {
            pushError(current, `unexpected token "${current.type}", expected one of ${expectedTypes.join(', ')}`)
        }
        this.#currentTokenIndex++
    }

    #consume() {
        return this.#tokens[this.#currentTokenIndex++]
    }

    #getPrecedence(token) {
        return PRECEDENCE[token.type] || 0
    }

    parseExpression(pushError, minPrecedence = 0) {
        let leftNode
        const current = this.#currentToken()

        if (current.type === Token.NUMBER) {
            this.#consume()
            leftNode = new Expressions.NumberExpression(current.value, Math.floor(current.value) === current.value)
        } else if (current.type === Token.TRUE || current.type === Token.FALSE) {
            this.#consume()
            leftNode = new Expressions.BoolExpression(current.type === Token.TRUE)
        } else if (current.type === Token.NAME) {
            const nameToken = this.#consume()

            if (this.#currentToken().type === Token.L_BRACKET) {
                this.#consume()
                const args = []

                while (this.#currentToken().type !== Token.R_BRACKET && this.#currentToken().type !== Token.EOF) {
                    const argExpr = this.parseExpression(pushError)
                    args.push(argExpr)

                    if (this.#currentToken().type === Token.COMMA) {
                        this.#consume()
                    } else {
                        break
                    }
                }

                this.#consumeToken([Token.R_BRACKET], pushError)
                leftNode = new Expressions.FunctionExpression(nameToken.value, args)

            } else {
                leftNode = new Expressions.VariableExpression(nameToken.value)
            }
        } else if (current.type === Token.LSQ_BRACKET) {
            this.#consume()
            const elements = []

            while (this.#currentToken().type !== Token.RSQ_BRACKET && this.#currentToken().type !== Token.EOF) {
                const elementExpr = this.parseExpression(pushError)
                elements.push(elementExpr)

                if (this.#currentToken().type === Token.COMMA) {
                    this.#consume()
                } else {
                    break
                }
            }

            this.#consumeToken([Token.RSQ_BRACKET], pushError)
            leftNode = new Expressions.ArrayExpression(elements)

        } else if (current.type === Token.L_BRACKET) {
            this.#consume()
            leftNode = this.parseExpression(pushError, 0)
            this.#consumeToken([Token.R_BRACKET], pushError)
        } else {
            if (current.type !== Token.EOF) {
                pushError(current, `unexpected token when starting expression`)
            }
            return null
        }

        while (this.#getPrecedence(this.#currentToken()) >= minPrecedence) {
            const operatorToken = this.#consume()

            if(!Token.isOperator(operatorToken)) {
                pushError(current, `undefined operator '${operatorToken.type}'`)
                return null
            }

            let operatorPrecedence = PRECEDENCE[operatorToken.type]

            if (operatorToken.type === Token.POW) {
                operatorPrecedence++
            }

            const rightNode = this.parseExpression(pushError, operatorPrecedence)

            if (!rightNode) break

            leftNode = new Expressions.BinaryExpression(
                leftNode,
                rightNode,
                operatorToken.type
            )
        }

        return leftNode
    }

    setTokens(tokens) {
        this.#tokens = tokens
        this.#currentTokenIndex = 0
    }
}

const parser = new ExpressionsParser()

export function parseExpression(tokens, pushError) {
    parser.setTokens(tokens)
    return parser.parseExpression(pushError)
}