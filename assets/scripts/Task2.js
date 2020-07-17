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
const SHIPING_NUM = 2; 
const INTERVAL = 60*60*0.5;
const NUMBER = [30,50,100,200,400,400,400];
const SCREW =  [11,18,35,70,140];
const CJ_AD = 9;
const CJ_TASK = 3;
const TASK2_TIME = 1800;
var AdComponent = require("AdComponent");
cc.Class({
   extends: cc.Component,

   properties: {

       adComponent:AdComponent,
      shengyu_time:cc.Label,
      _shengyu_time:30,
    //**************************************** */

       title:cc.Label,                                                                 //任务要求名称

       weiwancheng:cc.Node,
       wprodeuce_id:cc.Sprite,
       need_wprodeuce_num:cc.Label,
       compleat_wprodeuce_num:cc.Label,

       wjiangli_id:cc.Sprite,
       wjiangli_num:cc.Label,



       wancheng:cc.Node,
       shiping_double_node:cc.Node,
       share_double_node:cc.Node,

       jiangli_id:cc.Sprite,
       jiangli_num:cc.Label,



       _assest_task:null,
       //_assest_jianlgi:null,

       _produce_id:0,                               //需要生产得种类
       _produce_num:0,                              //需要生产数量
       _compleate_produce_num:0,                    //已经完成的数量

       _jiangli_id:0,                               //奖励东西
       _jiangli_num:0,                              //奖励数量
       _shiping_double:true,

       _task_update:true,                         //是否需要刷新任务


       _wancheng_time:0,
       _login_time:0,
       _lingqu:false,
       

       _login_open:true,
       _fist_open:true,
       _open_time:0,
       //_BigNum:null,


   },



   onLoad () {
    cc.systemEvent.on("TASK_2_PRODUCE",this.updateProduce.bind(this));
    cc.systemEvent.on("QIEHUAN_TASK",this.qiehuan_task.bind(this));
    cc.systemEvent.on("TASK_2_INIT",this.init.bind(this));
    this._BigNum = require("BigNum");
   },

   start () {
        this.adComponent.init(2,this.onShipingGet,this);
   },

   //
   onEnable(){
        this.init();
   },

   //初始化界面
   init:function(){
       var self = this;
       this._open_time ++;
       //*********************************************初始化数据******************************************************//
        if(this._fist_open == true ){
            this.node.getChildByName("child").active = false;
            this._fist_open = false;
        }else{
            this.node.getChildByName("child").active = true;
        }
       



       if( require("PlayerManager").task2_index == -1 ){
           this.callFunc_2();
           return ;
       }

       var goods = require("ComMain").gameCfgs.goods;

       this._produce_id =  goods[ require("PlayerManager").task2_index ].icon ;                            //生产什么

       this._produce_num = require("PlayerManager").produce_num2 ;             //生产数量
       this._compleate_produce_num =  require("PlayerManager").had_produce_num2 ;                       //已经生产的数量
       this._jiangli_id = 2 ;                                                  //奖励说明  钻石
       this._jiangli_num = this._produce_num / 2 ;                              //奖励数量
     

    
  
       
       //********************************************************************初始化界面*************************************************//
       cc.systemEvent.emit("TASK_2_RUNNING");
       if(this._compleate_produce_num < this._produce_num){   
           this.weiwancheng.active = true; 
           this.wancheng.active = false;

           if(this._assest_task){
                this.wprodeuce_id.spriteFrame = this._assest_task.getSpriteFrame(this._produce_id.toString());
            }else{
                cc.loader.loadRes("Images/gongyingji/produce_choose", cc.SpriteAtlas, function (err, atlas) {                   //加载图集
                    if(err == null){
                        self._assest_task = atlas;
                        self.wprodeuce_id.spriteFrame = self._assest_task.getSpriteFrame(self._produce_id.toString());
                    }
                });
            }

           this.need_wprodeuce_num.string  = "/"+this._produce_num;                                              //需要完成数量
           this.compleat_wprodeuce_num.string = this._compleate_produce_num;                                 //已经完成了的数量

           //this.wjiangli_id.spriteFrame = this._assest_jianlgi.getSpriteFrame(this._jiangli_id);
           this.wjiangli_num.string = this._jiangli_num;
       }else{ 
           this.weiwancheng.active = false;                                                                         //完成界面
           this.wancheng.active = true;
           this.jiangli_num.string = this._jiangli_num;

           if( this._lingqu == true ){
               return ;
           }

           if(Math.random()>0.5 &&   require("PlayerManager").shiping_share_count < 5){
            this._shiping_double = true;
        }else{
            this._shiping_double = false;
        }

           if(this._shiping_double == true){                                                                   //观看视频
               this.share_double_node.active = false;
               this.shiping_double_node.active = true;
           }else{
               //this.share_double_node.active = true;
               this.shiping_double_node.active = false;
           }
           this._lingqu = true;
           

       }
    
   },

   qiehuan_task:function(){
       this.init2();
   },

   updateProduce:function(){                                                            //完成
        this._compleate_produce_num = require("PlayerManager").had_produce_num2 ;
        this.compleat_wprodeuce_num.string  =  this._compleate_produce_num ;
        if(this._compleate_produce_num == this._produce_num ){
            this.qiehuanjiemian();
            cc.systemEvent.emit("TASK2_WANCHENG");
            if(this.node.getChildByName("child").active == true){
                this.init();
            }

        }
   },

   callFunc_2:function(){
    var self = this;

    /**
     * 刷新任务之前，先检查有没有完成生产
     * 完成后就先不要刷新，让用户领取后再刷新
     */

    if( require("PlayerManager").task2_index != -1  ){
        return ;
    }

    //cc.systemEvent.emit("UPDATE_TMIE_XIANZHI");

    var tujian = require("PlayerManager").illustrated;                //图鉴

    var enable_produce_index = 0;                                     //可以生产的东西
    for(var i = 0;i< tujian.length; i++){
        for(var j = 0; j<tujian[i] ; j++){
            enable_produce_index++;
        }
    }

    enable_produce_index -= 1;

    var rnum = Math.random();
    if( rnum < 0.3 ){
        var task_index = parseInt( Math.random() * enable_produce_index + 1 );                              //任务id
    }else{
        var task_index =  parseInt( 1*enable_produce_index );
    }

        var goods = require("ComMain").gameCfgs.goods;

        task_index = task_index == 0?1:task_index;
        this._produce_id =  goods[task_index].icon ;                            //生产什么

        if ( require("PlayerManager").production_lv < 100 ){
            var shengchan  = parseInt( Math.random()*3 );
        }else{
            var shengchan = parseInt( Math.random()*4 );
        }
        this._produce_num =  NUMBER[shengchan];                                //生产数量
        
        this._jiangli_id = 2 ;                                                  //奖励说明  钻石
        this._jiangli_num = NUMBER[shengchan]/2 ;                               //奖励数量

        this._compleate_produce_num = 0;                                        //0

      
        require("PlayerManager").task2_index = task_index;                       //保存任务
        require("PlayerManager").produce_num2 =   NUMBER[shengchan];
        require("PlayerManager").had_produce_num2 = 0;

        cc.systemEvent.emit("TASK_2_RUNNING");

        if(this._compleate_produce_num < this._produce_num){   
            this.weiwancheng.active = true; 
            this.wancheng.active = false;
 
            if(this._assest_task){
                 this.wprodeuce_id.spriteFrame = this._assest_task.getSpriteFrame(this._produce_id.toString());
             }else{
                 cc.loader.loadRes("Images/gongyingji/produce_choose", cc.SpriteAtlas, function (err, atlas) {                   //加载图集
                     if(err == null){
                         self._assest_task = atlas;
                         self.wprodeuce_id.spriteFrame = self._assest_task.getSpriteFrame(self._produce_id.toString());
                     }
                 });
             }
 
            this.need_wprodeuce_num.string  = "/"+this._produce_num;                                              //需要完成数量
            this.compleat_wprodeuce_num.string = this._compleate_produce_num;                                 //已经完成了的数量
 
            //this.wjiangli_id.spriteFrame = this._assest_jianlgi.getSpriteFrame(this._jiangli_id);
            this.wjiangli_num.string = this._jiangli_num;
        }else{ 
            this.weiwancheng.active = false;                                                                         //完成界面
            this.wancheng.active = true;
            //this.jiangli_id.spriteFrame = this._assest_jianlgi.getSpriteFrame(this._jiangli_id);
            this.jiangli_num.string = this._jiangli_num;
 
            if( this._lingqu == true ){
                return ;
            }



            if(Math.random()>0.5 &&   require("PlayerManager").shiping_share_count < 5){
                this._shiping_double = true;
            }else{
                this._shiping_double = true;
            }

            if(this._shiping_double == true){                                                                   //观看视频
                this.share_double_node.active = false;
                this.shiping_double_node.active = true;
            }else{
                //this.share_double_node.active = true;
                this.shiping_double_node.active = true;
            }

            this._lingqu = true;
 
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
       if(this._jiangli_id == 1){                                                  //奖励金币
           require("PlayerManager").coin += ( this._jiangli_num * SHARE_NUM);
       }else if(this._jiangli_id == 2){                                            //奖励钻石
           require("PlayerManager").diamond += ( this._jiangli_num * SHARE_NUM);
       }else if(this._jiangli_id == 3){                                            //奖励螺丝
           require("PlayerManager").screw += ( this._jiangli_num * SHARE_NUM);
       }


       /**
        * 领取之后
        * 需要刷新任务
        */
       this._lingqu = true;
       this._compleate_produce_num = 0;
       //this.callFunc_2();

       cc.systemEvent.emit("UI_CHANGE");                   //刷星ui界面
       require("PlayerManager").task2_time = TASK2_TIME;
       cc.systemEvent.emit("UPDATE_TMIE_XIANZHI");                         //通知开始冷却
       //this.node.active = false;
       require("PlayerManager").achievement_jindu[CJ_TASK] ++;
     
       messageTips("分享成功");
       this.node.getChildByName("child").active = false;
   },

   //视频奖励
   onShipingGet:function(){

       if(this._jiangli_id == 1){                                                  //奖励金币
           require("PlayerManager").coin += ( this._jiangli_num * SHIPING_NUM);
       }else if(this._jiangli_id == 2){                                            //奖励钻石
           require("PlayerManager").diamond += ( this._jiangli_num * SHIPING_NUM);
       }else if(this._jiangli_id == 3){                                            //奖励螺丝
           require("PlayerManager").screw += ( this._jiangli_num * SHIPING_NUM);
       }

       require("PlayerManager").shiping_share_count ++;
       this._lingqu = true;

       this._compleate_produce_num = 0;
       //this.callFunc_2();

       cc.systemEvent.emit("UI_CHANGE");                   //刷星ui界面
       require("PlayerManager").task2_time = TASK2_TIME;
       cc.systemEvent.emit("UPDATE_TMIE_XIANZHI");                         //通知开始冷却
       //this.node.active = false;
       require("PlayerManager").achievement_jindu[CJ_TASK] ++;
       require("PlayerManager").achievement_jindu[CJ_AD] ++;
       this.node.getChildByName("child").active = false;
       messageTips("观看视频获得奖励");
       //cc.systemEvent.emit("TASK_2_INIT");
 
      
   },

   backFunc:function(){

    if(this._compleate_produce_num >= this._produce_num ){

    if(this._jiangli_id == 1){                                                  //奖励金币
        require("PlayerManager").coin += ( this._jiangli_num );
        messageTips("获得金币:"+this._jiangli_num);
    }else if(this._jiangli_id == 2){                                            //奖励钻石
        require("PlayerManager").diamond += ( this._jiangli_num );
        messageTips("获得钻石:"+this._jiangli_num);
    }else if(this._jiangli_id == 3){                                            //奖励螺丝
        require("PlayerManager").screw += ( this._jiangli_num );
        messageTips("获得材料:"+this._jiangli_num);
    }
    require("PlayerManager").achievement_jindu[CJ_TASK] ++;
    require("PlayerManager").task2_time = TASK2_TIME;
    cc.systemEvent.emit("UPDATE_TMIE_XIANZHI");                         //通知开始冷却
    //cc.systemEvent.emit("TASK_2_INIT");
    }
  
    this.node.getChildByName("child").active = false;

},

   // update (dt) {},
   init2:function(){
    var self = this;


    if( require("PlayerManager").task2_index == -1 ){
        this.callFunc_2();
        return ;
    }

    var goods = require("ComMain").gameCfgs.goods;

    this._produce_id =  goods[ require("PlayerManager").task2_index ].icon ;                            //生产什么

    this._produce_num = require("PlayerManager").produce_num2 ;             //生产数量
    this._compleate_produce_num =  require("PlayerManager").had_produce_num2 ;                       //已经生产的数量
    this._jiangli_id = 2 ;                                                  //奖励说明  钻石
    this._jiangli_num = this._produce_num / 2 ;                              //奖励数量
  

 

    
    //********************************************************************初始化界面*************************************************//
    cc.systemEvent.emit("TASK_2_RUNNING");
    if(this._compleate_produce_num < this._produce_num){   
        this.weiwancheng.active = true; 
        this.wancheng.active = false;

        if(this._assest_task){
             this.wprodeuce_id.spriteFrame = this._assest_task.getSpriteFrame(this._produce_id.toString());
         }else{
             cc.loader.loadRes("Images/gongyingji/produce_choose", cc.SpriteAtlas, function (err, atlas) {                   //加载图集
                 if(err == null){
                     self._assest_task = atlas;
                     self.wprodeuce_id.spriteFrame = self._assest_task.getSpriteFrame(self._produce_id.toString());
                 }
             });
         }

        this.need_wprodeuce_num.string  = "/"+this._produce_num;                                              //需要完成数量
        this.compleat_wprodeuce_num.string = this._compleate_produce_num;                                 //已经完成了的数量

        //this.wjiangli_id.spriteFrame = this._assest_jianlgi.getSpriteFrame(this._jiangli_id);
        this.wjiangli_num.string = this._jiangli_num;
    }else{ 
        this.weiwancheng.active = false;                                                                         //完成界面
        this.wancheng.active = true;
        this.jiangli_num.string = this._jiangli_num;

        if( this._lingqu == true ){
            return ;
        }

        if(Math.random()>0.5 &&   require("PlayerManager").shiping_share_count < 5){
         this._shiping_double = true;
     }else{
         this._shiping_double = false;
     }

        if(this._shiping_double == true){                                                                   //观看视频
            this.share_double_node.active = false;
            this.shiping_double_node.active = true;
        }else{
            //this.share_double_node.active = true;
            this.shiping_double_node.active = true;
        }
        this._lingqu = true;
        

    }
 
    },

    qiehuanjiemian:function(){
        if(this._compleate_produce_num < this._produce_num){   
            this.weiwancheng.active = true; 
            this.wancheng.active = false;
 
            if(this._assest_task){
                 this.wprodeuce_id.spriteFrame = this._assest_task.getSpriteFrame(this._produce_id.toString());
             }else{
                 cc.loader.loadRes("Images/gongyingji/produce_choose", cc.SpriteAtlas, function (err, atlas) {                   //加载图集
                     if(err == null){
                         self._assest_task = atlas;
                         self.wprodeuce_id.spriteFrame = self._assest_task.getSpriteFrame(self._produce_id.toString());
                     }
                 });
             }
 
            this.need_wprodeuce_num.string  = "/"+this._produce_num;                                              //需要完成数量
            this.compleat_wprodeuce_num.string = this._compleate_produce_num;                                 //已经完成了的数量
 
            //this.wjiangli_id.spriteFrame = this._assest_jianlgi.getSpriteFrame(this._jiangli_id);
            this.wjiangli_num.string = this._jiangli_num;
        }else{ 
            this.weiwancheng.active = false;                                                                         //完成界面
            this.wancheng.active = true;
            this.jiangli_num.string = this._jiangli_num;
 
            if( this._lingqu == true ){
                return ;
            }
 
            if(Math.random()>0.5 &&   require("PlayerManager").shiping_share_count < 5){
             this._shiping_double = true;
         }else{
             this._shiping_double = false;
         }
 
            if(this._shiping_double == true){                                                                   //观看视频
                this.share_double_node.active = false;
                this.shiping_double_node.active = true;
            }else{
                //this.share_double_node.active = true;
                this.shiping_double_node.active = true;
            }
            this._lingqu = true;
            
 
        }
    }
});
