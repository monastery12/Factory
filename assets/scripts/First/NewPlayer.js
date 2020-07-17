

cc.Class({
    extends: cc.Component,

    properties: {
        new1_node:cc.Node,
        new2_node:cc.Node,
        new3_node:cc.Node,
        new4_node:cc.Node,

        mask11:cc.Node,
        mask22:cc.Node,
        mask33:cc.Node,

        jihuo_btn:cc.Node,
        jiasu_btn:cc.Node,
        shengji_btn:cc.Node,

        lb_tip1:cc.Node,
        lb_tip2:cc.Node,
        lb_tip3:cc.Node,

        loadAward_node:cc.Node,

        _jiasu_time:1,
        _enable_jiasu:true,
       

    },

   

    onLoad () {
        cc.systemEvent.on("OPEN_NEW3",this.showNew3.bind(this));
    },

    start () {
        //this.init();
    },

    onEnable:function(){
        this._jiasu_time = 1;
        this.init();
    },

    init:function(){

    },


    showNew3:function(){
        this.new3_node.active = true;
    },

    //激活
    jihuo_btnFunc:function(){

        require("Audio").play("Click",false,1);

        this.jihuo_btn.active = false ;
        this.jiasu_btn.active = true  ;
        this.shengji_btn.active = false;

        this.lb_tip1.active = false;
        this.lb_tip2.active = true;

        this.mask11.active = false;
        this.mask22.active = true;
        
    },

    //加速
    jiasu_btnFunc:function(){
        var self = this;

        require("Audio").play("Click",false,1);

        if(self._enable_jiasu == true ){
            self._enable_jiasu = false;
            if(self._jiasu_time > 0 ){
                cc.systemEvent.emit("OPEN_MACHINE_1_JIASU_NEW");            //通知加速
                setTimeout(function(){
                    self._jiasu_time --;
                    self._enable_jiasu = true;
                    this.jihuo_btn.active = false ;
                    this.jiasu_btn.active = false ;
                    this.shengji_btn.active = true;
                    
                    this.lb_tip2.active = false;
                    this.lb_tip3.active = true;
                
                    this.mask22.active = false ;
                    this.mask33.active = true;
                },1000*9);
            }else{
                this.jihuo_btn.active = false ;
                this.jiasu_btn.active = false ;
                this.shengji_btn.active = true;
                
                this.lb_tip2.active = false;
                this.lb_tip3.active = true;
            
                this.mask22.active = false ;
                this.mask33.active = true;
            }
        }else{
            this.jihuo_btn.active = false ;
                this.jiasu_btn.active = false ;
                this.shengji_btn.active = true;
                
                this.lb_tip2.active = false;
                this.lb_tip3.active = true;
            
                this.mask22.active = false ;
                this.mask33.active = true;
        }
    },

    //打卡升级界面
    shengji_btnFunc:function(){

        require("Audio").play("Click",false,1);

        this.jihuo_btn.active = false ;
        this.jiasu_btn.active = false ;
        this.shengji_btn.active = false;

        this.new1_node.active = false;
        this.new2_node.active = true;

        this.mask33.active = false;
    },

    //强化制造机
    zzj_qianghua_btnFunc:function(){

        require("Audio").play("Click",false,1);

        this.new2_node.active = false;
    },

    //打开供应机
    gyj_open_btnFunc:function(){

        require("Audio").play("Click",false,1);

        this.new3_node.active = false;
        this.new4_node.active = true;
    },

    //供应机升级
    ggj_qianghua_btnFunc:function(){

        require("Audio").play("Click",false,1);

        require("PlayerManager").first_boomer  = false;
        cc.systemEvent.emit("XINSHOU_OVER");
        //this.loadAward_node.active = true;
        this.new4_node.active = false;
    },


    // update (dt) {},
});
