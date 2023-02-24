"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
var OfflineNetworkInterface = (function () {
    function OfflineNetworkInterface(networkInterface, store, client) {
        this.networkInterface = networkInterface;
        this.store = store;
        this.client = client;
    }
    OfflineNetworkInterface.prototype.query = function (request) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var variables = request.variables;
            if (variables && (variables.__offline__
                || variables.__online__)) {
                if (variables.__offline__ && _this.client) {
                    try {
                        resolve({ data: _this.client.readQuery(request) });
                        _this.networkInterface.query(request).then(function (_a) {
                            var data = _a.data, errors = _a.errors;
                            return _this.client && !errors && _this.client.writeQuery(__assign({}, request, { data: data }));
                        }).catch(function () { });
                        return;
                    }
                    catch (ignore) { }
                }
            }
            else if (_this.store) {
                return _this.store.dispatch({
                    meta: {
                        offline: {
                            commit: { type: constants_1.APOLLO_OFFLINE_COMMIT, meta: { request: request } },
                            effect: {
                                callback: resolve,
                                request: request,
                            },
                            rollback: { type: constants_1.APOLLO_OFFLINE_ROLLBACK, meta: { request: request } },
                        },
                    },
                    type: constants_1.APOLLO_OFFLINE_QUEUE,
                });
            }
            _this.networkInterface.query(request).then(resolve).catch(reject);
        });
    };
    OfflineNetworkInterface.prototype.setClient = function (client) {
        this.client = client;
        return this;
    };
    OfflineNetworkInterface.prototype.use = function (middlewares) {
        this.networkInterface.use(middlewares);
        return this;
    };
    OfflineNetworkInterface.prototype.useAfter = function (middlewares) {
        this.networkInterface.useAfter(middlewares);
        return this;
    };
    return OfflineNetworkInterface;
}());
exports.default = OfflineNetworkInterface;
//# sourceMappingURL=transport.js.map