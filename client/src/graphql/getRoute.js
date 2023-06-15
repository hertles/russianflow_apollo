import {gql} from "@apollo/client";

export const GET_ROUTE = gql`query getRoute($id:ID!){
    getRoute(id:$id){
        id,
        x,
        y,
        type,
        name,
        desc,
        photo_url,
        rating
    }
}`

export default GET_ROUTE
