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

export function setupContext(context) {
    context.env ??= {
        vars: { }
    }

    for(const child of context.childContexts)
        setupContext(child)
}

export function getContextOfStatement(context, statement) {
    if(context.statementRef === statement)
        return context
    else if(context.childContexts.length > 0) {
        for(const child of context.childContexts) {
            const ctx = getContextOfStatement(child, statement)

            if(ctx != null)
                return ctx
        }
    }

    return null
}