/**
 * 制造机需要的数据
 * 阶数 - 控制了 外观 ，颜色 ，范围 ,攻速                 //范围跟攻速上限不能太高，而等级可以一直上， 不建议跟等级挂钩
 * 等级 - 控制了 攻击力                                  //等级就控制攻击力
 */

//  const ZHIZAOJI_DATA = {
//                             "1":{id:1, type:1, grade:1, a:123, dtet:1312 },
//                             "2":{id:2, type:1, grade:2, a:123, dtet:1312 },
//                             "3":{id:3, type:2, grade:1, a:123, dtet:1312 },
//                             "4":{id:4, type:2, grade:2, a:123, dtet:1312 },
//                             jiesu:[ { skin:"yiji" , color:FFFFFF , fanwei: 1 , rate: 1 },    ],                //每个阶数的属性
//                             lv:[ 1,2,3,4,5,5,6,6,7,7,7,7,]                                                  //每一级的攻击力 
//                        }


const JIASU_MIAO = 10;
const DURATION = 1000;
const CLICK = 0;                    //成就记录，点击次数
const JINJIE_LV =20;

const R = 245;
const G = 196;
const B = 0;
const LT = 0.5;


cc.Class({
    extends: cc.Component,

    properties: {
        left:cc.Node,
        fanwei_node:cc.BoxCollider,                     //碰撞组建的范围
        dengji:cc.Label,                                //等级
        starts:cc.Node,                                 //星星

        child_detail:cc.Node,

        skin_1:cc.Sprite,                               //皮肤1
        skin_2:cc.Sprite,                               //皮肤2 
        s3:cc.Sprite,

        red:cc.Node,                            //红点

        time_jiasu:cc.Label,
        jihuoanimal_node:cc.Node,


        _left_animCtrl:null,
        _left_animCtrl_state:null,


        //*****************************需要的数据***********************************//
        _rate:1,                                    //上下运动的速度
        //_damage:{unit:0,time:0} ,                                  //攻击力
        _skin_type:0,                               //皮肤类型
        _jinjie_lv:0,                               //进阶等级
        _fanwei:0,                                  //攻击范围

        _assest:null,
        _touch_count:0,

        _machine_jiasu:1,                               //机器加速
        _jiasurun:false,

        _jihuoanimCtrl:null,
        _jihuoanimCtrl_state:null,
        _BigNum:null,  

        _pzing:false,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var self = this;
        this._BigNum = require("BigNum");
        this._left_animCtrl  = this.left.getComponent(cc.Animation);
        this._left_animCtrl_state = this._left_animCtrl.getAnimationState("up_down_2");

        this._jihuoanimCtrl = this.jihuoanimal_node.getComponent(cc.Animation);
        this._jihuoanimCtrl_state = this._jihuoanimCtrl.getAnimationState("jihuo2");

        cc.systemEvent.on("RUN",this.run.bind(this));
        cc.systemEvent.on("TOUCH_JIASU1",this.cancelJiasu.bind(this));
        cc.systemEvent.on("MANCHINE_1_SHENJI",this.machineShengji.bind(this));                  //机器升级通知
        cc.systemEvent.on("MACHINE_1_JINJIE",this.machineJinjie.bind(this));                   //机器进阶通知
        cc.systemEvent.on("STOP_MACHINE_1_JIASU",this.sopt_machineJiasu.bind(this));
        cc.systemEvent.on("OPEN_MACHINE_1_JIASU",this.open_machineJiasu.bind(this));
        cc.systemEvent.on("ZZJ2_INIT",this.zzj_init.bind(this));
        //点击屏幕
        this.node.on(cc.Node.EventType.TOUCH_START,function(){                                  //点击加速

            if( self._jiasurun == true ){
                return ;
            }

            if( self._machine_jiasu == 2){
                return ;
            }

            //self._touch_count ++;
            self._touch_count += JIASU_MIAO;
            self.node.getChildByName("maoyan").active = true;
            self.node.getChildByName("maoyan").getComponent(cc.Animation).play("maoyan");

            if(self._left_animCtrl_state.isPlaying == false){                                   //没有播放，立即播放
                self._left_animCtrl_state.speed = 2;
                self.run();          
                cc.systemEvent.emit("TOUCH_JIASU1");
            }else{                                                                              //正在播放
                var now_time = self._left_animCtrl_state.time;
                self._left_animCtrl_state.speed = 2;
                cc.systemEvent.emit("TOUCH_JIASU1");
            }

            require("PlayerManager").achievement_jindu[CLICK] ++;
        });

        cc.loader.loadRes("Images/zhizaoji/machine_1", cc.SpriteAtlas, function (err, atlas) {             //加载图集
           self._assest = atlas;
        });
    },


    sopt_machineJiasu:function(){
        this._machine_jiasu = 1;
        this._left_animCtrl_state.speed = 1;
        this.node.getChildByName("maoyan").active = false;
        this.node.getChildByName("maoyan").getComponent(cc.Animation).stop("maoyan")
    },

    open_machineJiasu:function(time){
        this._machine_jiasu = 2;
        this._left_animCtrl_state.speed = 2;     


        this.skin_1.node.runAction(cc.sequence(cc.tintTo(LT,R,G,B),cc.tintTo(LT,255,255,255)));
        this.skin_2.node.runAction(cc.sequence(cc.tintTo(LT,R,G,B),cc.tintTo(LT,255,255,255)));

        if( ! this.node.getChildByName("maoyan").getComponent(cc.Animation).getAnimationState("maoyan").isPlaying ){
            this.node.getChildByName("maoyan").active = true;
            this.node.getChildByName("maoyan").getComponent(cc.Animation).play("maoyan");
        }
        
    },

    start () {

        this._jihuoanimCtrl.play("jihuo2");

    },

    zzj_init:function(){
        var self = this;

        //

       this.node.opacity = 0;
            self.init();          

             //设置范围
        var damage_rate = 1/this._rate;
        setTimeout(function(){
            self.createJishiqi(damage_rate);
        },2000);
    },

    //删除计时器
    deleateJishiqi:function(){
        this.unschedule(this.callback);
        cc.systemEvent.emit("CREATE_JISHIQI");
    },

    //创建计时器
    createJishiqi:function(time){
        var self = this;               
        this.schedule(self.callback,time );
    },

    callback:function(){
        //cc.systemEvent.emit("RUN");
        this.run();
    },

    run:function(){
        var self  = this;
        if(self._left_animCtrl_state.isPlaying == false){
            this._left_animCtrl.play("up_down_2");
        }
    },

    cancelJiasu:function(){
        var self = this;
        // setTimeout(function(){
        //     self._touch_count -= 1;
        //     if(self._touch_count <= 0){
        //         self._left_animCtrl_state.speed = 1;
        //     }
        // },DURATION);

        if(this._jiasurun == false){
            this._jiasurun = true;
            
        //var fen = parseInt( this._touch_count / 60);
        var miao = this._touch_count % 60;
        this.time_jiasu.string = miao +"S";
        this.time_jiasu.node.active = true;
        var callcancel = cc.callFunc(function(){
            self.time_jiasu.node.active = false;
        },this);
        this.time_jiasu.node.runAction(cc.sequence(cc.moveBy(0.5,cc.v2(0,10)),callcancel,cc.moveBy(0.2,cc.v2(0,-10)) ));

            this.schedule( self.cancelJiasuCallfunc,1);
        }


    },

    cancelJiasuCallfunc:function(){
        var self = this;

        this._touch_count --;

        //var fen = parseInt( this._touch_count / 60);
        var miao = this._touch_count % 60;
        this.time_jiasu.string = miao+"S";
        this.time_jiasu.node.active = true;

        var callcancel = cc.callFunc(function(){
            self.time_jiasu.node.active = false;
        },this);
        this.time_jiasu.node.runAction(cc.sequence(cc.moveBy(0.5,cc.v2(0,10)),callcancel,cc.moveBy(0.2,cc.v2(0,-10)) ));

        if( this._touch_count == 0 ){

            self.node.getChildByName("maoyan").active = false;
            self.node.getChildByName("maoyan").getComponent(cc.Animation).stop("maoyan");

            this._left_animCtrl_state.speed = 1;
            this.unschedule( self.cancelJiasuCallfunc );
            this._jiasurun = false;
            this.time_jiasu.node.active = false;
        }
    },


    //*******************************************************************//

    //初始化数据跟界面
    init:function(){
        var lv = require("PlayerManager").zhizaoji_lv[1];                               //制造机器1的等级
        var jiesu = require("PlayerManager").zhizaoji_intensify_lv[1] + JINJIE_LV ;                  //制造及1的阶数                           
        var double_num = this.doubleDamage(jiesu);

        this._damage =  this._BigNum.MulNum( require("ComMain").gameCfgs.machinelevel[lv].damage2 , double_num ) ;          //攻击力

        /**
         * 
         * 
         */
        this.fanwei_node.getComponent(cc.Sprite).damage = this._damage;             //碰撞体添加一个攻击力
        
        this._fanwei = require("ComMain").gameCfgs.machindegree[jiesu].fanwei;         //范围
        this._rate = require("ComMain").gameCfgs.machindegree[jiesu].rate;             //攻速
        this._skin_type = require("ComMain").gameCfgs.machindegree[jiesu].skin;        //皮肤类型
        this._starts = require("ComMain").gameCfgs.machindegree[jiesu].star;           //星星数量

        this.dengji.string = "Lv:"+lv;

        this.setStart();
        this.loadSkin();
        this.setFanwei();

    },

    //进阶变化，加载皮肤
    loadSkin:function(){    
        var self = this;

        var str_name_1 = "type_" + self._skin_type.toString();
        var str_name_2 = "type_" + self._skin_type.toString()+"_" + self._skin_type.toString();

        var sp1 = this._assest.getSpriteFrame(str_name_1);
        var sp2 = this._assest.getSpriteFrame(str_name_2);
        /**
         * 加载到资源后
         */
        this.skin_1.spriteFrame = sp1;
        this.skin_2.spriteFrame = sp2;

        this.skin_1.node.active = true;
        this.skin_2.node.active = true;
        this.s3.node.active = true;

        this.node.opacity = 255;
        
    },

    //攻击范围
    setFanwei:function(){
        this.fanwei_node.width = 170 * this._fanwei;                     
    },

    //星星
    setStart:function(){
        for(var i = 0;i<4;i++){
            this.starts.children[i].active = false;
        }

        for(var i = 0;i<this._starts;i++){
            this.starts.children[i].active = true;
        }
    },

    shengjiButton:function(){
                    //按钮声音
                    require("Audio").play("Click",false,1);         
        if(this.red && this.red.active ){
            this.red.active = false;
        }
        this.child_detail.active = true;
    },

    //机器升级
    machineShengji:function(){
        var self = this;
       
        setTimeout(function(){
            self.init();
                           
        },1000);

    },

    //机器进阶
    machineJinjie:function(){
        var self = this;
       
        setTimeout(function(){
            self.init();
            //self.loadSkin();                              //加载外观
            //self.setStart();
            self.setFanwei();                     
        },1000);

        //设置范围
        var damage_rate = 1/this._rate;
        setTimeout(function(){
            self.createJishiqi(damage_rate);
        },2000);
    },

    doubleDamage:function(lv){
        var double = 1;
        var machiedrgree = require("ComMain").gameCfgs.machindegree;
        for(var i = JINJIE_LV ; i <= lv ; i++ ){
            double = machiedrgree[i].poweruprate*double;
        }

        return double;
    },

//膨胀
onCollisionEnter:function(other,self){
    if(this._pzing == true){
        return ;
    }
    var self = this;
    this._pzing = false;
    this.node.getChildByName("partic").getComponent(cc.ParticleSystem).resetSystem();
    setTimeout(function(){
        self._pzing = true;
    },500);

}

});
