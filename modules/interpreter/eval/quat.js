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

function invQuat(q) {
    const x = q[0], y = q[1], z = q[2], w = q[3];
    const dot = x*x + y*y + z*z + w*w

    if (dot === 0) return [0, 0, 0, 0]

    const invDot = 1.0 / dot

    return [-x * invDot, -y * invDot, -z * invDot, w * invDot]
}

function mulQuat(p, q) {
    const px = p[0], py = p[1], pz = p[2], pw = p[3]
    const qx = q[0], qy = q[1], qz = q[2], qw = q[3]

    return [
        px * qw + pw * qx + py * qz - pz * qy,
        py * qw + pw * qy + pz * qx - px * qz,
        pz * qw + pw * qz + px * qy - py * qx,
        pw * qw - px * qx - py * qy - pz * qz
    ]
}

export const BinaryOperators = Object.freeze({
    [RegularOperators.ADD]: {
        [Types.QUAT]: common.arrayAddArray
    },

    [RegularOperators.SUB]: {
        [Types.QUAT]: common.arraySubArray
    },

    [RegularOperators.MUL]: {
        [Types.INT]: Types.INT,
        [Types.NUM]: Types.NUM,
        [Types.QUAT]: mulQuat,
        [Types.VEC3]: function(q, v) {
            const qx = q[0], qy = q[1], qz = q[2], qw = q[3]
            const vx = v[0], vy = v[1], vz = v[2]

            const tx = 2 * (qy * vz - qz * vy)
            const ty = 2 * (qz * vx - qx * vz)
            const tz = 2 * (qx * vy - qy * vx)

            return [
                vx + qw * tx + (qy * tz - qz * ty),
                vy + qw * ty + (qz * tx - qx * tz),
                vz + qw * tz + (qx * ty - qy * tx)
            ]
        }
    },

    [RegularOperators.DIV]: {
        [Types.INT]: common.arrayDivNum,
        [Types.NUM]: common.arrayDivNum,
        [Types.QUAT]: function(p, q) {
            return mulQuat(p, invQuat(q))
        }
    },

    [RegularOperators.EQL]: {
        [Types.QUAT]: common.arraysEq
    },

    [RegularOperators.NEQL]: {
        [Types.QUAT]: common.arraysNeq
    }
})

export const UnaryOperators = Object.freeze({
    [RegularOperators.ADD]: common.arrayUnaryAdd,
    [RegularOperators.SUB]: common.arrayUnarySub,
})

export const ConstructorsTable = Object.freeze([
    {
        args: [Types.NUM, Types.NUM, Types.NUM, Types.NUM],
        eval: function(w, x, y, z) { return [ x, y, z, w ] }
    },
    {
        args: [Types.NUM, Types.VEC3],
        eval: function(w, xyz) { return [...xyz, w ] }
    },
    {
        args: [Types.QUAT],
        eval: function(quat) { return [...quat ] }
    }
])