export class Expression { }

export class BinaryExpression extends Expression {
    #leftExpression
    #rightExpression
    #operation

    constructor(leftExpression, rightExpression, operation) {
        super()
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

    toString() {
        return `${this.#leftExpression.toString()} ${this.#operation} ${this.#rightExpression.toString()}`
    }
}

export class VariableExpression extends Expression {
    #name

    constructor(name) {
        super()
        this.#name = name
    }

    get name() {
        return this.#name
    }

    toString() {
        return String(this.#name);
    }
}

export class NumberExpression extends Expression {
    #value
    #typeInt

    constructor(value, typeInt) {
        super()
        this.#value = value
        this.#typeInt = typeInt
    }

    get isInteger() {
        return this.#typeInt
    }

    get value() {
        return this.#value
    }

    toString() {
        return String(this.#value);
    }
}

export class BoolExpression extends Expression {
    #value

    constructor(value) {
        super()
        this.#value = value
    }

    get value() {
        return this.#value
    }

    toString() {
        return this.#value.toString()
    }
}

export class ArrayExpression extends Expression {
    #elementsExpressions

    constructor(elementsExpressions) {
        super()
        this.#elementsExpressions = elementsExpressions
    }

    get elements() {
        return this.#elementsExpressions
    }

    toString() {
        let res = ""

        for(const argument of this.#elementsExpressions) {
            res += argument.toString()
            res += ", "
        }

        if(this.#elementsExpressions.length > 0) {
            res = res.substring(0, res.length - 2)
        }

        return `[ ${res} ]`
    }
}

export class FunctionExpression extends Expression {
    #name
    #argumentsExpressions

    constructor(name, argumentsExpressions) {
        super()
        this.#name = name
        this.#argumentsExpressions = argumentsExpressions
    }

    get name() {
        return this.#name
    }

    get argumentsExpressions() {
        return this.#argumentsExpressions
    }

    toString() {
        let res = ""

        for(const argument of this.#argumentsExpressions) {
            res += argument.toString()
            res += ", "
        }

        if(this.#argumentsExpressions.length > 0) {
            res = res.substring(0, res.length - 2)
        }

        return `${this.#name}(${res})`
    }
}

export class IndexExpression extends Expression {
    constructor(target, index) {
        super()
        this.target = target
        this.index = index
    }

    toString() {
        return `${this.target.toString()}[${this.index.toString()}]`
    }
}

export class UnaryExpression extends Expression {
    #operandExpression
    #operatorType

    constructor(operandExpression, operatorType) {
        super()
        this.#operandExpression = operandExpression
        this.#operatorType = operatorType
    }

    get operandExpression() {
        return this.#operandExpression
    }

    get operatorType() {
        return this.#operatorType
    }

    toString() {
        return `${this.#operatorType}${this.#operandExpression.toString()}`
    }
}