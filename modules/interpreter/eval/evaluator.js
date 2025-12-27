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

