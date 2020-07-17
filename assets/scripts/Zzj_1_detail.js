const DAMAGE = 50000000;
const RATE = 2;
const LENGTH = 500;
const LENGTH2 = 200;
const DENGJI = 950;
const ACHI_ZZJ1_LV = 12;
const ACHI_ZZJ_JJ = 18;

const ZZJ = 1;

const FANWEI = 1;
const MAX_JINJIE_LV = 39;
const  JINJIE_LV = 20;
const JINJIE = 100;
const CLICK = 0;                    //成就记录，点击次数
const SJ_COUNT = 1;

cc.Class({
    extends: cc.Component,

    properties: {

        guanli_node:cc.Node,
        jinjie_node:cc.Node,

        damage_node:cc.Node,
        rate_node:cc.Node,
        fanwei_node:cc.Node,
        dengji_node:cc.Node,

        damage_node_jinjie:cc.Node,
        rate_node_jinjie:cc.Node,
        fanwei_node_jinjie:cc.Node,
      


        skin_1:cc.Sprite,
        skin_2:cc.Sprite,                                   //皮肤
        starts:cc.Node,                                     //星星

        toggle_guanli:cc.Toggle,
        toggle_jinjie:cc.Toggle,

      dengji_lb:cc.Label,
      damage_lb_next:cc.Label,
      damage_lb:cc.Label,
      rate_lb:cc.Label,
      fanwei_lb:cc.Label,

      need_coin:cc.Label,
      need_screw:cc.Label,
      machine_name:cc.Label,

      jinjie_next_damage:cc.Label,

      red:cc.Node,
      jianglizhuanshi_node:cc.Node,
      jianglilb_node:cc.Node,

//////////////////////////////////
        _choose_shengji:0,                                  //选择一次升多少级

        _lv:0,                                              //制造机等级
        _jinjie_lv:0,                                       //进阶等级
        //_damage:{unit:0,time:0} ,                                          //攻击力
        _fanwei:0,                                          //范围
        _rate:0,                                            //攻速
        //_need_coin:{unit:0,time:0},                         //升级需要的金币
        _need_screw:0,                                      //进阶需要
        _skin_type:0,                                       //皮肤类型
        _starts:0,                                          //星星数量

        _assest:0,                                  //图集

        _BigNum:null,
        _money_ani:null,  

    },

  

    onLoad () {
        // cc.loader.loadRes("Images/zhizaoji/machine_1", cc.SpriteAtlas, function (err, atlas) {             //加载图集
        //     self._assest = atlas;
        //  });
        cc.systemEvent.on("UI_CHANGE",this.uichange.bind(this));
        cc.systemEvent.on("SHENGJI_TOUXIAN",this.init.bind(this));
        
        this._money_ani = this.node.getChildByName("sell_action").getComponent(cc.Animation);

        this._BigNum = require("BigNum");

         if( this.toggle_guanli.isChecked ){
            this.guanli_node.active  = true;
            this.jinjie_node.active = false;
         }else{
            this.guanli_node.active  = false;
            this.jinjie_node.active = true;
         }
    },

    start () {
      

    },

    onEnable(){
        var self = this;
        setTimeout(function(){
            self.setStart();        //设置星星
            self.init();
        },200);
    },


    init:function(){

        var self = this;


        if(this._choose_shengji == 0){
            this._choose_shengji = 1;
        }





        this._lv = require("PlayerManager").zhizaoji_lv[ZZJ];                    //制造机等级
        this._jinjie_lv = require("PlayerManager").zhizaoji_intensify_lv[ZZJ] + JINJIE_LV;                       //制造机进阶等级

        
        if( this._lv < JINJIE ){                                                            //多少级以下不显示进阶
            //this.toggle_jinjie.node.active = false;
        }

        this._damage = require("ComMain").gameCfgs.machinelevel[ this._lv ].damage2;         //伤害
        this._fanwei = require("ComMain").gameCfgs.machindegree[ this._jinjie_lv ].fanwei;   //范围
        this._rate = require("ComMain").gameCfgs.machindegree[this._jinjie_lv ].rate;        //速度
        this._skin_type = require("ComMain").gameCfgs.machindegree[this._jinjie_lv ].skin;   //皮肤
        this._starts = require("ComMain").gameCfgs.machindegree[this._jinjie_lv ].star;      //星星


        var bili = (this._lv % 10) == 0 ? 10: (this._lv % 10); 
        if(bili == 10 ){
            this.jianglizhuanshi_node.active = false;
            this.jianglilb_node.active = false;
        }else{
            this.jianglizhuanshi_node.active = true;
            this.jianglilb_node.active = true;
        }
        this.dengji_node.width =  bili * LENGTH / 10 ;                                      //等级进度调显示长度
        //this.damage_node.width = (this._damage / DAMAGE) * LENGTH;                                    //功率进度长度
        this.rate_node.width = (this._rate / RATE ) * LENGTH;                                         //攻速进度长度
        this.fanwei_node.width = (this._fanwei / FANWEI) * LENGTH;                                    //范围

        //this.damage_node_jinjie.width = (this._damage / DAMAGE) * LENGTH2;                                    //功率进度长度
        this.rate_node_jinjie.width = (this._rate / RATE ) * LENGTH2;                                         //攻速进度长度
        this.fanwei_node_jinjie.width = (this._fanwei / FANWEI) * LENGTH2;                                    //范围

        var next_dengji_jinjie = this._jinjie_lv + 1;                                       //强化多少   
        var next_dengji_shengji = this._lv + this._choose_shengji;                          //升多少级
        
        this._need_coin =  self._BigNum.Show( self.needMoneyCount(self._lv,next_dengji_shengji) );
        this._need_screw = self.needScrewCount(self._jinjie_lv,next_dengji_jinjie) ;

        this._machine_name = require("ComMain").gameCfgs.machindegree[ this._jinjie_lv ].name;                      //机器名字

        this.dengji_lb.string       = this._lv;                                   //等级      

        this.damage_lb.string       =    self._BigNum.Show( self._BigNum.MulNum( self._damage , self.doubleDamage(self._jinjie_lv) ) );   //攻击

        this.jinjie_next_damage.string = "X " +  require("ComMain").gameCfgs.machindegree[next_dengji_jinjie].poweruprate ; 

        this.rate_lb.string            = this._rate;                                             //攻速
        this.fanwei_lb.string       = this._fanwei;                                      //范围
        

        this.need_screw.string      = this._need_screw;                                 //需要的材料
        this.jinjie_node.getChildByName("have_screw").getComponent(cc.Label).string = require("PlayerManager").screw +"/";
        this.machine_name.string    = this._machine_name;                      //进阶机名字

        var nowdj = require("PlayerManager").zhizaoji_lv[ZZJ];   //当前等级
        var jjlv = require("PlayerManager").zhizaoji_intensify_lv[ZZJ]+JINJIE_LV;
        var need_lv =  require("ComMain").gameCfgs.machindegree[jjlv].levellimit ; 
        if( nowdj < need_lv){
            this.jinjie_node.getChildByName("next_jjtip").getComponent(cc.Label).string = "下次进阶需要制造机等级"+need_lv+"级";
            this.jinjie_node.getChildByName("next_jjtip").active = true;
            this.jinjie_node.getChildByName("jinduback").active = false;
        }else{
            this.jinjie_node.getChildByName("next_jjtip").active = false;
            this.jinjie_node.getChildByName("jinduback").active = true;
        }

        this.initYupan();

        //
        //this.setStart();        //设置星星
        //setTimeout(function(){
            self.loadSkin();        //加载皮肤
        //},500);


    },


    initYupan:function(){
        var dengji_lv = this._lv + this._choose_shengji;

        var xiaci_damage =  this._BigNum.MulNum(require("ComMain").gameCfgs.machinelevel[ dengji_lv ].damage2  ,this.doubleDamage(this._jinjie_lv) ) ;   

        this.damage_lb_next.string =  this._BigNum.Show(xiaci_damage); 
       
        this.need_coin.string = "$"+ this._BigNum.Show( this.needMoneyCount(this._lv,dengji_lv) ); //"$"+numberShow(this.needMoneyCount(this._lv,dengji_lv));
    },

    //进阶变化，加载皮肤
    loadSkin:function(){    


        var self = this;

        if(self._assest){
            var str_name_1 = "type_" + self._skin_type.toString();
            var str_name_2 = "type_" + self._skin_type.toString()+"_" + self._skin_type.toString();
        
            var sp1 = this._assest.getSpriteFrame(str_name_2);
            var sp2 = this._assest.getSpriteFrame(str_name_1);
                /**
                 * 加载到资源后
                 */
            this.skin_1.spriteFrame = sp1;
            this.skin_2.spriteFrame = sp2;
        }else{
            cc.loader.loadRes("Images/zhizaoji/machine_1", cc.SpriteAtlas, function (err, atlas) {             //加载图集
                self._assest = atlas;
                var str_name_1 = "type_" + self._skin_type.toString();
                var str_name_2 = "type_" + self._skin_type.toString()+"_" + self._skin_type.toString();
            
                var sp1 = self._assest.getSpriteFrame(str_name_2);
                var sp2 = self._assest.getSpriteFrame(str_name_1);
                    /**
                     * 加载到资源后
                     */
                self.skin_1.spriteFrame = sp1;
                self.skin_2.spriteFrame = sp2;
             });
        }
      
    
      
    },
    
    //攻击范围
    setFanwei:function(){
        //this.fanwei_node.width = 113.4 * this._fanwei;                     
    },
    
    //星星
    setStart:function(){
        this._jinjie_lv = require("PlayerManager").zhizaoji_intensify_lv[ZZJ ] +  JINJIE_LV ;                       //制造机进阶等级
        this._starts = require("ComMain").gameCfgs.machindegree[this._jinjie_lv ].star;     //星星
        for(var i = 0;i<4;i++){
            this.starts.children[i].active = false;
        }


        for(var i = 0;i<this._starts;i++){
            this.starts.children[i].active = true;
        }
    },
      //进阶成功后调用
      setStartTexiao:function(){

        var playerManager = require("PlayerManager");
        var jjlv1 = playerManager.zhizaoji_intensify_lv[ZZJ]+JINJIE_LV;
        var starnum1 = require("ComMain").gameCfgs.machindegree[jjlv1].star;   
        //var starnum2 = require("ComMain").gameCfgs.machindegree[jjlv1-1].star;
        for(var i = 0;i<starnum1;i++){
            this.starts.children[i].active = true;
            if(i == (starnum1 - 1) ){
     
                this.starts.children[i].getChildByName("sj_xingxing").runAction(cc.sequence(cc.scaleTo(0.5,2),cc.scaleTo(0.5,1,1) ));
            }else{  

            }
        }

        this.setStart();
    },

    
    dengji_1_chooose:function(){


        this._choose_shengji = 1;                                  //选择一次升1级
        this.initYupan();
    },

    dengji_5_choose:function(){

        
        this._choose_shengji = 5;                                  //选择一次升5级
        this.initYupan();
    },

    guanli_choose:function(){
                    //按钮声音
                    require("Audio").play("Click",false,1);

        this.guanli_node.active  = true;
        this.jinjie_node.active = false;

        this.toggle_guanli.isChecked = true;
        this.toggle_guanli.node.getChildByName("checkmark").active = true;
        this.toggle_guanli.node.getChildByName("Background").active = false;

        this.toggle_jinjie.isChecked = false;
        this.toggle_jinjie.node.getChildByName("Background").active = true;
        this.toggle_jinjie.node.getChildByName("checkmark").active = false;
    },

    jinjie_choose:function(){
                    //按钮声音
                    require("Audio").play("Click",false,1);


        this.guanli_node.active  = false;
        this.jinjie_node.active = true;

        this.toggle_guanli.isChecked = false;
        this.toggle_guanli.node.getChildByName("checkmark").active = false;
        this.toggle_guanli.node.getChildByName("Background").active = true;

        this.toggle_jinjie.isChecked = true;
        this.toggle_jinjie.node.getChildByName("Background").active = false;
        this.toggle_jinjie.node.getChildByName("checkmark").active = true;
        /////////////////////

        this.red.active = false;

    },

    //升级按钮
    shengjiButton:function(){

                    //按钮声音
                    require("Audio").play("Click",false,1);



        var playerManager = require("PlayerManager");          
        var all_coins = playerManager.coin;                                         //拥有的金币
        var dengji  = playerManager.zhizaoji_lv[ZZJ];                                 //一号机器的等级

        var next_dengji = dengji + this._choose_shengji;                            //预打算升的级数
        var cfg = require("ComMain").gameCfgs;
        var need_coin_num = this.needMoneyCount(dengji,next_dengji);

        // var touxianlv = require("PlayerManager").touxianlv;     //头衔等级
        // var touxianjiacheng = require("ComMain").gamecfgs.touxian[touxianlv].jiacheng;
        // need_coin_num = this._BigNum.Div(need_coin_num , touxianjiacheng);

        if(  this._BigNum.ChargeBig(all_coins ,need_coin_num)  ){
             /**
              * 通知升级成功
              * 通知自己刷新界面
              * playermanager保存等级
              * playermanager 扣除金币
              */
             
             if( next_dengji > DENGJI ){
                 messageTips("已经升到满级");
                 return ;
             }

             var jjlv = require("PlayerManager").zhizaoji_intensify_lv[ZZJ]+JINJIE_LV;
             var need_lv =  require("ComMain").gameCfgs.machindegree[jjlv].levellimit ; 
            if( next_dengji > need_lv ){
                messageTips("需要进阶到"+ (require("PlayerManager").zhizaoji_intensify_lv[ZZJ] +1) +"后才能继续升级");
                return ;
            }


             this._money_ani.play("sell_money");
             playerManager.coin =  this._BigNum.Sub( all_coins , need_coin_num ) ;                //扣钱
             cc.systemEvent.emit("MANCHINE_1_SHENJI");
             cc.systemEvent.emit("UI_CHANGE");
             playerManager.zhizaoji_lv[ZZJ] = next_dengji;                       //升级
             require("PlayerManager").achievement_jindu[ACHI_ZZJ1_LV] = playerManager.zhizaoji_lv[ZZJ];

             if( (next_dengji % 10) == 0 ){
                 playerManager.diamond += 10;
                 this.guanli_node.getChildByName("feiqian").getComponent(cc.Animation).play("feiqian");
             }

             this.init();
             console.log("升级成功");
             require("PlayerManager").achievement_jindu[SJ_COUNT] ++;
             cc.systemEvent.emit("RED_CHANGE");
         }else{
             /**
              * 给个提示
              */
             messageTips("金币不足");
             cc.systemEvent.emit("COIN_LESS");
         }

        


    },

    //进阶
    jinjieButton:function(){

                    //按钮声音
                    require("Audio").play("Click",false,1);


        var playerManager = require("PlayerManager");                                 //
        var all_screw = playerManager.screw;
        var dengji = playerManager.zhizaoji_intensify_lv[ZZJ];                          //一号机器的进阶等级
        var next_dengji = dengji + 1;                                                 //下一级
        //var need_screw = require("ComMain").gameCfgs.machindegree[ next_dengji ].consume ;                  //下一级需要消耗的材料数量

        var need_screw =   this._need_screw //this.needScrewCount(dengji,next_dengji);

        var nowdj = require("PlayerManager").zhizaoji_lv[ZZJ];   //当前等级
        var jjlv = require("PlayerManager").zhizaoji_intensify_lv[ZZJ]+JINJIE_LV;
        var need_lv =  require("ComMain").gameCfgs.machindegree[jjlv].levellimit ; 
        if( nowdj < need_lv){
           messageTips("等级达到"+ need_lv + "才能再次进阶");
            return 
       }

        if( all_screw >= need_screw    ){
            /**
             * 通知进阶成功
             * 通知自己刷新界面 
             * Playermanager保存进阶等级
             * Playermanager扣除材料
             */

            if( next_dengji >  MAX_JINJIE_LV ){
                messageTips("进阶已达到满级");
                return ;
            }


             this._money_ani.play("sell_money");
           
             playerManager.screw = all_screw - need_screw;
             playerManager.zhizaoji_intensify_lv[ZZJ] = next_dengji;                  //升级
             require("PlayerManager").achievement_jindu[ACHI_ZZJ_JJ] = playerManager.zhizaoji_intensify_lv[ZZJ];

             this.setStartTexiao();
             this.init();                                                           //刷新界面
             cc.systemEvent.emit("MACHINE_1_JINJIE");
             cc.systemEvent.emit("UI_CHANGE");
             console.log("进阶成功");
             this.red.active = false;
             cc.systemEvent.emit("RED_CHANGE");
        }else{
            messageTips("材料不足");
            cc.systemEvent.emit("SCREW_LESS");
            /**
             * 给个提示材料不足
             */
        }                                     

    },

    // toggle_jinjie_choose:function(){
    //   this.guanli_node.active = false;
    //   this.jinjie_node.active = true;  
    // },


    backButton:function(){
                    //按钮声音
                    require("Audio").play("Click",false,1);
                    
        this.node.active = false;
    },

    needMoneyCount(lv,next_lv){                                                 //当前等级跟要升的等级
        var machinelevel = require("ComMain").gameCfgs.machinelevel;

        var sub = next_lv - lv;
        var sum = {unit:0,time:0};
       
        for(var i = 0;i<sub;i++){
            sum = this._BigNum.Add( sum, machinelevel[lv+1+i].consume2 );
        }
        var touxianlv = require("PlayerManager").touxianlv;     //头衔等级
        var touxianjiacheng = require("ComMain").gameCfgs.touxian[touxianlv].jiacheng;
        sum = this._BigNum.Div(sum , touxianjiacheng);

        return sum;
    },

    needScrewCount(lv,next_lv){                                              //当前等级跟要升的等级
        var machinedegree = require("ComMain").gameCfgs.machindegree;
        var sub = next_lv - lv;
        var sum = 0;
        
        for(var i = 0;i<sub;i++){
            sum += machinedegree[lv+1+i].consume;
        }

        return sum;
    },

    doubleDamage:function(lv){
        var double = 1;
        var machiedrgree = require("ComMain").gameCfgs.machindegree;
        for(var i = JINJIE_LV ; i <= lv ; i++ ){
            double = machiedrgree[i].poweruprate*double;
        }

        return double;
    },

    uichange:function(){
        this.need_screw.string      = this._need_screw;                                 //需要的材料
        this.jinjie_node.getChildByName("have_screw").getComponent(cc.Label).string = require("PlayerManager").screw +"/";
    },

});
