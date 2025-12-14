import * as fs from 'fs';

import {parse} from "./parser.js";

export function translate(code) {
    const [statements, errors] = parse(code);

    for(const statement of statements) {
        console.log(statement.statement.toString())
        console.log()
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