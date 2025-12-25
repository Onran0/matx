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
import {RegularOperators} from "../../constructions/operators.js"

import * as common from "./common.js"

export const BinaryTable = Object.freeze({
    [RegularOperators.ADD]: {
        [Types.MAT3]: common.arrayAddArray
    },

    [RegularOperators.SUB]: {
        [Types.MAT3]: common.arraySubArray
    },

    [RegularOperators.MUL]: {
        [Types.INT]: common.arrayMulNum,
        [Types.NUM]: common.arrayMulNum,
        [Types.VEC3]: function(m,v) {
            return [
                m[0] * v[0] + m[3] * v[1] + m[6] * v[2],
                m[1] * v[0] + m[4] * v[1] + m[7] * v[2],
                m[2] * v[0] + m[5] * v[1] + m[8] * v[2]
            ]
        },
        [Types.MAT3]: function(a,b) {
            const b0 = b[0], b1 = b[1], b2 = b[2];
            const out0 = a[0] * b0 + a[3] * b1 + a[6] * b2
            const out1 = a[1] * b0 + a[4] * b1 + a[7] * b2
            const out2 = a[2] * b0 + a[5] * b1 + a[8] * b2

            const b3 = b[3], b4 = b[4], b5 = b[5];
            const out3 = a[0] * b3 + a[3] * b4 + a[6] * b5
            const out4 = a[1] * b3 + a[4] * b4 + a[7] * b5
            const out5 = a[2] * b3 + a[5] * b4 + a[8] * b5

            const b6 = b[6], b7 = b[7], b8 = b[8];
            const out6 = a[0] * b6 + a[3] * b7 + a[6] * b8
            const out7 = a[1] * b6 + a[4] * b7 + a[7] * b8
            const out8 = a[2] * b6 + a[5] * b7 + a[8] * b8

            return [
                out0, out1, out2,
                out3, out4, out5,
                out6, out7, out8
            ]
        }
    },

    [RegularOperators.EQL]: {
        [Types.MAT3]: common.arraysEq
    },

    [RegularOperators.NEQL]: {
        [Types.MAT3]: common.arraysEq
    }
})

export const UnaryOperators = Object.freeze({
    [RegularOperators.ADD]: common.arrayUnaryAdd,
    [RegularOperators.SUB]: common.arrayUnarySub,
})

export const ConstructorsTable = Object.freeze([
    {
        args: [
            Types.NUM, Types.NUM, Types.NUM,
            Types.NUM, Types.NUM, Types.NUM,
            Types.NUM, Types.NUM, Types.NUM
        ],
        eval: function(...comps) { return [ ...comps ] }
    }
])