const CHE = 6;
cc.Class({
    extends: cc.Component,

    properties: {
        goods_num:0,
        goods_content:cc.Node,
        _assest:null,
        _leave:false,
        _all_money:null,

        _BigNum:null,
    },


    onLoad () {
        this._BigNum = require("BigNum");
        this._all_money = {unit:0,time:0}  ; 
        cc.systemEvent.on("LEAVE_2",this.leave.bind(this));
        cc.systemEvent.on("DRIVER_2",this.loadPic.bind(this));
        cc.systemEvent.on("MONEY_SELL2",this.countMoney.bind(this));
    },

    start () {

    },


    countMoney:function(money){
        var self = this;
        this._all_money  = this._BigNum.Add( self._all_money , money );
    },

    loadPic:function(sp){
        var self = this;

        var num = this.goods_num + 1;
        if(num < (CHE + 1)){
            if(this._assest){
                self.goods_content.children[ self.goods_num ].active = true;
                this.goods_content.children[ self.goods_num ].getComponent(cc.Sprite).spriteFrame = self._assest.getSpriteFrame(sp);
                this.goods_num++;
            }else{
                cc.loader.loadRes("Images/gongyingji/produce_choose", cc.SpriteAtlas, function (err, atlas) {                   //加载图集
                    if(err == null){
                        self._assest = atlas;
                        self.goods_content.children[ self.goods_num ].active = true;
                        self.goods_content.children[ self.goods_num ].getComponent(cc.Sprite).spriteFrame = self._assest.getSpriteFrame(sp);
                        self.goods_num++;
                    }
                 });
            }
           // console.log("2装货");
        }else{
            cc.systemEvent.emit("DRIVER_1",sp);
            if(this._leave == false){
                cc.systemEvent.emit("LEAVE_2");
                //console.log("2离开");
            }
            this.goods_num = 0;
           
        }

    },


    waitZh:function(){
        var self = this;
        setTimeout(function(){
            self.node.active = true;
            //console.log("2回来");
        },100);
    },

    leave:function(){

            var self = this;

            cc.systemEvent.emit("SELL_MONEY",self._all_money);                           //卖出去的钱
            self._all_money = {unit:0,time:0} ;

            self.node.active = true;

            var call = cc.callFunc(function(){
                self.node.setPosition(cc.v2(274,1069));
                for(var i = 0 ; i < self.node.getChildByName("goods").children.length ; i++){
                    self.node.getChildByName("goods").children[i].active = false;
                }
            },self);
            self.node.runAction(cc.sequence(cc.moveTo(0.5,cc.v2(850,1069)),call));
      
    },



    // update (dt) {},
});
