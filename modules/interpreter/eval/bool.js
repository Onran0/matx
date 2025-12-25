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

export const BinaryTable = Object.freeze({
    [RegularOperators.EQL]: {
        [Types.BOOL]: function(a, b) { return a === b }
    },

    [RegularOperators.NEQL]: {
        [Types.BOOL]: function(a, b) { return a !== b }
    },

    [RegularOperators.LOGIC_AND]: {
        [Types.BOOL]: function(a, b) { return a && b }
    },

    [RegularOperators.LOGIC_OR]: {
        [Types.BOOL]: function(a, b) { return a || b }
    }
})

export const UnaryTable = Object.freeze({
    [RegularOperators.LOGIC_NOT]: function(a) { return !a }
})

export const ConstructorsTable = Object.freeze([
    {
        args: [Types.INT],
        eval: function(a) { return a === 1 }
    },
    {
        args: [Types.NUM],
        eval: function(a) { return a === 1 }
    }
])