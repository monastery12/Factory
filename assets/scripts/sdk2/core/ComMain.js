//组件主控类

function UserInfo() {
    this.open_id = "";
    this.token = "";
}


var ComMain = {

    userInfo : new UserInfo(),

    gameCfgs : null,

    comCfg : null,

    net :null,

    standby : false,

    runInBack : false,

    channel_id : null,
    //antireport : true,

    get constCfg() {
        return this.gameCfgs.const_var[1];
    },

    init : function(use_tm) {

        cc.systemEvent.on("CLIENT_COM_STANDBY",this.loginComplete,this);                //netEnging 登陆完会通知

        this.comCfg = require("ComConfig");

        let audio = require("Audio")                                                //聲音
        audio.init()
        
        let vibrate = require("Vibrate")                                            //震動
        vibrate.init()                          
        let saveManager = require("SaveManager");                                   //保存
        saveManager.init();

        
		this.loadConfig();

    },

    loadConfig() {
        var self = this;
        cc.loader.loadRes("config/tb_merge", function( err, res) {
            if (err == null) {

                var r = res;
                console.log("res :",res);
                this.gameCfgs = res.json;
                
                //将配置文件数据转大数
                // 1 produce 
                for(var i = 1; this.gameCfgs.produce[i] != null ; i++ ){                                                //供应机
                    this.gameCfgs.produce[i].consume = {  unit:self.gameCfgs.produce[i].consume , time: self.gameCfgs.produce[i].zeronum  };
                }
                for(var j = 1;this.gameCfgs.machinelevel[j] != null; j++  ){                                            //制造机
                    this.gameCfgs.machinelevel[j].consume1 = {unit:self.gameCfgs.machinelevel[j].consume1X , time: self.gameCfgs.machinelevel[j].zeronumC1 };
                    this.gameCfgs.machinelevel[j].consume2 = {unit:self.gameCfgs.machinelevel[j].consume2X , time: self.gameCfgs.machinelevel[j].zeronumC2 };
                    this.gameCfgs.machinelevel[j].consume3 = {unit:self.gameCfgs.machinelevel[j].consume3X , time: self.gameCfgs.machinelevel[j].zeronumC3 };
                    this.gameCfgs.machinelevel[j].consume4 = {unit:self.gameCfgs.machinelevel[j].consume4X , time: self.gameCfgs.machinelevel[j].zeronumC4 };
                    this.gameCfgs.machinelevel[j].consume5 = {unit:self.gameCfgs.machinelevel[j].consume5X , time: self.gameCfgs.machinelevel[j].zeronumC5 };
                    this.gameCfgs.machinelevel[j].consume6 = {unit:self.gameCfgs.machinelevel[j].consume6X , time: self.gameCfgs.machinelevel[j].zeronumC6 };

                    if(j == 1 ){
                        console.log("self.gameCfgs.machinelevel[j].damage1X:", self.gameCfgs.machinelevel[j].damage1X)
                        console.log("self.gameCfgs.machinelevel[j].damage2X:", self.gameCfgs.machinelevel[j].damage2X)
                        console.log("self.gameCfgs.machinelevel[j].damage3X:", self.gameCfgs.machinelevel[j].damage3X)
                        console.log("self.gameCfgs.machinelevel[j].damage4X:", self.gameCfgs.machinelevel[j].damage4X)
                        console.log("self.gameCfgs.machinelevel[j].damage5X:", self.gameCfgs.machinelevel[j].damage5X)
                        console.log("self.gameCfgs.machinelevel[j].damage6X:", self.gameCfgs.machinelevel[j].damage6X)
                    }

                    this.gameCfgs.machinelevel[j].damage1  = {unit:self.gameCfgs.machinelevel[j].damage1X  , time: self.gameCfgs.machinelevel[j].zeronumD1 };
                    this.gameCfgs.machinelevel[j].damage2  = {unit:self.gameCfgs.machinelevel[j].damage2X  , time: self.gameCfgs.machinelevel[j].zeronumD2 };
                    this.gameCfgs.machinelevel[j].damage3  = {unit:self.gameCfgs.machinelevel[j].damage3X  , time: self.gameCfgs.machinelevel[j].zeronumD3 };
                    this.gameCfgs.machinelevel[j].damage4  = {unit:self.gameCfgs.machinelevel[j].damage4X  , time: self.gameCfgs.machinelevel[j].zeronumD4 };
                    this.gameCfgs.machinelevel[j].damage5  = {unit:self.gameCfgs.machinelevel[j].damage5X  , time: self.gameCfgs.machinelevel[j].zeronumD5 };
                    this.gameCfgs.machinelevel[j].damage6  = {unit:self.gameCfgs.machinelevel[j].damage6X  , time: self.gameCfgs.machinelevel[j].zeronumD6 };
                }

                //物品
                for(var m = 1;this.gameCfgs.goods[m] != null ; m++){
                    this.gameCfgs.goods[m].click = {unit:self.gameCfgs.goods[m].click , time : self.gameCfgs.goods[m].zeronum1 };
                    this.gameCfgs.goods[m].value = {unit:self.gameCfgs.goods[m].value , time : self.gameCfgs.goods[m].zeronum2 };
                }

                //奖励表
                for(var m3 = 1;this.gameCfgs.award[m3] != null; m3++){
                    this.gameCfgs.award[m3].jingbi_num = { unit:self.gameCfgs.award[m3].jingbi_num , time:self.gameCfgs.award[m3].zeronum	 };
                }

                var Bignum =require("BigNum");
                var kaiqi_index = this.gameCfgs.produce[ require("PlayerManager").production_lv ].enable ; 
                var jichu = this.gameCfgs.award[kaiqi_index].jingbi_num;
                //兑换表        待改
                for(var m2 = 1; this.gameCfgs.exchange[ m2 ] != null; m2++){
                    this.gameCfgs.exchange[m2].coin_num =  Bignum.MulNum( jichu, self.gameCfgs.exchange[m2].coin_numx ) ; 
                }
             
                // 任务
                for(var m4 = 1;this.gameCfgs.task[m4] != null ; m4++ ){
                    this.gameCfgs.task[m4].award = { unit:self.gameCfgs.task[m4].award, time:1 };
                }

                //头衔
                for(var m5 = 1;this.gameCfgs.touxian[m5] != null;m5++){
                    this.gameCfgs.touxian[m5].jiacheng = {unit:1 ,time: self.gameCfgs.touxian[m5].jiacheng };
                }
                this.gameCfgs.touxian[0] = { jiacheng: { unit:1,time:0 } };


                //成就
                this.gameCfgs.achi = [];
                for(var aa = 1;aa<24;aa++){
                    this.gameCfgs.achi[aa] = new Object();
                    var jia = 0;
                    for(var a = 1; this.gameCfgs.achievement[a] != null ; a++){
                      
                        if( this.gameCfgs.achievement[a].type == aa ){
                            if(this.gameCfgs.achi[aa][1] == null && a != 1 ){
                                jia = a - 1;
                            }
                            this.gameCfgs.achi[aa][ (a - jia) ] = this.gameCfgs.achievement[a];
                        }

                    }
                }
     

                this.getLocalSaveData();
            }
        }.bind(this));
    },

    checkAllReady() {
    

    },
    
    onUserInfoMsg(evt) {
        this.parseUserData(evt.detail);
    },

    procStatistics(param) {                             //
        var query = param.query;
        //数据统计新版
        if (query.cmd == "V2_Log_event") {
            var com = require("ComMain");

            var pkg = {
                game_id:com.userInfo.game_id,
                platform:com.userInfo.platform,
                open_id:com.userInfo.open_id,
                token:com.userInfo.token,

                event:"channel",
            }

            for (var key in query) {
                pkg[key] = query[key];
            }

            var chrCls = require("CMHttpRequest");
            var chr = new chrCls();
            chr.send(pkg);
        }
    },

    //
    onRelaunchGame : function(param) {                          //param 游戏从后台切换到前台 返回的数据
    
        
        cc.systemEvent.emit("Get_Scene",{scene : param.scene}); //场景值

        let share = require("Share")

        if (share.simShareObj) {                                //
            var data = share.simShareObj;
            var time = (new Date()).getTime() - data.time;      //时间差
            if (time < data.cfg.sharegap1) {                    //3000      分享太快了不算
                messageTips(data.cfg.not_group_tips);           //请分享到群
                if (data.fail) {                                
                    var handle = data.fail;
                    if (handle) {
                        handle.func.apply(handle.target, handle.args);
                    }
                }
            } else if (time >= data.cfg.sharegap1 && time < data.cfg.sharegap2) {       // 3000  到 5000
                if (share.curShareTimes >= data.cfg.max_allow_times) {                  //分享次数过多
                    messageTips(data.cfg.shared_group_tips);
                    if (data.fail) {
                        var handle = data.fail;
                        if (handle) {
                            handle.func.apply(handle.target, handle.args);
                        }
                    }
                } else {                                       //分享成功
                    share.curShareTimes++;                     //分享成功，增加一次(该数据没有保存，每次启动游戏都是0，那么只要登陆每次分享都可以分享三次)

                    if (data.succ) {
                        var handle = data.succ;
                        if (handle) {
                            handle.func.apply(handle.target, handle.args);
                        }
                    }
                }
                

            } else if (time >= data.cfg.sharegap2) {         //分享的时间大于5000
                share.curShareTimes = 0;

                if (data.succ) {
                    var handle = data.succ;
                    if (handle) {
                        handle.func.apply(handle.target, handle.args);
                    }
                }
            }
            
            share.simShareObj = null;
        }
        if(param &&param.query && JSON.stringify(param.query) != "{}"){
            share.onNewQuery(param.query);
        }

        this.runInBack = false;
        cc.systemEvent.emit("CLIENT_GAME_RELAUNCH");
    },

    onHideGame : function(e) {

        this.runInBack = true;

        cc.log("onHideGame");

        messageTips("游戏处于后台");
        cc.systemEvent.emit("CLIENT_GAME_HIDE");
    },


    loginComplete : function() {
    
        cc.systemEvent.emit("CLIENT_GAME_START");
        cc.systemEvent.emit("GAME_START");
    },


    parseLoginData : function(obj) {
        for (var key in obj) {
            this.userInfo[key] = obj[key];
        }
    },


    moreGame() {
        if (cc.sys.browserType != cc.sys.BROWSER_TYPE_WECHAT_GAME || !this.comCfg.more_game_new.more_game_arr || this.comCfg.more_game_new.open != 1){
            return;
        }

        UIManager.openView("prefabs/more_game/more_game_view", "MoreGameView");
    },

    boxGift() {
    },

    customService() {

    },

    rechargeDiamond() {
    },

    //单机游戏
    getLocalSaveData() {
        var sm = require("SaveManager");
        sm.readGameDataFromStorge();                                    //本地读取数据
        sm.readGameData();                                              //读取游戏数据
    },
}


module.exports = ComMain;
