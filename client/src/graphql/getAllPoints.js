import {gql} from "@apollo/client";

const GET_ALL_POINTS = gql`query getAllPoints($routeId:ID!){
    getAllPoints(routeId: $routeId){
        id,
        x,
        y,
        type,
        name,
        photo_url,
        desc
    }
}`
export default GET_ALL_POINTS
