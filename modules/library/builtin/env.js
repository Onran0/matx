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
        name: "env",
        fields: {
            posX: Token.TYPE_FLOAT, posY: Token.TYPE_FLOAT, posZ: Token.TYPE_FLOAT,
            rotX: Token.TYPE_FLOAT, rotY: Token.TYPE_FLOAT, rotZ: Token.TYPE_FLOAT,

            rightX: Token.TYPE_FLOAT, rightY: Token.TYPE_FLOAT, rightZ: Token.TYPE_FLOAT,
            forwX: Token.TYPE_FLOAT, forwY: Token.TYPE_FLOAT, forwZ: Token.TYPE_FLOAT,
            upX: Token.TYPE_FLOAT, upY: Token.TYPE_FLOAT, upZ: Token.TYPE_FLOAT,

            Bcount: Token.TYPE_INT, Rmass: Token.TYPE_FLOAT, Bmass: Token.TYPE_FLOAT,

            time: Token.TYPE_FLOAT, Ltime: Token.TYPE_FLOAT,

            Lval: Token.TYPE_FLOAT
        }
    }
)