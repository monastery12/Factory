Object.defineProperty(exports, "__esModule", { value: true });
var CallbackMgr = /** @class */ (function () {
    function CallbackMgr() {
        this._nNextCallbackID = 100001;
        this._tCallbackMap = {};
        this._tTempCallbackMap = {};
    }
    CallbackMgr.GetInstance = function () {
        if (this._Instance == null) {
            this._Instance = new CallbackMgr();
        }
        return this._Instance;
    };
    CallbackMgr.prototype.DoCallbackFunc = function (nID, sResult) {
        if (nID == 0) {
            return;
        }
        var pTempCallFunc = this._tTempCallbackMap[nID];
        if (pTempCallFunc != null) {
            this._tTempCallbackMap[nID] = null;
            pTempCallFunc(sResult);
            return;
        }
        var pCallback = this._tCallbackMap[nID];
        if (pCallback != null) {
            pCallback(sResult);
            return;
        }
    };
    CallbackMgr.prototype.Perm = function (callback) {
        var nId = this._nNextCallbackID += 1;
        this._tCallbackMap[nId] = callback;
        return nId;
    };
    CallbackMgr.prototype.Temp = function (callback) {
        var nId = this._nNextCallbackID += 1;
        this._tTempCallbackMap[nId] = callback;
        return nId;
    };
    CallbackMgr.prototype.RemovePerm = function (nID) {
        if (this._tCallbackMap[nID]) {
            this._tCallbackMap[nID] = null;
        }
    };
    CallbackMgr._Instance = null;
    return CallbackMgr;
}());
exports.CallbackMgr = CallbackMgr;
