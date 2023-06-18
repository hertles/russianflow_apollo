import {gql} from "@apollo/client";

export const GET_ROUTE = gql`query Query($id: ID!) {
    route(where: {id: $id}) {
        id
        x
        y
        desc
        image {
            url
        }
        name
        rating
        points {
            id
            name
            x
            y
            category {
                name
                image {
                    url
                }
                activeImage {
                    url
                }
            }
        }
    }
}
`

export default GET_ROUTE
