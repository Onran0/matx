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

const _Libraries = Object.freeze({
    vec3: {
        functions: {
            length: {
                arguments: [ "vec3" ],
                result: "num",
                jsFunction: function(vec) {
                    return Math.sqrt(vec[0]**2 + vec[1]**2 + vec[2]**2);
                }
            }
        }
    },

    env: {
        fields: {
            posX: "num", posY: "num", posZ: "num",
            rotX: "num", rotY: "num", rotZ: "num",

            rightX: "num", rightY: "num", rightZ: "num",
            forwX: "num", forwY: "num", forwZ: "num",
            upX: "num", upY: "num", upZ: "num",

            Bcount: "int", Rmass: "num", Bmass: "num",

            time: "num", Ltime: "num",

            Lval: "num"
        }
    }
})

const EntitiesTypes = [ "functions", "fields" ]
const DotLibraries = { }

for(const libName in _Libraries) {
    for(const entityType in EntitiesTypes) {
        for(const entityName in _Libraries[libName][entityType]) {
            DotLibraries[`${libName}.${entityName}`] = _Libraries[libName][entityType][entityName]
        }
    }
}

export const Libraries = Object.freeze(DotLibraries)