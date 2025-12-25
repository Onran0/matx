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
        [Types.VEC4]: common.arrayAddArray
    },

    [RegularOperators.SUB]: {
        [Types.INT]: common.arraySubNum,
        [Types.NUM]: common.arraySubNum,
        [Types.VEC4]: common.arraySubArray
    },

    [RegularOperators.MUL]: {
        [Types.INT]: common.arrayMulNum,
        [Types.NUM]: common.arrayMulNum,
        [Types.VEC4]: common.arrayMulArray,
        [Types.MAT4]: function(v, m) {
            return [
                v[0] * m[0] + v[1] * m[1] + v[2] * m[2] + v[3] * m[3],
                v[0] * m[4] + v[1] * m[5] + v[2] * m[6] + v[3] * m[7],
                v[0] * m[8] + v[1] * m[9] + v[2] * m[10] + v[3] * m[11],
                v[0] * m[12] + v[1] * m[13] + v[2] * m[14] + v[3] * m[15]
            ]
        }
    },

    [RegularOperators.DIV]: {
        [Types.INT]: common.arrayDivNum,
        [Types.NUM]: common.arrayDivNum,
        [Types.VEC4]: common.arrayDivArray
    },

    [RegularOperators.INT_DIV]: {
        [Types.INT]: common.arrayIntDivNum,
        [Types.NUM]: common.arrayIntDivNum,
        [Types.VEC4]: common.arrayIntDivArray
    },

    [RegularOperators.EQL]: {
        [Types.VEC4]: common.arraysEq
    },

    [RegularOperators.NEQL]: {
        [Types.VEC4]: common.arraysNeq
    }
})

export const UnaryOperators = Object.freeze({
    [RegularOperators.ADD]: common.arrayUnaryAdd,
    [RegularOperators.SUB]: common.arrayUnarySub,
})

export const ConstructorsTable = Object.freeze([
    {
        args: [Types.NUM, Types.NUM, Types.NUM, Types.NUM],
        eval: function(x, y, z, w) { return [ x, y, z, w ] }
    },
    {
        args: [Types.VEC2, Types.NUM, Types.NUM],
        eval: function(xy, z, w) { return [...xy, z, w ] }
    },
    {
        args: [Types.VEC3, Types.NUM],
        eval: function(xyz, w) { return [...xyz, w ] }
    },
    {
        args: [Types.VEC4],
        eval: function(a) { return [...a] }
    }
])