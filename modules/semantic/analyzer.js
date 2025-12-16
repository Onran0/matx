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
import * as statements from "../constructions/statements.js";
import {analyzeExpression} from "./expressions_analyzer.js";
import {BinaryTable} from "./types_meta.js";

class AnalyzerTemplate {
    #statementType

    constructor(statementType) {
        this.#statementType = statementType
    }

    analyze(statement, context, pushError) {}

    reset() {}

    canAnalyze(statement) {
        return statement.statement instanceof this.#statementType
    }
}

class VariableDeclarationAnalyzer extends AnalyzerTemplate {
    constructor() {
        super(statements.VariableDeclaration);
    }

    analyze(statement, context, pushError) {

    }
}

class FunctionDeclarationAnalyzer extends AnalyzerTemplate {
    constructor() {
        super(statements.FunctionDeclaration);
    }

    analyze(statement, context, pushError) {

    }
}

class ReturnAnalyzer extends AnalyzerTemplate {
    constructor() {
        super(statements.Return)
    }

    analyze(statement, context, pushError) {

    }
}

class BlockAnalyzer extends AnalyzerTemplate {
    constructor() {
        super(statements.Block)
    }

    analyze(statement, context, pushError) {

    }
}

class VariableAssignAnalyzer extends AnalyzerTemplate {
    constructor() {
        super(statements.VariableAssign)
    }

    analyze(statement, context, pushError) {

    }
}

function getAnalyzers() {
    return Object.freeze({
        var_decl_analyzer: new VariableDeclarationAnalyzer(),
        func_decl_analyzer: new FunctionDeclarationAnalyzer(),
        return_analyzer: new ReturnAnalyzer(),
        block_analyzer: new BlockAnalyzer(),
        var_assign_analyzer: new VariableAssignAnalyzer()
    })
}

export function getEntityProperty(context, entityType, name, property) {
    const val = context[entityType + 's'][name]?.[property]

    if(val != null)
        return val
    else if(context.parentContext != null)
        return getEntityProperty(context.parentContext, entityType, name, property)
    else
        return undefined
}

export function setEntityProperty(context, entityType, name, property, value) {
    (context[entityType + 's'][name] ??= { })[property] = value
}

export function analyze(ast, parentContext, pushError) {
    const analyzers = getAnalyzers()

    let context = {
        vars: { },
        functions: { },
        returnType: null,
        parentContext: parentContext
    }

    let errors = [ ]

    pushError ??= function(statement, msg) {
        errors.push({
            rawMsg: msg,
            msg: msg + ` at column '${statement.column}', line '${statement.line}'`,

            column: statement.column,
            line: statement.line,

            endColumn: statement.endToken.column,
            endLine: statement.endToken.line
        })
    }

    for(const statement of ast) {
        const analyzer = analyzers.find(x => x.canAnalyze(statement))

        if(analyzer != null) {
            analyzer.analyze(statement, context, pushError)
        } else pushError(statement, "can't analyze statement of this type")
    }

    return [ context, errors ]
}