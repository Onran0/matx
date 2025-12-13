import {Expression} from "./expressions.js";

export class Statement { }

export class Comment extends Statement {
    #text

    constructor(text) {
        super()
        this.#text = text
    }

    get text() {
        return this.#text
    }
}

export class VariableDeclaration extends Statement {
    #type
    #name
    #expression

    constructor(type, name, expression) {
        super();
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
}

export class FunctionDeclaration extends Statement {
    #name
    #argumentsNames

    constructor(name, argumentsNames) {
        super();
        this.#name = name
        this.#argumentsNames = argumentsNames
    }

    get argumentsNames() {
        return this.#argumentsNames
    }

    get name() {
        return this.#name
    }
}

export class Return extends Statement {
    #expression

    constructor(expression) {
        super();
        this.#expression = expression
    }

    get expression() {
        return this.#expression
    }
}

export class Block extends Statement {
    #statements

    constructor(statements) {
        super();
        this.#statements = statements
    }

    get statements() {
        return this.#statements
    }
}

export class VariableAssign extends Statement {
    #name
    #expression

    constructor(name, expression) {
        super();
        this.#name = name
        this.#expression = expression
    }

    get name() {
        return this.#name
    }

    get expression() {
        return this.#expression
    }
}