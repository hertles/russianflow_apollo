import {gql} from "@apollo/client";

export const GET_ALL_POINTS = gql`query{
    getAllPoints{
        id,
        x,
        y,
        type,
        name,
        descr
    }
}`
