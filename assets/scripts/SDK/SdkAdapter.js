var SdkAdapter = (function () {
    function SdkAdapter() {
    }
    SdkAdapter.prototype.Init = function () { };
    SdkAdapter.prototype.Run = function () { };
    SdkAdapter.prototype.DoInitQuery = function (callback) { };
    SdkAdapter.prototype.DoIAP = function (sIapId, callback) { };
    SdkAdapter.prototype.ShowBannerAd = function (bIsShow) { };
    SdkAdapter.prototype.ShowVideoAd = function (callback) { };
    SdkAdapter.prototype.ShowInterstitialAd = function (callback) { return null; };
    SdkAdapter.prototype.ShowExitAd = function (callback) { };
    SdkAdapter.prototype.ShowNativeAd = function (bShow, nX, nY, nWidth, nHeight, callback) { };
    SdkAdapter.prototype.IsVideoReady = function () { };
    SdkAdapter.prototype.GetLanguage = function () { return "ZH"; };
    SdkAdapter.prototype.GetCountry = function () { return "CN"; };
    SdkAdapter.prototype.JumpToWebPage = function (sUrl) { };
    SdkAdapter.prototype.DoFacebookLogin = function (bLogin) { };
    SdkAdapter.prototype.DoShareGameLink = function () { };
    SdkAdapter.prototype.IsFacebookLogin = function () { return false; };
    SdkAdapter.prototype.DoInviteFriends = function () { };
    SdkAdapter.prototype.DoAfterSetOnlineParams = function () { };
    SdkAdapter.prototype.DoRestorePayment = function () { };
    SdkAdapter.prototype.AddPermanentItemId = function (sItemId) { };
    SdkAdapter.prototype.RecordData = function (sType, sVal1, sVal2, sVal3) {
        if (sVal1 === void 0) { sVal1 = ""; }
        if (sVal2 === void 0) { sVal2 = ""; }
        if (sVal3 === void 0) { sVal3 = ""; }
    };
    SdkAdapter.prototype.DoAfterInit = function () {};
    SdkAdapter.prototype.SetOnlineParams = function (tData) {};
    SdkAdapter.prototype.ON_GAME_EVENT = function (sType, sSubType, tEvt) {
        switch (sSubType) {
            case "START_QUEST":
                this.RecordData("start_level", "level_" + this.GetQuestConfigID(tEvt["QuestId"]));
                break;
            case "SHOW_PASS_QUEST":
                this.RecordData("finish_level", "level_" + this.GetQuestConfigID(tEvt["ID"]));
                break;
            case "SHOW_ERROR_MARK":
                this.RecordData("failed_level", "level_" + this.GetQuestConfigID(tEvt["ID"]));
                break;
            case "SET_CUR_LV":
                this.RecordData("set_level", tEvt["Level"]);
                break;
            default:
                break;
        }
    };
    SdkAdapter.prototype.ON_LOG_EVENT = function (sType, sSubType, tEvt) {
        switch (sSubType) {
            case "LOG_EVENT":
                this.RecordData("game_event", tEvt["Event"]);
                break;
            default:
                break;
        }
    };
    SdkAdapter.prototype.SEND_EVENT = function (sType, sSubType, tData) {};
    SdkAdapter.prototype.REG_EVT_LISTENER = function (sType, sSubType, callback) {};
    return SdkAdapter;
}());

exports.SdkAdapter = SdkAdapter;