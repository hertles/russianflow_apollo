import {makeVar} from '@apollo/client';

export const newPointVarInitial = {
    lng: null,
    lat: null,
    name: '',
    routeId: null,
    category: {
        image: {
            url: "http://localhost:2020/images/markers/7ff5a61e-4e8c-4464-904f-c4af8ddf259d.png"
        },
        name: "Другое",
        activeImage: {
            url: "http://localhost:2020/images/markers/824f1a17-64c2-4816-b656-699e4c86da6f.png"
        }
    },
    desc: '',
    image: null
}
export const newPointVar = makeVar(newPointVarInitial)

export const pointsVar = makeVar([])
