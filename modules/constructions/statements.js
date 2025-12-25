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

export class Statement {
    #startToken
    #endToken

    constructor(startToken, endToken) {
        this.#startToken = startToken
        this.#endToken = endToken
    }

    get startToken() {
        return this.#startToken
    }

    get endToken() {
        return this.#endToken
    }
}

export class Comment extends Statement {
    #text

    constructor(token, text) {
        super(token, token)
        this.#text = text
    }

    get text() {
        return this.#text
    }

    toString() {
        return `#${this.#text}`
    }
}

export class VariableDeclaration extends Statement {
    #type
    #name
    #expression

    constructor(startToken, endToken, type, name, expression) {
        super(startToken, endToken)
        this.#type = type
        this.#name = name
        this.#expression = expression
    }

    get type() {
        return this.#type
    }

    get name() {
        return this.#name
    }

    get expression() {
        return this.#expression
    }

    toString() {
        if(this.#expression != null) {
            return `${this.#type} ${this.#name} = ${this.#expression.toString()};`
        } else {
            return `${this.#type} ${this.#name};`
        }
    }
}

export class FunctionDeclaration extends Statement {
    #name
    #args
    #isLambda
    #statements

    constructor(startToken, endToken, name, args, isLambda, statements) {
        super(startToken, endToken)
        this.#name = name
        this.#args = args
        this.#isLambda = isLambda
        this.#statements = statements
    }

    get args() {
        return this.#args
    }

    get name() {
        return this.#name
    }

    get statements() {
        return this.#statements
    }

    get isLambda() {
        return this.#isLambda
    }

    argsToString() {
        let strArgs = [ ]

        for(const arg of this.#args) {
            strArgs.push(`${arg.name}: ${arg.type}`)
        }

        return strArgs.join(", ")
    }

    toString() {
        if(this.#isLambda) {
            return `fun ${this.#name}(${this.argsToString()}) => ${this.#statements[0].statement.expression.toString()};`
        } else {
            return `fun ${this.#name}(${this.argsToString()}) {\n\t${(this.#statements.map(x => x.statement)).join('\n\t')}\n}`
        }
    }
}

export class Return extends Statement {
    #expression

    constructor(startToken, endToken, expression) {
        super(startToken, endToken)
        this.#expression = expression
    }

    get expression() {
        return this.#expression
    }

    toString() {
        return `return ${this.#expression};`
    }
}

export class Block extends Statement {
    #statements

    constructor(startToken, endToken, statements) {
        super(startToken, endToken)
        this.#statements = statements
    }

    get statements() {
        return this.#statements
    }

    toString() {
        return `{\n\t${(this.#statements.map(x => x.statement)).join('\n\t')}\n}`
    }
}

export class VariableAssign extends Statement {
    #name
    #indexExpression
    #expression
    #operation

    constructor(startToken, endToken, name, indexExpression, expression, operation) {
        super(startToken, endToken)
        this.#name = name
        this.#indexExpression = indexExpression
        this.#expression = expression
        this.#operation = operation
    }

    get name() {
        return this.#name
    }

    get expression() {
        return this.#expression
    }

    get indexExpression() {
        return this.#indexExpression
    }

    get operation() {
        return this.#operation
    }

    toString() {
        return `${this.#name}${this.#indexExpression != null ? `[${this.#indexExpression.toString()}]` : ''} ${this.#operation}= ${this.#expression};`
    }
}