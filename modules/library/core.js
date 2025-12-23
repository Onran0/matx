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

const libsPaths = [
    "./builtin/env.js",
    "./builtin/vec3.js",
]





const EntitiesTypes = [ "functions", "fields" ]

export function convertForExport(library) {
    let result = { }

    for(const entityType of EntitiesTypes) {
        for(const entityName in library[entityType]) {
            const entityDotName = `${library.name}.${entityName}`

            if(entityType === "fields") {
                result[entityDotName] = { type: library[entityType][entityName] }
            } else {
                result[entityDotName] = Object.assign({}, library[entityType][entityName])
                result[entityDotName].type = result[entityDotName].result
            }

            result[entityDotName].entityType = entityType
        }
    }

    return Object.freeze(result)
}

const Libraries = [ ]

export async function initialize() {
    try {
        const modules = await Promise.all(
            libsPaths.map(path => import(path))
        )

        modules.forEach(module => Libraries.push(module.default))
    } catch (error) {
        console.error(error)
    }
}

export function getLibraries() {
    return Object.freeze(Libraries)
}