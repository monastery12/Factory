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
var SdkAdapter_Default = /** @class */ (function (_super) {
  __extends(SdkAdapter_Default, _super);
  function SdkAdapter_Default() {
      return _super !== null && _super.apply(this, arguments) || this;
  }
  SdkAdapter_Default.prototype.Init = function () {
    console.log("SdkAdapter_Default","Init")
  };
  SdkAdapter_Default.prototype.Run = function () {
    console.log("SdkAdapter_Default","Run")
  };
  SdkAdapter_Default.prototype.DoInitQuery = function (callback) {
    console.log("SdkAdapter_Default","DoInitQuery")
  };
  SdkAdapter_Default.prototype.DoIAP = function (sIapId, callback) {
      if (callback != null) {
          callback("1," + sIapId);
      }
      console.log("SdkAdapter_Default","DoIAP")
  };
  SdkAdapter_Default.prototype.DoShareGameLink = function () {
    console.log("SdkAdapter_Default","DoShareGameLink")
  };
  SdkAdapter_Default.prototype.ShowBannerAd = function (bIsShow) {
    console.log("SdkAdapter_Default","ShowBannerAd")
  };
  SdkAdapter_Default.prototype.ShowVideoAd = function (callback) {
      callback("1");
      callback("2");
      console.log("SdkAdapter_Default","ShowVideoAd")
  };
  SdkAdapter_Default.prototype.ShowInterstitialAd = function (callback) {
    console.log("SdkAdapter_Default","ShowInterstitialAd")
  };
  SdkAdapter_Default.prototype.ShowNativeAd = function (bShow, nX, nY, nWidth, nHeight, callback) {
    console.log("SdkAdapter_Default","ShowNativeAd")
  };
  SdkAdapter_Default.prototype.ShowExitAd = function (callback) {
    console.log("SdkAdapter_Default","ShowExitAd")
  };
  SdkAdapter_Default.prototype.IsVideoReady = function () {
    console.log("SdkAdapter_Default","IsVideoReady")
  };
  SdkAdapter_Default.prototype.GetLanguage = function () {
    console.log("SdkAdapter_Default","GetLanguage")
      return "ZH";
  };
  SdkAdapter_Default.prototype.GetCountry = function () {
    console.log("SdkAdapter_Default","GetCountry")
      return "CN";
  };
  SdkAdapter_Default.prototype.JumpToWebPage = function (sUrl) {
    console.log("SdkAdapter_Default","JumpToWebPage")
  };
  SdkAdapter_Default.prototype.DoFacebookLogin = function (FaceboobLogin) {
    console.log("SdkAdapter_Default","DoFacebookLogin")
  };
  SdkAdapter_Default.prototype.IsFacebookLogin = function () {
    console.log("SdkAdapter_Default","IsFacebookLogin")
      return false;
  };
  SdkAdapter_Default.prototype.DoInviteFriends = function () {
    console.log("SdkAdapter_Default","DoInviteFriends")
  };
  SdkAdapter_Default.prototype.RecordData = function (sType, sVal1, sVal2, sVal3) {
    console.log("SdkAdapter_Default","RecordData")
      if (sVal1 === void 0) { sVal1 = ""; }
      if (sVal2 === void 0) { sVal2 = ""; }
      if (sVal3 === void 0) { sVal3 = ""; }
    console.log("recordData " + sType + " " + sVal1);
  };
  SdkAdapter_Default.prototype.AddPermanentItemId = function (sItemId) {
    console.log("SdkAdapter_Default","AddPermanentItemId")
  };
  return SdkAdapter_Default;
}(SdkAdapter_1.SdkAdapter));
exports.SdkAdapter_Default = SdkAdapter_Default;