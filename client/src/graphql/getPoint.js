import {gql} from "@apollo/client";

export const GET_POINT = gql`query getPoint($id:ID!){
    getPoint(id:$id){
        id
        x
        y
        type
        river
        name
        descr
        photo_url
    }
}`