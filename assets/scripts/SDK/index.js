import { SdkAdapter_Android } from "./SdkAdapter_Android";
import { SdkAdapter_Default } from "./SdkAdapter_Default";
import { SdkAdapter } from "./SdkAdapter";
// var CallbackMgr = require("./CallbackMgr");
import { CallbackMgr } from "./CallbackMgr";
var BASE={}

BASE["CallbackEntry"]=function(nID, sResult){
  CallbackMgr.GetInstance().DoCallbackFunc(nID, sResult);
}

function InitByPlatform(){
  var oSdk=null;
  var nPlatform = cc.sys.platform;
  switch(nPlatform){
      case cc.sys.ANDROID:
        oSdk = new SdkAdapter_Android();
      break;
      default:
        oSdk= new SdkAdapter_Default();
        break;
  }
  return oSdk;
}

var oSdk=InitByPlatform();
oSdk.Init();
oSdk.DoAfterInit();

window["_BASE"]=BASE;
BASE["SDK"]=oSdk;

export {BASE};