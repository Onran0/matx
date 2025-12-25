import * as expressions from "../constructions/expressions.js"

class ExpressionsExecutor {
    #expressionType

    constructor(expressionType) {
        this.#expressionType = expressionType
    }

    execute(context, expression, pushError) {}

    reset() {}

    canExecute(expression) {
        return expression instanceof this.#expressionType
    }
}

export function executeExpression(context, statement, expression, pushError) {

}