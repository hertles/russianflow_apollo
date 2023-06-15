import {gql} from "@apollo/client";

export const ADD_POINT = gql` mutation addPoint($point: PointInput!) {
    addPoint(point: $point) {
        id,
        name, 
        desc, 
        type, 
        network,
        photo_url,
        x,
        y
    }
}

`
