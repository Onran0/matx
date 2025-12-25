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
import {isType} from "../constructions/types.js"
import SpecialSyms from "../constructions/special_syms.js"
import {isOperator, PossibleUnaryOperators, RegularOperators} from "../constructions/operators.js"
import {Token} from "./lexer.js"

const Precedence = Object.freeze({
    [Token.EOF]: -1,
    [SpecialSyms.R_BRACKET]: -1,
    [SpecialSyms.RSQ_BRACKET]: -1,
    [SpecialSyms.COMMA]: -1,

    /*
    -1 is need to break on:
    - eof
    - function arguments separator
    - function end
    - array declaration end
     */

    [RegularOperators.EQL]: 1,
    [RegularOperators.NEQL]: 1,
    [RegularOperators.GRTR]: 1,
    [RegularOperators.LESS]: 1,
    [RegularOperators.GRTR_OR_EQL]: 1,
    [RegularOperators.LESS_OR_EQL]: 1,
    [RegularOperators.LOGIC_OR]: 1,

    [RegularOperators.LOGIC_AND]: 2,

    [RegularOperators.OR]: 3,

    [RegularOperators.XOR]: 4,

    [RegularOperators.AND]: 5,

    [RegularOperators.LSHIFT]: 6,
    [RegularOperators.RSHIFT]: 6,

    [RegularOperators.ADD]: 7,
    [RegularOperators.SUB]: 7,

    [RegularOperators.MOD]: 8,

    [RegularOperators.MUL]: 9,
    [RegularOperators.DIV]: 9,
    [RegularOperators.INT_DIV]: 9,

    [RegularOperators.POW]: 10,
    [SpecialSyms.L_BRACKET]: 11
})

const UnaryPriority = 12
const IncdecPriority = UnaryPriority + 1

let PostfixOperators = [ RegularOperators.INCREMENT, RegularOperators.DECREMENT ]

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
        return Precedence[token.type] || 0
    }

    #parseFunctionArgs(pushError) {
        const args = []
        while (this.#currentToken().type !== SpecialSyms.R_BRACKET && this.#currentToken().type !== Token.EOF) {
            const argExpr = this.parseExpression(pushError)
            args.push(argExpr)
            if (this.#currentToken().type === SpecialSyms.COMMA) {
                this.#consume()
            } else {
                break
            }
        }
        this.#consumeToken([SpecialSyms.R_BRACKET], pushError)
        return args
    }

    parseExpression(pushError, minPrecedence = 0) {
        let leftNode
        const current = this.#currentToken()

        if (PossibleUnaryOperators.includes(current.type)) {
            const operatorToken = this.#consume()
            const operandExpression = this.parseExpression(pushError,
                current.type === RegularOperators.INCREMENT ||
                current.type === RegularOperators.DECREMENT ? IncdecPriority : UnaryPriority
            )

            leftNode = new Expressions.UnaryExpression(true, operandExpression, operatorToken.type)
        }
        else if (current.type === Token.NUMBER) {
            this.#consume()
            leftNode = new Expressions.NumberExpression(current.value, Math.floor(current.value) === current.value)
        } else if (current.type === Token.TRUE || current.type === Token.FALSE) {
            this.#consume()
            leftNode = new Expressions.BoolExpression(current.type === Token.TRUE)
        } else if (isType(current.type)) {
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
            PostfixOperators.includes(this.#currentToken().type) ||
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

            if(!isOperator(operatorToken)) {
                pushError(current, `undefined operator '${operatorToken.type}'`)
                return null
            }

            let operatorPrecedence = Precedence[operatorToken.type]

            if (operatorToken.type === RegularOperators.POW) {
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