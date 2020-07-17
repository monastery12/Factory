

cc.Class({
    extends: cc.Component,

    properties: {
        now_tiaojian1:cc.Label,
        now_tiaojian2:cc.Label,
        now_award1:cc.Label,
        now_award2:cc.Label,
        now_touxian_name:cc.Label,
        now_image:cc.Sprite,

        dangqian_lv:cc.Label,

        next_tiaojian1:cc.Label,
        next_tiaojian2:cc.Label,
        next_award1:cc.Label,
        next_award2:cc.Label,
        next_touxian_name:cc.Label,
        next_image:cc.Sprite,

        shengji_node:cc.Node,
        dangqian_cj:cc.Label,
        _BigNum:null,


    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._BigNum  = require("BigNum");
    },

    start () {

    },

    onEnable:function(){
        this.updateView();
    },

    updateView:function(){

        var gyj_lv = require("PlayerManager").production_lv;                //供应机等级
        var chengjiu_count =   require("PlayerManager").achievent_dianshu  ;//0;

        this.dangqian_lv.string = "(当前"+gyj_lv+"级)";
        this.dangqian_cj.string = "(当前"+chengjiu_count +")";

        // for(var i = 0; i <require("PlayerManager").achievement.length ; i++)
        // {
        //     chengjiu_count += require("PlayerManager").achievement[i];
        // }

        var self = this;
        var touxianlv = require("PlayerManager").touxianlv;                 //头衔等级
        var touxian = require("ComMain").gameCfgs.touxian;            //表名
        

        var now_name  = touxian[touxianlv].name;                            //名称
        var tiaojian1 = touxian[touxianlv].tiaojian1;                       //条件1
        var tiaojian2 = touxian[touxianlv].tiaojian2;                       //条件2
        var jiacheng  = touxian[touxianlv].jiacheng;                        //加成
        var jianggli  = touxian[touxianlv].jianglitype;                     //奖励类型
        var num       = touxian[touxianlv].num;                             //奖励数量
        var image     = touxian[touxianlv].image;                           //背景图

        this.now_tiaojian1.string =  tiaojian1+"级";          //"供应机等级达到:"+ tiaojian1+"级";
        this.now_tiaojian2.string =  tiaojian2;               //"完成成就点数:"+ tiaojian2;
        this.now_award1.string =     "90%";                   //"1/" + this._BigNum.Show(jiacheng); 
        this.now_touxian_name.string = now_name;

        if(jianggli != -1){
            if(jianggli == 1 ){
                this.now_award2.string = num+"金币"; //"可领取"+num+"金币";
            }
            else if(jianggli == 2 ){
                this.now_award2.string = num+"钻石"; //"可领取"+num+"钻石";
            }
            else if(jianggli == 3 ){
                this.now_award2.string = num+"材料"; //"可领取"+num+"材料";
            }

        }else{
            this.now_award2.node.active = false;
        }

        if( this._assest ){
            this.now_image.spriteFrame = this._assest.getSpriteFrame(image);
        }else{
            cc.loader.loadRes("plist/touxian", cc.SpriteAtlas, function(err, atlas) {                   //加载图集
                if(err == null){
                    self._assest = atlas;
                    self.now_image.spriteFrame = self._assest.getSpriteFrame(image);
                }
             });
        }
        

        //*******************************************//
        var next_name  = touxian[touxianlv+1].name;                                //名称
        var next_tiaojian1 = touxian[touxianlv+1].tiaojian1;                       //条件1
        var next_tiaojian2 = touxian[touxianlv+1].tiaojian2;                       //条件2
        var next_jiacheng  = touxian[touxianlv+1].jiacheng;                        //加成
        var next_jianggli  = touxian[touxianlv+1].jianglitype;                     //奖励类型
        var next_num       = touxian[touxianlv+1].num;                             //奖励数量
        var next_imagestr     = touxian[touxianlv+1].image;                           //背景图

        this.next_tiaojian1.string = next_tiaojian1+"级"                            //"供应机等级达到" + next_tiaojian1+"级";
        this.next_tiaojian2.string = next_tiaojian2                                 //"完成成就点数:"+ next_tiaojian2;
        this.next_award1.string =  "90%";                                           // "1/" + this._BigNum.Show(next_jiacheng); 


        this.next_touxian_name.string = next_name;
        if( this._assest ){
            this.next_image.spriteFrame = this._assest.getSpriteFrame(next_imagestr);
        }else{
            cc.loader.loadRes("plist/touxian", cc.SpriteAtlas, function(err, atlas) {                   //加载图集
                if(err == null){
                    self._assest = atlas;
                    self.next_image.spriteFrame = self._assest.getSpriteFrame(next_imagestr);
                }
             });
        }

        if(next_jianggli != -1){
            if(next_jianggli == 1 ){
                this.next_award2.string = next_num+"金币"; //"可领取"+next_num+"金币";
            }
            else if(next_jianggli == 2 ){
                this.next_award2.string = next_num+"钻石"; //"可领取"+next_num+"钻石";
            }
            else if(next_jianggli == 3 ){
                this.next_award2.string = next_num+"材料"; //"可领取"+next_num+"材料";
            }

        }else{
            this.next_award2.node.active = false;
        }

        if( gyj_lv >= next_tiaojian1 && chengjiu_count >= next_tiaojian2 ){
            this.shengji_node.getChildByName("bg").active = false;
        }else{
            this.shengji_node.getChildByName("bg").active = true;
        }
    },

    //升级按钮
    shengjiButton:function(){
        var gyj_lv = require("PlayerManager").production_lv;                //供应机等级
        var chengjiu_count = require("PlayerManager").achievent_dianshu ;  //0;                                             //成绩点数
        
        // for(var i = 0;i<10;i++){
        //     chengjiu_count += require("PlayerManager").achievement[i];
        // }

        var touxianlv = require("PlayerManager").touxianlv;                 //头衔等级
        var touxian = require("ComMain").gameCfgs.touxian;            //表名
        var next_tiaojian1 = touxian[touxianlv+1].tiaojian1;                       //条件1
        var next_tiaojian2 = touxian[touxianlv+1].tiaojian2;                       //条件2
        var next_jiacheng  = touxian[touxianlv+1].jiacheng;                        //加成
        var next_jianggli  = touxian[touxianlv+1].jianglitype;                     //奖励类型
        var next_num       = touxian[touxianlv+1].num;                             //奖励数量


        if( gyj_lv >= next_tiaojian1 && chengjiu_count >= next_tiaojian2 ){
            require("PlayerManager").touxianlv++;                 //升级头衔
            if(next_jianggli == 1){
                require("PlayerManager").coin += next_num;
            }else if(next_jianggli == 2){
                this.node.getChildByName("move").getChildByName("num").getComponent(cc.Label).string = "+"+next_num;
                this.node.getChildByName("move").getComponent(cc.Animation).play("jinbiup");
                require("PlayerManager").diamond += next_num;
            }else if(next_jianggli == 3){
                this.node.getChildByName("move2").getChildByName("num").getComponent(cc.Label).string = "+"+next_num;
                this.node.getChildByName("move2").getComponent(cc.Animation).play("jinbiup");
                require("PlayerManager").screw += next_num;
            }
            //放个特效

            //通知头衔升级了
            cc.systemEvent.emit("SHENGJI_TOUXIAN");    
            
            this.updateView();
            messageTips("成功提升");
        }else{
            messageTips("尚未达到升级条件");
        }
    },

    backFunc:function(){
        this.node.active = false;
    },

});
