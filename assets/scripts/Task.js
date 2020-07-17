/**
 * 任务节点
 * 界面要求
 * 1满足条件 高亮
 * 2未满足条件 暗量
 * 3未刷新 暗色
 */

 const SUB_TIME = 1000*60*60*0.5;                       //半个小时

 const TASK_NUM = 5;
 const SHARE_NUM = 2;
 const SHIPING_NUM = 3; 
 const NUMBER = [20,30,40,60,90];
 const CJ_TASK = 3;
 const CJ_AD = 9;           //广告成就
 const MI = 0.3;            //0.3次方

var AdComponent = require("AdComponent");
cc.Class({
    extends: cc.Component,

    properties: {
        //title:cc.Label,                                                                 //任务要求名称

        adComponent:AdComponent,

        weiwancheng:cc.Node,
        wprodeuce_id:cc.Sprite,
        need_wprodeuce_num:cc.Label,
        compleat_wprodeuce_num:cc.Label,

        //wjiangli_id:cc.Sprite,
        wjiangli_num:cc.Label,




        wancheng:cc.Node,
        shiping_double_node:cc.Node,
        share_double_node:cc.Node,
        //jiangli_id:cc.Sprite,
        jiangli_num:cc.Label,

        lengque_bg:cc.Node,

        la_node:cc.Node,
        wancheng_bg:cc.Node,
        _assest_task:null,
        _assest_jianlgi:null,

        _produce_id:0,
        _produce_num:0,                              //需要生产数量
        _compleate_produce_num:0,                    //已经完成的数量

        _jiangli_id:0,
        _jiangli_num:null,     
        _shiping_double:true,

        _task_update:true,                         //是否需要刷新任务


        _wancheng_time:0,
        _login_time:0,
        _lingqu:false,

        _login_open:false,
        _fist_open:true,

        _daojishi:15,

        _BigNum:null,

    },



    onLoad () {
        cc.systemEvent.on("TASK_1_PRODUCE",this.updateProduce.bind(this));
        cc.systemEvent.on("TASK_1_INIT",this.init.bind(this));

        this._BigNum =  require("BigNum");

    },

    start () {
        this.adComponent.init(2,this.onShipingGet,this);
    },

    
    onEnable(){
        this.init();
    },

    //初始化界面
    init:function(isopen){
        var self = this;
        //*********************************************初始化数据******************************************************//
        if(isopen == null){
            if(this._fist_open == true){
                this.node.getChildByName("child").active = false;
                this._fist_open = false;
            }else{
                this.node.getChildByName("child").active = true;
            }
        }

 


        var tujian = require("PlayerManager").illustrated;                //图鉴

        var enable_produce_index = 0;                                     //可以生产的东西
        for(var i = 0;i<tujian.length;i++){
            enable_produce_index += tujian[i] ;
        }

        if( require("PlayerManager").task_index == -1 ){
           
            // var rnum = Math.random();
            // if( rnum < 0.3 ){
            //     var task_index = parseInt( Math.random()*(enable_produce_index - 1 ) ) + 1 ;
            // }else{
            //     var task_index =  parseInt( 1*enable_produce_index );
            // }
            
            var task_index = quanZhong( enable_produce_index ) ;
           

            require("PlayerManager").task_index = task_index;                                                    //保存任务

            var goods = require("ComMain").gameCfgs.goods;
    
            this._produce_id =  goods[task_index].icon ;                            //生产什么
            if ( require("PlayerManager").production_lv < 100 ){
                var shengchan  = parseInt( Math.random()*3 );
            }else{
                var shengchan = parseInt(  Math.random()*5 ) ;
            }
            //this._produce_num = require("ComMain").gameCfgs.task[task_index].value         //通过表生产数量
            // var jishu = parseInt( task_index / 6 )  + 1 ;
            // var rnum = parseInt(  (jishu *10)*( Math.random() ) + jishu*10 );
            this._produce_num =  NUMBER[shengchan];                                         //通过水机生产数量

            //require("PlayerManager").produce_num =  require("ComMain").gameCfgs.task[task_index].value   
            require("PlayerManager").produce_num = NUMBER[shengchan];
            
            this._compleate_produce_num = 0;
            require("PlayerManager").had_produce_num =  0;
            this._jiangli_id = 1;                                                       //奖励金币

            //this._jiangli_num = require("ComMain").gameCfgs.task[task_index].award;     //奖励数量，听过表来读取  
            var max_value = goods[ enable_produce_index ].value;
            var ram = Math.floor( ((Math.random()*5 + 10 ) / 10 ) *100 ) / 100 ;
            this._jiangli_num = this._BigNum.MulNum(max_value, parseInt( Math.pow( (NUMBER[shengchan]/5) , 0.3 ) )*200*ram );     

            cc.systemEvent.emit("TASK1_CHANGE");

        }else{
            var task_index = require("PlayerManager").task_index;                           //任务
            var goods = require("ComMain").gameCfgs.goods;
    
            this._produce_id =  goods[task_index].icon ;                            //生产什么
            this._produce_num = require("PlayerManager").produce_num ;              //生产数量
            this._jiangli_id = 1;                                                   //奖励

            var max_value = goods[ enable_produce_index ].value;
            this._jiangli_num = this._BigNum.MulNum( max_value, parseInt( Math.pow(  require("PlayerManager").produce_num , 0.3  )*500 ) );     

            //this._jiangli_num =  require("ComMain").gameCfgs.task[task_index].award 
            this._compleate_produce_num = require("PlayerManager").had_produce_num;    //已经完成
        }

        //********************************************************************初始化界面*************************************************//
        if(this._compleate_produce_num < this._produce_num){   
            this.weiwancheng.active = true;
            this.wancheng.active = false;

            if(this._assest_task){
                this.wprodeuce_id.spriteFrame = this._assest_task.getSpriteFrame(this._produce_id.toString());
                var task_data = {
                    sp: self.wprodeuce_id.spriteFrame,
                    num:self._produce_num,
                }
                cc.systemEvent.emit("TASK_1_RUNNING",task_data);
            }else{

                cc.loader.loadRes("Images/gongyingji/produce_choose", cc.SpriteAtlas, function (err, atlas) {                   //加载图集
                    if(err == null){
                        self._assest_task = atlas;
                        self.wprodeuce_id.spriteFrame = self._assest_task.getSpriteFrame(self._produce_id.toString());
                        var task_data = {
                            sp: self.wprodeuce_id.spriteFrame,
                            num:self._produce_num,
                        }
                        cc.systemEvent.emit("TASK_1_RUNNING",task_data);
                    }
                 });

            }

         
            this.need_wprodeuce_num.string  = "/" + this._produce_num;                                              //需要完成数量
            this.compleat_wprodeuce_num.string = this._compleate_produce_num;                                 //已经完成了的数量

            //this.wjiangli_id.spriteFrame = this._assest_jianlgi.getSpriteFrame(this._jiangli_id);
            this.wjiangli_num.string =    this._BigNum.Show( self._jiangli_num ) ;

            //发送给ui界面
         

        }else{ 
            this.weiwancheng.active = false;                                                                         //完成界面
            this.wancheng.active = true;
            //this.jiangli_id.spriteFrame = this._assest_jianlgi.getSpriteFrame(this._jiangli_id);
            this.jiangli_num.string = this._BigNum.Show( self._jiangli_num ) ; 

            if( this._lingqu == true ){
                return ;
            }


            if(this._shiping_double == true){                                                                   //观看视频
                this.share_double_node.active = false;
                this.shiping_double_node.active = true;
            }else{
                //this.share_double_node.active = true;
                this.shiping_double_node.active = true;
            }

            if(    Math.random() < 0.5   && require("PlayerManager").shiping_share_count < 5){
                this.shiping_double_node.active = true;
                this.share_double_node.active = false;
            }else{
                this.shiping_double_node.active = true;
                //this.share_double_node.active = true;
            }

            this.shiping_double_node.active = true;
            this.share_double_node.active = false;

            this._lingqu = true;
        }
    

        // if(this._login_open == false){
            
        // }else{

        // }
    },

    updateProduce:function(){
        this.initProduceNum();
    },

    initProduceNum:function(){
        this._compleate_produce_num = require("PlayerManager").had_produce_num ;
        this.compleat_wprodeuce_num.string  =  this._compleate_produce_num ;
        if(this._compleate_produce_num == this._produce_num ){
            cc.systemEvent.emit("TASK1_WANCHENG");
            if(this.node.getChildByName("child").active == true){
                this.init();
            }

        }
    },

    //视频加倍
    shipingDoubleButton:function(){
                    //按钮声音
                    require("Audio").play("Click",false,1);

                    let self = this;
                                    //统计加速
                                    require("sdk_4399").getAdAssest(function(data){
                                        if(data){
                                            self.onShipingGet();
                                        }else{
                                            messageTips("今日广告已看完啊，请明日再来");
                                        }
                                    })


    },

    //分享加倍
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

    //分享奖励
    onShareGetCoinSucc:function(){
        /**
         * 
         */
        // if(this._jiangli_id == 1){                                                  //奖励金币
        //     require("PlayerManager").coin += ( this._jiangli_num * SHARE_NUM);
        // }else if(this._jiangli_id == 2){                                            //奖励钻石
        //     require("PlayerManager").diamond += ( this._jiangli_num * SHARE_NUM);
        // }else if(this._jiangli_id == 3){                                            //奖励螺丝
        //     require("PlayerManager").screw += ( this._jiangli_num * SHARE_NUM);
        // }

        var self = this;

        var tem_obj = this._BigNum.MulNum(self._jiangli_num , SHARE_NUM );
        require("PlayerManager").coin = this._BigNum.Add( tem_obj , require("PlayerManager").coin );


        require("PlayerManager").task_index = -1
        require("PlayerManager").task_index1 ++;
        this._lingqu = true;
        //this.init();
        cc.systemEvent.emit("UI_CHANGE");                   //刷星ui界面
        messageTips("奖励加倍");
        require("PlayerManager").achievement_jindu[CJ_TASK] ++;

        self._daojishi = 15;
        this.schedule(function(){
            self.lengque_bg.active = true;
            self.la_node.active = false;
            self.lengque_bg.getChildByName("lb").getComponent(cc.Label).string = self._daojishi;
            self._daojishi --;

            if(self._daojishi <= 0){
                cc.systemEvent.emit("TASK_1_INIT",true);
                self.lengque_bg.active = false;
                self.wancheng_bg.active = false;
                self.la_node.active = true;
                self.init(true);
            }
        },1,15,0);

        //this.node.active = false;
        this.node.getChildByName("child").active = false;
    },

    //视频奖励
    onShipingGet:function(){
        // if(this._jiangli_id == 1){                                                  //奖励金币
        //     require("PlayerManager").coin += ( this._jiangli_num * SHIPING_NUM);
        // }else if(this._jiangli_id == 2){                                            //奖励钻石
        //     require("PlayerManager").diamond += ( this._jiangli_num * SHIPING_NUM);
        // }else if(this._jiangli_id == 3){                                            //奖励螺丝
        //     require("PlayerManager").screw += ( this._jiangli_num * SHIPING_NUM);
        // }

        var self = this;
        var tem_obj = this._BigNum.MulNum(self._jiangli_num , SHIPING_NUM );
        require("PlayerManager").coin = this._BigNum.Add( tem_obj , require("PlayerManager").coin );

        require("PlayerManager").task_index = -1
        require("PlayerManager").shiping_share_count ++;
        require("PlayerManager").task_index1 ++;
        this._lingqu = true;
        //this.init();
        cc.systemEvent.emit("UI_CHANGE");                   //刷星ui界面
        let coin_str = this._BigNum.Show(tem_obj);
        messageTips(`奖励三倍,获得${coin_str}` );
        // this.node.active = false;
        require("PlayerManager").achievement_jindu[CJ_TASK] ++;
        require("PlayerManager").achievement_jindu[CJ_AD] ++;

        self._daojishi = 15;
        this.schedule(function(){
            self.lengque_bg.active = true;
            self.la_node.active = false;
            self.lengque_bg.getChildByName("lb").getComponent(cc.Label).string = self._daojishi;
            self._daojishi --;

            if(self._daojishi <= 0){
                cc.systemEvent.emit("TASK_1_INIT",true);
                self.lengque_bg.active = false;
                self.wancheng_bg.active = false;
                self.la_node.active = true;
                self.init(true);
            }
        },1,15,0);

        // cc.systemEvent.emit("TASK_1_INIT");
        this.node.getChildByName("child").active = false;
    },

    backFunc:function(){

                    //按钮声音
                    require("Audio").play("Click",false,1);
                    
       var self = this;
        if(this._compleate_produce_num >= this._produce_num ){

            require("PlayerManager").coin = this._BigNum.Add( self._jiangli_num , require("PlayerManager").coin );

            require("PlayerManager").task_index = -1
            this._lingqu = true;
            require("PlayerManager").task_index1 ++;
            //this.init();
            cc.systemEvent.emit("UI_CHANGE");      
            let coin_str = this._BigNum.Show(self._jiangli_num);
            messageTips(`完成任务，获得${coin_str}` )
            require("PlayerManager").achievement_jindu[CJ_TASK] ++;

            self._daojishi = 15;
            this.schedule(function(){
                self.lengque_bg.active = true;
                self.la_node.active = false;
                self.lengque_bg.getChildByName("lb").getComponent(cc.Label).string = self._daojishi;
                self._daojishi --;

                if(self._daojishi <= 0){
                    cc.systemEvent.emit("TASK_1_INIT",true);
                    self.lengque_bg.active = false;
                    self.wancheng_bg.active = false;
                    self.la_node.active = true;
                    self.init(true);
                }
            },1,15,0);

            //cc.systemEvent.emit("TASK_1_INIT");
        }

        this.node.getChildByName("child").active = false;

    }

    // update (dt) {},
});
