const DURATION = 45*1000;                        //45秒出来一次
const RANDON = [1,1,1,1,1,2];

cc.Class({
    extends: cc.Component,

    properties: {
       
        

        _jiangli_id:0,
        _jiangli_num:0,

        _chuxian:true,

        _BigNum:null,
        _action:null,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
       this._BigNum = require("BigNum");
    },


    onEnable(){
        var self = this;

        setInterval(function(){
            self.callFunc();
        },DURATION);

        // setTimeout(function(){
          
        // },DURATION);
     
    },


    callFunc:function(){

            var produce_index = require("PlayerManager").produceType;           //生产种类
            var wurenji = require("ComMain").gameCfgs.award;                  //无人机

            var randon_num = parseInt( Math.random()*6) ;                        //5：1
            this._jiangli_id =  RANDON[randon_num]  ;                           //1或者2


            if(this._jiangli_id == 1){
                this._jiangli_num =   this._BigNum.MulNum(wurenji[produce_index].jingbi_num ,require("PlayerManager").production_lv * parseInt(Math.random()*10 +1) ) ;
            }else if(this._jiangli_id == 2){                                        //钻石
                this._jiangli_num = wurenji[ produce_index].zuanshi_num	; 
            }else if(this._jiangli_id == 3){
                this._jiangli_num = wurenji[ produce_index ].linjian_num	;
            }

            var d_t = 5;
            
            var moveTo1 = new cc.moveTo(d_t,cc.v2(-16,600.7));
            var moveTo2 = new cc.moveTo(d_t,cc.v2(296.7,99));
            var moveTo3 = new cc.moveTo(d_t,cc.v2(16,-459));
            var moveTo4 = new cc.moveTo(1,cc.v2(-482,99));

            var moveTo5 = new cc.moveTo(d_t,cc.v2(298,459));
            var moveTo6 = new cc.moveTo(d_t,cc.v2(-297,-320));
            var moveTo7 = new cc.moveTo(d_t,cc.v2(477,-318));
            //var moveTo8 = new cc.moveTo(d_t,cc.v2());

            var moveTo9  = new cc.moveTo(d_t,cc.v2(-296,-247));
            var moveTo10 = new cc.moveTo(d_t,cc.v2(296,127));
            var moveTo11 = new cc.moveTo(d_t,cc.v2(-466,742));
            //var moveTo12 = new cc.moveTo(d_t,cc.v2());

            var num = Math.random();
            this.node.opacity = 255;

            this.node.stopAction(this._action);

            if(  0<= num < 0.3 ){
                this.node.setPosition(cc.v2(-455,99.1));
                this._action = cc.sequence(moveTo1,moveTo2,moveTo3,moveTo4);
                this.node.runAction(this._action);
            }else if( 0.3<= num < 0.6 ){
                this.node.setPosition(cc.v2(-472,447));
                this._action = cc.sequence(moveTo5,moveTo6,moveTo7);
                this.node.runAction(this._action);
            }else{
                this.node.setPosition(cc.v2(461,-596));
                this._action = cc.sequence(moveTo9,moveTo10,moveTo11);
                this.node.runAction(this._action);
            }
            


            //this.node.runAction( cc.moveTo(1,cc.v2(221,82) ) );

            //this._chuxian = false;                                      //出现之后就不能再出现

    },




    start () {

    },



    //领取无人机奖励按钮
    lingquButtong:function(){
        var self = this;
        var obj= {
            id: self._jiangli_id,                   
            num: self._jiangli_num,
        }
        
        cc.systemEvent.emit("WURENJI",obj);                                         //

        this.xiaosiFunc();                                                          //    
    },

    //消失
    xiaosiFunc:function(){
        var self = this;
        this.node.opacity = 0;
       
        // setTimeout(function(){
        //     self.callFunc();
        // },DURATION);
    },

    // update (dt) {},
});
