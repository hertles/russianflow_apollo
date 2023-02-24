/// <reference types="jest" />
import { ApolloClient } from 'apollo-client';
import { Store } from 'redux';
export declare const createMockStore: <T = any>(reducer?: ((state: T, action: any) => T) | undefined) => {
    _actions: any[];
    _reducer: ((state: T, action: any) => T) | undefined;
    dispatch: jest.Mock<{}>;
    getState: jest.Mock<{}>;
    replaceReducer: jest.Mock<{}>;
    subscribe: jest.Mock<{}>;
};
export declare class MockNetworkInterface {
    query: jest.Mock<Promise<{
        data: {};
        errors: never[];
    }>>;
    use: jest.Mock<this>;
    useAfter: jest.Mock<this>;
}
export declare class MockOfflineNetworkInterface extends MockNetworkInterface {
    networkInterface: MockNetworkInterface;
    store: Store<any> | undefined;
    client: ApolloClient | undefined;
    setClient: jest.Mock<this>;
    constructor(networkInterface?: MockNetworkInterface, store?: Store<any> | undefined, client?: ApolloClient | undefined);
}
