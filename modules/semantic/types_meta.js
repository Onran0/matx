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

import Types from "../constructions/types.js"
import {RegularOperators} from "../constructions/operators.js"

export const BinaryTable = Object.freeze({
    [Types.INT] : {
        [RegularOperators.ADD] : {
            [Types.INT]: Types.INT,
            [Types.NUM]: Types.NUM,
            [Types.VEC2]: Types.VEC2,
            [Types.VEC3]: Types.VEC3,
            [Types.VEC4]: Types.VEC4
        },

        [RegularOperators.SUB] : {
            [Types.INT]: Types.INT,
            [Types.NUM]: Types.NUM,
            [Types.VEC2]: Types.VEC2,
            [Types.VEC3]: Types.VEC3,
            [Types.VEC4]: Types.VEC4
        },

        [RegularOperators.MOD] : {
            [Types.INT]: Types.INT,
            [Types.NUM]: Types.NUM
        },

        [RegularOperators.MUL] : {
            [Types.INT]: Types.INT,
            [Types.NUM]: Types.NUM,
            [Types.VEC2]: Types.VEC2,
            [Types.VEC3]: Types.VEC3,
            [Types.VEC4]: Types.VEC4,
            [Types.QUAT]: Types.QUAT,
            [Types.MAT3]: Types.MAT3,
            [Types.MAT4]: Types.MAT4
        },

        [RegularOperators.DIV] : {
            [Types.INT]: Types.INT,
            [Types.NUM]: Types.NUM,
            [Types.VEC2]: Types.VEC2,
            [Types.VEC3]: Types.VEC3,
            [Types.VEC4]: Types.VEC4,
            [Types.QUAT]: Types.QUAT,
            [Types.MAT3]: Types.MAT3,
            [Types.MAT4]: Types.MAT4
        },

        [RegularOperators.INT_DIV] : {
            [Types.INT]: Types.INT,
            [Types.NUM]: Types.INT,
            [Types.VEC2]: Types.VEC2,
            [Types.VEC3]: Types.VEC3,
            [Types.VEC4]: Types.VEC4,
            [Types.QUAT]: Types.QUAT,
            [Types.MAT3]: Types.MAT3,
            [Types.MAT4]: Types.MAT4
        },

        [RegularOperators.POW] : {
            [Types.INT]: Types.INT,
            [Types.NUM]: Types.NUM
        },

        [RegularOperators.XOR] : {
            [Types.INT]: Types.INT
        },

        [RegularOperators.OR] : {
            [Types.INT]: Types.INT
        },

        [RegularOperators.AND] : {
            [Types.INT]: Types.INT
        },

        [RegularOperators.LSHIFT] : {
            [Types.INT]: Types.INT
        },

        [RegularOperators.RSHIFT] : {
            [Types.INT]: Types.INT
        },

        [RegularOperators.EQL]: {
            [Types.INT]: Types.BOOL,
            [Types.NUM]: Types.BOOL
        },

        [RegularOperators.NEQL]: {
            [Types.INT]: Types.BOOL,
            [Types.NUM]: Types.BOOL
        },

        [RegularOperators.GRTR]: {
            [Types.INT]: Types.BOOL,
            [Types.NUM]: Types.BOOL
        },

        [RegularOperators.LESS]: {
            [Types.INT]: Types.BOOL,
            [Types.NUM]: Types.BOOL
        },

        [RegularOperators.GRTR_OR_EQL]: {
            [Types.INT]: Types.BOOL,
            [Types.NUM]: Types.BOOL
        },

        [RegularOperators.LESS_OR_EQL]: {
            [Types.INT]: Types.BOOL,
            [Types.NUM]: Types.BOOL
        }
    },

    [Types.NUM]: {
        [RegularOperators.ADD] : {
            [Types.INT]: Types.NUM,
            [Types.NUM]: Types.NUM,
            [Types.VEC2]: Types.VEC2,
            [Types.VEC3]: Types.VEC3,
            [Types.VEC4]: Types.VEC4
        },

        [RegularOperators.SUB] : {
            [Types.INT]: Types.NUM,
            [Types.NUM]: Types.NUM,
            [Types.VEC2]: Types.VEC2,
            [Types.VEC3]: Types.VEC3,
            [Types.VEC4]: Types.VEC4
        },

        [RegularOperators.MOD] : {
            [Types.INT]: Types.NUM,
            [Types.NUM]: Types.NUM
        },

        [RegularOperators.MUL] : {
            [Types.INT]: Types.NUM,
            [Types.NUM]: Types.NUM,
            [Types.VEC2]: Types.VEC2,
            [Types.VEC3]: Types.VEC3,
            [Types.VEC4]: Types.VEC4,
            [Types.QUAT]: Types.QUAT,
            [Types.MAT3]: Types.MAT3,
            [Types.MAT4]: Types.MAT4
        },

        [RegularOperators.DIV] : {
            [Types.INT]: Types.NUM,
            [Types.NUM]: Types.NUM,
            [Types.VEC2]: Types.VEC2,
            [Types.VEC3]: Types.VEC3,
            [Types.VEC4]: Types.VEC4,
            [Types.QUAT]: Types.QUAT,
            [Types.MAT3]: Types.MAT3,
            [Types.MAT4]: Types.MAT4
        },

        [RegularOperators.INT_DIV] : {
            [Types.INT]: Types.INT,
            [Types.NUM]: Types.INT,
            [Types.VEC2]: Types.VEC2,
            [Types.VEC3]: Types.VEC3,
            [Types.VEC4]: Types.VEC4,
            [Types.QUAT]: Types.QUAT,
            [Types.MAT3]: Types.MAT3,
            [Types.MAT4]: Types.MAT4
        },

        [RegularOperators.POW] : {
            [Types.INT]: Types.NUM,
            [Types.NUM]: Types.NUM
        },

        [RegularOperators.EQL]: {
            [Types.INT]: Types.BOOL,
            [Types.NUM]: Types.BOOL
        },

        [RegularOperators.NEQL]: {
            [Types.INT]: Types.BOOL,
            [Types.NUM]: Types.BOOL
        },

        [RegularOperators.GRTR]: {
            [Types.INT]: Types.BOOL,
            [Types.NUM]: Types.BOOL
        },

        [RegularOperators.LESS]: {
            [Types.INT]: Types.BOOL,
            [Types.NUM]: Types.BOOL
        },

        [RegularOperators.GRTR_OR_EQL]: {
            [Types.INT]: Types.BOOL,
            [Types.NUM]: Types.BOOL
        },

        [RegularOperators.LESS_OR_EQL]: {
            [Types.INT]: Types.BOOL,
            [Types.NUM]: Types.BOOL
        }
    },

    [Types.BOOL]: {
        [RegularOperators.EQL]: {
            [Types.BOOL]: Types.BOOL
        },

        [RegularOperators.NEQL]: {
            [Types.BOOL]: Types.BOOL
        },

        [RegularOperators.LOGIC_AND]: {
            [Types.BOOL]: Types.BOOL
        },

        [RegularOperators.LOGIC_OR]: {
            [Types.BOOL]: Types.BOOL
        }
    },

    [Types.VEC2]: {
        [RegularOperators.ADD]: {
            [Types.INT]: Types.VEC2,
            [Types.NUM]: Types.VEC2,
            [Types.VEC2]: Types.VEC2
        },

        [RegularOperators.SUB]: {
            [Types.INT]: Types.VEC2,
            [Types.NUM]: Types.VEC2,
            [Types.VEC2]: Types.VEC2
        },

        [RegularOperators.MUL]: {
            [Types.INT]: Types.VEC2,
            [Types.NUM]: Types.VEC2,
            [Types.VEC2]: Types.VEC2
        },

        [RegularOperators.DIV]: {
            [Types.INT]: Types.VEC2,
            [Types.NUM]: Types.VEC2,
            [Types.VEC2]: Types.VEC2
        },

        [RegularOperators.INT_DIV]: {
            [Types.INT]: Types.VEC2,
            [Types.NUM]: Types.VEC2,
            [Types.VEC2]: Types.VEC2
        },

        [RegularOperators.EQL]: {
            [Types.VEC2]: Types.BOOL
        },

        [RegularOperators.NEQL]: {
            [Types.VEC2]: Types.BOOL
        }
    },

    [Types.VEC3]: {
        [RegularOperators.ADD]: {
            [Types.INT]: Types.VEC3,
            [Types.NUM]: Types.VEC3,
            [Types.VEC3]: Types.VEC3
        },

        [RegularOperators.SUB]: {
            [Types.INT]: Types.VEC3,
            [Types.NUM]: Types.VEC3,
            [Types.VEC3]: Types.VEC3
        },

        [RegularOperators.MUL]: {
            [Types.INT]: Types.VEC3,
            [Types.NUM]: Types.VEC3,
            [Types.VEC3]: Types.VEC3,
            [Types.MAT3]: Types.MAT3
        },

        [RegularOperators.DIV]: {
            [Types.INT]: Types.VEC3,
            [Types.NUM]: Types.VEC3,
            [Types.VEC3]: Types.VEC3
        },

        [RegularOperators.INT_DIV]: {
            [Types.INT]: Types.VEC3,
            [Types.NUM]: Types.VEC3,
            [Types.VEC3]: Types.VEC3
        },

        [RegularOperators.EQL]: {
            [Types.VEC3]: Types.BOOL
        },

        [RegularOperators.NEQL]: {
            [Types.VEC3]: Types.BOOL
        }
    },

    [Types.VEC4]: {
        [RegularOperators.ADD]: {
            [Types.INT]: Types.VEC4,
            [Types.NUM]: Types.VEC4,
            [Types.VEC4]: Types.VEC4
        },

        [RegularOperators.SUB]: {
            [Types.INT]: Types.VEC4,
            [Types.NUM]: Types.VEC4,
            [Types.VEC4]: Types.VEC4
        },

        [RegularOperators.MUL]: {
            [Types.INT]: Types.VEC4,
            [Types.NUM]: Types.VEC4,
            [Types.VEC4]: Types.VEC4,
            [Types.MAT4]: Types.VEC4
        },

        [RegularOperators.DIV]: {
            [Types.INT]: Types.VEC4,
            [Types.NUM]: Types.VEC4,
            [Types.VEC4]: Types.VEC4
        },

        [RegularOperators.INT_DIV]: {
            [Types.INT]: Types.VEC4,
            [Types.NUM]: Types.VEC4,
            [Types.VEC4]: Types.VEC4
        },

        [RegularOperators.EQL]: {
            [Types.VEC4]: Types.BOOL
        },

        [RegularOperators.NEQL]: {
            [Types.VEC4]: Types.BOOL
        }
    },

    [Types.MAT3]: {
        [RegularOperators.ADD]: {
            [Types.MAT3]: Types.MAT3
        },

        [RegularOperators.SUB]: {
            [Types.MAT3]: Types.MAT3
        },

        [RegularOperators.MUL]: {
            [Types.INT]: Types.MAT3,
            [Types.NUM]: Types.MAT3,
            [Types.VEC3]: Types.VEC3,
            [Types.MAT3]: Types.MAT3,
        },

        [RegularOperators.EQL]: {
            [Types.MAT3]: Types.BOOL
        },

        [RegularOperators.NEQL]: {
            [Types.MAT3]: Types.BOOL
        }
    },

    [Types.MAT4]: {
        [RegularOperators.ADD]: {
            [Types.MAT4]: Types.MAT4
        },

        [RegularOperators.SUB]: {
            [Types.MAT4]: Types.MAT4
        },

        [RegularOperators.MUL]: {
            [Types.INT]: Types.MAT4,
            [Types.NUM]: Types.MAT4,
            [Types.VEC4]: Types.VEC4,
            [Types.MAT4]: Types.MAT4,
        },

        [RegularOperators.EQL]: {
            [Types.MAT4]: Types.BOOL
        },

        [RegularOperators.NEQL]: {
            [Types.MAT4]: Types.BOOL
        }
    },

    [Types.QUAT]: {
        [RegularOperators.ADD]: {
            [Types.QUAT]: Types.QUAT
        },

        [RegularOperators.SUB]: {
            [Types.QUAT]: Types.QUAT
        },

        [RegularOperators.MUL]: {
            [Types.INT]: Types.INT,
            [Types.NUM]: Types.NUM,
            [Types.QUAT]: Types.QUAT,
            [Types.VEC3]: Types.VEC3
        },

        [RegularOperators.DIV]: {
            [Types.INT]: Types.INT,
            [Types.NUM]: Types.NUM,
            [Types.QUAT]: Types.QUAT
        },

        [RegularOperators.POW]: {
            [Types.INT]: Types.QUAT,
            [Types.NUM]: Types.QUAT
        },

        [RegularOperators.EQL]: {
            [Types.QUAT]: Types.BOOL
        },

        [RegularOperators.NEQL]: {
            [Types.QUAT]: Types.BOOL
        }
    }
})

export const UnaryTable = Object.freeze({
    [Types.INT]: [
        RegularOperators.ADD,
        RegularOperators.SUB,
        RegularOperators.NOT
    ],

    [Types.NUM]: [
        RegularOperators.ADD,
        RegularOperators.SUB
    ],

    [Types.BOOL]: [
        RegularOperators.LOGIC_NOT
    ],

    [Types.VEC2]: [
        RegularOperators.ADD,
        RegularOperators.SUB
    ],

    [Types.VEC3]: [
        RegularOperators.ADD,
        RegularOperators.SUB
    ],

    [Types.VEC4]: [
        RegularOperators.ADD,
        RegularOperators.SUB
    ],

    [Types.QUAT]: [
        RegularOperators.ADD,
        RegularOperators.SUB
    ],

    [Types.MAT3]: [
        RegularOperators.ADD,
        RegularOperators.SUB
    ],

    [Types.MAT4]: [
        RegularOperators.ADD,
        RegularOperators.SUB
    ]
})

export const ConstructorsTable = Object.freeze({
    [Types.INT]: [
        [ Types.NUM ],
        [ Types.BOOL ]
    ],

    [Types.NUM]: [
        [ Types.INT ],
        [ Types.BOOL ]
    ],

    [Types.BOOL]: [
        [ Types.INT ],
        [ Types.NUM ]
    ],

    [Types.VEC2]: [
        [ Types.NUM, Types.NUM ],
        [ Types.VEC2 ]
    ],

    [Types.VEC3]: [
        [ Types.NUM, Types.NUM, Types.NUM ],
        [ Types.VEC2, Types.NUM ],
        [ Types.VEC3 ]
    ],

    [Types.VEC4]: [
        [ Types.NUM, Types.NUM, Types.NUM, Types.NUM ],
        [ Types.VEC2, Types.NUM, Types.NUM ],
        [ Types.VEC3, Types.NUM ],
        [ Types.VEC4 ]
    ],

    [Types.QUAT]: [
        [ Types.NUM, Types.NUM, Types.NUM, Types.NUM ],
        [ Types.NUM, Types.VEC3 ],
        [ Types.QUAT ]
    ],

    [Types.MAT3]: [
        [
            Types.NUM, Types.NUM, Types.NUM,
            Types.NUM, Types.NUM, Types.NUM,
            Types.NUM, Types.NUM, Types.NUM
        ]
    ],

    [Types.MAT4]: [
        [
            Types.NUM, Types.NUM, Types.NUM, Types.NUM,
            Types.NUM, Types.NUM, Types.NUM, Types.NUM,
            Types.NUM, Types.NUM, Types.NUM, Types.NUM,
            Types.NUM, Types.NUM, Types.NUM, Types.NUM
        ]
    ]
})

export const IndexableTypesTable = Object.freeze({
    [Types.VEC2]: Types.NUM,
    [Types.VEC3]: Types.NUM,
    [Types.VEC4]: Types.NUM,
    [Types.QUAT]: Types.NUM,
    [Types.MAT3]: Types.NUM,
    [Types.MAT4]: Types.NUM
})

export const IndexableTypesSize = Object.freeze({
    [Types.VEC2]: 2,
    [Types.VEC3]: 3,
    [Types.VEC4]: 4,
    [Types.QUAT]: 4,
    [Types.MAT3]: 9,
    [Types.MAT4]: 16
})