import {gql} from "@apollo/client";

export const CREATE_PATH = gql`mutation Mutation($data: PathCreateInput!) {
    createPath(data: $data) {
        id
        nodes {
            x
            y
            index
        }
        route {
            id
        }
        distance
        desc
    }
}`
