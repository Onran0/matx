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

import {Token} from "../../parse/lexer.js"
import {convertForExport} from "../core.js";

export default convertForExport(
    {
        name: "vec3",
        functions: {
            length: {
                arguments: [
                    { name: "vector", type: Token.TYPE_VEC3 }
                ],
                result: Token.TYPE_FLOAT,
                jsFunction: function(vec) {
                    return Math.sqrt(vec[0]**2 + vec[1]**2 + vec[2]**2);
                }
            }
        }
    }
)