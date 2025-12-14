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
    #argumentsNames
    #isLambda
    #statements

    constructor(startToken, endToken, name, argumentsNames, isLambda, statements) {
        super(startToken, endToken)
        this.#name = name
        this.#argumentsNames = argumentsNames
        this.#isLambda = isLambda
        this.#statements = statements
    }

    get argumentsNames() {
        return this.#argumentsNames
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

    toString() {
        if(this.#isLambda) {
            return `fun ${this.#name}(${this.#argumentsNames.join(', ')}) => ${this.#statements[0].expression.toString()};`
        } else {
            return `fun ${this.#name}(${this.#argumentsNames.join(', ')}) {\n\t${this.#statements.join('\n\t')}\n}`
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
        return `{\n\t${this.#statements.join('\n\t')}\n}`
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