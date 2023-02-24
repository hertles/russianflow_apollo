import {gql} from "@apollo/client";

export const GET_ALL_ROUTES = gql`query{
    getAllRoutes{
        id,
        x,
        y,
        type,
        name,
        descr,
        photo_url,
        rating
    }
}`