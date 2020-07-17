


//  const EXchange = {
//                     d_coin: [ {coin:3 ,diamond:1},{coin:3,diamond:1} ],         //钻石换金币    金币数量-钻石数量
//                     d_screw:[ {screw:3,diamond:2},{coin:3,diamond:1} ],         //钻石换螺丝    螺丝数量-钻石数量
//                   }


cc.Class({
    extends: cc.Component,

    properties: {
        coin_node:cc.Node,
        // coin_num1:cc.Label,
        // coin_num2:cc.Label,
        // coin_num3:cc.Label,
        // diamond_num1:cc.Label,
        // diamond_num2:cc.Label,
        // diamond_num3:cc.Label,

        screw_node:cc.Node,
        coin_content:cc.Node,
        screw_content:cc.Node,

        togglecoin:cc.Toggle,
        togglescrew:cc.Toggle,
        // screw_num1:cc.Label,
        // screw_num2:cc.Label,
        // screw_num3:cc.Label,
        // sdiamond_num1:cc.Label,
        // sdiamond_num2:cc.Label,
        // sdiamond_num3:cc.Label,

        _coin_item:null,
        _screw_item:null,
        _exchange:null,
        _playerManager:null,

        _BigNum:null,
        
   
    },

    onLoad () {
        var self = this;
        this._BigNum = require("BigNum");
        cc.systemEvent.on("COIN_EXCHANGE",this.coin_Button.bind(this));
        cc.systemEvent.on("SCREW_EXCHANGE",this.screw_Button.bind(this));

        // cc.loader.loadRes("prefab/coin_bg", function (err, prefab) {
        //     if(err == null){
        //         self._coin_item = cc.instantiate(prefab);
        //     }
        // });

        // cc.loader.loadRes("prefab/screw_bg", function (err, prefab) {
        //     if(err == null){
        //         self._screw_item = cc.instantiate(prefab);
        //     }
        // });
    },

    start () {

    },

    onEnable:function(){
        var self = this;
        var gamecfgs = require("ComMain").gameCfgs;
        var Bignum =require("BigNum");
        var kaiqi_index =  gamecfgs.produce[ require("PlayerManager").production_lv ].enable ; 
        var jichu       =  gamecfgs.award[kaiqi_index].jingbi_num;
        //兑换表
        for(var m2 = 1; gamecfgs.exchange[ m2 ] != null; m2++){
            gamecfgs.exchange[m2].coin_num =  Bignum.MulNum( jichu, gamecfgs.exchange[m2].coin_numx ) ; 
        }


        if(self._coin_item == null || self._screw_item == null ){
            cc.loader.loadRes("prefab/coin_bg", function (err, prefab) {
                if(err == null){
                    self._coin_item = cc.instantiate(prefab);

                    cc.loader.loadRes("prefab/screw_bg", function (err, prefab) {
                        if(err == null){
                            self._screw_item = cc.instantiate(prefab);
                            self.init();
                        }
                    });
                }
            });
    

        }else{
            self.init();
        }

     

        //setTimeout(function(){
            
       // },100);

    },

    init:function(){
        var self = this;
        this._exchange = require("ComMain").gameCfgs.exchange;                                //兑换表
        this._playerManager = require("PlayerManager");

        this.coin_content.removeAllChildren(true);
        this.screw_content.removeAllChildren(true);

        for(var i = 1; this._exchange[i] != null  ;i++ ){

            //换金币

            var coin_item = cc.instantiate(this._coin_item);
            var coin_num = coin_item.getChildByName("coin_num").getComponent(cc.Label);                //金币数量
            var diamond_num = coin_item.getChildByName("diamond_num").getComponent(cc.Label);          //钻石数量
            var coin_btn = coin_item.getChildByName("ex_button");                                      //按钮

            coin_num.string =  this._BigNum.Show( self._exchange[i].coin_num ) ;
            diamond_num.string = this._exchange[i].diamond_num1;

            coin_btn.getComponent(cc.Sprite).coin_num = this._exchange[i].coin_num;
            coin_btn.getComponent(cc.Sprite).diamond_num = this._exchange[i].diamond_num1;

            coin_btn.on(cc.Node.EventType.TOUCH_START,function(event){
                cc.systemEvent.emit("COIN_EXCHANGE",event);
            });

            coin_item.active = true;
            coin_item.parent = this.coin_content;

            //换零件

            var screw_item = cc.instantiate(this._screw_item);
            var scoin_num = screw_item.getChildByName("screw_num").getComponent(cc.Label);                //金币数量
            var sdiamond_num = screw_item.getChildByName("diamond_num").getComponent(cc.Label);          //钻石数量
            var screw_btn = screw_item.getChildByName("ex_button");                                      //按钮

            scoin_num.string = this._exchange[i].screw_num;
            sdiamond_num.string = this._exchange[i].diamond_num2;
            
            screw_btn.getComponent(cc.Sprite).screw_num = this._exchange[i].screw_num;
            screw_btn.getComponent(cc.Sprite).diamond_num = this._exchange[i].diamond_num2;
            screw_btn.on(cc.Node.EventType.TOUCH_START,function(event){
                cc.systemEvent.emit("SCREW_EXCHANGE",event);
            });
            screw_item.active = true;
            screw_item.parent = this.screw_content;
            

        }
        
        if(this.screw_node.active == true){
            this.togglescrew.isChecked = true;
            var node1 =   this.togglescrew.node.getChildByName("checkmark");

            this.togglescrew.node.getChildByName("checkmark").active = true;
            this.togglescrew.node.getChildByName("Background").active = false;

            this.togglecoin.isChecked = false;
            this.togglecoin.node.getChildByName("checkmark").active = false;
            this.togglecoin.node.getChildByName("Background").active = true;
        }else{
            this.togglescrew.isChecked = false;
            this.togglescrew.node.getChildByName("checkmark").active = false;
            this.togglescrew.node.getChildByName("Background").active = true;

            this.togglecoin.isChecked = true;
            this.togglecoin.node.getChildByName("checkmark").active = true;
            this.togglecoin.node.getChildByName("Background").active = false;
        }
    },

    coin_Button:function(event){



        //按钮声音
        require("Audio").play("Click",false,1);


        var coin_num = event.target.getComponent(cc.Sprite).coin_num;
        var diamond_num = event.target.getComponent(cc.Sprite).diamond_num;

        if( this._playerManager.diamond >= diamond_num ){
            this._playerManager.coin  =  this._BigNum.Add( coin_num , require("PlayerManager").coin ) ; 
            this._playerManager.diamond -= diamond_num ;
            messageTips("兑换成功");



            cc.systemEvent.emit("UI_CHANGE");
        }else{
            messageTips("钻石不足");
        }
    },


    screw_Button:function(event){

        var screw_num = event.target.getComponent(cc.Sprite).screw_num;
        var diamond_num = event.target.getComponent(cc.Sprite).diamond_num;

        if( this._playerManager.diamond >= diamond_num ){
            this._playerManager.screw += screw_num;
            this._playerManager.diamond -= diamond_num;
            messageTips("兑换成功");
            cc.systemEvent.emit("UI_CHANGE");
        }else{
            messageTips("钻石不足");
        }
    },



    backFunc:function(){
        this.node.active = false;
    },

    toggle_coin:function(){
        this.coin_node.active = true;
        this.screw_node.active = false;
    },
    toggle_screw:function(){
        this.coin_node.active = false;
        this.screw_node.active = true;
    }

    


    // update (dt) {},
});
