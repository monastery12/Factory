

cc.Class({
    extends: cc.Component,

    properties: {
        _times:0,
        _jiasu:false,
    },

    onLoad(){
        cc.systemEvent.on("OPEN_MACHINE_1_JIASU",this.jiasu.bind(this));
        cc.systemEvent.on("STOP_MACHINE_1_JIASU",this.stopJiasu.bind(this));
    },

    zzj_Bg_Play:function(){
        if(this._jiasu == false){
            require("Audio").play("ZZJ1",false,1);

        }else{
            if(this._times == 0 ){                                                  //加速状态没隔两次播放一次声音
                require("Audio").play("ZZJ1",false,1);
            }

        }
        this._times ++;
        this._times = this._times >= 2 ? 0: this._times ;

        //cc.systemEvent.emit("LIZI_1");
    },

    jiasu:function(){
        this._jiasu = true;
    },

    stopJiasu:function(){
        this._jiasu = false;
    },

});
