const ADVANCE = 100;                                            //100毫秒
const DURATION = 1000;                                           //200毫秒内不能被同一个制造机打中
const LIFE = 5;


cc.Class({
    extends: cc.Component,

    properties: {       
        life:1,
        bg:cc.Node,
        bg2:cc.Node,
        bg3:cc.Node,
        bgg:cc.Node,

        life_lb:cc.Label,

        _randon_num:1,

       
        _next:0,
        
        _animCtrl:null,
        _animState:null,                                        //
        _change:false,


        _clli_z1:true,
        _clli_z2:true,
        _clli_z3:true,
        _clli_z4:true,
        _clli_z5:true,
        _clli_z6:true,     

      
    },

   
    onLoad () {

        this._animCtrl  = this.node.getComponent(cc.Animation);
        this._animState = this._animCtrl.getAnimationState('move2');
        

        
    },

    start () {
        var self = this;
 
        this._clli_z1 = true;
        this._clli_z2 = true;
        this._clli_z3 = true;
        this._clli_z4 = true;
        this._clli_z5 = true;
        this._clli_z6 = true;
        this._next = 0;
    },

    onEnable(){
        var self = this;
        //this.node.opacity = 0;                  //透明度
        this._clli_z1 = true;
        this._clli_z2 = true;
        this._clli_z3 = true;
        this._clli_z4 = true;
        this._clli_z5 = true;
        this._clli_z6 = true;
        this._next = 0;
        this._change = false;

        self.initGoods();
        this.move();
    },

    //初始化 
    init:function(){

    },


    //碰撞
    onCollisionEnter:function(other,self){
        var self = this;

        if(this.life > 0 ){
            this.life --;
            this.life_lb.string = this.life;
        }else{
            this.life_lb.string = 0 ;

            if(this._randon_num == 1){
                this.changeZuanshi();
            }else {
                this.changeCailiao();
            }
   
        }

        if(other.node.parent.name == "knif" && self._clli_z1 == true)     {
            
            self._clli_z1 = false;
            self.pauseFunc(500);                                              
        }
        else if(other.node.parent.name == "chongyaji" && self._clli_z2 == true){
            self._clli_z2 == false;
            self.compress_pauseFunc(1000);                                 
        }
        else if(other.node.name == "baicui" && self._clli_z3 == true){                    
            self.repelFunc();      
            self._clli_z3 = false;                                            
        }
        else if(other.node.name == "juci" && self._clli_z4 == true){               
            self.pauseFunc(500);  
            self._clli_z4 = false;
        }
        else if(other.node.name == "texiao" && self._clli_z5 == true){           
            self.pauseFunc(500);   
            self._clli_z5 = false;                                         
        }
        else if(other.node.name == "texiao6" && self._clli_z6 == true ){
            self._clli_z6 = false;
            self.pauseFunc(500);                                        
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
        this._animCtrl.setCurrentTime(0 ,"move2");
        this._animCtrl.play("move2");
        this._animCtrl.setCurrentTime(0 ,"move2");
    },

    //压缩不停止
    compressFunc:function(){
        var self = this;
        self._animCtrl.playAdditive("compress");
    },

    //压缩并且停止
    compress_pauseFunc:function(time){
        var self = this;
        time = 1000;

        self._animCtrl.pause("move2");
        self._animCtrl.playAdditive("compress");

        setTimeout(function(){
            self._animCtrl.resume("move2");
        },time);
    },

    //停止0.5
    pauseFunc:function(time){
        //time = 500;
        var self = this;
        self._animCtrl.pause("move2");
        setTimeout(function(){
            self._animCtrl.resume("move2");
        },time);
    },

    //停止并旋转
    rotateFunc:function(time){
        var self = this;
        time = 500;
        self._animCtrl.pause("move2");
        self._animCtrl.playAdditive("rotate");
        setTimeout(function(){
            self._animCtrl.resume("move2");
        },time);
    },

    //击退向后
    repelFunc:function(){
        var self = this;

        var now_time = self._animState.time;
        var duration = self._animState.duration;
        self._animCtrl.stop("move2");
        self._animState.wrapMode = cc.WrapMode.Reverse;
      
        self._animCtrl.play("move2");
        self._animCtrl.setCurrentTime(duration-now_time,"move2");
        setTimeout(function(){

            now_time = self._animState.time;
            self._animCtrl.stop("move2");
            self._animState.wrapMode = cc.WrapMode.Normal;
            self._animCtrl.setCurrentTime(duration- now_time ,"move2");
            self._animCtrl.play("move2");
            self._animCtrl.setCurrentTime(duration- now_time ,"move2");

        },100);

        
    },

    //击中向前
    advanceFunc:function(){
        var self = this;
        var now_time = self._animState.time;
        self._animCtrl.stop("move2");
        self._animCtrl.play("move2");
        self._animCtrl.setCurrentTime(now_time + 0.03 ,"move2");
    },


    //////////////////////////////////////////////////////////////////////////////////////////////////////
    resetState:function(){
        this._next = 0;
        this._animCtrl.stop("move2");
    },

    initGoods:function(){       
        this._randon_num = Math.random() >= 0.5 ? 1 : 2 ;   
        if(this._randon_num == 1){
            this.bg.active = true;
            this.bgg.active = false;
        }else{
            this.bg.active = false;
            this.bgg.active = true;
        }
        this.life = LIFE;            
        this.life_lb.string = LIFE;       
    },

    //变化为钻石
    changeZuanshi:function(){
        if(this._change == false ){
            this.bg.active = false;
            this.bgg.active = false;
            this.bg2.active = true;
            this.bg3.active = false;     

            this._change = true;   
        }
    },

    //变化为材料
    changeCailiao:function(){
        if( this._change == false ){
            this.bg.active = false;
            this.bgg.active = false;
            this.bg2.active = false;
            this.bg3.active = true;  
            
            this._change = true;   
        }
    },

    //跑完之后
    complateZhuangzai:function(){
    

        if(this._change == false ){
            cc.systemEvent.emit("HUI_SHOU2",this.node );            //回收
            cc.systemEvent.emit("UI_CHANGE");
            return;
        }

        if(this._randon_num == 1){
            this._animCtrl.stop("move2");
            this._animCtrl.play("zuanshi");
        }else {
            this._animCtrl.stop("move2");
            this._animCtrl.play("cailiao");
        }

    
    },

    complate1:function(){
        require("PlayerManager").diamond += 1 ;
        cc.systemEvent.emit("HUI_SHOU2",this.node );            //回收
        cc.systemEvent.emit("UI_CHANGE");
    },

    complate2:function(){
        require("PlayerManager").screw += 1 ;
        cc.systemEvent.emit("HUI_SHOU2",this.node );            //回收
        cc.systemEvent.emit("UI_CHANGE");
    },
});
