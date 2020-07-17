var AdComponent = require("AdComponent");
var TEST = false;
var CJ_AD = 9;
cc.Class({
    extends: cc.Component,

    properties: {
        adComponent:AdComponent,
      coin_lb:cc.Label,
      shipingButton:cc.Node,
      shareButton:cc.Node,

      offLine_jianlgi:0,

      _BigNum:null,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._BigNum = require("BigNum");
    },

    start () {
        this.init();
        this.adComponent.init(1,this.onShipingGet,this);
    },

    init:function(){
        var self = this;
        if( require("PlayerManager").first_boomer == true ){
            this.node.active = false;
            return ;
            
         }
        this.node.opacity = 0;
        var produce_index = require("PlayerManager").produceType;                   //生产类型
        var last_login = require("PlayerManager").last_login;                       //上次登陆
        var now = require("PlayerManager").svrTimestamp;             //(new Date()).getTime();                                           //当前时间
        var sub_time = parseInt(  (now -last_login)/(1000*60) );                                 //时间差 单位:分钟
        // if( require("PlayerManager").last_login == 0){
        //    // return ;
        //    sub_time = 1
        // }
        if(sub_time == 0){
            
            sub_time = 1;
        }
        
        this.offLine_jianlgi = this._BigNum.MulNum(require("ComMain").gameCfgs.award[produce_index].jingbi_num , sub_time )   // require("ComMain").gameCfgs.award[produce_index].jingbi_num * sub_time;

        this.coin_lb.string =  this._BigNum.Show( self.offLine_jianlgi ) ;         

        // if( require("PlayerManager").shiping_share_count < 5 ){
        //     this.shipingButton.active  = true;
        //     this.shareButton.active = false;
        // }else{
        //     this.shareButton.active = true;
        //     this.shipingButton.active = false;
        // }



        this.node.opacity = 255;
    },

    //视频加倍按钮
    shipingDoubleButton:function(){
     //按钮声音
    require("Audio").play("Click",false,1);
        let self = this;
    require("sdk_4399").getAdAssest(function(data){
        if(data){
            self.onShipingGet();
        }else{
            messageTips("今日广告已看完啊，请明日再来");
        }
    })

    },

    //分享加倍按钮
    shareDoubleButton:function(){

                    //按钮声音
                    require("Audio").play("Click",false,1);


        var self = this;
        var obj  = {
            name:"leave_double",
            callback:{
                func:self.onShareGetCoinSucc,
                target:self,
            }
        }

        cc.systemEvent.emit("COM_SHARE_GAME",obj);    
    },

    //分享奖励回调
    onShareGetCoinSucc:function(){
        cc.systemEvent.emit("UI_ARARD",  this._BigNum.MulNum( self.offLine_jianlgi , 2) );

        messageTips("分享成功");
        this.node.active = false;
    },

    //视频奖励回调
    onShipingGet:function(){

        cc.systemEvent.emit("UI_ARARD",  this._BigNum.MulNum( self.offLine_jianlgi , 3) );
        require("PlayerManager").achievement_jindu[CJ_AD] ++;
        let coin_str = this._BigNum.MulNum( self.offLine_jianlgi , 2) 

        messageTips(`奖励三倍,获得${coin_str}`);

        this.node.active = false;
    },

    closeClick:function(){
                    //按钮声音
                    require("Audio").play("Click",false,1);
                    let self = this;
                    let coin_str = this._BigNum.Show(self.offLine_jianlgi)
                    messageTips(`获得${coin_str}`);

        cc.systemEvent.emit("UI_ARARD", this.offLine_jianlgi);
        this.node.active = false;
    },


    // update (dt) {},
});
