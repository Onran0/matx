import * as fs from 'fs';

import {tokenize} from "./tokenizer.js";

export function translate(code) {
    const [tokens, errors] = tokenize(code);

    for(const token of tokens) {
        console.log(token)
    }

    for(const error of errors) {
        console.log(error)
    }
}

let data

try {
    data = fs.readFileSync('../test.matx', 'utf8');
} catch (err) {
    console.error(err);
}

translate(data)

console.log("meow")