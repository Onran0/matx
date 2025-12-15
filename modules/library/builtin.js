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