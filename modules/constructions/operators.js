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

import {Token} from "../parse/lexer.js";

export const RegularOperators = Object.freeze({
    // arithmetic
    ADD: "+",
    SUB: "-",
    MOD: "%",
    MUL: "*",
    DIV: "/",
    INT_DIV: "//",
    POW: "**",

    // bitwise
    XOR: "^",
    OR: "|",
    AND: "&",
    NOT: "~",

    LSHIFT: "<<",
    RSHIFT: ">>",

    // unary
    INCREMENT: "++",
    DECREMENT: "--",

    // logic
    EQL: "==",
    NEQL: "!=",
    GRTR: ">",
    LESS: "<",
    GRTR_OR_EQL: ">=",
    LESS_OR_EQL: "<=",
    LOGIC_AND: "&&",
    LOGIC_OR: "||",
    LOGIC_NOT: "!",
})

export const PossibleUnaryOperators = Object.freeze([
    RegularOperators.ADD,
    RegularOperators.SUB,
    RegularOperators.NOT,
    RegularOperators.LOGIC_NOT,
    RegularOperators.INCREMENT,
    RegularOperators.DECREMENT
])

export const AssignOperators = Object.freeze({
    ASSIGN: "=",

    ASSIGN_ADD: "+=",
    ASSIGN_SUB: "-=",
    ASSIGN_MOD: "%=",
    ASSIGN_MUL: "*=",
    ASSIGN_DIV: "/=",
    ASSIGN_INT_DIV: "//=",
    ASSIGN_POW: "**=",

    ASSIGN_XOR: "^=",
    ASSIGN_OR: "|=",
    ASSIGN_AND: "&=",
    ASSIGN_LSHIFT: "<<=",
    ASSIGN_RSHIFT: ">>=",

    ASSIGN_LOGIC_AND: "&&=",
    ASSIGN_LOGIC_OR: "||="
})

const AssignOperatorToRegularTable = Object.freeze({
    [AssignOperators.ASSIGN]: "",

    [AssignOperators.ASSIGN_ADD]: RegularOperators.ADD,
    [AssignOperators.ASSIGN_SUB]: RegularOperators.SUB,
    [AssignOperators.ASSIGN_MOD]: RegularOperators.MOD,
    [AssignOperators.ASSIGN_MUL]: RegularOperators.MUL,
    [AssignOperators.ASSIGN_DIV]: RegularOperators.DIV,
    [AssignOperators.ASSIGN_INT_DIV]: RegularOperators.INT_DIV,
    [AssignOperators.ASSIGN_POW]: RegularOperators.POW,

    [AssignOperators.ASSIGN_XOR]: RegularOperators.XOR,
    [AssignOperators.ASSIGN_OR]: RegularOperators.OR,
    [AssignOperators.ASSIGN_AND]: RegularOperators.AND,
    [AssignOperators.ASSIGN_LSHIFT]: RegularOperators.LSHIFT,
    [AssignOperators.ASSIGN_RSHIFT]: RegularOperators.RSHIFT,

    [AssignOperators.ASSIGN_LOGIC_AND]: RegularOperators.LOGIC_AND,
    [AssignOperators.ASSIGN_LOGIC_OR]: RegularOperators.OR,
})

export const OperatorsCharacters = ":,+-*/><!=|&^~%()[]{}"

export function convertAssignToRegular(assignOp) {
    return AssignOperatorToRegularTable[assignOp]
}

const AllOperators = Object.freeze([
    ...Object.values(RegularOperators),
    ...Object.values(AssignOperators)
])

export function isOperator(val) {
    return AllOperators.includes(val)
}