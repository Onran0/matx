export class Expression { }

export class BinaryExpression extends Expression {
    #leftExpression
    #rightExpression
    #operation

    constructor(leftExpression, rightExpression, operation) {
        super();
        this.#leftExpression = leftExpression
        this.#rightExpression = rightExpression
        this.#operation = operation
    }

    get leftExpression() {
        return this.#leftExpression
    }

    get rightExpression() {
        return this.#rightExpression
    }

    get operation() {
        return this.#operation
    }
}

export class VariableExpression extends Expression {
    #name

    constructor(name) {
        super();
        this.#name = name
    }

    get name() {
        return this.#name
    }
}

export class NumberExpression extends Expression {
    #value
    #typeInt

    constructor(value, typeInt) {
        super();
        this.#value = value
        this.#typeInt = typeInt
    }

    get isInteger() {
        return this.#typeInt
    }

    get value() {
        return this.#value
    }
}

export class BoolExpression extends Expression {
    #value

    constructor(value) {
        super();
        this.#value = value
    }

    get value() {
        return this.#value
    }
}

export class ArrayExpression extends Expression {
    #elements

    constructor(elements) {
        super();
        this.#elements = elements
    }

    get elements() {
        return this.#elements
    }
}

export class FunctionExpression extends Expression {
    #name
    #argumentsExpressions

    constructor(name, argumentsExpressions) {
        super();
        this.#name = name
        this.#argumentsExpressions = argumentsExpressions
    }

    get name() {
        return this.#name
    }

    get argumentsExpressions() {
        return this.#argumentsExpressions
    }
}