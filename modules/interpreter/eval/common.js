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

export function arrayAddNum(a, b) { return a.map(x => x + b) }
export function arraySubNum(a, b) { return a.map(x => x - b) }
export function arrayMulNum(a, b) { return a.map(x => x * b) }
export function arrayDivNum(a, b) { return a.map(x => x / b) }
export function arrayIntDivNum(a, b) { return a.map(x => Math.trunc(x / b)) }

export function arrayAddNumBA(b, a) { return a.map(x => x + b) }
export function arraySubNumBA(b, a) { return a.map(x => x - b) }
export function arrayMulNumBA(b, a) { return a.map(x => x * b) }
export function arrayDivNumBA(b, a) { return a.map(x => x / b) }
export function arrayIntDivNumBA(b, a) { return a.map(x => Math.trunc(x / b)) }

export function arrayAddArray(a, b) { return a.map((x, i) => x + b[i]) }
export function arraySubArray(a, b) { return a.map((x, i) => x - b[i]) }
export function arrayMulArray(a, b) { return a.map((x, i) => x * b[i]) }
export function arrayDivArray(a, b) { return a.map((x, i) => x / b[i]) }
export function arrayIntDivArray(a, b) { return a.map((x, i) => Math.trunc(x / b[i])) }

export function arraysEq(a, b) {
    let eq = true

    a.every((x, i) => {
        if(x !== b[i]) {
            eq = false
            return false
        }

        return true
    })

    return eq
}

export function arraysNeq(a, b) {
    let eq = true

    a.every((x, i) => {
        if(x === b[i]) {
            eq = false
            return false
        }

        return true
    })

    return eq
}

export function arrayUnaryAdd(a) {
    return [...a]
}

export function arrayUnarySub(a) {
    return a.map(x => -x)
}