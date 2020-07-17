

cc.Class({
    extends: cc.Component,

    properties: {
        game_node:cc.Node,
        offLine_node:cc.Node,
        machine_jiasu:cc.Node,
        money_jiasu:cc.Node,
        UI_node:cc.Node,
        //AdManager_node:cc.Node,
        RedTips_node:cc.Node,
        gameCfgs:null,

        task1_node:cc.Node,
        task2_node:cc.Node,

        achivment_node:cc.Node,

        first_bg:cc.Node,
        login_award:cc.Node,

    
        xingfeng:cc.Node,
        kaishiyouxibutton:cc.Node,
        exchange_node:cc.Node,                              //兑换节点
        choose_node:cc.Node,                                //供应机生产选择节点


        stage_id:0,
    
    },



    onLoad () {
        cc.systemEvent.on("GAME_START",this.login_success,this);

        
    },

    start () {
        var self = this;

        // cc.loader.downloader.loadSubpackage('game', function (err) {
        //     if (err) {
        //         console.log("加载资源失败");
        //         return console.error(err);
        //     }
        //     console.log("加载完资源");
            require("ComMain").init(true);

        // });
    },
    login_success:function(){
        //存金幣
        
        this.stage_id = require("PlayerManager").coin;
        if(cc.sys.browserType == cc.sys.BROWSER_TYPE_WECHAT_GAME){
            wx.postMessage({
                message: 'UpdateScore',
                stage_id : JSON.stringify(require("PlayerManager").coin ),
            });

            // wx.Jq.LeaderBoard.post("FactroyBroad",this.stage_id).then(() => {
            //     //成功回调，无返回值
            // }).catch(ex => {
            //     // 失败回调
            //     ex.getCode();    // 服务器返回的错误码
            //     ex.getMessage();     // 服务器返回的错误信息
            // })
        }

        if( require("PlayerManager").first_boomer == true ){                         //第一次玩
            //this.first_bg.active = true;
            this.xingfeng.active = true;
            this.kaishiyouxibutton.active = false;
        }else{
            this.kaishiyouxibutton.active = true;
        }




    },

    beginGame:function(){

        require("Audio").play("Click",false,1);

        require("PlayerManager").svrTimestamp = (new Date()).getTime()
        var last_login = require("PlayerManager").last_login;                       //上次登陆
        var now = require("PlayerManager").svrTimestamp;             //(new Date()).getTime();                                           //当前时间
        var sub_time = parseInt(  (now -last_login)/(1000*60) );                                 //时间差 单位:分钟
        if( sub_time > 1*60*24 ){
            if(require("PlayerManager").login_days == 7){
                require("PlayerManager").lingqu =  [false,false,false,false,false,false,false];      //七天领取记录
            }
            require("PlayerManager").login_days =  (require("PlayerManager").login_days +1 ) > 7 ? 1:(require("PlayerManager").login_days +1);
            require("PlayerManager").choujiang_count = 1;
            require("PlayerManager").video_count = 3;
        }


        var self = this;
            self.node.active = false;
            self.game_node.active = true;
            self.offLine_node.active = true;
      
            self.UI_node.active = true;
            //self.AdManager_node.active = true;
            self.RedTips_node.active = true;
            if( require("PlayerManager").systemKaiqi[1] != 0 ){
                self.task1_node.active = true;
                self.task2_node.active = true;
                self.task2_node.getChildByName("child").active = false;
            }
            // if(require("PlayerManager").first_boomer == false){
            //     require("PlayerManager").login_days = require("PlayerManager").login_days == 0 ? 1 : require("PlayerManager").login_days;
            //     var ld = require("PlayerManager");
            //     if(require("PlayerManager").lingqu[ require("PlayerManager").login_days - 1 ] == false ){
            //         self.login_award.active = true;
            //     }
               
            // }
      
            self.machine_jiasu.active = true;
            //self.money_jiasu.active = true;


            self.achivment_node.active = true;              ///成就，兑换，供应机生产选择都是动态加载预制体，使用2.0.8打包第一次加载不会显示显示，所以此处先加载一次
            self.achivment_node.active = false;

            self.exchange_node.active = true;
            self.exchange_node.active = false;

            this.choose_node.active = true;
            this.choose_node.active = false;

    },

    first_button:function(){
        this.first_bg.active = false;
        this.kaishiyouxibutton.active = true;
    },

    xingfengButton:function(){
           this.first_bg.active = true;
           this.xingfeng.active = false;
    },

    // update (dt) {},
});
