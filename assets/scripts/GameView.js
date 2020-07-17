

const AUDION_NAME = "BG";
const LOOP = true;
const VALUE = 1;

cc.Class({
    extends: cc.Component,

    properties: {

        z1:cc.Node,
        z2:cc.Node,
        z3:cc.Node,
        z4:cc.Node,
        z5:cc.Node,
        z6:cc.Node,

        z1_lock:cc.Node,
        z2_lock:cc.Node,
        z3_lock:cc.Node,
        z4_lock:cc.Node,
        z5_lock:cc.Node,
        z6_lock:cc.Node,

        lock6:cc.Node,
        lock2:cc.Node,
        lock3:cc.Node,

        lock4:cc.Node,
        lock5:cc.Node,

        NewPlayer_node:cc.Node,
        bg:cc.Sprite,

        _open_num:1,
        _bizhi1:null,
        _bizhi2:null,
        _bizhi3:null,
        _bizhi4:null,
        _bizhi5:null,

    },

    onLoad () {
        cc.director.getCollisionManager().enabled = true;                       //开启碰撞

        cc.systemEvent.on("GONGYINGJI_SHENG",this.updateJiemian.bind(this));
        cc.systemEvent.on("CHANGE_BIZHI",this.changeBizhi.bind(this));          //切换壁纸
        cc.systemEvent.on("UPDATE_GAMEVIEW",this.updateJiemian.bind(this));
    },

    start () {

        if(require("PlayerManager").first_boomer == true && require("PlayerManager").zhizaoji_lv[0] == 0 ){                      //是否新玩家
            this.NewPlayer_node.active = true;
           // require("PlayerManager").first_boomer =false ;
        }
        this.changeBizhi();
        this.showMachine();
        this.yuPanMachine();
        require("Audio").loadBG();                                                  //加载背景
        //require("Audio").play(AUDION_NAME,LOOP,VALUE);

    },

    updateJiemian:function(){
        this.showMachine();
        this.yuPanMachine();
    },

    //
    showMachine:function(){
        var gyj_lv = require("PlayerManager").production_lv ;
        var zzj_lv = require("PlayerManager").zhizaoji_lv ;

        if(zzj_lv[0] > 0){
            this.z1.active = true;
            this._open_num =  1;
            this.z1_lock.active = false;
        }


        if( zzj_lv[1] > 0 ){                                            //制造机2等级大于0
            this.z2.active = true;
            this._open_num = 2;
        }


        if( zzj_lv[2] > 0){  //制造机3等级大于0          gyj_lv >= 20 &&
            this.z3.active = true;
            this._open_num = 3;
        }

        if( zzj_lv[3] > 0){  //制造机4等级大于0         gyj_lv >= 30
            this.z4.active = true;
            this._open_num = 4;
        }

        if( zzj_lv[4] > 0){  //制造机5等级大于0               gyj_lv >= 40
            this.z5.active = true;
            this._open_num = 5;
        }

        if( zzj_lv[5] > 0){  //制造机6等级大于0
            this.z6.active = true;
            this._open_num = 6;
        }


        if( gyj_lv  >= 7 && zzj_lv[1] == 0 && this.z2.active == false ){                      //制造机2
            this.z2_lock.active = true;
            this._open_num = 2;
        }else{
            this.z2_lock.active = false;
            //return ;
        }

        
        if( gyj_lv  >= 17 && zzj_lv[2] == 0 && this.z3.active == false){                      //制造机3
            this.z3_lock.active = true;
            this._open_num = 3;
        }else{
            this.z3_lock.active = false;
            //return ;
        }

        if( gyj_lv  >= 27 && zzj_lv[3] == 0  && this.z4.active == false){                      //制造机4
            this.z4_lock.active = true;
            this._open_num = 4;
        }else{
            this.z4_lock.active = false;
            //return ;
        }

        if( gyj_lv  >= 37 && zzj_lv[4] == 0 && this.z5.active == false){                      //制造机5
            this.z5_lock.active = true;
            this._open_num = 5;
        }else{
            this.z5_lock.active = false;
         

            //return ;
        }

        if( gyj_lv  >= 47 && zzj_lv[5] == 0 && this.z6.active == false ){                      //制造机6
            this.z6_lock.active = true;
            this._open_num = 6;

        }else{
            this.z6_lock.active = false;
        }

        
        if(this._open_num == 1){
            this.lock6.active = false;
            this.lock2.active = true;
            this.lock3.active = true;
            this.lock4.active = false;
            this.lock5.active = false;
        }else if(this._open_num == 2){
            this.lock6.active = false;
            this.lock2.active = false;
            this.lock3.active = true;
            this.lock4.active = false;
            this.lock5.active = false;
        }else if( this._open_num == 3 ){
            this.lock6.active = false;
            this.lock2.active = false;
            this.lock3.active = false;
            this.lock4.active = true;
            this.lock5.active = false;
        }else if(this._open_num == 4){
            this.lock6.active = false;
            this.lock2.active = false;
            this.lock3.active = false;
            this.lock4.active = false;
            this.lock5.active = true;
        }else if(this._open_num == 5){
            this.lock6.active = true;
            this.lock2.active = false;
            this.lock3.active = false;
            this.lock4.active = false;
            this.lock5.active = false;
        }else if(this._open_num == 6){
            this.lock6.active = false;
            this.lock2.active = false;
            this.lock3.active = false;
            this.lock4.active = false;
            this.lock5.active = false;
        }else{
            this.lock1.active = false;
            this.lock2.active = true;
            this.lock3.active = true;
        }

        //控制视频按钮显示
        if(  gyj_lv >= 10 ){
            this.z2_lock.children[0].getChildByName("icon_bofang").active = false;
        }
        if( gyj_lv >= 20){
            this.z3_lock.children[0].getChildByName("icon_bofang").active = false;
        }
        if( gyj_lv >= 30 ){
            this.z4_lock.children[0].getChildByName("icon_bofang").active = false;
        }
        if( gyj_lv >= 40 ){
            this.z5_lock.children[0].getChildByName("icon_bofang").active = false;
        }
        if( gyj_lv >= 50 ){
            this.z6_lock.children[0].getChildByName("icon_bofang").active = false;
        }
     
            // this.z2_lock.children[0].getChildByName("icon_bofang").active = false;
            // this.z3_lock.children[0].getChildByName("icon_bofang").active = false;
            // this.z4_lock.children[0].getChildByName("icon_bofang").active = false;
            // this.z5_lock.children[0].getChildByName("icon_bofang").active = false;
            // this.z6_lock.children[0].getChildByName("icon_bofang").active = false;
    },


    yuPanMachine:function(){

    },

    jihuoMachine1:function(){
        require("PlayerManager").zhizaoji_lv[0] = 1;            //制造机2 的等级
        this.z1.active = true;
        this.z1_lock.active = false;
        this.showMachine();
        this.yuPanMachine();
    },

    jihuoMachine2:function(){

                    //按钮声音
                    require("Audio").play("Click",false,1);

        if( require("PlayerManager").production_lv < 10   ){
            messageTips("等级不够开启");
            return ;
        }

        if(this.z1.active == false){
            messageTips("需要先开启一号制造机");
            return ;
        }

        require("PlayerManager").zhizaoji_lv[1] = 1;            //制造机2 的等级
        this.showMachine();
        this.yuPanMachine();
    },

    jihuoMachine3:function(){


                    //按钮声音
                    require("Audio").play("Click",false,1);

        if( require("PlayerManager").production_lv < 20   ){
            messageTips("等级不够开启");
            return ;
        }
        if(this.z2.active == false){
            messageTips("需要先开启二号制造机");
            return ;
        }
        require("PlayerManager").zhizaoji_lv[2] = 1;            //制造机3 的等级
        this.showMachine();
        this.yuPanMachine();
    },

    jihuoMachine4:function(){

                    //按钮声音
                    require("Audio").play("Click",false,1);

        if( require("PlayerManager").production_lv < 30   ){
            messageTips("等级不够开启");
            return ;
        }
        if(this.z3.active == false){
            messageTips("需要先开启三号制造机");
            return ;
        }
        require("PlayerManager").zhizaoji_lv[3] = 1;            //制造机4 的等级
        this.showMachine();
        this.yuPanMachine();
    },

    jihuoMachine5:function(){

                    //按钮声音
                    require("Audio").play("Click",false,1);

        if( require("PlayerManager").production_lv < 40   ){
            messageTips("等级不够开启");
            return ;
        }
        if(this.z4.active == false){
            messageTips("需要先开启四号制造机");
            return ;
        }

        require("PlayerManager").zhizaoji_lv[4] = 1;            //制造机5 的等级
        this.showMachine();
        this.yuPanMachine();
    },

    jihuoMachine6:function(){

                    //按钮声音
                    require("Audio").play("Click",false,1);

        if( require("PlayerManager").production_lv < 50   ){
            messageTips("等级不够开启");
            return ;
        }
        if(this.z5.active == false){
            messageTips("需要先开启五号制造机");
            return ;
        }
        require("PlayerManager").zhizaoji_lv[5] = 1;            //制造机6 的等级
        this.showMachine();
        this.yuPanMachine();
    },

    changeBizhi:function(){
        var self  = this;
        var index2 = require("PlayerManager").produceType;
        var index = require("ComMain").gameCfgs.bizhi[index2].bgtype;

        if(index == 1){
            if(this._bizhi1){
                this.bg.spriteFrame = this._bizhi1;
            }else{
                cc.loader.loadRes("Images/bizhi/bg1", cc.SpriteFrame ,function (err, sprite) {
                   if(err == null){
                        self._bizhi1 = sprite;
                        self.bg.spriteFrame = self._bizhi1;
                   }
                });
            }
        }
        else if(index == 2){
            if(this._bizhi2){
                this.bg.spriteFrame = this._bizhi2;
            }else{
                cc.loader.loadRes("Images/bizhi/bg2", cc.SpriteFrame ,function (err, sprite) {
                   if(err == null){
                        self._bizhi2 = sprite;
                        self.bg.spriteFrame = self._bizhi2;
                   }
                });
            }
        }
        else if(index == 3){
            if(this._bizhi3){
                this.bg.spriteFrame = this._bizhi3;
            }else{
                cc.loader.loadRes("Images/bizhi/bg3", cc.SpriteFrame ,function (err, sprite) {
                   if(err == null){
                        self._bizhi3 = sprite;
                        self.bg.spriteFrame = self._bizhi3;
                   }
                });
            }
        }
        else if(index == 4){
            if(this._bizhi4){
                this.bg.spriteFrame = this._bizhi4;
            }else{
                cc.loader.loadRes("Images/bizhi/bg4", cc.SpriteFrame ,function (err, sprite) {
                   if(err == null){
                        self._bizhi4 = sprite;
                        self.bg.spriteFrame = self._bizhi4;
                   }
                });
            }
        }
        else if(index == 5){
            if(this._bizhi5){
                this.bg.spriteFrame = this._bizhi5;
            }else{
                cc.loader.loadRes("Images/bizhi/bg5", cc.SpriteFrame ,function (err, sprite) {
                   if(err == null){
                        self._bizhi5 = sprite;
                        self.bg.spriteFrame = self._bizhi5;
                   }
                });
            }
        }



    },

    shipingjihuo2:function(){
        cc.systemEvent.emit("SHIPING_JIHUO",2);
    },

    shipingjihuo3:function(){
        cc.systemEvent.emit("SHIPING_JIHUO",3);
    },

    shipingjihuo4:function(){
        cc.systemEvent.emit("SHIPING_JIHUO",4);
    },

    shipingjihuo5:function(){
        cc.systemEvent.emit("SHIPING_JIHUO",5);
    },

    shipingjihuo6:function(){
        cc.systemEvent.emit("SHIPING_JIHUO",6);
    },

    shipingjihuo1:function(){
        cc.systemEvent.emit("SHIPING_JIHUO",1);
    },

    // // update (dt) {},
});
