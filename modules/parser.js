import {tokenize,Token} from "./tokenizer.js";
import * as statements from "./statements.js";

function parseTokens(tokens) {
    let statements = [ ], errors = [ ]

    

    return [ statements, errors ]
}

export function parse(code) {
    let tokens, tokenizerErrors

    if(typeof code == "string") {
        [tokens, tokenizerErrors] = tokenize(code);
    } else tokens = code

    if(tokenizerErrors == null || tokenizerErrors.length === 0) {
        return parseTokens(tokens);
    } else return [ [ ], tokenizerErrors ]
}