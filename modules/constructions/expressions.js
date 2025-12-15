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

export class NewObjectExpression extends Expression {
    #type
    #elementsExpressions

    constructor(type, elementsExpressions) {
        super()
        this.#type = type
        this.#elementsExpressions = elementsExpressions
    }

    get elements() {
        return this.#elementsExpressions
    }

    get type() {
        return this.#type
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

        return `${this.#type}(${res})`
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
    #isPrefix
    #operandExpression
    #operatorType

    constructor(isPrefix, operandExpression, operatorType) {
        super()
        this.#isPrefix = isPrefix
        this.#operandExpression = operandExpression
        this.#operatorType = operatorType
    }

    get operandExpression() {
        return this.#operandExpression
    }

    get operatorType() {
        return this.#operatorType
    }

    get isPrefix() {
        return this.#isPrefix
    }

    toString() {
        if(this.#isPrefix) {
            return `${this.#operatorType}${this.#operandExpression.toString()}`
        } else {
            return `${this.#operandExpression.toString()}${this.#operatorType}`
        }
    }
}