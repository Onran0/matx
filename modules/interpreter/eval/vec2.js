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
        [Types.VEC2]: common.arrayAddArray
    },

    [RegularOperators.SUB]: {
        [Types.INT]: common.arraySubNum,
        [Types.NUM]: common.arraySubNum,
        [Types.VEC2]: common.arraySubArray
    },

    [RegularOperators.MUL]: {
        [Types.INT]: common.arrayMulNum,
        [Types.NUM]: common.arrayMulNum,
        [Types.VEC2]: common.arrayMulArray
    },

    [RegularOperators.DIV]: {
        [Types.INT]: common.arrayDivNum,
        [Types.NUM]: common.arrayDivNum,
        [Types.VEC2]: common.arrayDivArray
    },

    [RegularOperators.INT_DIV]: {
        [Types.INT]: common.arrayIntDivNum,
        [Types.NUM]: common.arrayIntDivNum,
        [Types.VEC2]: common.arrayIntDivArray
    },

    [RegularOperators.EQL]: {
        [Types.VEC2]: common.arraysEq
    },

    [RegularOperators.NEQL]: {
        [Types.VEC2]: common.arraysNeq
    }
})

export const UnaryOperators = Object.freeze({
    [RegularOperators.ADD]: common.arrayUnaryAdd,
    [RegularOperators.SUB]: common.arrayUnarySub,
})

export const ConstructorsTable = Object.freeze([
    {
        args: [Types.NUM, Types.NUM],
        eval: function(x, y) { return [ x, y ] }
    },
    {
        args: [Types.VEC2],
        eval: function(a) { return [...a] }
    }
])