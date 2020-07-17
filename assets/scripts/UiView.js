
const CJ_MONEY = 4;
const TASK2_TIME = 1800;

cc.Class({
    extends: cc.Component,

    properties: {
        coin_num:cc.Label,                                               //金币
        sellMoney_node:cc.Node,                                         //赚钱动画
        sellMoney_lb:cc.Label,                                          //赚钱数字
        diamond_num:cc.Label,                                            //钻石
        screw_num:cc.Label,                                              //螺丝

        task_node:cc.Node,                                              //任务
        task_node2:cc.Node,
        task_jishiqi:cc.Node,
        task_forever:cc.Node,
        
        chengjiu_node:cc.Node,                                          //打开成就
        set_node:cc.Node,                                               //打开设置
        tujian_node:cc.Node,                                            //图鉴
        zijingJiasuqi:cc.Node,
        machineJiasuqi:cc.Node,

        xinfaxian_node:cc.Node,
        icon_node:cc.Sprite,
        value_lb:cc.Label,
        

        chouti_plane:cc.Node,                                           //抽屉面板
        chouti_bg:cc.Node,                                              //抽屉背景

        dibu_node:cc.Node,

        time_lb:cc.Label,

        choujiang:cc.Node,                                  //抽奖
        share_node:cc.Node,                                     
        duihuan_node:cc.Node,
        //paihangbang:cc.Node,                                //排行榜

        red:cc.Node,
        kaiqi_node:cc.Node,                             //开启
        //illred:cc.Node,



        //箭头
        chengjiu_jiantou:cc.Node,                   //成就箭头
        renwu_jiantou:cc.Node,                      //任务箭头
        tujian_jiantou:cc.Node,
        touxian_jiantou:cc.Node,

        rank_jiantou:cc.Node,
        machine_jiantou:cc.Node,
        money_jiantou:cc.Node,
        choujiang_jiantou:cc.Node,
        qiandao_jiantou:cc.Node,
        

        //头衔
        touxian_node:cc.Node,
        touxian_lb:cc.Label,
        touxian_image:cc.Sprite,

        //系统按钮
        task_btn_node:cc.Node,
        chengjiu_btn_node:cc.Node,
        tujian_btn_node:cc.Node,
        touxian_btn_node:cc.Node,

        rank_btn_node:cc.Node,
        machine_btn_node:cc.Node,
        money_btn_node:cc.Node,
        choujiang_btn_node:cc.Node,
        qiandao_btn_node:cc.Node,

        task1:cc.Node,
        task2:cc.Node,

        //admenu:cc.Node,

        loginAward_node:cc.Node,

        //touxian资源
        _tx_assest:null,

        _chouti_open:false,
        _chouti_enable:true,

        _time_xianzhi:false,
        _time_all:0,

        _Money_jiasu:1,

        _assest:null,
        _xinfaxian_data:[],
        _faxianzhong:false,

        //_touxianjiacheng:1,                         //头衔加成
        _BigNum:null,
        _task_wancheng:false,
        _task_wancheng2:false,
        _wait_data:[],
    
    },



    onLoad () {
        this._BigNum = require("BigNum");
        this._Money_jiasu = 1;
        cc.systemEvent.on("SELL_MONEY",this.sellMoney.bind(this));                      //卖钱
        cc.systemEvent.on("OPEN_CHOUTI",this.openchiuti.bind(this));            //打开抽屉

      
        cc.systemEvent.on("UI_CHANGE",this.init.bind(this));
        cc.systemEvent.on("TASK_1_PRODUCE",this.updateProduce.bind(this));
        cc.systemEvent.on("TASK1_CHANGE",this.taskRunning.bind(this));
        cc.systemEvent.on("TASK_2_PRODUCE",this.updateProduce2.bind(this));
        cc.systemEvent.on("UPDATE_TMIE_XIANZHI",this.updateTimexianzhi.bind(this));                             //任务2完成，通知计时冷却
        cc.systemEvent.on("TASK1_WANCHENG",this.updateWanchengTask1.bind(this));
        cc.systemEvent.on("TASK2_WANCHENG",this.updateWanchengTask2.bind(this));

        cc.systemEvent.on("TASK_1_RUNNING",this.taskRunning.bind(this));                                        //
        cc.systemEvent.on("TASK_2_RUNNING",this.taskRunning22.bind(this));                                        //

        //cc.systemEvent.on("OPEN_MONEY_JIASU",this.open_Money_Jiasu.bind(this));                                 //资金加速
        //cc.systemEvent.on("STOP_MONEY_JIASU",this.stop_Money_Jiasu.bind(this));                                 //关闭资金加速
        cc.systemEvent.on("UI_ARARD",this.uiAward.bind(this));                                                  //获取金币
        cc.systemEvent.on("FAXIAN_NEW_GOODS",this.xinfaxian.bind(this));                                               //
        cc.systemEvent.on("SHENGJI_TOUXIAN",this.shengjitouxian.bind(this));

        cc.systemEvent.on("COIN_LESS",this.duihuanButton.bind(this));
        cc.systemEvent.on("SCREW_LESS",this.duihuanButton2.bind(this));

        cc.systemEvent.on("XINSHOU_OVER",this.xinshouOver.bind(this));

        var systemkaiqi = require("PlayerManager").systemKaiqi;
        var systemopen = require("ComMain").gameCfgs.systemopen;

        

        if( systemopen[2].level == 0 || (  systemkaiqi[0] == 1) ) {        //成就
            this.chengjiu_btn_node.active = true;  
        }
        if( systemopen[1].level == 0 || ( systemkaiqi[1] == 1) ) {
            this.task_btn_node.active = true;
            this.task1.active = true;
            this.task2.active = true;
        }
        if( systemopen[4].level == 0 || ( systemkaiqi[2] == 1) ) {
            this.touxian_btn_node.active = true;
        }
        if( systemopen[3].level == 0 || ( systemkaiqi[3] == 1) ) {
            //this.tujian_btn_node.active = true;
        }

        if(systemopen[5].level == 0 || (  systemkaiqi[4] == 1)){
            //this.rank_btn_node.active = true;
        }
        if(systemopen[6].level == 0 || ( systemkaiqi[5] == 1)){
            this.machine_btn_node.active = true;
        }
        if(systemopen[7].level == 0 || ( systemkaiqi[6] == 1)){   
            //this.money_btn_node.active = true;
        }
        if(systemopen[8].level == 0 || ( systemkaiqi[7] == 1)){
            this.choujiang_btn_node.active = true;
        }
        if(systemopen[9].level == 0 || ( systemkaiqi[8] == 1)){
            this.qiandao_btn_node.active = false;
        }
    },

    // kaiqizhonglei:function(index){
    //     this.kaiqi_node[index - 2].active = true;
    // },


    //升级头衔
    shengjitouxian:function(){
        var self =  this;
        var touxianLv =  require("PlayerManager").touxianlv;                 //头衔等级
        if(touxianLv == 0 ) return ;
        //this._touxianjiacheng = require("ComMain").gameCfgs.touxian[touxianLv].jiacheng;

        var now_name  = require("ComMain").gameCfgs.touxian[touxianLv].name;                            //名称
        var image     = require("ComMain").gameCfgs.touxian[touxianLv].image;                           //背景图

        this.touxian_lb.string = now_name;

        if( this._tx_assest ){
            this.touxian_image.spriteFrame = this._tx_assest.getSpriteFrame(image);
        }else{
            cc.loader.loadRes("plist/touxian", cc.SpriteAtlas, function(err, atlas) {                   //加载图集
                if(err == null){
                    self._tx_assest = atlas;
                    self.touxian_image.spriteFrame = self._tx_assest.getSpriteFrame(image);
                }
             });
        }
    
    },

    updateProduce:function(){
        if( require("PlayerManager").had_produce_num <= require("PlayerManager").produce_num){
            this.task_forever.getChildByName("la").getChildByName("had_num").getComponent(cc.Label).string =  require("PlayerManager").had_produce_num;
        }else{
            require("PlayerManager").had_produce_num = require("PlayerManager").produce_num;
            this.task_forever.getChildByName("la").getChildByName("had_num").getComponent(cc.Label).string =  require("PlayerManager").had_produce_num;
            this.task_forever.getChildByName("running").active = false;

            
        }
    },

    updateProduce2:function(){
        if( require("PlayerManager").had_produce_num2 <= require("PlayerManager").produce_num2){
            this.task_jishiqi.getChildByName("la").getChildByName("had_num").getComponent(cc.Label).string =  require("PlayerManager").had_produce_num2;
            this._task_wancheng2 = false;
        }else{
            require("PlayerManager").had_produce_num2 = require("PlayerManager").produce_num2;
            this.task_jishiqi.getChildByName("la").getChildByName("had_num").getComponent(cc.Label).string =  require("PlayerManager").had_produce_num2;
            //this.task_jishiqi.getChildByName("lengque_bg").active = false;
            if(this._task_wancheng2 == false){
                this.task_jishiqi.getChildByName("wancheng").active = true;
                this._task_wancheng2 = true;
            }
    

        }
    },


    taskRunning:function(data){
        var self = this;
        this._task_wancheng = false;

        if( require("PlayerManager").task_index == -1 ){
            return ;
        }
        else if( data == null ){

            var task_index = require("PlayerManager").task_index;                           //任务
            var goods = require("ComMain").gameCfgs.goods;
    
           var icon_url =  goods[task_index].icon ;                            //生产什么
            
            if(this._assest){
                this.task_forever.getChildByName("bg").getComponent(cc.Sprite).spriteFrame = this._assest.getSpriteFrame( icon_url.toString() );
            }else{
                cc.loader.loadRes("Images/gongyingji/produce_choose", cc.SpriteAtlas, function (err, atlas) {                   //加载图集
                    if(err == null){
                        self._assest = atlas;
                        self.task_forever.getChildByName("bg").getComponent(cc.Sprite).spriteFrame = self._assest.getSpriteFrame( icon_url.toString() );
                    }
                 });
            }

            if(require("PlayerManager").produce_num <=  require("PlayerManager").had_produce_num ){
                require("PlayerManager").had_produce_num = require("PlayerManager").produce_num;
            }

            this.task_forever.getChildByName("la").getChildByName("num").getComponent(cc.Label).string = "/"+ require("PlayerManager").produce_num;
            this.task_forever.getChildByName("running").active = true;
            this.task_forever.getChildByName("wancheng").active = false;
            this.task_forever.getChildByName("la").getChildByName("had_num").getComponent(cc.Label).string =  require("PlayerManager").had_produce_num;
            this.task_forever.getChildByName("la").getChildByName("had_num").active = true;
            this.task_forever.getChildByName("la").getChildByName("num").active = true;
            return ;
        }

        var sp = data.sp;
        var num = data.num;

        this.task_forever.getChildByName("bg").getComponent(cc.Sprite).spriteFrame = sp;
        this.task_forever.getChildByName("la").getChildByName("num").getComponent(cc.Label).string = "/"+num;
        this.task_forever.getChildByName("running").active = true;
        this.task_forever.getChildByName("wancheng").active = false;
    },

    taskRunning22:function(){
        this.taskRunning2(null);
    },

    taskRunning2:function(data){
        var self = this;
 

        if( require("PlayerManager").task2_index == -1 ){
            return ;
        }
        else if( data == null ){

            var task_index = require("PlayerManager").task2_index;                           //任务
            if( task_index == -1 ){
                return ;
            }
            var goods = require("ComMain").gameCfgs.goods;
    
           var icon_url =  goods[task_index].icon ;                            //生产什么
            
            if(this._assest){
                this.task_jishiqi.getChildByName("bg").getComponent(cc.Sprite).spriteFrame = this._assest.getSpriteFrame( icon_url.toString() );
            }else{
                cc.loader.loadRes("Images/gongyingji/produce_choose", cc.SpriteAtlas, function (err, atlas) {                   //加载图集
                    if(err == null){
                        self._assest = atlas;
                        self.task_jishiqi.getChildByName("bg").getComponent(cc.Sprite).spriteFrame = self._assest.getSpriteFrame( icon_url.toString() );
                    }
                 });
            }

            
            if(require("PlayerManager").produce_num2 <=  require("PlayerManager").had_produce_num2 ){
                require("PlayerManager").had_produce_num2 = require("PlayerManager").produce_num2;
            }


            this.task_jishiqi.getChildByName("la").getChildByName("num").getComponent(cc.Label).string = "/"+ require("PlayerManager").produce_num2;
            //this.task_jishiqi.getChildByName("running").active = true;
            this.task_jishiqi.getChildByName("la").getChildByName("had_num").getComponent(cc.Label).string =  require("PlayerManager").had_produce_num2;
            this.task_jishiqi.getChildByName("la").getChildByName("had_num").active = true;
            this.task_jishiqi.getChildByName("la").getChildByName("num").active = true;
            this.task_jishiqi.getChildByName("la").active = true;

            this.task_jishiqi.getChildByName("bg").active = true;


            //*********************************//
            this.task_jishiqi.getChildByName("lengque_bg").active = false;
            this.task_jishiqi.getChildByName("icon_daojishi").getChildByName("xianzhi").active = false;
            this.task_jishiqi.getChildByName("icon_daojishi").active  = false;


            self.task_jishiqi.getComponent(cc.Button).interactable = true;

            return ;
        }

        // var sp = data.sp;
        // var num = data.num;

        // this.task_forever.getChildByName("bg").getComponent(cc.Sprite).spriteFrame = sp;
        // this.task_forever.getChildByName("la").getChildByName("num").getComponent(cc.Label).string = "/"+num;
        // this.task_forever.getChildByName("running").active = true;
    },

    xinshouOver:function(){
        // var obj = this._wait_data.shift();
        // this.xinfaxian(obj);
    },

    xinfaxian:function(obj){
        var self = this;

        // if( require("PlayerManager").first_boomer == true ){
        //     this._wait_data.push(obj) ;
        //     return;
        // }

        this._xinfaxian_data.push(obj);

        if(this._faxianzhong == true){
            return ;
        }

        
        if(this._xinfaxian_data.length <= 0 ){
            return ;
        }

        this._faxianzhong = true;
        var data = this._xinfaxian_data.shift();

        //新发现
        require("Audio").play("New",false,1);

        this.xinfaxian_node.active = true;
        this.node.getChildByName("newgoods_tip").active = true;

        // if( this.admenu.x > -466 ){
        //     cc.systemEvent.emit("ADMENU_CLOSE");
        // }

        var z = data.z;
        var d = data.d;
        var icon_url = z.toString()+ (d-1).toString();

        if(this._assest){
            this.icon_node.spriteFrame = this._assest.getSpriteFrame(icon_url);
        }else{
            cc.loader.loadRes("Images/gongyingji/produce_choose", cc.SpriteAtlas, function (err, atlas) {                   //加载图集
                if(err == null){
                    self._assest = atlas;
                    self.icon_node.spriteFrame = self._assest.getSpriteFrame(icon_url);
                }
             });
        }
        var index = (z-1)*6 + d;
        this.value_lb.string = this._BigNum.Show(require("ComMain").gameCfgs.goods[index].value ); //  ;
        
    },


    sureXinfaxian:function(){
        this.xinfaxian_node.active = false;
        this._faxianzhong = false;
        if(this._xinfaxian_data.length > 0){
            this.xinfaxian(this._xinfaxian_data.shift());
        }
    },

    uiAward:function(money){
          //显示金币
        //   var playerManager = require("PlayerManager");

        require("PlayerManager").coin  = this._BigNum.Add( money , require("PlayerManager").coin  ) ; //  money * this._Money_jiasu;
        this.init();
    },

    //资金加速
    open_Money_Jiasu:function(){
        this._Money_jiasu = 2;
    },
    stop_Money_Jiasu:function(){
        this._Money_jiasu = 1;
    },

    updateTimexianzhi:function(){                                           //冷却
             var self = this;

            this._time_all = require("PlayerManager").task2_time;   //冷却时间
            self.task_jishiqi.getComponent(cc.Button).interactable = true;
            var now = require("PlayerManager").svrTimestamp; //(new Date()).getTime();                       //当前时间
            var last_login = require("PlayerManager").last_login;   //上次登陆时间
            if( last_login != 0 ){
                var sub_time = parseInt( (now - last_login)/(1000)  );
                if(this._time_all - sub_time > 0){
                    this._time_all -= sub_time;
                }else{
                    this._time_all = 0;
                    require("PlayerManager").task2_index = -1 ;
                    cc.systemEvent.emit("QIEHUAN_TASK");            //冷却完成，通知刷新任务
                    //this.task_jishiqi.getChildByName("lengque_bg").active = false;

                    //***************************************315 八点50************************//
                    this.task_jishiqi.getChildByName("lengque_bg").active = false;
                    this.task_jishiqi.getChildByName("icon_daojishi").getChildByName("xianzhi").active = false;
                    this.task_jishiqi.getChildByName("bg").active = true;
                    this.task_jishiqi.getChildByName("la").active =true;

                    this.task_jishiqi.getChildByName("la").active = true;
                    this.task_jishiqi.getChildByName("icon_daojishi").active  = false;

                    return ;
                }
            }

            this.task_jishiqi.getChildByName("lengque_bg").active = true;
            this.task_jishiqi.getChildByName("icon_daojishi").getChildByName("xianzhi").active = true;
            this.task_jishiqi.getChildByName("bg").active = false;
            this.task_jishiqi.getChildByName("la").active =false;

            this.task_jishiqi.getChildByName("icon_daojishi").active  = true;

            this.task_jishiqi.getChildByName("lengque_bg").active = true;
           

            var cishu = this._time_all //> 2 ?  this._time_all  : 1;

            // this.schedule(function(){
            //     // self._time_all -- ;
            //     // require("PlayerManager").task2_time  = self._time_all ;

            //     // if( self._time_all <= 0 ){
            //     //     require("PlayerManager").task2_index = -1; 
            //     //     cc.systemEvent.emit("QIEHUAN_TASK");
            //     //     require("PlayerManager").task2_time = TASK2_TIME;
            //     //     //self.task_jishiqi.getChildByName("lengque_bg").active = false;
            //     //     self.task_jishiqi.getComponent(cc.Button).interactable = true;
            //     //     return ;
            //     // }
            //     // self.task_jishiqi.getComponent(cc.Button).interactable = false;
            //     // self.task_jishiqi.getChildByName("lengque_bg").active = true;
            //     // var fz = parseInt( self._time_all / 60 );
            //     // var mi = self._time_all % 60;
            //     // self.time_lb.string = fz +":"+ mi; 
            //     self.task2CallFunc();
            // },1 );

            this.schedule(self.task2CallFunc , 1 );

        
    },

    task2CallFunc:function(){
        var self = this;
        self._time_all -- ;
        require("PlayerManager").task2_time  = self._time_all ;

        if( self._time_all <= 0 ){
            if(self._time_all < 0){
                return;
            }
            require("PlayerManager").task2_index = -1; 
            this.unschedule(self.task2CallFunc);
            cc.systemEvent.emit("QIEHUAN_TASK");
            require("PlayerManager").task2_time = TASK2_TIME;
            self.task_jishiqi.getChildByName("lengque_bg").active = false;
            self.time_lb.node.active = false;
            self.task_jishiqi.getComponent(cc.Button).interactable = true;
          
            return ;
        }
        self.task_jishiqi.getComponent(cc.Button).interactable = false;
        self.task_jishiqi.getChildByName("lengque_bg").active = true;
        var fz = parseInt( self._time_all / 60 );
        var mi = self._time_all % 60;
        self.time_lb.string = fz +":"+ mi; 
        self.time_lb.node.active = true;
        self.task_jishiqi.getChildByName("wancheng").active = false;
    },

    //任务2完成
    updateWanchengTask2:function(){
        //this.task_jishiqi.getChildByName("lengque_bg").active = false;
        // if(this._task_wancheng2 == false){
        //     this.task_jishiqi.getChildByName("wancheng").active = true;
        //     this._task_wancheng2 = true;
        // }

    },
       //任务1完成
    updateWanchengTask1:function(){
        if(this._task_wancheng == false){
            this.task_forever.getChildByName("running").active = false;
            this.task_forever.getChildByName("wancheng").active = true;
            this._task_wancheng = true;
        }

    },


    start () {
        this.init();
        
        // if(require("PlayerManager").task2_index != -1){
        //     this.taskRunning2(null);
        // }
        this.taskRunning(null);
        this.updateProduce();
        //this.updateTimexianzhi();
        this.shengjitouxian();

    },

    //初始化    金币/钻石/零件
    init:function(){

        //显示金币
        var playerManager = require("PlayerManager");

        if(playerManager && playerManager.coin && this.coin_num ){
            this.coin_num.string = "$"+ this._BigNum.Show( playerManager.coin ) ;
        }else{
            this.coin_num.string = "$"+0;
        }

        if(playerManager && playerManager.diamond && this.diamond_num ){
            this.diamond_num.string = playerManager.diamond;
        }else{
            this.diamond_num.string = 0;
        }

        if(playerManager && playerManager.screw && this.screw_num ){
            this.screw_num.string = playerManager.screw;
        }else{
            this.screw_num.string = 0;
        }

        //成就  金钱数量
        require("PlayerManager").achievement_jindu[CJ_MONEY] = require("PlayerManager").coin;

    },

    //刷新界面
    updateView:function(){

    },

    //任务按钮
    taskClick:function(){

        //按钮声音
        require("Audio").play("Click",false,1);
        this.task_forever.getChildByName("wancheng").active = false;

        this.renwu_jiantou.active = false;

        if(this.task_node.active == true){
            cc.systemEvent.emit("TASK_1_INIT");
            //this.task_node.getChildByName("child").active = true;
        }else{
            this.task_node.active = true;
        }


    },
    task2Click:function(){

        this.task_jishiqi.getChildByName("wancheng").active = false;
        //按钮声音
         require("Audio").play("Click",false,1);
         this.renwu_jiantou.active = false;

        if(this.task_node2.active == true){
            // this.task_node2.getChildByName("child").active = true;
            cc.systemEvent.emit("TASK_2_INIT");
        }else{
            this.task_node2.active = true;
        }
        
    },

    //卖了钱
    sellMoney:function(money){
        var self = this;


        //声音
        require("Audio").play("Money",false,1);

        this.sellMoney_node.getComponent(cc.Animation).play("sell_money");

         //头衔
        // var tx_lv = require("PlayerManager").touxianlv ;
        // var tx_jc = require("ComMain").gameCfgs.touxian[tx_lv].jiacheng;     //加成

        var gyj_lv = require("PlayerManager").production_lv ;        //供应机等级
        var gyj_tx = 1 + require("ComMain").gameCfgs.produce[gyj_lv].goldbonus;   //
        //var gyj_tx = 1;

        this.sellMoney_lb.string = this._BigNum.Show( self._BigNum.MulNum( money , gyj_tx ) ) ;
        
        this.sellMoney_lb.node.active = true;
        var call = cc.callFunc(function(){
            self.sellMoney_lb.node.active = false;
            self.sellMoney_lb.node.setPosition(cc.v2(0,0));
        },this);
        this.sellMoney_lb.node.runAction(cc.sequence(cc.moveBy(0.5,cc.v2(0,50)), call));
        

        require("PlayerManager").coin  = this._BigNum.Add(  require("PlayerManager").coin ,  self._BigNum.MulNum( money , gyj_tx ) );
        this.init();
    },

    //抽屉
    choutiButton:function(){

                    //按钮声音
                    require("Audio").play("Click",false,1);

        var self = this;
        if(this._chouti_enable == false) return ;
        
        if(this._chouti_open == false ){
            this._chouti_open = true;
            this.chouti_plane.runAction(cc.moveTo(0.5,cc.v2(295,-608)));                    //打开
            this.chouti_bg.scale = 1;
            this.dibu_node.active = false;
            cc.systemEvent.emit("JIASU_ICON_XIAOSI");
        }else{
            this._chouti_open = false;
            this.chouti_plane.runAction(cc.moveTo(0.5,cc.v2(837.1,-608)));                    //关闭
            //this.chouti_bg.active = false;
            this.chouti_bg.scale = -1;
            this.dibu_node.active = true;
            cc.systemEvent.emit("JIASU_ICON_CHUXIAN");
        }

        this.red.active = false;
    this._chouti_enable = false;
    setTimeout(function(){
        self._chouti_enable = true;
    },600);

    },

    //打开头衔
    opentouxian:function(){
        this.touxian_jiantou.active = false;
        this.touxian_node.active = true;
    },

    openchiuti:function(index){
        var self = this;
       

        if(index == 1 ){                                //成就箭头1
            // if( this._chouti_open == false ){              //需要打开
            //     this.choutiButton();
            // }

            this.chengjiu_btn_node.active = true;  
            this.chengjiu_jiantou.active = true;
            setTimeout(function(){
                self.chengjiu_jiantou.active = false;
            },1000*10);
        }

        else if(index == 2){                               //任务2
            this.task_btn_node.active = true;
            this.renwu_jiantou.active = true;

            this.task1.active = true;
            this.task2.active = true;
            setTimeout(function(){
                self.renwu_jiantou.active = false;
            },1000*10);
        }

        else if(index == 3){                                //图鉴系统3
            // if( this._chouti_open == false ){              //需要打开
            //     this.choutiButton();
            // }

            // this.tujian_btn_node.active = true;
            // this.tujian_jiantou.active = true;
            // setTimeout(function(){
            //     self.tujian_jiantou.active = false;
            // },1000*10);
        }

        else if(index == 4){                                         //头衔
            require("PlayerManager").touxianlv = 1;
            this.shengjitouxian();
            this.touxian_btn_node.active = true;  
            this.touxian_jiantou.active = true;
            setTimeout(function(){
                self.touxian_jiantou.active = false;
            },1000*10);
        }

        else if(index == 5){                                         //排行榜
            this.rank_btn_node.active = true;  
            this.rank_jiantou.active = true;
            setTimeout(function(){
                self.rank_jiantou.active = false;
            },1000*10);
        }

        else if(index == 6 ){                                         //机器加速器
            this.machine_btn_node.active = true;  
            this.machine_jiantou.active = true;
            setTimeout(function(){
                self.machine_jiantou.active = false;
            },1000*10);
        }

        else if(index == 7){                                         //资金加速器
            if( this._chouti_open == false ){              //需要打开
                this.choutiButton();
            }
            this.money_btn_node.active = true;  
            this.money_jiantou.active = true;
            setTimeout(function(){
                self.money_jiantou.active = false;
            },1000*10);
        }
        else if(index == 8 ){                                         //抽奖
            this.choujiang_btn_node.active = true;  
            this.choujiang_jiantou.active = true;
            setTimeout(function(){
                self.choujiang_jiantou.active = false;
            },1000*10);
        }
        else if(index == 9 ){                                         //签到
            if( this._chouti_open == false ){              //需要打开
                this.choutiButton();
            }
            this.qiandao_btn_node.active = true;  
            this.qiandao_jiantou.active = true;
            setTimeout(function(){
                self.qiandao_jiantou.active = false;
            },1000*10);
        }
        
    },

    //成就
    chengjiuButton:function(){
        //按钮声音
        require("Audio").play("Click",false,1);
        this.chengjiu_jiantou.active = false;
        this.chengjiu_node.active = true;
    },

    //设置
    setButton:function(){

                    //按钮声音
                    require("Audio").play("Click",false,1);

        this.set_node.active = true;
    },

    //图鉴
    tujianButton:function(){
        //按钮声音
        require("Audio").play("Click",false,1);



        this.tujian_jiantou.active = false;

        if(this.red && this.red.active ){
            this.red.active = false;
        }
        
        this.illred.active = false;
        this.tujian_node.active = true;
    },

    //兑换金币
    duihuanButton:function(){

                    //按钮声音
                    require("Audio").play("Click",false,1);

        this.duihuan_node.getChildByName("coin_node").active = true;
        this.duihuan_node.getChildByName("screw_node").active = false;
        this.duihuan_node.active = true;
      
    },

    //兑换零件
    duihuanButton2:function(){
                    //按钮声音
                    require("Audio").play("Click",false,1);

        this.duihuan_node.getChildByName("coin_node").active = false;
        this.duihuan_node.getChildByName("screw_node").active = true;
        this.duihuan_node.active = true;
      
    },

    //邀请按钮
    yaoqingButton:function(){
        //按钮声音
        require("Audio").play("Click",false,1);

        this.share_node.active = true;
    },

    //资金加速器
    zijingjiasuqiButton:function(){
        //按钮声音
        require("Audio").play("Click",false,1);


        this.money_jiantou.active = false;
        if( this.zijingJiasuqi.active == true){
            cc.systemEvent.emit("OPEN_MONEY");
            this.zijingJiasuqi.getChildByName("child").active = true;
        }else{
            this.zijingJiasuqi.active = true;
        }

    },

    //机器加速器
    machinejiasuqiButton:function(){
        //按钮声音
        require("Audio").play("Click",false,1);


        this.machine_jiantou.active = false;
        if(this.machineJiasuqi.active == true){
            this.machineJiasuqi.getChildByName("child").active = true;
        }else{
            this.machineJiasuqi.active = true;
        }
    },

    //抽奖
    open_choujiang:function(){
        //按钮声音
        require("Audio").play("Click",false,1);
        
        this.choujiang_jiantou.active = false;
        this.choujiang.active = true;
    },

    open_loginAward:function(){
        this.qiandao_jiantou.active = false;
        this.loginAward_node.active = true;
    },

    // openPaihangbang:function(){
    //     this.paihangbang.active = true;
    // },


    // update (dt) {},
});
