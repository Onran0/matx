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

import Types from "../../constructions/types.js";

import * as int from "./int.js"
import * as num from "./num.js"
import * as bool from "./bool.js"
import * as vec2 from "./vec2.js"
import * as vec3 from "./vec3.js"
import * as vec4 from "./vec4.js"
import * as mat3 from "./mat3.js"
import * as mat4 from "./mat4.js"
import * as quat from "./quat.js"

const TypesEvals = Object.freeze({
    [Types.INT]: int,
    [Types.NUM]: num,
    [Types.BOOL]: bool,
    [Types.VEC2]: vec2,
    [Types.VEC3]: vec3,
    [Types.VEC4]: vec4,
    [Types.MAT3]: mat3,
    [Types.MAT4]: mat4,
    [Types.QUAT]: quat
})

export function evalBinary(typeA, a, typeB, b, op) {
    return TypesEvals[typeA].BinaryTable[op][typeB](a, b)
}

export function evalUnary(typeA, a, op) {
    return TypesEvals[typeA].UnaryTable[op](a)
}

export function evalConstructor(type, args) {
    let argsTypes = [ ]
    let argsValues = [ ]

    for(const arg of args) {
        argsTypes.push(arg.type)
        argsValues.push(arg.value)
    }

    for(const ctor of TypesEvals[type].ConstructorsTable) {
        if(
            ctor.args.length === argsTypes.length &&
            ctor.args.every((val, index) => val === argsTypes[index])
        ) {
            return ctor.eval(...argsValues)
        }
    }
}

