


const DURATION = 10000;          //十秒钟检查一次

cc.Class({
    extends: cc.Component,

    properties: {
        gongyingji_red:cc.Node,
        zhizaoji_red1:cc.Node,
        zhizaoji_red2:cc.Node,
        zhizaoji_red3:cc.Node,
        zhizaoji_red4:cc.Node,
        zhizaoji_red5:cc.Node,
        zhizaoji_red6:cc.Node,

        zzj_jj_red1:cc.Node,
        //zzj_jj_cannot1:cc.Node,

        zzj_jj_red2:cc.Node,
        //zzj_jj_cannot2:cc.Node,

        zzj_jj_red3:cc.Node,
        //zzj_jj_cannot3:cc.Node,

        zzj_jj_red4:cc.Node,
        //zzj_jj_cannot4:cc.Node,

        zzj_jj_red5:cc.Node,
        //zzj_jj_cannot5:cc.Node,

        zzj_jj_red6:cc.Node,
        //zzj_jj_cannot6:cc.Node,

        ill_adv:cc.Node,

        ill_red:cc.Node,
        adv_red:cc.Node,

        _BigNum:null,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._BigNum = require("BigNum");
        cc.systemEvent.on("RED_CHANGE",this.initRed.bind(this));                                    //
        //cc.systemEvent.on("FAXIAN_NEW_GOODS",this.initIll.bind(this));                              //

        setInterval(function(){
            cc.systemEvent.emit("RED_CHANGE");                                                      //
        },DURATION);
    },

    start () {

    },

    initRed:function(){

        this.gongyingji_red.active = false;
        this.zhizaoji_red1.active = false;
        this.zhizaoji_red2.active = false;
        this.zhizaoji_red3.active = false;
        this.zhizaoji_red4.active = false;
        this.zhizaoji_red5.active = false;
        this.zhizaoji_red6.active = false;

        this.zzj_jj_red1.active = false;
        this.zzj_jj_red2.active = false;
        this.zzj_jj_red3.active = false;
        this.zzj_jj_red4.active = false;
        this.zzj_jj_red5.active = false;
        this.zzj_jj_red6.active = false;

        // this.ill_adv.active = false;
        // this.ill_red.active = false;
        // this.adv_red.active = false;



        var playermanager = require("PlayerManager");
        var gameCfgs = require("ComMain").gameCfgs;

        var ggj_lv = playermanager.production_lv        ;                   //供应机等级
        var zzj_lv1 = playermanager.zhizaoji_lv[0]      ;                   //制造机1
        var zzj_lv2 = playermanager.zhizaoji_lv[1]      ;
        var zzj_lv3 = playermanager.zhizaoji_lv[2]      ;
        var zzj_lv4 = playermanager.zhizaoji_lv[3]      ;
        var zzj_lv5 = playermanager.zhizaoji_lv[4]      ;
        var zzj_lv6 = playermanager.zhizaoji_lv[5]      ;

        var zzj_jj_lv1 = playermanager.zhizaoji_intensify_lv[0];
        var zzj_jj_lv2 = playermanager.zhizaoji_intensify_lv[1];
        var zzj_jj_lv3 = playermanager.zhizaoji_intensify_lv[2];
        var zzj_jj_lv4 = playermanager.zhizaoji_intensify_lv[3];
        var zzj_jj_lv5 = playermanager.zhizaoji_intensify_lv[4];
        var zzj_jj_lv6 = playermanager.zhizaoji_intensify_lv[5];
        
       


        //需要花费
        var ggy_coin = gameCfgs.produce[ggj_lv+1].consume;              //供应机金币需要
        if(zzj_lv1 > 0){
            var zzj_coin1 = gameCfgs.machinelevel[zzj_lv1+1].consume1;          //需要的金币
            var zzj_screw1 = gameCfgs.machindegree[zzj_jj_lv1+1].consume;      //进阶需要
        }
        if(zzj_lv2 > 0){
            var zzj_coin2 = gameCfgs.machinelevel[zzj_lv2+1].consume2;
            var zzj_screw2 = gameCfgs.machindegree[zzj_jj_lv2+1+20].consume;      //进阶需要
        }
        if(zzj_lv3 > 0){
            var zzj_coin3 = gameCfgs.machinelevel[zzj_lv3+1].consume3;
            var zzj_screw3 = gameCfgs.machindegree[zzj_jj_lv3+1+40].consume;      //进阶需要
        }
        if(zzj_lv4 > 0){
            var zzj_coin4 = gameCfgs.machinelevel[zzj_lv4+1].consume4;
            var zzj_screw4 = gameCfgs.machindegree[zzj_jj_lv4+1+60].consume;      //进阶需要
        }
        if(zzj_lv5 > 0){
            var zzj_coin5 = gameCfgs.machinelevel[zzj_lv5+1].consume5;
            var zzj_screw5 = gameCfgs.machindegree[zzj_jj_lv5+1+80].consume;      //进阶需要
        }
        if(zzj_lv6 > 0){
            var zzj_coin6 = gameCfgs.machinelevel[zzj_lv6+1].consume6;
            var zzj_screw6 = gameCfgs.machindegree[zzj_jj_lv6+1+100].consume;      //进阶需要
        }
      
       
        if(  this._BigNum.ChargeBig(playermanager.coin ,ggy_coin ) ){
            this.gongyingji_red.active = true;
        }
        if( zzj_lv1 && this._BigNum.ChargeBig(playermanager.coin,zzj_coin1) ){
            this.zhizaoji_red1.active = true;
        }

        if( zzj_lv2 && this._BigNum.ChargeBig(playermanager.coin,zzj_coin2) ){
            this.zhizaoji_red2.active = true;
        }

        if( zzj_lv3 && this._BigNum.ChargeBig(playermanager.coin,zzj_coin3) ){
            this.zhizaoji_red3.active = true;
        }

        if( zzj_lv4 && this._BigNum.ChargeBig(playermanager.coin,zzj_coin4) ){
            this.zhizaoji_red4.active = true;
        }

        if( zzj_lv5 && this._BigNum.ChargeBig(playermanager.coin,zzj_coin5) ){
            this.zhizaoji_red5.active = true;
        }

        if( zzj_lv6 && this._BigNum.ChargeBig(playermanager.coin,zzj_coin6) ){
            this.zhizaoji_red6.active = true;
        }

         /////////////进阶/////////////////////////

        if(zzj_lv1 && playermanager.screw >= zzj_screw1 ){
        
            var nowdj = require("PlayerManager").zhizaoji_lv[0];   //当前等级
            var jjlv = require("PlayerManager").zhizaoji_intensify_lv[0]+ 0*20;
            var need_lv =  require("ComMain").gameCfgs.machindegree[jjlv].levellimit ; 
            if(nowdj < need_lv ){
                this.zzj_jj_red1.active = false;
                return ;
            }

            this.zhizaoji_red1.active = true;
            this.zzj_jj_red1.active = true;
        }
        
        if(zzj_lv2 && playermanager.screw >= zzj_screw2 ){
            var nowdj = require("PlayerManager").zhizaoji_lv[1];   //当前等级
            var jjlv = require("PlayerManager").zhizaoji_intensify_lv[1]+ 1*20;
            var need_lv =  require("ComMain").gameCfgs.machindegree[jjlv].levellimit ; 
            if(nowdj < need_lv ){
                this.zzj_jj_red2.active = false;
                return ;
            }
            this.zhizaoji_red2.active = true;
            this.zzj_jj_red2.active = true;
        }
        
        if(zzj_lv3 && playermanager.screw >= zzj_screw3 ){
            var nowdj = require("PlayerManager").zhizaoji_lv[2];   //当前等级
            var jjlv = require("PlayerManager").zhizaoji_intensify_lv[2]+ 2*20;
            var need_lv =  require("ComMain").gameCfgs.machindegree[jjlv].levellimit ; 
            if(nowdj < need_lv ){
                this.zzj_jj_red3.active = false;
                return ;
            }
            this.zhizaoji_red3.active = true;
            this.zzj_jj_red3.active = true;
        }
        
        if(zzj_lv4 && playermanager.screw >= zzj_screw4 ){
            var nowdj = require("PlayerManager").zhizaoji_lv[3];   //当前等级
            var jjlv = require("PlayerManager").zhizaoji_intensify_lv[3]+ 3*20;
            var need_lv =  require("ComMain").gameCfgs.machindegree[jjlv].levellimit ; 
            if(nowdj < need_lv ){
                this.zzj_jj_red4.active = false;
                return ;
            }
            this.zhizaoji_red4.active = true;
            this.zzj_jj_red4.active = true;
        }
        
        if(zzj_lv5 && playermanager.screw >= zzj_screw5 ){
            var nowdj = require("PlayerManager").zhizaoji_lv[4];   //当前等级
            var jjlv = require("PlayerManager").zhizaoji_intensify_lv[4]+ 4*20;
            var need_lv =  require("ComMain").gameCfgs.machindegree[jjlv].levellimit ; 
            if(nowdj < need_lv ){
                this.zzj_jj_red5.active = false;
                return ;
            }
            this.zhizaoji_red5.active = true;
            this.zzj_jj_red5.active = true;
        }
        
        if(zzj_lv6 && playermanager.screw >= zzj_screw6 ){
            var nowdj = require("PlayerManager").zhizaoji_lv[5];   //当前等级
            var jjlv = require("PlayerManager").zhizaoji_intensify_lv[5]+ 5*20;
            var need_lv =  require("ComMain").gameCfgs.machindegree[jjlv].levellimit ; 
            if(nowdj < need_lv ){
                this.zzj_jj_red6.active = false;
                return ;
            }
            this.zhizaoji_red6.active = true;
            this.zzj_jj_red6.active = true;
        }

    },

    initIll:function(){
        this.ill_red.active = true;
        this.ill_adv.active = true;
    },



    // update (dt) {},
});
