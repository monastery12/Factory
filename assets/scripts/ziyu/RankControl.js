

var RankControl = cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },

        rankTexNode : cc.Node,

  //      friend_node:cc.Node,                 //好友排行
 //       world_node:cc.Node,
//
        nearbyTexNode : cc.Node,
        rankNode:cc.Node,
        rank_jiantou:cc.Node,

        //rankManager:require('rankManager'),                 

        _friend_world:true,                                         //false 世界        true 好友
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    statics : {
        instance : null,
    },

    start () {
        RankControl.instance = this;
    },

    //下一页
    onNextPageClicked () {
        //按钮声音
        require("Audio").play("Click",false,1);

        if(cc.sys.browserType == cc.sys.BROWSER_TYPE_WECHAT_GAME){
            wx.postMessage({
                message: 'NextRankPage'
            });
        }
        cc.systemEvent.emit("UPDATE_RANK_VIEW");
    },

    //上一页
    onPrevPageClicked () {
        //按钮声音
        require("Audio").play("Click",false,1);
                    
        if(cc.sys.browserType == cc.sys.BROWSER_TYPE_WECHAT_GAME){
            wx.postMessage({
                message: 'PrevRankPage'
            });
        }
        cc.systemEvent.emit("UPDATE_RANK_VIEW");
    },

    /*
    onCloseBtnClicked () {
        this.hideSubDomain();
        this.rankDialog.active = false;
        //this.node.active = false;

        wx.postMessage({
            message: 'HideRank'
        });
        wx.postMessage({
            message: 'HideBalance'
        });
    },
    */


    onShowNearbyBtnClicked (event, curScore) {
        //this.showSubDomain();
        this.rankTexNode.active = false;
        this.nearbyTexNode.active = true;

        if(cc.sys.browserType == cc.sys.BROWSER_TYPE_WECHAT_GAME){
            wx.postMessage({
                message: 'ShowBalance',
                stage_id : require("PlayerManager").cur_level,
            });
            wx.postMessage({
                message: 'HideRank'
            });
        }
    },

    //点击“排行榜”按钮
    onShowRankBtnClicked () {


        this.stage_id = require("PlayerManager").coin;
        if(cc.sys.browserType == cc.sys.BROWSER_TYPE_WECHAT_GAME){
            wx.postMessage({
                message: 'UpdateScore',
                stage_id : JSON.stringify(require("PlayerManager").coin ),
            });
        }

            this.rankTexNode.active = true;
  
            
            this.rank_jiantou.active = false;

            if(cc.sys.browserType == cc.sys.BROWSER_TYPE_WECHAT_GAME){
                wx.postMessage({
                    message: 'ShowRank'                                                     //onMessage
                });
                wx.postMessage({
                    message: 'HideBalance'
                });
            }



    },

    //世界排行
    showWorldRank(){
        // if(cc.sys.browserType == cc.sys.BROWSER_TYPE_WECHAT_GAME) {
          
        // }
        // this.friend_node.active = false ;
        // this.world_node.active = true;

        // this.rankManager.init();
        // this.rankManager.renderWorldRank();
        
    },

    //群排名
    showGroupRank (shareTicket) {
        this.rankTexNode.active = true;
        this.nearbyTexNode.active = false;

        if(cc.sys.browserType == cc.sys.BROWSER_TYPE_WECHAT_GAME) {
            wx.postMessage({
                message: 'ShowGroupRank',
                ticket : shareTicket,
            });
            wx.postMessage({
                message: 'HideBalance'
            });
        }
    },

    onRankNodeShow:function(){
        this.rankNode.active = true;
    },
    
    onRankClose:function(){
        this.rankNode.active = false;
    },

    //下一页
    onNextPageClicked () {


            if(cc.sys.browserType == cc.sys.BROWSER_TYPE_WECHAT_GAME){
                wx.postMessage({
                    message: 'NextRankPage'
                });
            }
            cc.systemEvent.emit("UPDATE_RANK_VIEW");

     
    },

    //上一页
    onPrevPageClicked () {

 
            if(cc.sys.browserType == cc.sys.BROWSER_TYPE_WECHAT_GAME){
                wx.postMessage({
                    message: 'PrevRankPage'
                });
            }
            cc.systemEvent.emit("UPDATE_RANK_VIEW");
 

    },

    // update (dt) {},
});
