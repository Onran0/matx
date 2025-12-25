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

import * as fs from 'fs';

import {initialize as initializeLibraries} from "./library/core.js";

import {parse} from "./parse/parser.js";
import {analyze} from "./semantic/analyzer.js";

await initializeLibraries()

export function translate(code) {
    const [statements, errors] = parse(code);

    const [ context, semanticErrors ] = analyze(statements)

    errors.push(...semanticErrors)

    if(errors.length === 0) {
        console.log(context)
        console.log()

        for(const statement of statements) {
            console.log(statement.statement.toString())
            console.log()
        }
    } else {
        for(const error of errors) {
            console.log(error)
        }
    }
}

let data

try {
    data = fs.readFileSync('../test.matx', 'utf8');
} catch (err) {
    console.error(err);
}

translate(data)