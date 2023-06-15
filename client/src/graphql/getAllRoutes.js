import {gql} from "@apollo/client";

const GET_ALL_ROUTES = gql`query{
    getAllRoutes{
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

export default GET_ALL_ROUTES
