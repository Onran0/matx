import {Token} from "../parse/lexer.js"

class ExpressionTypeEvaluator {
    #expressionType

    constructor(expressionType) {
        this.#expressionType = expressionType
    }

    eval(expression, symbolsTable, pushError) {}

    reset() {}

    canEval(expression) {
        return expression instanceof this.#expressionType
    }
}



const TypeEvaluators = Object.freeze({

})

export function analyze(symbolsTable, expression, pushError) {

}