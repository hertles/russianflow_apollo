import {gql} from "@apollo/client";

const GET_ALL_ROUTES = gql`query {
    routes {
        id
        desc
        image {
            url
        }
        id
        name
        rating
        x
        y
    }
}`

export default GET_ALL_ROUTES
