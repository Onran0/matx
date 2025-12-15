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

import * as Expressions from "../constructions/expressions.js"
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

const UNARY_PRIORITY = 12
const INCDEC_PRIORITY = UNARY_PRIORITY + 1

let POSTFIX_OPERATORS = [ Token.INCREMENT, Token.DECREMENT ]

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

    #parseFunctionArgs(pushError) {
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
        return args
    }

    parseExpression(pushError, minPrecedence = 0) {
        let leftNode
        const current = this.#currentToken()

        if (Token.canBeUnaryOperator(current)) {
            const operatorToken = this.#consume()
            const operandExpression = this.parseExpression(pushError,
                current.type === Token.INCREMENT ||
                current.type === Token.DECREMENT ? INCDEC_PRIORITY : UNARY_PRIORITY
            )

            leftNode = new Expressions.UnaryExpression(true, operandExpression, operatorToken.type)
        }
        else if (current.type === Token.NUMBER) {
            this.#consume()
            leftNode = new Expressions.NumberExpression(current.value, Math.floor(current.value) === current.value)
        } else if (current.type === Token.TRUE || current.type === Token.FALSE) {
            this.#consume()
            leftNode = new Expressions.BoolExpression(current.type === Token.TRUE)
        } else if (Token.isType(current)) {
            const typeToken = this.#consume()
            this.#consumeToken([Token.L_BRACKET], pushError)

            leftNode = new Expressions.NewObjectExpression(typeToken.type, this.#parseFunctionArgs(pushError))
        } else if (current.type === Token.NAME) {
            const nameToken = this.#consume()

            if (this.#currentToken().type === Token.L_BRACKET) {
                this.#consume()

                leftNode = new Expressions.FunctionExpression(nameToken.value, this.#parseFunctionArgs(pushError))
            } else {
                leftNode = new Expressions.VariableExpression(nameToken.value)
            }
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

        while (
            POSTFIX_OPERATORS.includes(this.#currentToken().type) ||
            (   this.#currentToken().type === Token.LSQ_BRACKET &&
                this.#getPrecedence(this.#currentToken()) >= minPrecedence
            )
        ) {

            const token = this.#currentToken();

            if (token.type === Token.LSQ_BRACKET) {
                this.#consume();
                const indexExpr = this.parseExpression(pushError, 0);
                this.#consumeToken([Token.RSQ_BRACKET], pushError);
                leftNode = new Expressions.IndexExpression(leftNode, indexExpr);
            } else {
                this.#consume();
                leftNode = new Expressions.UnaryExpression(false, leftNode, token.type);
            }
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