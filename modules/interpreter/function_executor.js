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

import * as statements from "../constructions/statements.js";

import {setupContext,getContextOfStatement} from "./context_manager.js";
import {getVarType, getVar, setVar, setupVar} from "./vars_manager.js";

import  {AssignOperators,convertAssignToRegular} from "../constructions/operators.js";

import {BinaryExpression, IndexExpression, NumberExpression, VariableExpression} from "../constructions/expressions.js";
import {IndexableTypesSize} from "../semantic/types_meta.js";

let executeExpression

export function setExpressionsExecutor(executor) {
    executeExpression = executor;
}

class Function_executor {
    #statementType

    constructor(statementType) {
        this.#statementType = statementType
    }

    execute(context, statement, pushError) {}

    canExecute(statement) {
        return statement.statement instanceof this.#statementType
    }
}

class VariableDeclarationExecutor extends Function_executor {
    constructor() {
        super(statements.VariableDeclaration)
    }

    execute(context, statement, pushError) {
        setupVar(statement.name, statement.type, executeExpression(context, statement, statement.expression, pushError).value)
    }
}

class ReturnExecutor extends Function_executor {
    constructor() {
        super(statements.Return)
    }

    execute(context, statement, pushError) {
        context.env.result = executeFunction(context, statement, statement.expression, pushError)
    }
}

class BlockExecutor extends Function_executor {
    constructor() {
        super(statements.Block)
    }

    execute(context, statement, pushError) {
        executeFunction(getContextOfStatement(context, statement, [ ], pushError))
    }
}

class VariableAssignExecutor extends Function_executor {
    constructor() {
        super(statements.VariableAssign)
    }

    execute(context, statement, pushError) {
        const name = statement.name
        let result = executeExpression(context, statement, statement.expression, pushError)
        const index = statement.indexExpression != null ? executeFunction(context, statement, statement.indexExpression, pushError).value : null

        const varType = getVarType(context, name)

        if(index > IndexableTypesSize[varType]) {
            pushError(statement, `index '${index}' is greater than length of type '${varType}' (${IndexableTypesSize[varType]})`)
            return
        } else if(index < 1) {
            pushError(statement, `index '${index}' is less than one`)
            return
        }

        if(statement.operation !== AssignOperators.ASSIGN) {
            let leftExpr = new VariableExpression(name)

            if(index != null)
                leftExpr = new IndexExpression(leftExpr, new NumberExpression(index, true))

            result = executeExpression(
                context, statement,
                new BinaryExpression(
                    leftExpr,
                    result.valueExpression,
                    convertAssignToRegular(statement.operation)
                ),
                pushError
            )
        }

        const value = result.value

        if(index == null) {
            setVar(context, name, value)
        } else {
            const arr = getVar(context, name)

            arr[index-1] = value

            setVar(context, name, arr)
        }
    }
}

const Executors = Object.freeze([
    new VariableDeclarationExecutor(),
    new ReturnExecutor(),
    new BlockExecutor(),
    new VariableAssignExecutor()
])

export function executeFunction(context, statements, args, pushError) {
    for(const arg of args) {
        setupVar(context, arg.name, arg.type, arg.value)
    }

    for(const statement of statements) {
        for(const executor of Executors) {
            if(executor.canExecute(statement)) {
                executor.execute(context, statement, pushError)
            }
        }
    }

    return context.env.result
}