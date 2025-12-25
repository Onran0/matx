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

import {parse} from '../parse/parser.js'
import {analyze} from '../semantic/analyzer.js'

import {executeFunction} from "./executor.js";
import {setupContext} from "./context_manager.js";


function interpretAST(statements, context) {
    setupContext(context)

    let errors = [ ]

    const result = executeFunction(context, statements, [ ], function(statement, msg) {
        errors.push({
            rawMsg: msg,
            msg: msg + ` at column '${statement.column}', line '${statement.line}'`,

            column: statement.column,
            line: statement.line,

            endColumn: statement.endToken.column,
            endLine: statement.endToken.line,

            source: "interpreter"
        })
    })

    return [ result, errors ]
}

export function interpret(code, context) {
    if(typeof code === 'string') {
        const [ statements, errors ] = parse(code)

        if(errors.length === 0) {
            const [ _context, semanticErrors ] = analyze(statements)

            if(semanticErrors.length === 0) {
                code = statements
                context = _context
            } else return [ undefined, semanticErrors ]
        } else return [ undefined, errors ]
    }

    return interpretAST(code, context)
}