/**
 * 
 */

 const DENGJI = 500;
 const GYJ_SJ = 2;
 const MAX_DENGJI = 500;

 const RENWU_LV = 2;               //任务
 const CHENGJIU_LV = 3;            //
 const TOUXIAN_LV = 4;
 const TUJIAN_LV = 5;
 const XT_NAME = ["成就","任务","头衔","图鉴","排行榜","机器加速器","资金加速器","抽奖"];
 

cc.Class({
    extends: cc.Component,

    properties: {
        dengji_lb:cc.Label,                         //等级标签
        jindutiao:cc.Node,                          //进度条
        jindutiao_bg:cc.Node,                       //进度条背景
        //gy_num:cc.Label,                            //供应数量
        rate:cc.Label,                              //供应速度标签
        gy_rate:cc.Label,                           //供应速度提升标签
        need_coion_lb:cc.Label,                     //升级需要的金币标签

        // toogle_1:cc.Toggle,
        // toggle_2:cc.Toggle,     
        diamond_jingli:cc.Node,
        jiachenglb:cc.Label,
        xitong_tip:cc.Label,
        cailiao_tip:cc.Label,

        _choose_sj:1,                               //1 和 5   升级选项        
        _next_lv:0,
        _rate:0,
        _gy_rate:0,
        _need_coin:null,                               //需要金币      
        _gy_num:0,                                  //可以供应多少个商品         
        _BigNum:null,   
        _system_arr:[],
    },

    sortNum:function(a,b){
        return a.level - b.level ;
    },

    onLoad () {
        cc.systemEvent.on("GONGYINGJI_SHENG",this.updateGyj.bind(this));                                      //供应及升级，做出相应的反应，改变界面
        cc.systemEvent.on("PRODUCE_CHANGE",this.init.bind(this));              //同通改变生产
        cc.systemEvent.on("SHENGJI_TOUXIAN",this.init.bind(this));

        this._BigNum  = require("BigNum");
        var systemkaiqi = require("ComMain").gameCfgs.systemopen;
        for(var i = 1;i< 10 ;i++){
            this._system_arr[i-1] = { level:systemkaiqi[i].level ,name:systemkaiqi[i].name };
        }

        for(var i = 0;i<this._system_arr.length;i++){
            for(var j = i;j<this._system_arr.length;j++ ){
                if(this._system_arr[i].level > this._system_arr[j].level){
                    var temp = this._system_arr[i];
                    this._system_arr[i] = this._system_arr[j] ;
                    this._system_arr[j] = temp;
                }
            }
        }

        var aa = this._system_arr;
        

    },

    start () {
        this.init();
    },

    //初始化界面
    init:function(){

          /**
         * 打开加载，判断复选框
         */
        // if(  this.toogle_1.isChecked  ){
             this._choose_sj = 1;
        // }else{
        //     this._choose_sj = 5;
        // }
   

        var length = this.jindutiao_bg.width;                                     //进度条长度
        var dengji = require("PlayerManager").production_lv;                      //当前供应机等级
        var gamecfgs = require("ComMain").gameCfgs;

        this._next_lv = dengji + this._choose_sj;                                  //当前等级的下次升级
        this._need_coin = this.needMoneyCount(dengji,this._next_lv);

        var produce_type = require("PlayerManager").produceType;
        switch(produce_type){
            case 1:this._rate = require("ComMain").gameCfgs.produce[dengji].rate1;      this._gy_rate = gamecfgs.produce[this._next_lv].rate1 ; break;            //拿到了速度
            case 2:this._rate = require("ComMain").gameCfgs.produce[dengji].rate2;      this._gy_rate = gamecfgs.produce[this._next_lv].rate2 ; break;            //拿到了速度
            case 3:this._rate = require("ComMain").gameCfgs.produce[dengji].rate3;      this._gy_rate = gamecfgs.produce[this._next_lv].rate3 ; break;            //拿到了速度
            case 4:this._rate = require("ComMain").gameCfgs.produce[dengji].rate4;      this._gy_rate = gamecfgs.produce[this._next_lv].rate4 ; break;            //拿到了速度
            case 5:this._rate = require("ComMain").gameCfgs.produce[dengji].rate5;      this._gy_rate = gamecfgs.produce[this._next_lv].rate5 ; break;            //拿到了速度
            case 6:this._rate = require("ComMain").gameCfgs.produce[dengji].rate6;      this._gy_rate = gamecfgs.produce[this._next_lv].rate6 ; break;            //拿到了速度
            case 7:this._rate = require("ComMain").gameCfgs.produce[dengji].rate7;      this._gy_rate = gamecfgs.produce[this._next_lv].rate7 ; break;            //拿到了速度
            case 8:this._rate = require("ComMain").gameCfgs.produce[dengji].rate8;      this._gy_rate = gamecfgs.produce[this._next_lv].rate8 ; break;            //拿到了速度
            case 9:this._rate = require("ComMain").gameCfgs.produce[dengji].rate9;      this._gy_rate = gamecfgs.produce[this._next_lv].rate9 ; break;            //拿到了速度
            case 10:this._rate = require("ComMain").gameCfgs.produce[dengji].rate10;    this._gy_rate = gamecfgs.produce[this._next_lv].rate10 ; break;            //拿到了速度
            case 11:this._rate = require("ComMain").gameCfgs.produce[dengji].rate11;    this._gy_rate = gamecfgs.produce[this._next_lv].rate11 ; break;            //拿到了速度
            case 12:this._rate = require("ComMain").gameCfgs.produce[dengji].rate12;    this._gy_rate = gamecfgs.produce[this._next_lv].rate12 ; break;            //拿到了速度
            case 13:this._rate = require("ComMain").gameCfgs.produce[dengji].rate13;    this._gy_rate = gamecfgs.produce[this._next_lv].rate13 ; break;            //拿到了速度
            case 14:this._rate = require("ComMain").gameCfgs.produce[dengji].rate14;    this._gy_rate = gamecfgs.produce[this._next_lv].rate14 ; break;            //拿到了速度
            case 15:this._rate = require("ComMain").gameCfgs.produce[dengji].rate15;    this._gy_rate = gamecfgs.produce[this._next_lv].rate15 ; break;            //拿到了速度
        }

        /**
         * 根据数据设置界面
         */
        var bili = (dengji % 10) == 0 ? 10:dengji % 10 ;
        this.jindutiao.width = (bili/10) * length;                                        //进度调显示长度

        if(bili == 10){
            this.diamond_jingli.active = false;
        }else{
            this.diamond_jingli.active = true;
        }

        this.dengji_lb.string = "Lv: "+dengji ;                                                //等级：5
        //this.gy_num.string = "等级达到"+this._next_lv + "时,"+"供应量增加到"+this._gy_num+"个";
        this.jiachenglb.string =  parseInt(gamecfgs.produce[dengji].goldbonus * 100).toString()+"%";
        
        this.rate.string = this._rate;                                                           //当前速度
        this.gy_rate.string = this._gy_rate;                                                     //升级增加的速度
        this.need_coion_lb.string = this._BigNum.Show( this._need_coin ) // this._need_coin ;                                             //升级需要的金币

        //系统开启提示
        
        for(var i = 0; i<this._system_arr.length ;i++){
            if( dengji < this._system_arr[i].level ){
                    this.xitong_tip.node.active = true;
                    this.xitong_tip.string = "供应机"+this._system_arr[i].level +"级开启"+ this._system_arr[i].name + "系统";
                    break;
            }else{
                    this.xitong_tip.node.active = false;
            }   
        }

        var xcc =  this.needDengji(dengji);
        if(xcc == -1){
            this.cailiao_tip.node.active = false;
        }else{
            this.cailiao_tip.string = "供应机达到"+ xcc +"开启新材料";
            this.cailiao_tip.node.active = true;
        }



    },

    yuPan:function(){
        var gamecfgs = require("ComMain").gameCfgs; 
        var dengji = require("PlayerManager").production_lv;                      //当前供应机等级
        this._next_lv = dengji + this._choose_sj;                                  //当前等级的下次升级
        this._need_coin = this.needMoneyCount(dengji,this._next_lv);
        this.need_coion_lb.string =  this._BigNum.Show( this._need_coin ) ;         //this._need_coin;                                             //升级需要的金币
        //this.gy_num.string = "等级达到"+this._next_lv + "时,"+"供应量增加到"+this._gy_num+"个";
    },

    //强化升级
    /**
     * 通过 
     */
    qinghuaButton:function(){
        var self = this;

                    // //按钮声音
                    // require("Audio").play("Click",false,1);

    
        console.log("强化");
                    
        var sum_coin = require("PlayerManager").coin;                                       //总财富

        // var touxianlv = require("PlayerManager").touxianlv;     //头衔等级
        // var touxianjiacheng = require("ComMain").gameCfgs.touxian[touxianlv].jiacheng;
        // this._need_coin = this._BigNum.Div(this._need_coin , touxianjiacheng);
     
        if( this._BigNum.ChargeBig( sum_coin , this._need_coin ) ){
            /**
             * 升级
             * 扣钱
             * 保存等级
             * 通知刷新
             */
            this.node.getChildByName("sell_action").active = true;
            this.node.getChildByName("sell_action").getComponent(cc.Animation).play("sell_money");

            require("PlayerManager").production_lv = this._next_lv;                      //升级

            if( (this._next_lv % 10) == 0 ){
                require("PlayerManager").diamond += 10;
                this.node.getChildByName("move").getComponent(cc.Animation).play("jinbiup");
                var n = this.node.getChildByName("move").getComponent(cc.Animation);
            }

            require("PlayerManager").coin = this._BigNum.Sub( sum_coin , self._need_coin ) ;
            cc.systemEvent.emit("GONGYINGJI_SHENG");      
            cc.systemEvent.emit("P");                                            //通知供应机升级
            cc.systemEvent.emit("UI_CHANGE");
            this.init();
            console.log("升级成功");
            cc.systemEvent.emit("RED_CHANGE");

            var dj = require("PlayerManager").production_lv
            var enable_index = require("ComMain").gameCfgs.produce[dj].enable; 
            if(require("PlayerManager").illustrated[ enable_index-1 ] <= 0  ){
                cc.systemEvent.emit("KAIQI_ZHONGLEI",enable_index);
                require("PlayerManager").illustrated[ enable_index-1 ] = 1;
            }

            require("PlayerManager").achievement_jindu[GYJ_SJ] = dj;


            //通知系统
            var systemkaiqi = require("PlayerManager").systemKaiqi;
            var systemopen = require("ComMain").gameCfgs.systemopen;
            if( systemopen[2].level != 0 &&  require("PlayerManager").production_lv >= systemopen[2].level && systemkaiqi[0] == 0 ){              //通知开启成就
                cc.systemEvent.emit("KAIQI_CHENGJIU");
                systemkaiqi[0] = 1;
                this.node.getChildByName("sell_action").active = false;
                this.node.getChildByName("sell_action").getComponent(cc.Animation).stop("sell_money");
                this.node.active = false;
            }
            if( systemopen[1].level != 0 && require("PlayerManager").production_lv >= systemopen[1].level  && systemkaiqi[1] == 0){                 //通知开启任务
                cc.systemEvent.emit("KAIQI_RENWU");
                systemkaiqi[1] = 1;
                this.node.getChildByName("sell_action").active = false;
                this.node.getChildByName("sell_action").getComponent(cc.Animation).stop("sell_money");
                this.node.active = false;
            }
            if( systemopen[4].level != 0 && require("PlayerManager").production_lv >= systemopen[4].level && systemkaiqi[2] == 0 ){              //通知开启头衔
                cc.systemEvent.emit("KAIQI_TOUXIAN");
                systemkaiqi[2] = 1;
                this.node.getChildByName("sell_action").active = false;
                this.node.getChildByName("sell_action").getComponent(cc.Animation).stop("sell_money");
                this.node.active = false;
            }
            // if( systemopen[3].level != 0 &&  require("PlayerManager").production_lv >= systemopen[3].level && systemkaiqi[3] == 0){                 //通知开启图鉴
            //     cc.systemEvent.emit("KAIQI_TUJIAN");
            //     systemkaiqi[3] = 1;
            //     this.node.getChildByName("sell_action").active = false;
            //     this.node.getChildByName("sell_action").getComponent(cc.Animation).stop("sell_money");
            //     this.node.active = false;
            // }

            if( systemopen[5].level != 0 && require("PlayerManager").production_lv >= systemopen[5].level && systemkaiqi[4] == 0){                 //通知开启排行榜
                // cc.systemEvent.emit("KAIQI_RANK");
                // systemkaiqi[4] = 1;
                // this.node.getChildByName("sell_action").active = false;
                // this.node.getChildByName("sell_action").getComponent(cc.Animation).stop("sell_money");
                // this.node.active = false;
            }

            if(systemopen[6].level != 0 &&  require("PlayerManager").production_lv >= systemopen[6].level && systemkaiqi[5] == 0){                 //通知开启机器加速器
                cc.systemEvent.emit("KAIQI_MACHINE");
                systemkaiqi[5] = 1;
                this.node.getChildByName("sell_action").active = false;
                this.node.getChildByName("sell_action").getComponent(cc.Animation).stop("sell_money");
                this.node.active = false;
            }

            if( systemopen[7].level != 0 &&  require("PlayerManager").production_lv >= systemopen[7].level && systemkaiqi[6] == 0){                 //通知开启资金加速器
                cc.systemEvent.emit("KAIQI_MONEY");
                systemkaiqi[6] = 1;
                this.node.getChildByName("sell_action").active = false;
                this.node.getChildByName("sell_action").getComponent(cc.Animation).stop("sell_money");
                this.node.active = false;
            }

            if( systemopen[8].level != 0 &&  require("PlayerManager").production_lv >= systemopen[8].level  && systemkaiqi[7] == 0){                 //通知开启抽奖
                cc.systemEvent.emit("KAIQI_CHOUJIANG");
                systemkaiqi[7] = 1;
                this.node.getChildByName("sell_action").active = false;
                this.node.getChildByName("sell_action").getComponent(cc.Animation).stop("sell_money");
                this.node.active = false;
            }

            if( systemopen[9].level != 0 && require("PlayerManager").production_lv >= systemopen[9].level && systemkaiqi[8] == 0 ){
                // cc.systemEvent.emit("KAIQI_QIANDAO");
                // systemkaiqi[8] = 1;
                // this.node.getChildByName("sell_action").active = false;
                // this.node.getChildByName("sell_action").getComponent(cc.Animation).stop("sell_money");
                // this.node.active = false;
            }

        }else{
            messageTips("金币不足");
            cc.systemEvent.emit("COIN_LESS");
        }

    },


    //供应及升级，改变界面
    updateGyj:function(){
        this.init();
    },



    //等级升1
    toggle_1_choose:function(){       
        //             //按钮声音
        //             require("Audio").play("Click",false,1);


        // this._choose_sj = 1;
        // this.yuPan();
    },
    
    //等级升5
    toggle_2_choose:function(){
        //             //按钮声音
        //             require("Audio").play("Click",false,1);


        // this._choose_sj = 5;
        // this.yuPan();
    },


    //读取数据
    readConfigData:function(){
        
    },


    backButton:function(){
                    //按钮声音
                    require("Audio").play("Click",false,1);

        this.node.active = false;
    },
    
    needMoneyCount(lv,next_lv){                                     //当前等级跟要升的等级
        var produce = require("ComMain").gameCfgs.produce;
        
        var sub = next_lv - lv;
        //var sum = 0;
        var sum = {unit:0, time:0 };

        for(var i = 0;i<sub;i++){
            //sum += produce[lv+1+i].consume;
             sum  = this._BigNum.Add( produce[lv+1+i].consume , sum ) ;
        }
        var touxianlv = require("PlayerManager").touxianlv;     //头衔等级
        var touxianjiacheng = require("ComMain").gameCfgs.touxian[touxianlv].jiacheng;
        sum = this._BigNum.Div(sum , touxianjiacheng);

        return sum;
    },

    //供应机多少级开启新材料
    needDengji:function(dengji){
                                   
        var enableindex = require("ComMain").gameCfgs.produce[dengji].enable ;                               //可以生产种类
        var produce = require("ComMain").gameCfgs.produce;


        for(var i = 1 ;i< MAX_DENGJI;i++){
            if(produce[i].enable  == ( enableindex + 1 ) ){
                return i;
                break;
            }
        }
        return -1;
    },

    // update (dt) {},
});

