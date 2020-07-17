var AdComponent = require("AdComponent");

cc.Class({
    extends: cc.Component,

    properties: {
        adComponent:AdComponent,
        child:cc.Node,
        jindutiao_bg:cc.Node,
        jindutiao:cc.Node,
        lb:cc.Label,

        _index:0,
    },


    onLoad () {
        cc.systemEvent.on("SHIPING_JIHUO",this.init.bind(this));
    },

    start () {
        this.adComponent.init(1,this.onShipingGet,this);
    },

    
    init:function( index ){

        this.child.active = true;
        this._index = index;
        var need_count = require("ComMain").gameCfgs.videoopen[index].videonum;                    //第index个机器激活需要观看的视频次数
        var had_count  = require("PlayerManager").jihuo_count[ index - 1 ] ;                       //第index个机器激活已经看了多少次视频

        this.lb.string = had_count + "/" + need_count ;

        var length = (had_count / need_count) >= 1 ? 1 : (had_count/need_count) ;

        this.jindutiao.width = this.jindutiao_bg.width * ( length ) ;

        if( length == 1 ){
            require("PlayerManager").zhizaoji_lv[ index - 1] = 1 ;
            this.child.active = false;
            //通知gameview刷新开启
            cc.systemEvent.emit("UPDATE_GAMEVIEW");
            messageTips("激活成功");
        }


    },

    buttonClick:function(){
        var self = this;
        //按钮声音
        require("Audio").play("Click",false,1);

        //在此处先判断能都看视频

        var zzj_index = require("PlayerManager").zhizaoji_lv[ self._index -2];           //
        if( zzj_index == 0 ){
            messageTips("需要先开启上一个制造机");
            return ;
        }
        require("sdk_4399").getAdAssest(function(data){
            if(data){
                self.onShipingGet();
            }else{
                messageTips("今日广告已看完啊，请明日再来");
            }
        })

    },

    onShipingGet:function(){
        var self = this;
        var zzj_index = require("PlayerManager").zhizaoji_lv[ self._index -2];           //
        if( zzj_index == 0 ){
            messageTips("需要先开启上一个制造机");
            return ;
        }

        var index = this._index; 
        require("PlayerManager").jihuo_count[ index - 1 ] ++;           //增加次数
        this.init(index);
    },

    back:function(){
        this.child.active  = false;
    },

    // update (dt) {},
});
