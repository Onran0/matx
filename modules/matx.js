import {tokenize} from "./tokenizer.js";

export function translate(code) {
    const [tokens, errors] = tokenize(code);

    let str = ""

    for(const token of tokens) {
        console.log(token)
    }

    console.log(str)

    for(const error of errors) {
        console.log(error)
    }
}

translate(`
mat4 a;
mat4 b;
mat4 c = a * b;
fun erh(a, b) {
    return a * b;
}

mat4 d = erh(c, a)

return d[2]
`)

console.log("meow")