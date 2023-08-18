import {gql} from "@apollo/client";

export const DELETE_POINT = gql`mutation Mutation($id: ID!) {
    deletePoint(where: {id: $id}){
        id
    }
}`
