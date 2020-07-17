// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
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

        //rankDialog : cc.Node,

        //nearbyRank : cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this._rankTex = null;
        this._showSubDomain = false;

        this.showSubDomain();
        
        if(cc.sys.browserType == cc.sys.BROWSER_TYPE_WECHAT_GAME){
            this._rankTex = new cc.Texture2D();
        }
    },

    onEnable(){
        this.onUpdateRank();
        // cc.systemEvent.on("UPDATE_RANK_VIEW",this.onUpdateRank,this);
    },

    onUpdateRank(){
        this.schedule(()=>{
            this.updateSubDomainCanvas();
        },0.7);
        // this.updateSubDomainCanvas();
    },
    /*
    onNextPageClicked () {
        wx.postMessage({
            message: 'NextRankPage'
        });
    },

    onPrevPageClicked () {
        wx.postMessage({
            message: 'PrevRankPage'
        });
    },

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

    showSubDomain () {
        if(cc.sys.browserType == cc.sys.BROWSER_TYPE_WECHAT_GAME){
            if (wx.getOpenDataContext !== undefined) {
            	var openDataContext = wx.getOpenDataContext();
                var sharedCanvas = openDataContext.canvas;
            	 sharedCanvas.width = 650;
            	 sharedCanvas.height = 900;
    
            	this.node.active = true;
            	this._showSubDomain = true; 
            }
        }
    },

    hideSubDomain () {
        this.node.active = false;
        this._showSubDomain = false;
    },

    updateSubDomainCanvas () {
        if (this.node.active == true) {
            if (this._rankTex == null) {
                return;
            }
            this._rankTex.initWithElement(sharedCanvas);
            this._rankTex.handleLoadedTexture();
            //this.node.color = new cc.Color(255,255,255,0);
            this.node.width = 650;
            this.node.height = 900;
            var sprite = this.node.getComponent(cc.Sprite);
            sprite.spriteFrame = new cc.SpriteFrame(this._rankTex);
        }
     },

    update () {
        // this.updateSubDomainCanvas();
    },

    onDisable(){
        //this.unscheduleAllCallbacks();
        // cc.systemEvent.off("UPDATE_RANK_VIEW",this.onUpdateRank,this);
    },
    /*
    onShowBtnClicked () {
        this.showSubDomain();
        this.rankDialog.active = true;

        wx.postMessage({
            message: 'ShowRank'
        });
        wx.postMessage({
            message: 'HideBalance'
        });
    },
    */

    // update (dt) {},
});
