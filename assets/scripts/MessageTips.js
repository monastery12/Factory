
const TIP_TIME = 2000;      //
cc.Class({
    extends: cc.Component,

    properties: {
        bg:cc.Node,
        lb:cc.Label,
    },

  

    onLoad () {
        cc.systemEvent.on("GAME_MESSAGE_TIPS",this.tips.bind(this));
    },

    start () {

    },

    tips:function(str){
        var self = this;
        this.bg.active = true;
        this.lb.string = str;
        setTimeout(function(){
            self.bg.active = false;
        },TIP_TIME);
    },

    // update (dt) {},
});
