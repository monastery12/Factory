
const  CJ_AD = 9;
const CJ_ZIJIN = 6;

const JIANGE = 5 ;

cc.Class({
    extends: cc.Component,

    properties: {

        child:cc.Node,

        jindutiao:cc.Node,
        jingdutiao_bg:cc.Node,

        jiasu_lb:cc.Label,
        jiasu_node:cc.Node,

        time_lb:cc.Label,
        dengji_lb:cc.Label,
        jindu_lb:cc.Label,
        next_time_lb:cc.Label,

        shiping_buttong:cc.Node,
        share_buttong:cc.Node,

        _time:0,
        _dengji:0,
        _jindu:0,
        _next_time:0,
        _jihuo_time:0,                               //资金加速器是否激活，在看第一次视频的时候就激活
        _need_shengji_count:0,                       //升级需要的等级次数
      

        _playerManger:null,
        _runninng:false,
        _first_open:true,

        _login_open:false,


       
    },



    onLoad () {
        // cc.systemEvent.on("JIASU_ICON_XIAOSI",this.icon_xiaosi.bind(this));
        // cc.systemEvent.on("JIASU_ICON_CHUXIAN",this.icon_chuxian.bind(this));
        cc.systemEvent.on("OPEN_MONEY",this.init.bind(this));
    },

    start () {

    },

    callFunc:function(){
        var self = this;

        if(self._jihuo_time > 0){
            self._jihuo_time -- ;
            self._playerManger.money_jihuo_time = self._jihuo_time ;
            self.time_lb.string = self._jihuo_time + "秒内资金收益增加200%";
            var fengzhong = parseInt( self._jihuo_time / 60 );
            var miao = self._jihuo_time % 60        ;
            self.jiasu_lb.string = fengzhong +":"+miao;
        }else{
            this._first_open = true;
            cc.systemEvent.emit("STOP_MONEY_JIASU");  
            self._playerManger.money_jihuo_time = -1;     
            this.jiasu_node.active = false;
            this.unschedule(this.callFunc);
            //this.init();
            this.initJimian();
        }
    },

    onEnable:function(){
        this.init();
    },


    initJimian:function(){
        var self = this;

        this.child.Node.active = false;


        if(this._playerManger == null){
            this._playerManger = require("PlayerManager");
        }

        this._jihuo_time = this._playerManger.money_jihuo_time  ;                             //激活剩余时
        this._dengji = this._playerManger.money_jiasu_lv;                                   //资金加速器等级
        this._jindu  = this._playerManger.money_jiasu_jindu;                                //资金加速器进度
        this._time  = require("ComMain").gameCfgs.money_jiasu[this._dengji].time1;          //可以加速的时间
        this._need_shengji_count = require("ComMain").gameCfgs.money_jiasu[this._dengji + 1].number1;  //


        this.time_lb.string = this._time + "秒内资金收益增加200%";
        this.dengji_lb.string = "等级:"+this._dengji;
        this.next_time_lb.string = "下一级持续时间增加"+ (require("ComMain").gameCfgs.money_jiasu[this._dengji+1].time1 - this._time ) +"秒";
        this.jindu_lb.string = this._jindu +"/"+ this._need_shengji_count;

        this.jindutiao.width = this.jingdutiao_bg.width * (this._jindu / this._need_shengji_count);                 //进度条


        if(this._jihuo_time != -1 && this._first_open == true ){       
            this._first_open = false;
            this.child.active = false;     
            
            /**
             * 处理时间差问题
             */
            var now =  require("PlayerManager").svrTimestamp; //(new Date()).getTime();
            var sub_time= Math.floor( (now - this._playerManger.last_login)/(1000*60) );              //距离上次登陆时间
            if( this._playerManger.money_jihuo_time > sub_time ){
                this._playerManger.money_jihuo_time  -= sub_time;
            }else{
                this._playerManger._jihuo_time = -1;
                self._jihuo_time = -1;
            }

 
            
              //激活
              this.jiasu_node.active = true;
              this.jiasu_lb.string = "剩"+this._playerManger.money_jihuo_time+"分钟";
              cc.systemEvent.emit("OPEN_MONEY_JIASU");
              this.schedule(self.callFunc,1);                     //一分钟回调一次
              this.child.active = true;         
        }

        //控制显示视频跟分享
        if(this._playerManger.shiping_share_count < 5 && this._jihuo_time == -1){
            this.shiping_buttong.active = true;
            this.share_buttong.active = false;
        }else if(this._playerManger.shiping_share_count >=5 && this._jihuo_time == -1){
            this.shiping_buttong.active = false;
            this.share_buttong.active = true;
        }else{
            this.shiping_buttong.active = false;
            this.share_buttong.active = false;
        }

        if(this._login_open == false){
            this.child.active = false;
            this._login_open = true;
        }else{
            this.child.active = true;         
        }

        this.child.Node.active = false;
    },

    init:function(){
        var self = this;

        


        if(this._playerManger == null){
            this._playerManger = require("PlayerManager");
        }

        this._jihuo_time = this._playerManger.money_jihuo_time  ;                             //激活剩余时
        this._dengji = this._playerManger.money_jiasu_lv;                                   //资金加速器等级
        this._jindu  = this._playerManger.money_jiasu_jindu;                                //资金加速器进度
        this._time  = require("ComMain").gameCfgs.money_jiasu[this._dengji].time1;          //可以加速的时间
        this._need_shengji_count = require("ComMain").gameCfgs.money_jiasu[this._dengji + 1].number1;  //


        this.time_lb.string = this._time + "秒内资金收益增加200%";
        this.dengji_lb.string = "等级:"+this._dengji;
        this.next_time_lb.string = "下一级持续时间增加"+ (require("ComMain").gameCfgs.money_jiasu[this._dengji+1].time1 - this._time ) +"秒";
        this.jindu_lb.string = this._jindu +"/"+ this._need_shengji_count;

        this.jindutiao.width = this.jingdutiao_bg.width * (this._jindu / this._need_shengji_count);                 //进度条


        if(this._jihuo_time != -1 && this._first_open == true ){       
            this._first_open = false;
            this.child.active = false;     
            
            /**
             * 处理时间差问题
             */
            var now =  require("PlayerManager").svrTimestamp; //(new Date()).getTime();
            var sub_time= Math.floor( (now - this._playerManger.last_login)/(1000*60) );              //距离上次登陆时间
            if( this._playerManger.money_jihuo_time > sub_time ){
                this._playerManger.money_jihuo_time  -= sub_time;
            }else{
                this._playerManger._jihuo_time = -1;
                self._jihuo_time = -1;
            }

 
            
              //激活
              this.jiasu_node.active = true;
              this.jiasu_lb.string = "剩"+this._playerManger.money_jihuo_time+"分钟";
              cc.systemEvent.emit("OPEN_MONEY_JIASU",this._playerManger.money_jihuo_time);
              this.schedule(self.callFunc,1);                     //一分钟回调一次
              this.child.active = true;         
        }

        //控制显示视频跟分享
        if(this._playerManger.shiping_share_count < 5 && this._jihuo_time == -1){
            this.shiping_buttong.active = true;
            this.share_buttong.active = false;
        }else if(this._playerManger.shiping_share_count >=5 && this._jihuo_time == -1){
            this.shiping_buttong.active = false;
            this.share_buttong.active = true;
        }else{
            this.shiping_buttong.active = false;
            this.share_buttong.active = false;
        }

        if(this._login_open == false){
            this.child.active = false;
            this._login_open = true;
        }else{
            this.child.active = true;         
        }
                                                       //
    },


    //点击视频
    shipingClick:function(){
                    //按钮声音
                    require("Audio").play("Click",false,1);

        require("Ad").rewardAd.show();                                          //从小往上弹出视频广告
    },
    //点击分享
    shareClick:function(){
                    //按钮声音
                    require("Audio").play("Click",false,1);



        var self = this;
        var obj  = {
            name:"leave_double",
            callback:{
                func:self.onShareGetCount,
                target:self,
            }
        }

        cc.systemEvent.emit("COM_SHARE_GAME",obj);    
    },


    //分享回调
    onShareGetCount:function(){
        var self = this;
        if(this._jihuo_time == -1){
            //还没有激活，需要激活
            this._jihuo_time = this._time;
            this._playerManger.money_jihuo_time = this._time;
            this._runninng = true;
            this.init();
        }
        cc.systemEvent.emit("OPEN_MONEY_JIASU");
        this._jindu ++;                                             //增加进度
        this._playerManger.money_jiasu_jindu ++;     
        if(this._jindu >= this._need_shengji_count ){

            this._playerManger.money_jiasu_jindu = 0;               //升级，进度又为0

            if( this._playerManger.money_jiasu_lv < 20 ){
                this._playerManger.money_jiasu_lv ++;
            }else{
                //messageTip("等级已经达到上限");
            }

        }
 
        messageTips("分享成功");
        require("PlayerManager").achievement_jindu[CJ_ZIJIN] ++;
        this.init();                        
    },

    //视频回调
    onShipingGetCount:function(){

        var self = this;
        if(this._jihuo_time == -1){
            //还没有激活，需要激活
            this._jihuo_time = this._time;
            this._playerManger.money_jihuo_time = this._time;
            this._runninng = true;
            this.init();
        }
        cc.systemEvent.emit("OPEN_MONEY_JIASU");
        this._jindu ++; 
        this._playerManger.money_jiasu_jindu ++;        //增加进度   
        this._playerManger.shiping_share_count ++;      //同时视频观看次数增加
        if(this._jindu >= this._need_shengji_count ){

            this._playerManger.money_jiasu_jindu = 0;               //升级，进度又为0

            if( this._playerManger.money_jiasu_lv < 20 ){
                this._playerManger.money_jiasu_lv ++;
            }else{
                //messageTip("等级已经达到上限");
            }

        }

        messageTips("观看视频获得奖励");

        require("PlayerManager").achievement_jindu[CJ_AD] ++;
        require("PlayerManager").achievement_jindu[CJ_ZIJIN] ++;
        this.init();                  
    },

    backClick:function(){
        //按钮声音
        require("Audio").play("Click",false,1);
                            
        this.child.active = false;
    },

    icon_xiaosi:function(){
        //this.jiasu_node.opacity = 0;
    },
    icon_chuxian:function(){
        //this.jiasu_node.opacity = 255;
    },

    // update (dt) {},
});
