
const SHARE_NUM = 2;
const SHIPING_NUM = 3;
const CJ_WURENJI = 8;
const CJ_AD = 9;
var AdComponent = require("AdComponent");
cc.Class({
    extends: cc.Component,

    properties: {
        adComponent:AdComponent,
        child_node:cc.Node,

        jiangli_1:cc.Node,
        jiangli_2:cc.Node,
        jiangli_3:cc.Node,

        jiangli_num:cc.Label,

        jiangli_button_1:cc.Node,
        jiangli_button_2:cc.Node,

        _jiangli_id:0,
        _jiangli_num:0,

        _BigNum:null,


    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._BigNum = require("BigNum");
        cc.systemEvent.on("WURENJI",this.wurenjiJiangli.bind(this));

    },

    start () {
        this.adComponent.init(2,this.onShipingGet,this);
    },




    wurenjiJiangli:function(obj){

         //无人机声音
         require("Audio").play("Feiji",false,1);
        
        this.child_node.active = true;


        this._jiangli_id = obj.id;
        this._jiangli_num = obj.num;

        this.init();
        
        require("PlayerManager").achievement_jindu[CJ_WURENJI] ++;

    },

    init:function(){

        var self = this;
        if( this._jiangli_id == 1){
            this.jiangli_1.active = true;
            this.jiangli_2.active  = false;
            this.jiangli_3.active = false;
        }else if(this._jiangli_id == 2){

            this.jiangli_2.active  = true;
            this.jiangli_1.active = false;
            this.jiangli_3.active = false;

        }else if(this._jiangli_id == 3){
            this.jiangli_3.active = true;
            this.jiangli_1.active = false;
            this.jiangli_2.active  = false;
        }

        if(this._jiangli_id == 1 ){
            this.jiangli_num.string = "$"+ this._BigNum.Show( self._jiangli_num ) ;
        }else{
            this.jiangli_num.string =  this._jiangli_num;
        }

      
    },



     //视频加倍按钮
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

    //分享加倍按钮
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
    },


      //分享奖励
      onShareGetCoinSucc:function(){
        /**
         * 
         */
        if(this._jiangli_id == 1){                                                  //奖励金币
           
            var tem_obj = this._BigNum.MulNum(self._jiangli_num , SHARE_NUM );
            require("PlayerManager").coin = this._BigNum.Add(tem_obj , require("PlayerManager").coin );     

        }else if(this._jiangli_id == 2){                                            //奖励钻石
            require("PlayerManager").diamond += ( this._jiangli_num * SHARE_NUM);
        }else if(this._jiangli_id == 3){                                            //奖励螺丝
            require("PlayerManager").screw += ( this._jiangli_num * SHARE_NUM);
        }


        cc.systemEvent.emit("UI_CHANGE");                   //刷星ui界面

        messageTips("分享成功");
        this.child_node.active = false;
    },

    //视频奖励
    onShipingGet:function(){

        var self = this;
        if(this._jiangli_id == 1){                                                  //奖励金币
            var tem_obj = this._BigNum.MulNum(self._jiangli_num , SHIPING_NUM );
            require("PlayerManager").coin = this._BigNum.Add(tem_obj , require("PlayerManager").coin );     
        }else if(this._jiangli_id == 2){                                            //奖励钻石
            require("PlayerManager").diamond += ( this._jiangli_num * SHIPING_NUM);
        }else if(this._jiangli_id == 3){                                            //奖励螺丝
            require("PlayerManager").screw += ( this._jiangli_num * SHIPING_NUM);
        }


        cc.systemEvent.emit("UI_CHANGE");                   //刷星ui界面
        require("PlayerManager").achievement_jindu[CJ_AD] ++;
        this.child_node.active = false;
        if(this._jiangli_id == 1){
            let coin_str = this._BigNum.Show(tem_obj)
            messageTips(`观看视频获得奖励${coin_str}`,);
        }else{
            let numm = this._jiangli_num * SHIPING_NUM;
            messageTips(`观看视频获得奖励${numm}`,);
        }


    },

    closeClick:function(){
                    //按钮声音
                    require("Audio").play("Click",false,1);
                    var self = this;
                    
        if(this._jiangli_id == 1){                                                                                  //奖励金币
            require("PlayerManager").coin = this._BigNum.Add(self._jiangli_num , require("PlayerManager").coin );     
        }else if(this._jiangli_id == 2){                                                                            //奖励钻石
            require("PlayerManager").diamond += ( this._jiangli_num );
        }else if(this._jiangli_id == 3){                                                                            //奖励螺丝
            require("PlayerManager").screw += ( this._jiangli_num );
        }

        if(this._jiangli_id == 1){
            let coin_str = this._BigNum.Show(self._jiangli_num)
            messageTips(`观看视频获得奖励${coin_str}`,);
        }else{
            let numm = this._jiangli_num;
            messageTips(`观看视频获得奖励${numm}`,);
        }

        cc.systemEvent.emit("UI_CHANGE");                   //刷星ui界面
        this.child_node.active = false;

    },

    // update (dt) {},
});
