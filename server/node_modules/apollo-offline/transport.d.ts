import { ApolloClient, NetworkInterface as BasicNetworkInterface, Request } from 'apollo-client';
import { Store } from 'redux';
export interface NetworkInterface extends BasicNetworkInterface {
    use(middlewares: any[]): NetworkInterface;
    useAfter(afterwares: any[]): NetworkInterface;
}
export default class OfflineNetworkInterface implements NetworkInterface {
    networkInterface: NetworkInterface;
    store: Store<any> | undefined;
    client: ApolloClient | undefined;
    constructor(networkInterface: NetworkInterface, store?: Store<any> | undefined, client?: ApolloClient | undefined);
    query(request: Request): Promise<{}>;
    setClient(client: ApolloClient): OfflineNetworkInterface;
    use(middlewares: any[]): OfflineNetworkInterface;
    useAfter(middlewares: any[]): OfflineNetworkInterface;
}
