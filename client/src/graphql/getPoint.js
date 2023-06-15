import {gql} from "@apollo/client";

 const GET_POINT = gql`query getPoint($id:ID!){
    getPoint(id:$id){
        id
        x
        y
        type
        name
        desc
        photo_url
        network
    }
}`

export default GET_POINT
