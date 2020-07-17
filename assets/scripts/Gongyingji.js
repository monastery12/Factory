/**
 * 供应机
 * 生产东西
 * 
 * 等级控制   供应速度，可生产物品
 * 
 */

 /**
  * _goods_list 链表， 每次产出一个goods，需要将goods放入_goods_list中，在update中，每次检测goods之间得时间间隔，如果小于一个 
  * 限定值，那么让改goods停止0.5秒
  */

var Gongyingji = null;

cc.Class({
    extends: cc.Component,

    properties: {
        goods:cc.Node,
        parent:cc.Node,
        childPanel:cc.Node,         
        dengji_lb:cc.Label,                                     //等级    
        shengcanPanel:cc.Node,
        
        rate:cc.Label,                                          //
        cailiao:cc.Sprite,                                      //

        bg1:cc.Sprite,
        bg2:cc.Sprite,
        bg3:cc.Sprite,
        bg4:cc.Sprite,

        teshugood_node:cc.Node,
        newgoodstip:cc.Node,

        _goodsPool:null,
        _goodsPool2:null,
        _rate:1,                                                 //供应的速率
        _produc_index:1,                                         //供应的物品类型
        _assest:null,

        _goods_list:[],
        _list_index:0,

        
                          
        _bizhi1:null,
        _bizhi2:null,
        _bizhi3:null,
        _bizhi4:null,
        _bizhi5:null,

        _zijin:false,                                           //资金加速器状态
        _zijincount:5,
        
    },

    //读取数据
    init:function(){
        var self = this;
        //初始化数据
        var lv = require("PlayerManager").production_lv;                        //供应机等级，通过等级去拿取生产速度
        var produce_type = require("PlayerManager").produceType;
        switch(produce_type){
            case 1:this._rate = require("ComMain").gameCfgs.produce[lv].rate1;break;            
            case 2:this._rate = require("ComMain").gameCfgs.produce[lv].rate2;break;            
            case 3:this._rate = require("ComMain").gameCfgs.produce[lv].rate3;break;            
            case 4:this._rate = require("ComMain").gameCfgs.produce[lv].rate4;break;           
            case 5:this._rate = require("ComMain").gameCfgs.produce[lv].rate5;break;         
            case 6:this._rate = require("ComMain").gameCfgs.produce[lv].rate6;break;          
            case 7:this._rate = require("ComMain").gameCfgs.produce[lv].rate7;break;      
            case 8:this._rate = require("ComMain").gameCfgs.produce[lv].rate8;break;
            case 9:this._rate = require("ComMain").gameCfgs.produce[lv].rate9;break;      
            case 10:this._rate = require("ComMain").gameCfgs.produce[lv].rate10;break;        
            case 11:this._rate = require("ComMain").gameCfgs.produce[lv].rate11;break;         
            case 12:this._rate = require("ComMain").gameCfgs.produce[lv].rate12;break;           
            case 13:this._rate = require("ComMain").gameCfgs.produce[lv].rate13;break; 
            case 14:this._rate = require("ComMain").gameCfgs.produce[lv].rate14;break;         
            case 15:this._rate = require("ComMain").gameCfgs.produce[lv].rate15;break;            
        }


   

        //初始化界面
        this.rate.string = this._rate;                                           //速度
        this.dengji_lb.string = "Lv:" +lv;                                              //等级
        this._produc_index = require("PlayerManager").produceType;
        var cailiao_name;
        //setTimeout(function(){
            self.jiazaiImage();
       // },200);


    },


    upv:function(){
        this.init();
        this.deleateJishiqi();
        this.createJishiqi();
    },

    onLoad (){

        cc.systemEvent.on("OPEN_MONEY_JIASU",this.zijinkaiqi.bind(this));
        cc.systemEvent.on("STOP_MONEY_JIASU",this.ziinclose.bind(this));

        //cc.systemEvent.on("GONGYINGJI_SHENG",this.updateFunc(this));                    //供应机升级通知
        //cc.systemEvent.on("GONGYINGJI_CHANGE",this.updateFunc(this));
        cc.systemEvent.on("P",this.upv.bind(this));       
        cc.systemEvent.on("CHANGE_BIZHI",this.changeBizhi.bind(this));          //切换壁纸


        //cc.systemEvent.on("PRODUCE_INDEX",this.produceIndex.bind(this));
        cc.systemEvent.on("PRODUCE_CHANGE",this.changeProduceIndex.bind(this));     
        cc.systemEvent.on("HUI_SHOU", this.huihouFunc.bind(this) );
        cc.systemEvent.on("HUI_SHOU2", this.huihouFunc2.bind(this) );

        var self = this;
        cc.loader.loadRes("prefab/goods", function (err, prefab) {               //加载下资源
            if(err == null){
                self.goods = cc.instantiate(prefab);
            }
        });

        //特殊物品
        cc.loader.loadRes("prefab/teshugoods", function (err, prefab) {               //加载下资源
            if(err == null){
                self.teshugood_node = cc.instantiate(prefab);
            }
        });

        cc.loader.loadRes("Images/gongyingji/produce_choose", cc.SpriteAtlas, function (err, atlas) {             //加载图集
            self._assest = atlas;
            self.init();
            self.produceBegin();
         });
    

    },


    //资金加速
    zijinkaiqi:function(){
        this._zijin = true;
    },

    ziinclose:function(){
        this._zijin = false;
    },


    //加载图片
    jiazaiImage:function(){
            var self = this;
            var image_name =  self._produc_index.toString() + "0";
            this.cailiao.spriteFrame = this._assest.getSpriteFrame ( image_name );               //1 2 3 4  .... 
    },



    /**
     * 处理供应机升级的事情
     * 升级，调用init
     */
    updateFunc:function(){
        this.init();                    //升级初始化界面
        this.deleateJishiqi();
        this.createJishiqi();
    },

    start () {

        var self = this;



     
    },

    produceBegin:function(){
        var self = this;
        self._goodsPool = new cc.NodePool();                      //创建内存池  
        self._goodsPool2 = new cc.NodePool();                      //创建内存池  
        for(var i = 0;i<20;i++){
            let goodsP = cc.instantiate(self.goods);
            self._goodsPool.put(goodsP);
        }

        for(var k = 0;k<10;k++){
            let teshugood = cc.instantiate(self.teshugood_node );
            self._goodsPool2.put(teshugood);
        }


        setTimeout(function(){
            var jiange = self._rate;                              
            self.schedule(self.callBack,jiange );                //通过供应机的速度去创建计时器       
        },1000);
      
        // setTimeout(function(){
        //     cc.systemEvent.emit("OBJECT_POOL",self._goodsPool);             //传递一个对象池过去
        // },2000);
    },

    //删除计时器
    deleateJishiqi:function(){
        this.unschedule(this.callBack);
        cc.systemEvent.emit("CREATE_JISHIQI");
    },

    //创建计时器
    createJishiqi:function(){
        var self = this;
        var interval = this._rate / 1  ;                              //间隔        
        this.schedule(self.callBack,interval );
    },

    //生产物品
    callBack:function(){
        var self = this;

        let goods_item = null;
        if ( this._goodsPool.size() > 0) {                                     // 通过 size 接口判断对象池中是否有空闲的对象
            //console.log("内存池 创建");
            //goods_item = Gongyingji.get();
            goods_item = this._goodsPool.get();
        } else {                                                              // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
            //console.log("再次加载资源");
            goods_item = cc.instantiate(this.goods);
        }
        goods_item.parent = this.parent;
        goods_item.setPosition(cc.v2(190,155));

          //******************************将goods_item放入链表************************************//
          this._goods_list.push(goods_item);                               //跑完动画，需要shift

        if(this._zijin === true){

            this._zijincount >= 5 ? this._zijincount : this._zijincount ++ ;
            if( this._zijincount == 5 ){
                let teshugood = null;
                if ( this._goodsPool2.size() > 0) {                                     // 通过 size 接口判断对象池中是否有空闲的对象
                    teshugood = this._goodsPool2.get();
                } else {                                                              // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
                    teshugood = cc.instantiate(this.teshugood_node);
                }
    
                teshugood.parent = this.parent;
                teshugood.setPosition(cc.v2(190,155));
                this._goods_list.push(teshugood);                               //跑完动画，需要shift
                this._zijincount = 0;
            }
            

          
        }
    },

    //点击查看机器详情
    machineDetails:function(){
                    //按钮声音
                    require("Audio").play("Click",false,1);
        this.childPanel.active = true;
    },

    //选择生产的物品
    chooseGongying:function(){
        //按钮声音
        require("Audio").play("Click",false,1);

        this.newgoodstip.active = false;
        this.shengcanPanel.active = true;
    },


     //改变生产的索引，
     changeProduceIndex:function(index){
        this._produc_index = index;
        //this.jiazaiImage();
        //this.init();
        this.upv();
    },  

    //回收内存
    huihouFunc:function(goods_node){
        goods_node.removeFromParent(true);                                                                  //返回内存池

        this._goodsPool.put(goods_node);

        this._goods_list.shift(goods_node);
        //console.log("回收goods");
    },

    huihouFunc2:function(goods_node){
        goods_node.removeFromParent(true);                                                                  //返回内存池

        this._goodsPool2.put(goods_node);

        this._goods_list.shift(goods_node);
    },

    update (dt) {

        for(var i = 0;i<this._goods_list.length-1;i++){
          

            if( this._goods_list[i] == null ||  this._goods_list[i+1] == null){
                return ;
            }

            if(this._goods_list[i].getComponent("Goods") != null ){
                //获取第i个物品得状态，与下一个物品得状态
                var state1 = this._goods_list[i].getComponent("Goods")._animState;               //前一个状态

                if(this._goods_list[i+1].getComponent("Goods") != null ){
                    var state2 =  this._goods_list[i+1].getComponent("Goods")._animState;             //后一个状态
                }else{
                    var state2 =  this._goods_list[i+1].getComponent("Teshu_goods")._animState;             //后一个状态
                }
              
            
                var time1 = state1.time;
                var time2 = state2.time;
                if( time1 - time2 < 0.2 ){
                    
                    if(this._goods_list[i+1].getComponent("Goods") != null ){
                        this._goods_list[i+1].getComponent("Goods").pauseFunc(200);                 //停止400秒
                    }else{
                        this._goods_list[i+1].getComponent("Teshu_goods").pauseFunc(200);                 //停止400秒
                    }
                }
            }else if( this._goods_list[i].getComponent("Teshu_goods") != null ){


                var state1 = this._goods_list[i].getComponent("Teshu_goods")._animState;               //前一个状态
                
                if(this._goods_list[i+1].getComponent("Goods") != null ){
                    var state2 =  this._goods_list[i+1].getComponent("Goods")._animState;             //后一个状态
                }else{
                    var state2 =  this._goods_list[i+1].getComponent("Teshu_goods")._animState;             //后一个状态
                }

                var time1 = state1.time;
                var time2 = state2.time;
                if( time1 - time2 < 0.2 ){

                    if(this._goods_list[i+1].getComponent("Goods") != null ){
                        this._goods_list[i+1].getComponent("Goods").pauseFunc(200);                 //停止400秒
                    }else{
                        this._goods_list[i+1].getComponent("Teshu_goods").pauseFunc(200);                 //停止400秒
                    }


                }

            }


        }


    },
    changeBizhi:function(){

    },
});


//module.exports = Gongyingji ;               