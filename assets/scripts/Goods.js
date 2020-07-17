const ADVANCE = 100;                                            //100毫秒
const DURATION = 1000;                                           //200毫秒内不能被同一个制造机打中

cc.Class({
    extends: cc.Component,

    properties: {       
        ///life:{unit:0,time:0 },
        bg:cc.Sprite,
        life_lb:cc.Label,

        _produce_index:0,                                       //生产什么种类索引
        _goods_arr:[],                                          //变化的           
        _next:0,
        //_value:{unit:0,time:0 },
        
        _stop:false,                                             //控制物体运动
        _animCtrl:null,
        _animState:null,                                        //

        _assest:null,

        _clli_z1:true,
        _clli_z2:true,
        _clli_z3:true,
        _clli_z4:true,
        _clli_z5:true,
        _clli_z6:true,
        _clli_z6_2:true,

        _clli_goods:true,                                   //货物跟货物之间的碰撞，碰撞后0.5秒内不回再碰撞

        _icon_name:null,

        _produce_task1:true,
        _produce_task2:true,
        _BigNum:null,
        
      
    },

   
    onLoad () {

        // cc.loader.loadRes("Images/gongyinji/produce_choose", cc.SpriteAtlas, function (err, atlas) {             //加载图集
        //     self._assest = atlas;
        //  });

        this._BigNum = require("BigNum");
        this._animCtrl  = this.node.getComponent(cc.Animation);
        this._animState = this._animCtrl.getAnimationState('move');
        //this._animState
        cc.systemEvent.on("HUIFU_PENGZHUANG",this.huifuPengzhuang.bind(this));                                    //恢复碰撞
        cc.systemEvent.on("PRODUCE_CHANGE",this.changeProduceIndex.bind(this));                                   //改变生产

     

        //this._produce_index = require("PlayerManager").produce_index;                                             //

    },

    start () {
        var self = this;
 
        

        this._clli_z1 = true;
        this._clli_z2 = true;
        this._clli_z3 = true;
        this._clli_z4 = true;
        this._clli_z5 = true;
        this._clli_z6 = true;
        this._clli_z6_2 = true;
        this._next = 0;
    },

    onEnable(){
        var self = this;
        this.node.opacity = 0;                  //透明度
        this._clli_z1 = true;
        this._clli_z2 = true;
        this._clli_z3 = true;
        this._clli_z4 = true;
        this._clli_z5 = true;
        this._clli_z6 = true;
        this._clli_z6_2 = true;
        this._next = 0;
        //this.changeProduceIndex(1);
        self.initGoods();
        //this.init();
        this.move();
    },

    //初始化 
    init:function(){

        /**
         * init需要取拿数据
         */



        var self = this;
        this.life = this._goods_arr[self._next].click;              //生命 打击次数
        if(self._next == 5 ){
            this.life_lb.node.active = false;
        }else{
            this.life_lb.node.active = true;
        }
       

        this._value = this._goods_arr[self._next].value;            //价格 
        var pic_url = this._goods_arr[self._next].icon.toString() ;                 //外观
        this._icon_name = pic_url;
        this.life_lb.string =  this._BigNum.Show( self.life );
        this.loadGoodsSkin(pic_url);

        var playermanager = require("PlayerManager");

        //生产
        if(playermanager.task_index != -1 && this._produce_task1 == true ){
            var task_index_1 = parseInt( (playermanager.task_index - 1 ) / 6 ) + 1;            //任务要求的种类
            if( task_index_1 == this._produce_index ){
                if(   (playermanager.task_index % 6) <= (self._next + 1)  ){
                     playermanager.had_produce_num ++;
                     cc.systemEvent.emit("TASK_1_PRODUCE");
                     this._produce_task1 = false;
                }
             }
        }
        if(playermanager.task2_index != -1 && this._produce_task2 == true ){
            var task_index_2 = parseInt( (playermanager.task2_index -1 ) / 6 ) + 1;  
            if( task_index_2 == this._produce_index ){
                if(   (playermanager.task2_index % 6) <= (self._next + 1)  ){
                     playermanager.had_produce_num2 ++;
                     cc.systemEvent.emit("TASK_2_PRODUCE");
                     this._produce_task2 = false;
                }
             }
        }
    
        
    },

    loadGoodsSkin:function(sp_name ){
        var self = this;


        if(self._assest){
            //console.log("资源存在，不要加载")
            self.bg.spriteFrame = self._assest.getSpriteFrame(sp_name);
        }else{
            //console.log("资源不存在，加载图片");
            cc.loader.loadRes("Images/gongyingji/produce_choose", cc.SpriteAtlas, function (err, atlas) {                   //加载图集
                if(err == null){
                    self._assest = atlas;
                    self.bg.spriteFrame = self._assest.getSpriteFrame(sp_name);
                }

             });
        }
     
        this.node.opacity = 255;
    },

    //碰撞
    onCollisionEnter:function(other,self){
        var self = this;

        if(other.node.parent.name == "knif" && self._clli_z1 == true)     {
            
            this.life = this._BigNum.Sub( self.life , other.node.getComponent(cc.Sprite).damage );
            self._clli_z1 = false;
            self.pauseFunc(0);                                               
        }
        else if(other.node.parent.name == "chongyaji" && self._clli_z2 == true){
            self._clli_z2 == false;
            self.compress_pauseFunc(500);                                  
            this.life = this._BigNum.Sub( self.life , other.node.getComponent(cc.Sprite).damage );
        }
        else if(other.node.name == "baicui" && self._clli_z3 == true){
            this.life = this._BigNum.Sub( self.life , other.node.getComponent(cc.Sprite).damage );
            self._clli_z3 = false;
            self.repelFunc();                                                  //后退
        }
        else if(other.node.name == "juci" && self._clli_z4 == true){
            this.life = this._BigNum.Sub( self.life , other.node.getComponent(cc.Sprite).damage );
            self.pauseFunc(300);  
            self._clli_z4 = false;
        }
        else if(other.node.name == "texiao" && self._clli_z5 == true){
            this.life = this._BigNum.Sub( self.life , other.node.getComponent(cc.Sprite).damage );
            self.pauseFunc(300);                                           
            self._clli_z5 = false;
        }
        else if(other.node.name == "texiao6" && self._clli_z6 == true ){
            this.life = this._BigNum.Sub( self.life , other.node.getComponent(cc.Sprite).damage );                   
            self._clli_z6 = false;
            self.pauseFunc(500);                                 
        }

        cc.systemEvent.emit("HUIFU_PENGZHUANG");

        if(    ! this._BigNum.JudgeZhen( self.life )  ){            
            this.life_lb.string = 0;
            if(self._next < 5){
                var obj = this._goods_arr[self._next ++ ];

                            //发现新东西
                if(  require("PlayerManager").illustrated[ self._produce_index -1]  < (self._next+1)  ){
                    require("PlayerManager").illustrated[self._produce_index -1] ++;
                    var data = {
                        z: self._produce_index,
                        d: self._next + 1
                    }
                    cc.systemEvent.emit("FAXIAN_NEW_GOODS",data);                                                    //发现了新货品
                }
            }
          
            /**
             * 变化里面判读是否有新开启
             */


            self.init();
        }else{
            this.life_lb.string = this._BigNum.Show( self.life );
        }

    },

    //恢复碰撞标记
    huifuPengzhuang:function(){
        var self = this;
        setTimeout(function(){
            self._clli_z1 = true;
            self._clli_z2 = true;
            self._clli_z3 = true;
            self._clli_z4 = true;
            self._clli_z5 = true;
            self._clli_z6 = true;
        },DURATION);
     
    },
   
    //移动
    move:function(){
        this._animCtrl.setCurrentTime(0 ,"move");
        this._animCtrl.play("move");
        this._animCtrl.setCurrentTime(0 ,"move");
    },

    //压缩不停止
    compressFunc:function(){
        var self = this;
        self._animCtrl.playAdditive("compress");
    },

    //压缩并且停止
    compress_pauseFunc:function(time){
        var self = this;
        time = 300;

        self._animCtrl.pause("move");
        self._animCtrl.playAdditive("compress");

        setTimeout(function(){
            self._animCtrl.resume("move");
        },time);
    },

    //停止0.5
    pauseFunc:function(time){
        //time = 500;
        var self = this;
        self._animCtrl.pause("move");
        setTimeout(function(){
            self._animCtrl.resume("move");
        },time);
    },

    //停止并旋转
    rotateFunc:function(time){
        var self = this;
        time = 500;
        self._animCtrl.pause("move");
        self._animCtrl.playAdditive("rotate");
        setTimeout(function(){
            self._animCtrl.resume("move");
        },time);
    },

    //击退向后
    repelFunc:function(){
        var self = this;

        var now_time = self._animState.time;
        var duration = self._animState.duration;
        self._animCtrl.stop("move");
        self._animState.wrapMode = cc.WrapMode.Reverse;
      
        self._animCtrl.play("move");
        self._animCtrl.setCurrentTime(duration-now_time,"move");
        setTimeout(function(){

            now_time = self._animState.time;
            self._animCtrl.stop("move");
            self._animState.wrapMode = cc.WrapMode.Normal;
            self._animCtrl.setCurrentTime(duration- now_time ,"move");
            self._animCtrl.play("move");
            self._animCtrl.setCurrentTime(duration- now_time ,"move");

        },100);

        
    },

    //击中向前
    advanceFunc:function(){
        var self = this;
        var now_time = self._animState.time;
        self._animCtrl.stop("move");
        self._animCtrl.play("move");
        self._animCtrl.setCurrentTime(now_time + 0.03 ,"move");
    },


    //////////////////////////////////////////////////////////////////////////////////////////////////////
    resetState:function(){
        this._next = 0;
        this._animCtrl.stop("move");
    },


    //改变生产的索引
    changeProduceIndex:function(index){
        var self = this;
        /**
         * 如果正在运行，那么就不改变
         */
        require("PlayerManager").produceType = index ;                                       //保存生产什么种类索引
        var now_time = self._animState.time;
        if( now_time > 0.1 ){
            return ;

        }

        this._produce_index = index;
        this.initGoods();                                                                   //重新读取配置
    },  

    initGoods:function(){                        //读取配置
        var self = this;

        this._produce_index = require("PlayerManager").produceType;                          //生产什么种类索引

        var index = (this._produce_index-1)*6 + 1;
        for(var i = 0 ;i<6;i++){                                                            //拿到生产的 种类1：1开头 ；  种类2: 7开头
            this._goods_arr[i] =  require("ComMain").gameCfgs.goods[index];
            index ++;
        }

        setTimeout(function(){
            self.init();
        },100);

       
    },

    complateZhuangzai:function(){
        var self = this;
        //console.log("goods动画回调事件");
        var sp = this.node.getChildByName("bg").getComponent(cc.Sprite).spriteFrame;
        var icon_name = this._icon_name;
        var money = this._value;
        //cc.systemEvent.emit("ZHUANG_ZAI",sp);
        cc.systemEvent.emit("HUI_SHOU",self.node );
        cc.systemEvent.emit("ZHUANG_ZAI",icon_name);
        cc.systemEvent.emit("MONEY_SELL",money);
        this._produce_task1 = true;
        this._produce_task2 = true;

    }
});
