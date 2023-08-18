import {gql} from "@apollo/client";

export const DELETE_PATH = gql`mutation Mutation($id: ID!) {
    deletePath(where: {id: $id}){
        id
    }
}`
