"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMockStore = function (reducer) {
    var _actions = [];
    return {
        _actions: _actions,
        _reducer: reducer,
        dispatch: jest.fn(function (action) { _actions.push(action); }),
        getState: jest.fn(),
        replaceReducer: jest.fn(),
        subscribe: jest.fn(),
    };
};
var MockNetworkInterface = (function () {
    function MockNetworkInterface() {
        var _this = this;
        this.query = jest.fn(function () {
            return Promise.resolve({ data: {}, errors: [] });
        });
        this.use = jest.fn(function () { return _this; });
        this.useAfter = jest.fn(function () { return _this; });
    }
    return MockNetworkInterface;
}());
exports.MockNetworkInterface = MockNetworkInterface;
var MockOfflineNetworkInterface = (function (_super) {
    __extends(MockOfflineNetworkInterface, _super);
    function MockOfflineNetworkInterface(networkInterface, store, client) {
        if (networkInterface === void 0) { networkInterface = new MockNetworkInterface(); }
        var _this = _super.call(this) || this;
        _this.networkInterface = networkInterface;
        _this.store = store;
        _this.client = client;
        _this.setClient = jest.fn(function (client) {
            _this.client = client;
            return _this;
        });
        return _this;
    }
    return MockOfflineNetworkInterface;
}(MockNetworkInterface));
exports.MockOfflineNetworkInterface = MockOfflineNetworkInterface;
//# sourceMappingURL=index.js.map