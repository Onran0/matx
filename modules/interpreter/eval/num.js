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
    [RegularOperators.ADD] : {
        [Types.INT]: function(a, b) { return a + b },
        [Types.NUM]: function(a, b) { return a + b },
        [Types.VEC2]: common.arrayAddNumBA,
        [Types.VEC3]: common.arrayAddNumBA,
        [Types.VEC4]: common.arrayAddNumBA,
    },

    [RegularOperators.SUB] : {
        [Types.INT]: function(a, b) { return a - b },
        [Types.NUM]: function(a, b) { return a - b },
        [Types.VEC2]: common.arraySubNumBA,
        [Types.VEC3]: common.arraySubNumBA,
        [Types.VEC4]: common.arraySubNumBA
    },

    [RegularOperators.MOD] : {
        [Types.INT]: function(a, b) { return a % b },
        [Types.NUM]: function(a, b) { return a % b }
    },

    [RegularOperators.MUL] : {
        [Types.INT]: function(a, b) { return a * b },
        [Types.NUM]: function(a, b) { return a * b },
        [Types.VEC2]: common.arrayMulNumBA,
        [Types.VEC3]: common.arrayMulNumBA,
        [Types.VEC4]: common.arrayMulNumBA,
        [Types.QUAT]: common.arrayMulNumBA,
        [Types.MAT3]: common.arrayMulNumBA,
        [Types.MAT4]: common.arrayMulNumBA
    },

    [RegularOperators.DIV] : {
        [Types.INT]: function(a, b) { return a / b },
        [Types.NUM]: function(a, b) { return a / b },
        [Types.VEC2]: common.arrayDivNumBA,
        [Types.VEC3]: common.arrayDivNumBA,
        [Types.VEC4]: common.arrayDivNumBA,
        [Types.QUAT]: common.arrayDivNumBA,
        [Types.MAT3]: common.arrayDivNumBA,
        [Types.MAT4]: common.arrayDivNumBA
    },

    [RegularOperators.INT_DIV] : {
        [Types.INT]: function(a, b) { return Math.trunc(a / b) },
        [Types.NUM]: function(a, b) { return Math.trunc(a / b) },
        [Types.VEC2]: common.arrayIntDivNumBA,
        [Types.VEC3]: common.arrayIntDivNumBA,
        [Types.VEC4]: common.arrayIntDivNumBA,
        [Types.QUAT]: common.arrayIntDivNumBA,
        [Types.MAT3]: common.arrayIntDivNumBA,
        [Types.MAT4]: common.arrayIntDivNumBA
    },

    [RegularOperators.POW] : {
        [Types.INT]: function(a, b) { return a ** b },
        [Types.NUM]: function(a, b) { return a ** b }
    },

    [RegularOperators.EQL]: {
        [Types.INT]: function(a, b) { return a === b },
        [Types.NUM]: function(a, b) { return a === b }
    },

    [RegularOperators.NEQL]: {
        [Types.INT]: function(a, b) { return a !== b },
        [Types.NUM]: function(a, b) { return a !== b }
    },

    [RegularOperators.GRTR]: {
        [Types.INT]: function(a, b) { return a > b },
        [Types.NUM]: function(a, b) { return a > b }
    },

    [RegularOperators.LESS]: {
        [Types.INT]: function(a, b) { return a < b },
        [Types.NUM]: function(a, b) { return a < b }
    },

    [RegularOperators.GRTR_OR_EQL]: {
        [Types.INT]: function(a, b) { return a >= b },
        [Types.NUM]: function(a, b) { return a >= b }
    },

    [RegularOperators.LESS_OR_EQL]: {
        [Types.INT]: function(a, b) { return a <= b },
        [Types.NUM]: function(a, b) { return a <= b }
    }
})

export const UnaryTable = Object.freeze({
    [RegularOperators.ADD]: function(a) { return a },
    [RegularOperators.SUB]: function(a) { return -a },
    [RegularOperators.INCREMENT]: function(a) { return a + 1 },
    [RegularOperators.DECREMENT]: function(a) { return a - 1 }
})

export const ConstructorsTable = Object.freeze([
    {
        args: [Types.NUM],
        eval: function(a) { return a }
    },
    {
        args: [Types.BOOL],
        eval: function(a) { return a ? 1 : 0 }
    }
])