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

import * as expressions from "../constructions/expressions.js"
import {BinaryTable,UnaryTable,ConstructorsTable,IndexableTypesTable} from "./types_meta.js";
import {Token} from "../parse/lexer.js"
import {getEntityProperty} from "./analyzer.js";

class ExpressionAnalyzer {
    #expressionType
    #resultProvider

    constructor(expressionType, resultProvider) {
        this.#expressionType = expressionType
        this.#resultProvider = resultProvider
    }

    // must return type of output expression result, or undefined/null if expression have error
    analyze(expression, context, pushError) {
        return typeof this.#resultProvider == "function" ?
            this.#resultProvider(expression, context, pushError) :
            this.#resultProvider
    }

    reset() {}

    canAnalyze(expression) {
        return expression instanceof this.#expressionType
    }
}

class BinaryExpressionAnalyzer extends ExpressionAnalyzer {
    constructor() {
        super(expressions.BinaryExpression)
    }

    analyze(expression, context, pushError) {
        if(!Token.isOperator(expression.operation)) {
            pushError(expression, `undefined operator '${expression.operation}'`)
        } else {
            const leftType = analyzeExpression(context, expression.leftExpression, pushError)
            const rightType = analyzeExpression(context, expression.rightExpression, pushError)

            if(leftType != null && rightType != null) {
                const outputType = BinaryTable[leftType][expression.operation][rightType]

                if(outputType == null) {
                    pushError(expression, `operation '${leftType} ${expression.operation} ${rightType}' is undefined`)
                }

                return outputType
            }
        }
    }
}

class VariableExpressionAnalyzer extends ExpressionAnalyzer {
    constructor() {
        super(expressions.VariableExpression)
    }

    analyze(expression, context, pushError) {
        const type = getEntityProperty(context, "vars", expression.name, "type")

        if(type == null) {
            pushError(expression, `variable '${expression.name}' is not defined`)
        }

        return type
    }
}

class NewObjectExpressionAnalyzer extends ExpressionAnalyzer {
    constructor() {
        super(expressions.NewObjectExpression)
    }

    analyze(expression, context, pushError) {
        if(Token.isType(expression.type)) {
            if(ConstructorsTable[expression.type]) {
                let constructorTypes = [ ]

                for(const argumentExpression of expression.elements) {
                    const type = analyzeExpression(context, argumentExpression, pushError)

                    if(type == null)
                        return

                    constructorTypes.push(type)
                }

                if(ConstructorsTable[expression.type].find(x => {
                    if(x.length !== constructorTypes.length) {
                        return false
                    }

                    let match = true

                    x.every((cType, index) => {
                        if(
                            cType !== constructorTypes[index] &&
                            !(
                                cType === Token.TYPE_INT && constructorTypes[index] === Token.TYPE_FLOAT ||
                                cType === Token.TYPE_FLOAT && constructorTypes[index] === Token.TYPE_INT
                            )
                        ) {
                            match = false
                            return false
                        }
                        return true
                    })

                    return match
                }) == null) {
                    pushError(expression, `constructor '${expression.type}(${constructorTypes.join(", ")})' is not defined`)
                }

                return expression.type
            } else pushError(expression, `type '${expression.type}' has no constructors'`)
        } else pushError(expression, `unknown type '${expression.type}'`)
    }
}

class FunctionExpressionAnalyzer extends ExpressionAnalyzer {
    constructor() {
        super(expressions.FunctionExpression)
    }

    analyze(expression, context, pushError) {
        const type = getEntityProperty(context, "functions", expression.name, "type")

        if(type == null) {
            pushError(expression, `function '${expression.name}' is not defined`)
        } else {
            let types = [ ]

            for(const argumentExpression of expression.argumentsExpressions) {
                const type = analyzeExpression(context, argumentExpression, pushError)

                if(type == null)
                    return

                types.push(type)
            }

            let match = true

            getEntityProperty(context, "functions", expression.name, "arguments").every(
                (arg, index) => {
                    const argType = arg.type

                    if(
                        argType !== types[index] &&
                        (
                            argType === Token.TYPE_INT && types[index] === Token.TYPE_FLOAT ||
                            argType === Token.TYPE_FLOAT && types[index] === Token.TYPE_INT
                        )
                    ) {
                        match = false
                        return false
                    }
                    return true
                }
            )

            if(!match) {
                pushError(expression, `function '${expression.name}' does not accept arguments '${types.join(",")}'`)
            }
        }

        return type
    }
}

class IndexExpressionAnalyzer extends ExpressionAnalyzer {
    constructor() {
        super(expressions.IndexExpression)
    }

    analyze(expression, context, pushError) {
        const type = analyzeExpression(context, expression.index, pushError)

        if(type != null) {
            if(type !== Token.TYPE_INT) {
                pushError(expression, `index must be int`)
            }

            const targetType = analyzeExpression(context, expression.target, pushError)

            if(targetType != null) {
                const outputType = IndexableTypesTable[targetType]

                if(outputType == null) {
                    pushError(expression, `type '${targetType}' is not indexable`)
                } else return outputType
            }
        }
    }
}

class UnaryExpressionAnalyzer extends ExpressionAnalyzer {
    constructor() {
        super(expressions.UnaryExpression)
    }

    analyze(expression, context, pushError) {
        if(
            (expression.operatorType === Token.INCREMENT ||
            expression.operatorType === Token.DECREMENT) &&
            !(expression.operandExpression instanceof expressions.VariableExpression)
        ) {
            pushError(expression, "increment or decrement can be applied only for variables")
            return
        }

        const type = analyzeExpression(context, expression.operandExpression, pushError)

        if(type != null) {
            if(!UnaryTable[type].includes(expression.operatorType)) {
                pushError(expression, `unary operator '${expression.operatorType}' is not defined for type '${type}'`)
            }

            return type
        }
    }
}

const Analyzers = Object.freeze({
    "bin_analyzer": new BinaryExpressionAnalyzer(),
    "var_analyzer": new VariableExpressionAnalyzer(),
    "num_analyzer": new ExpressionAnalyzer(
        expressions.NumberExpression,
        exp => exp.isInteger() ? Token.TYPE_INT : Token.TYPE_FLOAT
    ),
    "bool_analyzer": new ExpressionAnalyzer(
        expressions.BoolExpression,
        Token.TYPE_BOOL
    ),
    "new_object_analyzer": new NewObjectExpressionAnalyzer(),
    "function_analyzer": new FunctionExpressionAnalyzer(),
    "index_analyzer": new IndexExpressionAnalyzer(),
    "unary_analyzer": new UnaryExpressionAnalyzer()
})

export function analyzeExpression(context, expression, pushError, statement) {
    const analyzer = Object.values(Analyzers).find(x => x.canAnalyze(expression))

    // TODO: normal pushError for expressions

    if(statement != null) {
        const oldPushError = pushError

        pushError = function(expression, msg) {
            oldPushError(statement, msg)
        }
    }

    if(analyzer != null) {
        return analyzer.analyze(expression, context, pushError)
    } else pushError(expression, "can't analyze expression of this type")

    console.log(123123, expression)
}