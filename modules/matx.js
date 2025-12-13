import {tokenize,printTokens} from "./tokenizer.js";

export function translate(code) {
    const [tokens, errors] = tokenize(code);

    let str = ""

    printTokens(tokens)

    console.log(str)

    for(const error of errors) {
        console.log(error)
    }
}

translate(`

`)

console.log("meow")