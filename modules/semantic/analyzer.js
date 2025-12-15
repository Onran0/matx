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