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

export const BinaryOperators = Object.freeze({
    [RegularOperators.ADD]: {
        [Types.INT]: common.arrayAddNum,
        [Types.NUM]: common.arrayAddNum,
        [Types.VEC3]: common.arrayAddArray
    },

    [RegularOperators.SUB]: {
        [Types.INT]: common.arraySubNum,
        [Types.NUM]: common.arraySubNum,
        [Types.VEC3]: common.arraySubArray
    },

    [RegularOperators.MUL]: {
        [Types.INT]: common.arrayMulNum,
        [Types.NUM]: common.arrayMulNum,
        [Types.VEC3]: common.arrayMulArray,
        [Types.MAT3]: function(v, m) {
            return [
                v[0] * m[0] + v[1] * m[1] + v[2] * m[2],
                v[0] * m[3] + v[1] * m[4] + v[2] * m[5],
                v[0] * m[6] + v[1] * m[7] + v[2] * m[8]
            ]
        }
    },

    [RegularOperators.DIV]: {
        [Types.INT]: common.arrayDivNum,
        [Types.NUM]: common.arrayDivNum,
        [Types.VEC3]: common.arrayDivArray
    },

    [RegularOperators.INT_DIV]: {
        [Types.INT]: common.arrayIntDivNum,
        [Types.NUM]: common.arrayIntDivNum,
        [Types.VEC3]: common.arrayIntDivArray
    },

    [RegularOperators.EQL]: {
        [Types.VEC3]: common.arraysEq
    },

    [RegularOperators.NEQL]: {
        [Types.VEC3]: common.arraysNeq
    }
})

export const UnaryOperators = Object.freeze({
    [RegularOperators.ADD]: common.arrayUnaryAdd,
    [RegularOperators.SUB]: common.arrayUnarySub,
})

export const ConstructorsTable = Object.freeze([
    {
        args: [Types.NUM, Types.NUM, Types.NUM],
        eval: function(x, y, z) { return [ x, y, z ] }
    },
    {
        args: [Types.VEC2, Types.NUM],
        eval: function(xy, z) { return [...xy, z ] }
    },
    {
        args: [Types.VEC3],
        eval: function(a) { return [...a] }
    }
])