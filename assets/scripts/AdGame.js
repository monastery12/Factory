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
        icon : cc.Sprite,
        g_name : cc.Label,
        red : cc.Node,
    },

    ctor(){
        this.gamer = null;
    },

    init(param){
        
        if(param){
            this.gamer = param;
            cc.loader.load({url:this.gamer.icon, type: 'png'}, function(err, tex2d) {
                if(!this.node){
                    return;
                }
                if (err == null) {
                    this.icon.spriteFrame = new cc.SpriteFrame(tex2d);
                }
            }.bind(this))
            if(this.g_name){
                this.g_name.string = this.gamer.name;
            }
            if(this.red){
                this.red.active = this.gamer.is_red;
            }
        }
       
    },

    onJump(evt,data){
         
        //按钮声音
        require("Audio").play("Click",false,1);

        if(data == "Main_CPA"){
      
        }
        this.gamer && jumpMiniProgram(this.gamer);
    },
    // LIFE-CYCLE CALLBACKS:

    /**
     * 观察者模式的缺点
     * 一个预制体挂载一个脚本
     * 当出现多个相同的预制体
     * 会运行多次脚本
     * 而每个脚本都会发送一个通知，这样预制体A 会收到 预制体B挂载的脚本 发来的通知
     */
    onLoad () {
        //cc.systemEvent.on("CHANGE_AD_GAME",this.initadGame.bind(this));                               
        this.initadGame();
    },

    start () {
        var self = this;
        setInterval(function(){
          //cc.systemEvent.emit("CHANGE_AD_GAME");
            self.initadGame();
        },1000*10);


    },

    initadGame:function(){
        var indexParam = parseInt( Math.random()*10) ;
        var adGameParam = require("ComConfig").ad.table_game_arr[indexParam];
        this.init(adGameParam);
    },

    // update (dt) {},
});
