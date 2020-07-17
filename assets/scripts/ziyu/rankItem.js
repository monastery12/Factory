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
        no : cc.Label,
        headIcon : cc.Sprite,
        nickname : cc.Label,
        score : cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    //====================================================================
    //初始化排行数据
    //params
    //@rankNo init 排行
    //@avatarUrl string 头像路径
    //@name string 昵称
    //@gameScore 得分
    //====================================================================
    initData (rankNo, avatarUrl, name, gameScore) {

        this.node.active = true;

        this.headIcon.spriteFrame = null;
        this.nickname.string = name;
        if(!gameScore){
            this.score.string = "第1关";
        }else{
            this.score.string ="第"+ gameScore.toString()+"关";
        }
        

        this.no.string = rankNo.toString();

        var rankImageNode = this.node.getChildByName('rank_image');
        if (rankNo < 4) {
            //this.no.node.active = false;
            rankImageNode.active = true;
            var rankImage = rankImageNode.getComponent(cc.Sprite);
            rankImageNode.spriteFrame = null;
            cc.loader.loadRes('rank_' + rankNo.toString(), cc.SpriteFrame, function (err, sf) {
                if (err == null) {
                    rankImage.spriteFrame = sf;
                }
            }.bind(this));
        } else {
            this.no.node.active = true;
            rankImageNode.active = false;
        }

        var headIconTex = wx.createImage();
        headIconTex.onload = function () {
            var texture = new cc.Texture2D();
            texture.initWithElement(headIconTex);
            texture.handleLoadedTexture();
            this.headIcon.spriteFrame = new cc.SpriteFrame(texture);
            this.headIcon.node.width = 65;
            this.headIcon.node.height = 65;
        }.bind(this);

        if (avatarUrl.length > 0) {
            headIconTex.src = avatarUrl;
        }
        
        /*
        cc.loader.load(avatarUrl, function (err, tex) {
            if (err != null) {
                cc.log('load avatar url ' + avatarUrl + ' failed');
                return;
            }

            var iconSpriteFrame = new cc.SpriteFrame();
            iconSpriteFrame.initWithTexture(tex);
            this.headIcon.spriteFrame = iconSpriteFrame;
        }.bind(this));
        */
    },

    clear () {
        this.no.string = '';
        this.headIcon.spriteFrame = null;
        this.nickname.string = '';
        this.score.string = '';
        var rankImageNode = this.node.getChildByName('rank_image');
        rankImageNode.active = false;
    }
    // update (dt) {},
});
