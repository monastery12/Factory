
const CHE = 6;

cc.Class({
    extends: cc.Component,

    properties: {

        goods_num:0,                                                    //装载的货物
        goods_content:cc.Node,
        _assest:null,
        _leave:false,
        _all_money :null,
        _count:0,

        _BigNum:null,

    },


    onLoad () {
        this._BigNum = require("BigNum");
        this._all_money = {unit:0,time:0}  ; 
        cc.systemEvent.on("LEAVE_1",this.leave.bind(this));                              //自己装满了通知自己
        cc.systemEvent.on("MONEY_SELL",this.countMoney.bind(this));
        cc.systemEvent.on("ZHUANG_ZAI",this.loadPic.bind(this));                              //goods发过来
        cc.systemEvent.on("DRIVER_1",this.driver1.bind(this));                            //driver2装满了

        cc.systemEvent.on("DRIVER_1_WAIT",this.waitZh.bind(this));
    },

    start () {

    },




    waitZh:function(){
        var self = this;
        setTimeout(function(){
            self.node.active = true;
            //console.log("1回来");
        },100);
    },


    loadPic:function(sp){
        var self = this;

        var num = this.goods_num + 1;
        if(num < (CHE+1) ){

            if(this._assest){
                self.goods_content.children[ self.goods_num ].active = true;
                self.goods_content.children[ self.goods_num ].getComponent(cc.Sprite).spriteFrame = self._assest.getSpriteFrame(sp);
                self.goods_num++;
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
            //console.log("1装货");
        }else{
            if(self._leave == false){
                cc.systemEvent.emit("LEAVE_1");
                this._leave = true;
               // console.log("1离开");
            }
            cc.systemEvent.emit("DRIVER_2",sp);
           
        }

    },

    countMoney:function(money){
        var self = this;
        this._count ++;
        if(this._leave == false){
            this._all_money =  this._BigNum.Add(self._all_money , money );
        }else{
            cc.systemEvent.emit("MONEY_SELL2",money)
        }


        
    },

    leave:function(){

            var self = this;
            self.node.active = true;
            cc.systemEvent.emit("SELL_MONEY",self._all_money);                           //卖出去的钱
            self._all_money = { unit:0, time:0 };
            
            var call = cc.callFunc(function(){
                self.node.setPosition(cc.v2(274,1069));
                for(var i = 0 ; i < self.node.getChildByName("goods").children.length ; i++){
                    self.node.getChildByName("goods").children[i].active = false;
                }
            },self);
            self.node.runAction(cc.sequence(cc.moveTo(0.5,cc.v2(850,1069)),call));

    },


    driver1:function(sp){
        if(this.goods_num >= CHE){
            this.goods_num = 0;
        }else if(this.goods_num < 9 ){
            this.goods_num++;
        }
        this._leave = false;
        cc.systemEvent.emit("ZHUANG_ZAI",sp);
    },



    // update (dt) {},
});
