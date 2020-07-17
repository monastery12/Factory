

cc.Class({
    extends: cc.Component,

    properties: {
        childnode:cc.Node,
        sp1:cc.Sprite,
        sp2:cc.Sprite,
        sp3:cc.Sprite,
        sp4:cc.Sprite,
        sp5:cc.Sprite,
        sp6:cc.Sprite,

        goodsname:cc.Label,
        zhongleiName:cc.Label,
        newgoodstip:cc.Node,

        _assest:null,

    },


    onLoad () {
        cc.systemEvent.on("KAIQI_ZHONGLEI",this.kaiqizhonglei.bind(this));
    },

    start () {
        var self = this;
        cc.loader.loadRes("Images/gongyingji/produce_choose", cc.SpriteAtlas, function (err, atlas) {       //加载图集
            if(err == null){
                self._assest = atlas;
            }
         });
    },

    kaiqizhonglei:function(index){
        this.childnode.active = true;

        var goodsindex = (index-1) * 6 + 1;

        var str1 = require("ComMain").gameCfgs.goods[goodsindex].icon ;
        var str2 = require("ComMain").gameCfgs.goods[goodsindex+1].icon ;
        var str3 = require("ComMain").gameCfgs.goods[goodsindex+2].icon ;
        var str4 = require("ComMain").gameCfgs.goods[goodsindex+3].icon ;
        var str5 = require("ComMain").gameCfgs.goods[goodsindex+4].icon ;
        var str6 = require("ComMain").gameCfgs.goods[goodsindex+5].icon ;

        this.zhongleiName.string = "可生产"+ require("ComMain").gameCfgs.goods[goodsindex].typename;
        this.goodsname.string = require("ComMain").gameCfgs.goods[goodsindex].name;
        this.sp1.spriteFrame = this._assest.getSpriteFrame(str1);
        this.sp2.spriteFrame = this._assest.getSpriteFrame(str2);
        this.sp3.spriteFrame = this._assest.getSpriteFrame(str3);
        this.sp4.spriteFrame = this._assest.getSpriteFrame(str4);
        this.sp5.spriteFrame = this._assest.getSpriteFrame(str5);
        this.sp6.spriteFrame = this._assest.getSpriteFrame(str6);

        this.newgoodstip.active = true;

    },

    backfunc:function(){
        this.childnode.active = false;
    }

    // update (dt) {},
});
