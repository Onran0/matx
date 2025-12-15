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

import {Token} from "../parse/lexer.js"

export const OutputTypeTable = Object.freeze({
    [Token.TYPE_INT] : {
        [Token.ADD] : {
            [Token.TYPE_INT]: Token.TYPE_INT,
            [Token.TYPE_FLOAT]: Token.TYPE_FLOAT,
            [Token.TYPE_VEC2]: Token.TYPE_VEC2,
            [Token.TYPE_VEC3]: Token.TYPE_VEC3,
            [Token.TYPE_VEC4]: Token.TYPE_VEC4
        },

        [Token.SUB] : {
            [Token.TYPE_INT]: Token.TYPE_INT,
            [Token.TYPE_FLOAT]: Token.TYPE_FLOAT,
            [Token.TYPE_VEC2]: Token.TYPE_VEC2,
            [Token.TYPE_VEC3]: Token.TYPE_VEC3,
            [Token.TYPE_VEC4]: Token.TYPE_VEC4
        },

        [Token.MOD] : {
            [Token.TYPE_INT]: Token.TYPE_INT,
            [Token.TYPE_FLOAT]: Token.TYPE_FLOAT
        },

        [Token.MUL] : {
            [Token.TYPE_INT]: Token.TYPE_INT,
            [Token.TYPE_FLOAT]: Token.TYPE_FLOAT,
            [Token.TYPE_VEC2]: Token.TYPE_VEC2,
            [Token.TYPE_VEC3]: Token.TYPE_VEC3,
            [Token.TYPE_VEC4]: Token.TYPE_VEC4,
            [Token.TYPE_QUAT]: Token.TYPE_QUAT,
            [Token.TYPE_MAT3]: Token.TYPE_MAT3,
            [Token.TYPE_MAT4]: Token.TYPE_MAT4
        },

        [Token.DIV] : {
            [Token.TYPE_INT]: Token.TYPE_INT,
            [Token.TYPE_FLOAT]: Token.TYPE_FLOAT,
            [Token.TYPE_VEC2]: Token.TYPE_VEC2,
            [Token.TYPE_VEC3]: Token.TYPE_VEC3,
            [Token.TYPE_VEC4]: Token.TYPE_VEC4,
            [Token.TYPE_QUAT]: Token.TYPE_QUAT,
            [Token.TYPE_MAT3]: Token.TYPE_MAT3,
            [Token.TYPE_MAT4]: Token.TYPE_MAT4
        },

        [Token.INT_DIV] : {
            [Token.TYPE_INT]: Token.TYPE_INT,
            [Token.TYPE_FLOAT]: Token.TYPE_INT,
            [Token.TYPE_VEC2]: Token.TYPE_VEC2,
            [Token.TYPE_VEC3]: Token.TYPE_VEC3,
            [Token.TYPE_VEC4]: Token.TYPE_VEC4,
            [Token.TYPE_QUAT]: Token.TYPE_QUAT,
            [Token.TYPE_MAT3]: Token.TYPE_MAT3,
            [Token.TYPE_MAT4]: Token.TYPE_MAT4
        },

        [Token.POW] : {
            [Token.TYPE_INT]: Token.TYPE_INT,
            [Token.TYPE_FLOAT]: Token.TYPE_FLOAT
        },

        [Token.XOR] : {
            [Token.TYPE_INT]: Token.TYPE_INT
        },

        [Token.OR] : {
            [Token.TYPE_INT]: Token.TYPE_INT
        },

        [Token.AND] : {
            [Token.TYPE_INT]: Token.TYPE_INT
        },

        [Token.LSHIFT] : {
            [Token.TYPE_INT]: Token.TYPE_INT
        },

        [Token.RSHIFT] : {
            [Token.TYPE_INT]: Token.TYPE_INT
        },

        UNARY: [
            Token.ADD,
            Token.SUB,
            Token.NOT
        ]
    },

    [Token.TYPE_FLOAT]: {
        [Token.ADD] : {
            [Token.TYPE_INT]: Token.TYPE_FLOAT,
            [Token.TYPE_FLOAT]: Token.TYPE_FLOAT,
            [Token.TYPE_VEC2]: Token.TYPE_VEC2,
            [Token.TYPE_VEC3]: Token.TYPE_VEC3,
            [Token.TYPE_VEC4]: Token.TYPE_VEC4
        },

        [Token.SUB] : {
            [Token.TYPE_INT]: Token.TYPE_FLOAT,
            [Token.TYPE_FLOAT]: Token.TYPE_FLOAT,
            [Token.TYPE_VEC2]: Token.TYPE_VEC2,
            [Token.TYPE_VEC3]: Token.TYPE_VEC3,
            [Token.TYPE_VEC4]: Token.TYPE_VEC4
        },

        [Token.MOD] : {
            [Token.TYPE_INT]: Token.TYPE_FLOAT,
            [Token.TYPE_FLOAT]: Token.TYPE_FLOAT
        },

        [Token.MUL] : {
            [Token.TYPE_INT]: Token.TYPE_FLOAT,
            [Token.TYPE_FLOAT]: Token.TYPE_FLOAT,
            [Token.TYPE_VEC2]: Token.TYPE_VEC2,
            [Token.TYPE_VEC3]: Token.TYPE_VEC3,
            [Token.TYPE_VEC4]: Token.TYPE_VEC4,
            [Token.TYPE_QUAT]: Token.TYPE_QUAT,
            [Token.TYPE_MAT3]: Token.TYPE_MAT3,
            [Token.TYPE_MAT4]: Token.TYPE_MAT4
        },

        [Token.DIV] : {
            [Token.TYPE_INT]: Token.TYPE_FLOAT,
            [Token.TYPE_FLOAT]: Token.TYPE_FLOAT,
            [Token.TYPE_VEC2]: Token.TYPE_VEC2,
            [Token.TYPE_VEC3]: Token.TYPE_VEC3,
            [Token.TYPE_VEC4]: Token.TYPE_VEC4,
            [Token.TYPE_QUAT]: Token.TYPE_QUAT,
            [Token.TYPE_MAT3]: Token.TYPE_MAT3,
            [Token.TYPE_MAT4]: Token.TYPE_MAT4
        },

        [Token.INT_DIV] : {
            [Token.TYPE_INT]: Token.TYPE_INT,
            [Token.TYPE_FLOAT]: Token.TYPE_INT,
            [Token.TYPE_VEC2]: Token.TYPE_VEC2,
            [Token.TYPE_VEC3]: Token.TYPE_VEC3,
            [Token.TYPE_VEC4]: Token.TYPE_VEC4,
            [Token.TYPE_QUAT]: Token.TYPE_QUAT,
            [Token.TYPE_MAT3]: Token.TYPE_MAT3,
            [Token.TYPE_MAT4]: Token.TYPE_MAT4
        },

        [Token.POW] : {
            [Token.TYPE_INT]: Token.TYPE_FLOAT,
            [Token.TYPE_FLOAT]: Token.TYPE_FLOAT
        },

        UNARY: [
            Token.ADD,
            Token.SUB
        ]
    },

    [Token.TYPE_BOOL]: {
        [Token.EQL]: {
            [Token.TYPE_BOOL]: Token.TYPE_BOOL
        },

        [Token.NEQL]: {
            [Token.TYPE_BOOL]: Token.TYPE_BOOL
        },

        [Token.GRTR]: {
            [Token.TYPE_BOOL]: Token.TYPE_BOOL
        },

        [Token.LESS]: {
            [Token.TYPE_BOOL]: Token.TYPE_BOOL
        },

        [Token.GRTR_OR_EQL]: {
            [Token.TYPE_BOOL]: Token.TYPE_BOOL
        },

        [Token.LESS_OR_EQL]: {
            [Token.TYPE_BOOL]: Token.TYPE_BOOL
        },

        [Token.LOGIC_AND]: {
            [Token.TYPE_BOOL]: Token.TYPE_BOOL
        },

        [Token.LOGIC_OR]: {
            [Token.TYPE_BOOL]: Token.TYPE_BOOL
        },

        UNARY: [
            Token.LOGIC_NOT
        ]
    },

    [Token.TYPE_VEC2]: {
        [Token.ADD]: {
            [Token.TYPE_INT]: Token.TYPE_VEC2,
            [Token.TYPE_FLOAT]: Token.TYPE_VEC2,
            [Token.TYPE_VEC2]: Token.TYPE_VEC2,
            [Token.TYPE_VEC3]: Token.TYPE_VEC3,
            [Token.TYPE_VEC4]: Token.TYPE_VEC4
        },

        [Token.SUB]: {
            [Token.TYPE_INT]: Token.TYPE_VEC2,
            [Token.TYPE_FLOAT]: Token.TYPE_VEC2,
            [Token.TYPE_VEC2]: Token.TYPE_VEC2,
            [Token.TYPE_VEC3]: Token.TYPE_VEC3,
            [Token.TYPE_VEC4]: Token.TYPE_VEC4
        },

        [Token.MUL]: {
            [Token.TYPE_INT]: Token.TYPE_VEC2,
            [Token.TYPE_FLOAT]: Token.TYPE_VEC2,
            [Token.TYPE_VEC2]: Token.TYPE_VEC2,
            [Token.TYPE_VEC3]: Token.TYPE_VEC3,
            [Token.TYPE_VEC4]: Token.TYPE_VEC4
        },

        [Token.DIV]: {
            [Token.TYPE_INT]: Token.TYPE_VEC2,
            [Token.TYPE_FLOAT]: Token.TYPE_VEC2,
            [Token.TYPE_VEC2]: Token.TYPE_VEC2,
            [Token.TYPE_VEC3]: Token.TYPE_VEC3,
            [Token.TYPE_VEC4]: Token.TYPE_VEC4
        },

        [Token.INT_DIV]: {
            [Token.TYPE_INT]: Token.TYPE_VEC2,
            [Token.TYPE_FLOAT]: Token.TYPE_VEC2,
            [Token.TYPE_VEC2]: Token.TYPE_VEC2,
            [Token.TYPE_VEC3]: Token.TYPE_VEC3,
            [Token.TYPE_VEC4]: Token.TYPE_VEC4
        },

        UNARY: [
            Token.ADD,
            Token.SUB
        ]
    },

    [Token.TYPE_VEC3]: {
        [Token.ADD]: {
            [Token.TYPE_INT]: Token.TYPE_VEC3,
            [Token.TYPE_FLOAT]: Token.TYPE_VEC3,
            [Token.TYPE_VEC2]: Token.TYPE_VEC3,
            [Token.TYPE_VEC3]: Token.TYPE_VEC3,
            [Token.TYPE_VEC4]: Token.TYPE_VEC4
        },

        [Token.SUB]: {
            [Token.TYPE_INT]: Token.TYPE_VEC3,
            [Token.TYPE_FLOAT]: Token.TYPE_VEC3,
            [Token.TYPE_VEC2]: Token.TYPE_VEC3,
            [Token.TYPE_VEC3]: Token.TYPE_VEC3,
            [Token.TYPE_VEC4]: Token.TYPE_VEC4
        },

        [Token.MUL]: {
            [Token.TYPE_INT]: Token.TYPE_VEC3,
            [Token.TYPE_FLOAT]: Token.TYPE_VEC3,
            [Token.TYPE_VEC2]: Token.TYPE_VEC3,
            [Token.TYPE_VEC3]: Token.TYPE_VEC3,
            [Token.TYPE_VEC4]: Token.TYPE_VEC4
        },

        [Token.DIV]: {
            [Token.TYPE_INT]: Token.TYPE_VEC3,
            [Token.TYPE_FLOAT]: Token.TYPE_VEC3,
            [Token.TYPE_VEC2]: Token.TYPE_VEC3,
            [Token.TYPE_VEC3]: Token.TYPE_VEC3,
            [Token.TYPE_VEC4]: Token.TYPE_VEC4
        },

        [Token.INT_DIV]: {
            [Token.TYPE_INT]: Token.TYPE_VEC3,
            [Token.TYPE_FLOAT]: Token.TYPE_VEC3,
            [Token.TYPE_VEC2]: Token.TYPE_VEC3,
            [Token.TYPE_VEC3]: Token.TYPE_VEC3,
            [Token.TYPE_VEC4]: Token.TYPE_VEC4
        },

        UNARY: [
            Token.ADD,
            Token.SUB
        ]
    },

    [Token.TYPE_VEC4]: {
        [Token.ADD]: {
            [Token.TYPE_INT]: Token.TYPE_VEC4,
            [Token.TYPE_FLOAT]: Token.TYPE_VEC4,
            [Token.TYPE_VEC2]: Token.TYPE_VEC4,
            [Token.TYPE_VEC3]: Token.TYPE_VEC4,
            [Token.TYPE_VEC4]: Token.TYPE_VEC4
        },

        [Token.SUB]: {
            [Token.TYPE_INT]: Token.TYPE_VEC4,
            [Token.TYPE_FLOAT]: Token.TYPE_VEC4,
            [Token.TYPE_VEC2]: Token.TYPE_VEC4,
            [Token.TYPE_VEC3]: Token.TYPE_VEC4,
            [Token.TYPE_VEC4]: Token.TYPE_VEC4
        },

        [Token.MUL]: {
            [Token.TYPE_INT]: Token.TYPE_VEC4,
            [Token.TYPE_FLOAT]: Token.TYPE_VEC4,
            [Token.TYPE_VEC2]: Token.TYPE_VEC4,
            [Token.TYPE_VEC3]: Token.TYPE_VEC4,
            [Token.TYPE_VEC4]: Token.TYPE_VEC4,
            [Token.TYPE_MAT4]: Token.TYPE_VEC4
        },

        [Token.DIV]: {
            [Token.TYPE_INT]: Token.TYPE_VEC4,
            [Token.TYPE_FLOAT]: Token.TYPE_VEC4,
            [Token.TYPE_VEC2]: Token.TYPE_VEC4,
            [Token.TYPE_VEC3]: Token.TYPE_VEC4,
            [Token.TYPE_VEC4]: Token.TYPE_VEC4
        },

        [Token.INT_DIV]: {
            [Token.TYPE_INT]: Token.TYPE_VEC4,
            [Token.TYPE_FLOAT]: Token.TYPE_VEC4,
            [Token.TYPE_VEC2]: Token.TYPE_VEC4,
            [Token.TYPE_VEC3]: Token.TYPE_VEC4,
            [Token.TYPE_VEC4]: Token.TYPE_VEC4
        },

        UNARY: [
            Token.ADD,
            Token.SUB
        ]
    },

    [Token.TYPE_MAT3]: {
        [Token.ADD]: {
            [Token.TYPE_MAT3]: Token.TYPE_MAT3
        },

        [Token.SUB]: {
            [Token.TYPE_MAT3]: Token.TYPE_MAT3
        },

        [Token.MUL]: {
            [Token.TYPE_INT]: Token.TYPE_MAT3,
            [Token.TYPE_FLOAT]: Token.TYPE_MAT3,
            [Token.TYPE_VEC3]: Token.TYPE_VEC3,
            [Token.TYPE_VEC4]: Token.TYPE_VEC4,
            [Token.TYPE_MAT3]: Token.TYPE_MAT3,
        },

        UNARY: [
            Token.ADD,
            Token.SUB
        ]
    },

    [Token.TYPE_MAT4]: {
        [Token.ADD]: {
            [Token.TYPE_MAT4]: Token.TYPE_MAT4
        },

        [Token.SUB]: {
            [Token.TYPE_MAT4]: Token.TYPE_MAT4
        },

        [Token.MUL]: {
            [Token.TYPE_INT]: Token.TYPE_MAT4,
            [Token.TYPE_FLOAT]: Token.TYPE_MAT4,
            [Token.TYPE_VEC3]: Token.TYPE_VEC4,
            [Token.TYPE_VEC4]: Token.TYPE_VEC4,
            [Token.TYPE_MAT4]: Token.TYPE_MAT4,
        },

        UNARY: [
            Token.ADD,
            Token.SUB
        ]
    },

    [Token.TYPE_QUAT]: {
        [Token.ADD]: {
            [Token.TYPE_QUAT]: Token.TYPE_QUAT
        },

        [Token.SUB]: {
            [Token.TYPE_QUAT]: Token.TYPE_QUAT
        },

        [Token.MUL]: {
            [Token.TYPE_INT]: Token.TYPE_INT,
            [Token.TYPE_FLOAT]: Token.TYPE_FLOAT,
            [Token.TYPE_QUAT]: Token.TYPE_QUAT,
            [Token.TYPE_VEC3]: Token.TYPE_VEC3
        },

        [Token.DIV]: {
            [Token.TYPE_INT]: Token.TYPE_INT,
            [Token.TYPE_FLOAT]: Token.TYPE_FLOAT,
            [Token.TYPE_QUAT]: Token.TYPE_QUAT
        },

        [Token.POW]: {
            [Token.TYPE_INT]: Token.TYPE_QUAT,
            [Token.TYPE_FLOAT]: Token.TYPE_QUAT
        },

        UNARY: [
            Token.ADD,
            Token.SUB
        ]
    }
})