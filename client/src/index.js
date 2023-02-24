import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client'
import {BrowserRouter} from 'react-router-dom'
import { offline } from 'redux-offline';
import offlineConfig from 'redux-offline/lib/defaults';
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
//import offline from 'apollo-offline';
//import config from 'redux-offline/lib/defaults';
/*const { enhancer, networkInterface } = offline(
    createNetworkInterface({
        uri: `http://localhost`,
    }),
);*/




const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql',
    cache: new InMemoryCache()
});



/*
export const store = createStore(
    combineReducers({ apollo: client }),
    undefined,
    applyMiddleware(client.middleware())
);

*/

/*export const store = createStore(
    combineReducers({ apollo: client.reducer() }),
    undefined,
    compose(
        applyMiddleware(client.middleware()),
        offline(config)
    )
);*/
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </ApolloProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
