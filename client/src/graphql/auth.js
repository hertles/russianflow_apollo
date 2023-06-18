import {gql} from "@apollo/client";

export const AUTH = gql`mutation ($identity: String!, $secret: String!) {
    authenticate: authenticateUserWithPassword(email: $identity, password: $secret) {
        ... on UserAuthenticationWithPasswordSuccess {
            item {
                id
                __typename
            }
            __typename
        }
        ... on UserAuthenticationWithPasswordFailure {
            message
            __typename
        }
        __typename
    }
}`
