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

import Types from "../../constructions/types.js"
import {convertForExport} from "../core.js";

export default convertForExport(
    {
        name: "env",
        fields: {
            posX: Types.NUM, posY: Types.NUM, posZ: Types.NUM,
            rotX: Types.NUM, rotY: Types.NUM, rotZ: Types.NUM,

            rightX: Types.NUM, rightY: Types.NUM, rightZ: Types.NUM,
            forwX: Types.NUM, forwY: Types.NUM, forwZ: Types.NUM,
            upX: Types.NUM, upY: Types.NUM, upZ: Types.NUM,

            Bcount: Types.INT, Rmass: Types.NUM, Bmass: Types.NUM,

            time: Types.NUM, Ltime: Types.NUM,

            Lval: Types.NUM
        }
    }
)