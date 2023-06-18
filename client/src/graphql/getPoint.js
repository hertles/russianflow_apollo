import {gql} from "@apollo/client";

const GET_POINT = gql`query Query($id: ID!) {
    point(where: {id: $id}) {
        id
        name
        category {
            name
        }
        image {
            url
        }
        croppedImage {
            url
        }
        network
        x
        y
        desc
    }
}`

export default GET_POINT
