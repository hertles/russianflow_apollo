import {makeVar} from '@apollo/client';

export const newPointVarInitial = {
    lng: null,
    lat: null,
    name: '',
    routeId: null,
    category: {
        image: {
            url: "http://localhost:2020/images/markers/b4185e6d-571f-4171-9112-8a48ce395500.png"
        },
        name: "Другое",
        activeImage: {
            url: "http://localhost:2020/images/markers/d1035b99-905c-4f3d-b2da-0acc6e3e7044.png"
        }
    },
    desc: '',
    image: null
}
export const newPointVar = makeVar(newPointVarInitial)

export const newPathVarInitial = {
    name: '',
    desc: '',
    nodes: [],
    distance: 0
}

export const newPathVar = makeVar(newPathVarInitial)

export const pointsVar = makeVar([])

export const pathsVar = makeVar([])

export const isNavigateVar = makeVar(false)
