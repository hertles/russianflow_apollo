import {gql} from "@apollo/client";

export const CREATE_POINT = gql` mutation Mutation($data: PointCreateInput!) {
    createPoint(data: $data) {
        id
        name,
        desc,
        category {
            image {url}
            activeImage {url}
            name
        },
        network,
        image {url},
        x,
        y
    }
}
`
