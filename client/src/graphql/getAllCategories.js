import {gql} from "@apollo/client";

export const GET_ALL_CATEGORIES = gql`query Query {
    categories {
        id
        name
        image {
            url
        }
        activeImage {
            url
        }
    }
}`
