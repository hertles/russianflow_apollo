import {gql} from "@apollo/client";

export const GET_PATH=gql`query Query($id: ID!) {
    path(where: {id: $id}){
        desc
        distance
    }
}`
