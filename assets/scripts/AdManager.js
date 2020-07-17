

cc.Class({
    extends: cc.Component,

    properties: {

        jiantou_node:cc.Node,
        adMenu_node:cc.Node,
        set_node:cc.Node,

        color_bg:cc.Node,

        _open:false,
        _open_enable:true,

    },

   

    onLoad () {
        cc.systemEvent.on("ADMENU_CLOSE",this.openButton.bind(this));
    },

    start () {

    },

    openButton:function(){

        //按钮声音
        require("Audio").play("Click",false,1);

        var self = this;
        if(this._open_enable == false) return ;
        
        if(this._open == false ){                                           //打开


            this._open = true;
            this.adMenu_node.runAction(cc.moveTo(0.5,cc.v2(-76,-78) ));
            this.jiantou_node.scaleX = 1;
            this.color_bg.active = true;
        }else{
            this._open = false;
            this.adMenu_node.runAction(cc.moveTo(0.5,cc.v2(-466,-78) ));
            this.jiantou_node.scaleX = -1;
            this.color_bg.active = false;
        }

    this._open_enable = false;
    setTimeout(function(){
        self._open_enable = true;
    },600);
    },

    openSet:function(){
        this.set_node.active = true;
    },

    // update (dt) {},
});
