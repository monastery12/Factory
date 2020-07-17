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
var SdkAdapter_1 = require("./SdkAdapter");
var CallbackMgr_1 = require("./CallbackMgr");
var SDK_HELPER_CLASS_PATH = "com/yiyou/sdk/base/YiUSDKHelper";
var SdkAdapter_Android = /** @class */ (function (_super) {
  __extends(SdkAdapter_Android, _super);
  
  function SdkAdapter_Android() {
      return _super !== null && _super.apply(this, arguments) || this;
  }
  SdkAdapter_Android.prototype.Init = function () {
      var _this = this;
      this.DoInit(function () {
          _this.OnInitOk();
      });
  };
  SdkAdapter_Android.prototype.Run = function () {
  };
  SdkAdapter_Android.prototype.OnInitOk = function () {
      var _this = this;
      var nID1 = CallbackMgr_1.CallbackMgr.GetInstance().Perm(function (sResult) {
          var tToken = sResult.toString().split(',');
          if (tToken[0] == "1" || tToken[0] == "3") {
              _this.SEND_EVENT("GAME_EVENT", "RESTORE_PAYMENT", tToken[1]);
          }
      });
      this.CallSDKMethod("SDK_SetPayRecoveryCallback", "(I)Z", nID1);
      //
      var nID2 = CallbackMgr_1.CallbackMgr.GetInstance().Perm(function (sResult) {
      });
      this.CallSDKMethod("SDK_SetNetStateChangedCallback", "(I)Z", nID2);
      //
      var nID3 = CallbackMgr_1.CallbackMgr.GetInstance().Perm(function (sResult) {
          _this.SEND_EVENT("GAME_EVENT", "FACEBOOK_RESULT", sResult);
      });
      this.CallSDKMethod("SDK_SetFacebookResultCallback", "(I)Z", nID3);
      this.AddPermanentItemId("newtricky.prod.001");
      this.DoInitQuery(null);
  };
  SdkAdapter_Android.prototype.DoInitQuery = function (callback) {
      var nID = CallbackMgr_1.CallbackMgr.GetInstance().Temp(function (sRet) {
          if (callback != null) {
              callback(sRet);
          }
      });
      this.CallSDKMethod("SDK_DoInitQuery", "(I)V", nID);
  };
  SdkAdapter_Android.prototype.DoIAP = function (sIapId, callback) {
      var nID = CallbackMgr_1.CallbackMgr.GetInstance().Temp(function (sRet) {
          if (callback != null) {
              callback(sRet);
          }
      });
      this.CallSDKMethod("SDK_DoPay", "(Ljava/lang/String;I)V", sIapId, nID);
  };
  SdkAdapter_Android.prototype.DoInit = function (callback) {
      if (callback === void 0) { callback = null; }
      var nID = CallbackMgr_1.CallbackMgr.GetInstance().Temp(function (sRet) {
          if (callback != null) {
              callback();
          }
      });
      this.CallSDKMethod("SDK_Init", "(I)Z", nID);
  };
  SdkAdapter_Android.prototype.ShowBannerAd = function (bIsShow) {
      this.CallSDKMethod("SDK_ShowBanner", "(Z)V", (bIsShow || false));
  };
  SdkAdapter_Android.prototype.ShowVideoAd = function (callback) {
      var nID = CallbackMgr_1.CallbackMgr.GetInstance().Perm(function (sRet) {
          if (callback) {
              callback(sRet);
          }
          if (sRet == "2") {
              CallbackMgr_1.CallbackMgr.GetInstance().RemovePerm(nID);
          }
          if (sRet != "1") {
              cc.audioEngine.resumeMusic();
          }
      });
      cc.audioEngine.pauseMusic();
      this.CallSDKMethod("SDK_ShowVideo", "(I)V", nID);
  };
  SdkAdapter_Android.prototype.ShowNativeAd = function (bShow, nX, nY, nWidth, nHeight, callback) {
      var nID = CallbackMgr_1.CallbackMgr.GetInstance().Temp(function (sRet) {
          if (callback != null) {
              callback(sRet);
          }
      });
      this.CallSDKMethod("SDK_ShowNativeAd", ("(ZFFFFI)V"), bShow, nX, nY, nWidth, nHeight, nID);
  };
  SdkAdapter_Android.prototype.JumpToWebPage = function (sURL) {
      this.CallSDKMethod("SDK_JumpToWebPage", "(Ljava/lang/String;)V", sURL);
  };
  SdkAdapter_Android.prototype.DoShareGameLink = function () {
      var sURL = "http://a.4399.cn/game-id-155110.html";
      var tOnlineParams = this._tOnlineParams;
      if (tOnlineParams != null) {
          if (tOnlineParams["ShareURL"] != null) {
              sURL = tOnlineParams["ShareURL"];
          }
      }
      this.CallSDKMethod("SDK_DoShareGameLink", "(Ljava/lang/String;)V", sURL);
  };
  SdkAdapter_Android.prototype.ShowInterstitialAd = function (callback) {
      var nID = 0;
      nID = CallbackMgr_1.CallbackMgr.GetInstance().Perm(function (sRet) {
          if (callback != null) {
              callback(sRet);
          }
          if (sRet.toString() == "0") {
              CallbackMgr_1.CallbackMgr.GetInstance().RemovePerm(nID);
          }
      });
      return this.CallSDKMethod("SDK_ShowInterstitialAd", "(I)V", nID);
  };
  SdkAdapter_Android.prototype.GetLanguage = function () {
      return this.CallSDKMethod("SDK_GetLanguage", "()Ljava/lang/String;");
  };
  SdkAdapter_Android.prototype.GetCountry = function () {
      return this.CallSDKMethod("SDK_GetCountry", "()Ljava/lang/String;");
  };
  SdkAdapter_Android.prototype.DoFacebookLogin = function (bLogin) {
      this.CallSDKMethod("SDK_DoFacebookLogin", "(Z)V", bLogin);
  };
  SdkAdapter_Android.prototype.IsFacebookLogin = function () {
      return this.CallSDKMethod("SDK_IsFacebookLogin", "()Z");
  };
  SdkAdapter_Android.prototype.DoInviteFriends = function () {
      this.CallSDKMethod("SDK_DoFacebookInviteFriends", "()V");
  };
  SdkAdapter_Android.prototype.AddPermanentItemId = function (sItemId) {
      this.CallSDKMethod("SDK_AddPermanentItemId", "(Ljava/lang/String;)V", sItemId);
  };
  SdkAdapter_Android.prototype.ShowExitAd = function (callback) {
      var nID = CallbackMgr_1.CallbackMgr.GetInstance().Temp(function (sRet) {
          if (callback != null) {
              callback(true);
          }
      });
      this.CallSDKMethod("SDK_ShowExit", "(I)V", nID);
  };
  SdkAdapter_Android.prototype.RecordData = function (sType, sVal1, sVal2, sVal3) {
      if (sVal1 === void 0) { sVal1 = ""; }
      if (sVal2 === void 0) { sVal2 = ""; }
      if (sVal3 === void 0) { sVal3 = ""; }
      this.CallSDKMethod("SDK_UMengRecord", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", sType, sVal1, sVal2, sVal3);
  };
  SdkAdapter_Android.prototype.IsVideoReady = function () {
  };
  SdkAdapter_Android.prototype.CallSDKMethod = function (sFuncName, sFormat) {
      var args = [];
      for (var _i = 2; _i < arguments.length; _i++) {
          args[_i - 2] = arguments[_i];
      }
      var ret = null;
      switch (args.length) {
          case 7:
              ret = jsb.reflection.callStaticMethod(SDK_HELPER_CLASS_PATH, sFuncName, sFormat, args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
              break;
          case 6:
              ret = jsb.reflection.callStaticMethod(SDK_HELPER_CLASS_PATH, sFuncName, sFormat, args[0], args[1], args[2], args[3], args[4], args[5]);
              break;
          case 5:
              ret = jsb.reflection.callStaticMethod(SDK_HELPER_CLASS_PATH, sFuncName, sFormat, args[0], args[1], args[2], args[3], args[4]);
              break;
          case 4:
              ret = jsb.reflection.callStaticMethod(SDK_HELPER_CLASS_PATH, sFuncName, sFormat, args[0], args[1], args[2], args[3]);
              break;
          case 3:
              ret = jsb.reflection.callStaticMethod(SDK_HELPER_CLASS_PATH, sFuncName, sFormat, args[0], args[1], args[2]);
              break;
          case 2:
              ret = jsb.reflection.callStaticMethod(SDK_HELPER_CLASS_PATH, sFuncName, sFormat, args[0], args[1]);
              break;
          case 1:
              ret = jsb.reflection.callStaticMethod(SDK_HELPER_CLASS_PATH, sFuncName, sFormat, args[0]);
              break;
          case 0:
              ret = jsb.reflection.callStaticMethod(SDK_HELPER_CLASS_PATH, sFuncName, sFormat);
              break;
      }
      return ret;
  };
  ;
  return SdkAdapter_Android;
}(SdkAdapter_1.SdkAdapter));

exports.SdkAdapter_Android = SdkAdapter_Android;