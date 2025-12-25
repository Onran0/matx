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

export function getVarType(context, name) {
    if(context.env.vars[name] != null) {
        return context.env.vars[name].type;
    } else if(context.parentContext != null) return getVarType(context.parentContext, name);
}

export function getVar(context, name) {
    if(context.env.vars[name] != null) {
        return context.env.vars[name].value;
    } else if(context.parentContext != null) return getVarType(context.parentContext, name);
}

export function setVar(context, name, value) {
    if(context.env.vars[name] != null) {
        context.env.vars[name].value = value;
    } else if(context.parentContext != null) return getVarType(context.parentContext, name);
}

export function setupVar(context, name, type, value) {
    context.env.vars[name] = {
        name: name,
        type: type,
        value: value
    }
}