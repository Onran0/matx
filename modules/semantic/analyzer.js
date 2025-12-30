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

import Types, {isType} from "../constructions/types.js"

import * as expressions from "../constructions/expressions.js"
import * as statements from "../constructions/statements.js";
import {analyzeExpression} from "./expressions_analyzer.js";
import {BinaryTable} from "./types_meta.js";
import {getLibraries} from "../library/core.js";

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
        if(checkEntityDef(context, statement, statement.statement.name, pushError)) {
            if(statement.statement.expression)
                analyzeExpression(context, statement.statement.expression, pushError, statement)

            checkTypeDef(context, statement, statement.statement.type, pushError)

            setEntityProperty(context, "vars", statement.statement.name, "type", statement.statement.type);
        }
    }
}

class FunctionDeclarationAnalyzer extends AnalyzerTemplate {
    constructor() {
        super(statements.FunctionDeclaration);
    }

    analyze(statement, context, pushError) {
        if(checkEntityDef(context, statement.statement.name, pushError)) {
            let definedArgsTable = [ ]

            for(const arg of statement.statement.args) {
                if(definedArgsTable.includes(arg.name)) {
                    pushError(statement, `argument '${arg.name}' is already defined`)
                }

                checkTypeDef(context, statement, arg.type, pushError)

                definedArgsTable.push({ name: arg.name, type: arg.type })
            }

            const [ functionContext ] = analyze(statement.statement.statements, context, pushError)

            functionContext.insideFunction = statement.statement.name
            functionContext.arguments = definedArgsTable
            functionContext.statementRef = statement

            if(functionContext.result == null) {
                pushError(statement, "function must have a return")
            }

            setEntityProperty(context, "functions", statement.statement.name, "type", functionContext.result);
        }
    }
}

class ReturnAnalyzer extends AnalyzerTemplate {
    constructor() {
        super(statements.Return)
    }

    analyze(statement, context, pushError) {
        if(context.result != null) {
            pushError(statement, `context already have a return`)
        } else context.result = analyzeExpression(context, statement.statement.expression, pushError, statement)
    }
}

class BlockAnalyzer extends AnalyzerTemplate {
    constructor() {
        super(statements.Block)
    }

    analyze(statement, context, pushError) {
        const [ blockContext ] = analyze(statement.statement.statements, context, pushError)

        blockContext.insideBlock = statement.statement
        blockContext.statementRef = statement

        if(blockContext.result != null)
            pushError(statement, `block cannot have a return`)
    }
}

class VariableAssignAnalyzer extends AnalyzerTemplate {
    constructor() {
        super(statements.VariableAssign)
    }

    analyze(statement, context, pushError) {

    }
}

const entitiesTypes = Object.freeze({
    vars: "vars",
    functions: "functions"
})

export function getEntityProperty(context, entitiesType, name, property) {
    const val = context[entitiesType][name]?.[property]

    if(val != null)
        return val
    else if(context.libraries != null) {
        const libEntitiesType = entitiesType !== "vars" ? entitiesType : "fields";

        for(const library of context.libraries) {
            if(library[name] != null && library[name].entityType === libEntitiesType) {
                return library[name][property]
            }
        }
    }

    if(context.parentContext != null)
        return getEntityProperty(context.parentContext, entitiesType, name, property)
    else
        return undefined
}

export function setEntityProperty(context, entitiesType, name, property, value) {
    (context[entitiesType][name] ??= { })[property] = value
}

function checkEntityDef(context, statement, name, pushError) {
    for(const entitiesType of Object.keys(entitiesTypes)) {
        let cond = context[entitiesType][name] != null

        if(!cond && context.libraries != null) {
            for(const lib of context.libraries) {
                if(lib[name] != null) {
                    cond = true
                    break
                }
            }
        }

        if (cond) {
            pushError(statement, `${entitiesTypes[entitiesType]} '${name}' already defined in current context`)
            return false
        } else if(context.parentContext != null)
            return checkEntityDef(context.parentContext. statement, name, pushError)
    }

    return true
}

function checkTypeDef(context, statement, type, pushError) {
    if(!isType(type)) {
        pushError(statement, `type '${type}' not defined'`)
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

export function analyze(ast, parentContext, pushError) {
    const analyzers = getAnalyzers()

    let context = {
        vars: { },
        functions: { },
        result: null,
        parentContext: parentContext
    }

    if(parentContext != null)
        (parentContext.childContexts ??= [ ]).push(context)
    else
        context.libraries = getLibraries()

    let errors = [ ]

    pushError ??= function(statement, msg) {
        errors.push({
            rawMsg: msg,
            msg: msg + ` at column '${statement.column}', line '${statement.line}'`,

            column: statement.column,
            line: statement.line,

            endColumn: statement.endToken.column,
            endLine: statement.endToken.line,

            source: "analyzer"
        })
    }

    for(const statement of ast) {
        const analyzer = Object.values(analyzers).find(x => x.canAnalyze(statement))

        if(analyzer != null) {
            analyzer.analyze(statement, context, pushError)
        } else pushError(statement, "can't analyze statement of this type")
    }

    let rawReplace = false

    if(
        context.result == null &&
        (context.statementRef == null || context.statementRef instanceof statements.FunctionDeclaration)
    ) {
        pushError(ast[ast.length - 1], "root / function context must have a return")
        rawReplace = true
    } else if(parentContext == null &&
        context.result !== Types.NUM &&
        context.result !== Types.INT)
    {
        pushError(ast[ast.length - 1], `the root context must return a value of number type`)
        rawReplace = true
    }

    if(rawReplace)
        errors[errors.length - 1].msg = errors[errors.length - 1].rawMsg

    return [ context, errors ]
}