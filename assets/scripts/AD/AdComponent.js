// import { BASE } from "./SDK/index";

var AdComponent = cc.Class({
    extends: cc.Component,

    properties: {

        nodeVidoButton:cc.Node,
    },

    start()
    {

    },

    init(key, callback,target)
    {
        this.target = target;
        this.callBack = callback;
    },

    //免费
    buttonFree(){

    },

    //视频
    buttonVidio(){

        let self = this;
        self.callBack.call(self.target);
        return ;
        //var bReward=false;
        // BASE.SDK.ShowVideoAd((nRet)=>{
        //
        //     if (nRet == "1") {
        //         bReward = true;
        //     }else if(nRet=="2"){
        //         if(bReward==true){
        //             self.callBack.call(self.target);
        //         }else{
        //         }
        //     }
        // });
    },

    //分享
    buttonShare(){

    },

});

module.exports = AdComponent;