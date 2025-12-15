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
import {Token} from "../parse/lexer.js"

class ExpressionAnalyzer {
    #expressionType

    constructor(expressionType) {
        this.#expressionType = expressionType
    }

    analyze(expression, context, pushError) {}

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

    }
}

class VariableExpressionAnalyzer extends ExpressionAnalyzer {
    constructor() {
        super(expressions.VariableExpression)
    }

    analyze(expression, context, pushError) {

    }
}

class NewObjectExpressionAnalyzer extends ExpressionAnalyzer {
    constructor() {
        super(expressions.NewObjectExpression)
    }

    analyze(expression, context, pushError) {

    }
}

class FunctionExpressionAnalyzer extends ExpressionAnalyzer {
    constructor() {
        super(expressions.FunctionExpression)
    }

    analyze(expression, context, pushError) {

    }
}

class IndexExpressionAnalyzer extends ExpressionAnalyzer {
    constructor() {
        super(expressions.IndexExpression)
    }

    analyze(expression, context, pushError) {

    }
}

class UnaryExpressionAnalyzer extends ExpressionAnalyzer {
    constructor() {
        super(expressions.UnaryExpression)
    }

    analyze(expression, context, pushError) {

    }
}

function getAnalyzers() {
    return Object.freeze({
        "bin_analyzer": new BinaryExpressionAnalyzer(),
        "var_analyzer": new VariableExpressionAnalyzer(),
        "new_object_analyzer": new NewObjectExpressionAnalyzer(),
        "function_analyzer": new FunctionExpressionAnalyzer(),
        "index_analyzer": new IndexExpressionAnalyzer(),
        "unary_analyzer": new UnaryExpressionAnalyzer()
    })
}

export function analyzeExpression(context, expression, pushError) {
    const analyzer = getAnalyzers().find(x => x.canAnalyze(expression))

    if(analyzer != null) {
        analyzer.analyze(expression, context, pushError)
    } else pushError("can't analyze expression of this type")
}