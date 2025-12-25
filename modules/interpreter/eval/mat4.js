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
        [Types.MAT4]: common.arrayAddArray
    },

    [RegularOperators.SUB]: {
        [Types.MAT4]: common.arraySubArray
    },

    [RegularOperators.MUL]: {
        [Types.INT]: common.arrayMulNum,
        [Types.NUM]: common.arrayMulNum,
        [Types.VEC4]: function(m,v) {
            return [
                m[0] * v[0] + m[4] * v[1] + m[8] * v[2] + m[12] * v[3],
                m[1] * v[0] + m[5] * v[1] + m[9] * v[2] + m[13] * v[3],
                m[2] * v[0] + m[6] * v[1] + m[10] * v[2] + m[14] * v[3],
                m[3] * v[0] + m[7] * v[1] + m[11] * v[2] + m[15] * v[3]
            ]
        },
        [Types.MAT4]: function(a, b) {
            const b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
            const b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7];
            const b8 = b[8], b9 = b[9], b10 = b[10], b11 = b[11];
            const b12 = b[12], b13 = b[13], b14 = b[14], b15 = b[15];

            const out = new Array(16);

            out[0] = a[0] * b0 + a[4] * b1 + a[8] * b2 + a[12] * b3;
            out[1] = a[1] * b0 + a[5] * b1 + a[9] * b2 + a[13] * b3;
            out[2] = a[2] * b0 + a[6] * b1 + a[10] * b2 + a[14] * b3;
            out[3] = a[3] * b0 + a[7] * b1 + a[11] * b2 + a[15] * b3;

            out[4] = a[0] * b4 + a[4] * b5 + a[8] * b6 + a[12] * b7;
            out[5] = a[1] * b4 + a[5] * b5 + a[9] * b6 + a[13] * b7;
            out[6] = a[2] * b4 + a[6] * b5 + a[10] * b6 + a[14] * b7;
            out[7] = a[3] * b4 + a[7] * b5 + a[11] * b6 + a[15] * b7;

            out[8] = a[0] * b8 + a[4] * b9 + a[8] * b10 + a[12] * b11;
            out[9] = a[1] * b8 + a[5] * b9 + a[9] * b10 + a[13] * b11;
            out[10] = a[2] * b8 + a[6] * b9 + a[10] * b10 + a[14] * b11;
            out[11] = a[3] * b8 + a[7] * b9 + a[11] * b10 + a[15] * b11;

            out[12] = a[0] * b12 + a[4] * b13 + a[8] * b14 + a[12] * b15;
            out[13] = a[1] * b12 + a[5] * b13 + a[9] * b14 + a[13] * b15;
            out[14] = a[2] * b12 + a[6] * b13 + a[10] * b14 + a[14] * b15;
            out[15] = a[3] * b12 + a[7] * b13 + a[11] * b14 + a[15] * b15;

            return out;
        }
    },

    [RegularOperators.EQL]: {
        [Types.MAT4]: common.arraysEq
    },

    [RegularOperators.NEQL]: {
        [Types.MAT4]: common.arraysEq
    }
})

export const UnaryOperators = Object.freeze({
    [RegularOperators.ADD]: common.arrayUnaryAdd,
    [RegularOperators.SUB]: common.arrayUnarySub,
})

export const ConstructorsTable = Object.freeze([
    {
        args: [
            Types.NUM, Types.NUM, Types.NUM, Types.NUM,
            Types.NUM, Types.NUM, Types.NUM, Types.NUM,
            Types.NUM, Types.NUM, Types.NUM, Types.NUM,
            Types.NUM, Types.NUM, Types.NUM, Types.NUM
        ],
        eval: function(...comps) { return [ ...comps ] }
    }
])