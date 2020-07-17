// const ACHIEVEMENT_CONFIG = [
//                                 { cishu:100, reward:"diamond", number:5 },{},{},{},{},{},{},{},{},{},
//                            ]
const MAX_NUM = 23;
const LENGTH = 415;
const ACHIEVE_COUNT = 100;
const OBJ_X = 168;
const OBJ_Y = 317;
const FOUR = 4;

cc.Class({
    extends: cc.Component,

    properties: {
      back:cc.Node,                             //返回
      item:cc.Node,                             //内容
      content:cc.Node,                          //item容器

      zuanshi_lb:cc.Label,
      luosi_lb:cc.Label,


      chengjiucishuu:cc.Label,

    //   piaoqian_cl:cc.Node,
    //   piaoqian_zs:cc.Node,

      _playerManager:null,
      _gameCfgs:null,
    _first_open:true,
    _BigNum:null,

    },


    onLoad () {
        var self = this;
        this.linqu_tag = false;
        this._BigNum = require("BigNum");
        cc.systemEvent.on("ACHIEVEMENT_LINQU",this.lingquFunc.bind(this));

        // cc.loader.loadRes("prefab/ach_Item.prefab", function (err, prefab) {
        //     self.item = cc.instantiate(prefab);
        // });
    },

    start () {

    },

    lingquFunc:function(event){
        var self = this;

        if(this.linqu_tag == true ){
            return ;
        }
        this.linqu_tag = true;
        setTimeout(function(){
            self.linqu_tag = false;
        },500);

        //按钮声音  
        require("Audio").play("Click",false,1);


        var target = event.target;
        // var move = target.getChildByName("move");
        var a_id = target.getComponent(cc.Sprite).a_id;
        var a_num = target.getComponent(cc.Sprite).a_num;
        var i = target.getComponent(cc.Sprite).index_i ;
        var piaoqian_node = null;
        var achi = require("ComMain").gameCfgs.achi[ (i+1)];
        if( a_id == 1){
            require("PlayerManager").coin += a_num;
            piaoqian_node = target.getChildByName("jiangli_id_1");
           
        }else if(a_id == 2){
            target.getChildByName("move").active = true;
            target.getChildByName("move").getChildByName("num").getComponent(cc.Label).string = "+" + a_num;
            target.getChildByName("move").getComponent(cc.Animation).play("jinbiup");
            require("PlayerManager").diamond += a_num;
            piaoqian_node = target.getChildByName("jiangli_id_2");

        }else if(a_id == 3){
            target.getChildByName("move2").active = true;
            target.getChildByName("move2").getChildByName("num").getComponent(cc.Label).string = "+" + a_num;
            target.getChildByName("move2").getComponent(cc.Animation).play("jinbiup");
            require("PlayerManager").screw += a_num;
            piaoqian_node = target.getChildByName("jiangli_id_3");
        }
        var next_cj = this._playerManager.achievement[i] +1;
        if(  achi[ next_cj ] != null ){


            this._playerManager.achievement[i] ++;
            require("PlayerManager").achievent_dianshu += achi[ this._playerManager.achievement[i] ].value;
            this._playerManager.achievement_linqu[i]++;
          

        }

        cc.systemEvent.emit("UI_CHANGE");
        this.updateView();

    },


    onEnable:function(){
        var self = this;

        if(self.item == null ){
            
            cc.loader.loadRes("prefab/ach_Item.prefab", function (err, prefab) {
                self.item = cc.instantiate(prefab);
                self.updateView();
            });
        }else{
            self.updateView();
        }



    },

    /**
     * 图鉴还是系统成就
     * 拿到数据遍历
     * 初始化界面
     */

    updateView:function(){

        if(this._first_open == true){
            this.node.opacity = 0;
        }

        // var sum_chengjiu = 0;
        // for(var i = 0; i <require("PlayerManager").achievement.length ; i++)
        // {
        //     //sum_chengjiu += require("PlayerManager").achievement[i];
        // }
        this.chengjiucishuu.string = require("PlayerManager").achievent_dianshu ;               //成就点数

        var self = this;
        //this.node.opacity = 0;

        //this.content.removeAllChildren(true);

        this._playerManager = require("PlayerManager");
        this._gameCfgs = require("ComMain").gameCfgs;


        this.zuanshi_lb.string = this._playerManager.diamond;
        this.luosi_lb.string = this._playerManager.screw;

        for( var i = 0;i < MAX_NUM ; i++ ){
 
            if( this.content.children.length < 23 ){
                var item = cc.instantiate(this.item);
            }else{
                var item = this.content.children[i];
            }
            if(i == 10 || i == 6){                               //i == 10 邀请任务
                item.active  = false;
                item.active = false;
            }

            var item_des            = item.getChildByName("desc").getComponent(cc.Label);
            var item_bili           = item.getChildByName("bili").getComponent(cc.Label);
            var item_jindu_bg       = item.getChildByName("jindu").getChildByName("bg");
            var item_btn            = item.getChildByName("award");
            var item_jiangli_num    = item.getChildByName("award").getChildByName("jiangli_num").getComponent(cc.Label);
            var item_jingli_1       = item.getChildByName("award").getChildByName("jiangli_id_1");
            var item_jingli_2       = item.getChildByName("award").getChildByName("jiangli_id_2");
            var item_jingli_3       = item.getChildByName("award").getChildByName("jiangli_id_3");
            var item_stars          = item.getChildByName("nandu").getChildByName("stars");
            var item_chengjiu       = item.getChildByName("chengjiulb").getComponent(cc.Label);

            var item_btn = item.getChildByName("award");
            item_btn.getChildByName("bg").active = true;
            //item_btn.getComponent(cc.Button).interactable = false;
            item_btn.getComponent(cc.Sprite).can_touch = false;

            var lv =   this._playerManager.achievement[i] + 1                             ;//第i个成就等级
            
            // for(var s1 = 0; s1 < parseInt(lv/( ACHIEVE_COUNT/5 )) ; s1 ++ ){              //星星数量
            //     item_stars.children[s1].active = true;
            // }

            
            //i 表示第i种成就
            var achi_array = require("ComMain").gameCfgs.achi[ (i+1) ] ;                                   //数组


            if( achi_array[lv] == null  ){
                
                return;
            }

            
            var des_str      = achi_array[lv].descption;                 //成就名字
            if(i != FOUR ){
                var tiaojian_num = achi_array[lv].number;	            //成就条件
            }else{
                var tiaojian_num = { unit:  achi_array[lv].number , time: achi_array[lv].zeronum  }
            }
           
            var award_id     = achi_array[lv].awardstype;               //奖励类型
            var award_num    = achi_array[lv].partvalue;              //奖励数量	

            //var a_lv = i*ACHIEVE_COUNT +lv +1 ;
            // if( lv > ACHIEVE_COUNT ){
            //     return ;
            // }

            // var des_str      = this._gameCfgs.achievement[a_lv].descption;                 //成就名字
            // if(i != FOUR ){
            //     var tiaojian_num = this._gameCfgs.achievement[a_lv].number;	                  //成就条件
            // }else{
            //     var tiaojian_num = { unit: this._gameCfgs.achievement[a_lv].number , time:this._gameCfgs.achievement[a_lv].zeronum  }
            // }
           
            // var award_id     = this._gameCfgs.achievement[a_lv].awardstype;               //奖励类型
            // var award_num    = this._gameCfgs.achievement[a_lv].partvalue;                //奖励数量	
            

            //初始化表现
            item_chengjiu.string =  "奖励成就值数:" +achi_array[lv].value;
            item_des.string = des_str;
            if(i != FOUR){
                item_bili.string = this._playerManager.achievement_jindu[i] + "/" + tiaojian_num;
            }else{
                item_bili.string = this._BigNum.Show(require("PlayerManager").coin ) + "/" + this._BigNum.Show( tiaojian_num );
            }

            item_jiangli_num.string = award_num;

            if(award_id == 1){
                item_jingli_1.active = true;
            }else if(award_id == 2){
                item_jingli_2.active = true;
            }else if(award_id == 3){
                item_jingli_3.active = true;
            }

            if( i != FOUR ){
                if(this._playerManager.achievement_jindu[i] < tiaojian_num ){                                          //还未升级
                    item_jindu_bg.width = LENGTH * ( this._playerManager.achievement_jindu[i]/tiaojian_num );
                    item_btn.getChildByName("bg").active = true;
                }else{                                                                                              //升级
                    item_jindu_bg.width = LENGTH ;
                    if( this._playerManager.achievement_linqu[i] <= lv ){
                        item_btn.getChildByName("bg").active = false;
                        item_btn.getComponent(cc.Button).interactable = true;
                        item_btn.getComponent(cc.Sprite).can_touch = true;
                    }
                }
    
            }else{
                if( ! this._BigNum.ChargeBig( require("PlayerManager").coin ,tiaojian_num ) ){                                          //还未升级
                    var div = this._BigNum.Div(require("PlayerManager").coin , tiaojian_num) ;
                    item_jindu_bg.width = LENGTH * (this._BigNum.Fenshu(div));
                    item_btn.getChildByName("bg").active = true;
                }else{                                                                                              //升级
                    item_jindu_bg.width = LENGTH ;
                    if( this._playerManager.achievement_linqu[i] <= lv ){
                        item_btn.getChildByName("bg").active = false;
                        item_btn.getComponent(cc.Button).interactable = true;
                        item_btn.getComponent(cc.Sprite).can_touch = true;
                    }
                }
            }

          


            item_btn.getComponent(cc.Sprite).a_id = award_id;
            item_btn.getComponent(cc.Sprite).a_num = award_num;
            item_btn.getComponent(cc.Sprite).index_i = i;
            

            item_btn.on(cc.Node.EventType.TOUCH_START,function(event){

                var target = event.target;
                if( target.getComponent(cc.Sprite).can_touch == false){
                    return ;
                }

                cc.systemEvent.emit("ACHIEVEMENT_LINQU",event);
            });

            item.parent = this.content;

        }
        if(this._first_open == true ){
            this.node.active = false;
            this._first_open = false;
        }
        this.node.opacity = 255;
        
    },

    backClick:function(){
        require("Audio").play("Click",false,1);
        this.node.active = false;
    },


    piaoqian:function(){



    },

    // update (dt) {},
});
