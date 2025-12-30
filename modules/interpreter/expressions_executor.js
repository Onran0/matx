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

import Types from "../constructions/types.js";

import {BinaryTable,ModifyingUnaryTable,IndexableTypesTable,IndexableTypesSize} from "../semantic/types_meta.js"
import * as expressions from "../constructions/expressions.js"
import {evalBinary,evalUnary,evalConstructor} from "./eval/evaluator.js";
import {getVarType, getVar, setVar} from "./vars_manager.js";
import {getFunctionInfo} from "./functions_manager.js";
import {RegularOperators} from "../constructions/operators.js";

let executeFunction

export function setFunctionExecutor(executor) {
    executeFunction = executor
}

class ExpressionsExecutor {
    #expressionType

    constructor(expressionType) {
        this.#expressionType = expressionType
    }

    execute(context, expression, pushError) {}

    canExecute(expression) {
        return expression instanceof this.#expressionType
    }
}

class BinaryExpressionExecutor extends ExpressionsExecutor {
    constructor() {
        super(expressions.BinaryExpression)
    }

    execute(context, expression, pushError) {
        const left = executeExpression(context, expression.leftExpression, pushError)
        const right = executeExpression(context, expression.rightExpression, pushError)

        return {
            type: BinaryTable[left.type][expression.operation][right.type],
            value: evalBinary(left.type, left.value, right.type, right.value, expression.operation)
        }
    }
}

class VariableExpressionExecutor extends ExpressionsExecutor {
    constructor() {
        super(expressions.VariableExpression)
    }

    execute(context, expression, pushError) {
        const name = expression.name

        return {
            type: getVarType(context, name),
            value: getVar(context, name)
        }
    }
}

class NumberExpressionExecutor extends ExpressionsExecutor {
    constructor() {
        super(expressions.NumberExpression)
    }

    execute(context, expression, pushError) {
        return {
            type: expression.isInteger() ? Types.INT : Types.NUM,
            value: expression.value
        }
    }
}

class BoolExpressionExecutor extends ExpressionsExecutor {
    constructor() {
        super(expressions.BoolExpression)
    }

    execute(context, expression, pushError) {
        return {
            type: Types.BOOL,
            value: expression.value
        }
    }
}

class NewObjectExpressionExecutor extends ExpressionsExecutor {
    constructor() {
        super(expressions.NewObjectExpression)
    }

    execute(context, expression, pushError) {
        let args = [ ]

        for(const expr of expression.argumentsExpressions) {
            args.push(executeExpression(context, expr, pushError))
        }

        return {
            type: expression.type,
            value: evalConstructor(expression.type, args)
        }
    }
}

class FunctionExpressionExecutor extends ExpressionsExecutor {
    constructor() {
        super(expressions.FunctionExpression)
    }

    execute(context, expression, pushError) {
        const info = getFunctionInfo(context, expression.name)
        let args = [ ]

        for(const expr of expression.elements) {
            args.push(executeExpression(context, expr, pushError))
        }

        executeFunction(context, info.statements, args, pushError)

        return {
            type: info.name,
            value: info.name
        }
    }
}

class IndexExpressionExecutor extends ExpressionsExecutor {
    constructor() {
        super(expressions.IndexExpression)
    }

    execute(context, expression, pushError) {
        const target = executeExpression(context, expression.target, pushError)
        const index = executeExpression(context, expression.index, pushError).value

        if(index > IndexableTypesSize[target.type]) {
            pushError(expression, `index '${index}' is greater than length of type '${target.type}' (${IndexableTypesSize[target.type]})`)
            return
        } else if(index < 1) {
            pushError(expression, `index '${index}' is less than one`)
            return
        }

        return {
            type: IndexableTypesTable[target.type],
            value: target.value[index]
        }
    }
}

class UnaryExpressionExecutor extends ExpressionsExecutor {
    constructor() {
        super(expressions.UnaryExpression)
    }

    execute(context, expression, pushError) {
        const operator = expression.operatorType

        if(
            expression.operandExpression instanceof expressions.VariableExpression &&
            ModifyingUnaryTable[getVarType(context, expression.operandExpression.name)].includes(operator)
        ) {
            const varName = expression.operandExpression.name

            let newValue = evalUnary(
                getVarType(context, varName), getVar(context, varName),
                operator
            )

            if(!expression.isPrefix) {
                let oldValue = getVar(context, varName)
                setVar(context, varName, newValue)
                newValue = oldValue
            } else setVar(context, varName, newValue)

            return {
                type: getVarType(context, varName),
                value: newValue
            }
        } else {
            const operand = executeExpression(context, expression.operandExpression, pushError)

            return {
                type: operand.type,
                value: evalUnary(operand.type, operand.value, operator)
            }
        }
    }
}

const Executors = Object.freeze([
    new BinaryExpressionExecutor(),
    new VariableExpressionExecutor(),
    new NumberExpressionExecutor(),
    new BoolExpressionExecutor(),
    new BinaryExpressionExecutor(),
    new NewObjectExpressionExecutor(),
    new FunctionExpressionExecutor(),
    new IndexExpressionExecutor(),
    new UnaryExpressionExecutor()
])

export function executeExpression(context, expression, pushError, statement) {
    if(statement != null) {
        const oldPushError = pushError

        pushError = function(msg) {
            oldPushError(statement, msg)
        }
    }

    return Executors.find(x => x.canExecute(expression)).execute(context, expression, pushError)
}