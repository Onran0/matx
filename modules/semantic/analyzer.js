import * as expressions from "../constructions/expressions.js"
import * as statements from "../constructions/statements.js";
import {OutputTypeTable} from "./output_type_table.js";

class AnalyzerTemplate {
    #statementType

    constructor(statementType) {
        this.#statementType = statementType
    }

    analyze(statement, symbolsTable, pushError) {}

    reset() {}

    canAnalyze(statement) {
        return statement.statement instanceof this.#statementType
    }
}

class VariableDeclarationAnalyzer extends AnalyzerTemplate {
    constructor() {
        super(statements.VariableDeclaration);
    }

    analyze(statement, symbolsTable, pushError) {

    }
}

const Analyzers = Object.freeze({

})

export function analyze(ast) {
    let symbolsTable = { }, errors = [ ]



    return [ symbolsTable, errors ]
}