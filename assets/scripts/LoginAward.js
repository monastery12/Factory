

cc.Class({
    extends: cc.Component,

    properties: {
      
        button_content:cc.Node,                                     //七个按钮
        button_lingqu:cc.Node,
    },



    onLoad () {},

    start () {

    },

    onEnable:function(){
        this.init();
    },

    init:function(){

        // if(require("first_boomer") == true ){
        //     this.node.active = false;
        //     return ;
        // }

        var gameCfgs = require("ComMain").gameCfgs;                     //
        var login_das = require("PlayerManager").login_days;            //登陆天数   通过登陆天数来控制按钮是否可点击
        var lingqu = require("PlayerManager").lingqu;

        this.button_lingqu.getComponent(cc.Button).interactable = false;

        for(var a = 0;a<7;a++){
            this.button_content.children[a].getComponent(cc.Button).interactable = false;
            this.button_content.children[a].getChildByName("bg").active = false;
        }

        for(var i = 0; i < login_das;i++){
            if( lingqu[i] == false ){
                this.button_content.children[i].getComponent(cc.Button).interactable = true;
                this.button_lingqu.getComponent(cc.Button).interactable = true;
                this.button_content.children[i].getChildByName("bg").active = true;
            }else{
                this.button_content.children[i].getChildByName("bg").active = false;

                this.button_content.children[i].getChildByName("yilingqu").active = true;
            }
                

        }

        for(var j = 0;j<7;j++){
            var award_type = gameCfgs.loginAward[j].award_type;                     //奖励类型
            var award_num  = gameCfgs.loginAward[j].award_num;                      //奖励数量
            
            this.button_content.children[j].getChildByName("award_num").getComponent(cc.Label).string = award_num;
            if( award_type == 2 ){
                this.button_content.children[j].getChildByName("award_2").active = true;
                this.button_content.children[j].getChildByName("award_3").active = false;
            }else if(award_type == 3){
                this.button_content.children[j].getChildByName("award_2").active = false;
                this.button_content.children[j].getChildByName("award_3").active = true;
            }
        }

    },

    buttonFunc1:function(){
                    //按钮声音
                    require("Audio").play("Click",false,1);
                    var gameCfgs = require("ComMain").gameCfgs;            

        var award_type = gameCfgs.loginAward[0].award_type;                     //奖励类型
        var award_num  = gameCfgs.loginAward[0].award_num;                      //奖励数量

        if( award_type == 2 ){
            require("PlayerManager").diamond += award_num;
            messageTips("获得钻石"+award_num+"个");
        }else if(award_type == 3){
            require("PlayerManager").screw += award_num;
            messageTips("获得螺丝"+award_num+"个");
        }
        require("PlayerManager").lingqu[0] = true;
        this.button_content.children[0].getComponent(cc.Button).interactable = false;
        this.button_content.children[0].getChildByName("bg").active = false;

        this.button_content.children[0].getChildByName("yilingqu").active = true;

        cc.systemEvent.emit("UI_CHANGE");
    },
    buttonFunc2:function(){
                    //按钮声音
                    require("Audio").play("Click",false,1);
                    var gameCfgs = require("ComMain").gameCfgs;            

        var award_type = gameCfgs.loginAward[1].award_type;                     //奖励类型
        var award_num  = gameCfgs.loginAward[1].award_num;                      //奖励数量

        if( award_type == 2 ){
            require("PlayerManager").diamond += award_num;
            messageTips("获得钻石"+award_num+"个");
        }else if(award_type == 3){
            require("PlayerManager").screw += award_num;
            messageTips("获得螺丝"+award_num+"个");
        }
        require("PlayerManager").lingqu[1] = true;
        this.button_content.children[1].getComponent(cc.Button).interactable = false;
        this.button_content.children[1].getChildByName("bg").active = false;
        this.button_content.children[1].getChildByName("yilingqu").active = true;
        cc.systemEvent.emit("UI_CHANGE");
    },
    buttonFunc3:function(){
                    //按钮声音
                    require("Audio").play("Click",false,1);
                    var gameCfgs = require("ComMain").gameCfgs;            

        var award_type = gameCfgs.loginAward[2].award_type;                     //奖励类型
        var award_num  = gameCfgs.loginAward[2].award_num;                      //奖励数量

        if( award_type == 2 ){
            require("PlayerManager").diamond += award_num;
            messageTips("获得钻石"+award_num+"个");
        }else if(award_type == 3){
            require("PlayerManager").screw += award_num;
            messageTips("获得螺丝"+award_num+"个");
        }
        require("PlayerManager").lingqu[2] = true;
        this.button_content.children[2].getComponent(cc.Button).interactable = false;
        this.button_content.children[2].getChildByName("bg").active = false;
        this.button_content.children[2].getChildByName("yilingqu").active = true;
        cc.systemEvent.emit("UI_CHANGE");
    },
    buttonFunc4:function(){
                    //按钮声音
                    require("Audio").play("Click",false,1);
                    var gameCfgs = require("ComMain").gameCfgs;            

        var award_type = gameCfgs.loginAward[3].award_type;                     //奖励类型
        var award_num  = gameCfgs.loginAward[3].award_num;                      //奖励数量

        if( award_type == 2 ){
            require("PlayerManager").diamond += award_num;
            messageTips("获得钻石"+award_num+"个");
        }else if(award_type == 3){
            require("PlayerManager").screw += award_num;
            messageTips("获得螺丝"+award_num+"个");
        }
        require("PlayerManager").lingqu[3] = true;
        this.button_content.children[3].getComponent(cc.Button).interactable = false;
        this.button_content.children[3].getChildByName("bg").active = false;
        this.button_content.children[3].getChildByName("yilingqu").active = true;
        cc.systemEvent.emit("UI_CHANGE");
    },
    buttonFunc5:function(){
                    //按钮声音
                    require("Audio").play("Click",false,1);
                    var gameCfgs = require("ComMain").gameCfgs;            

        var award_type = gameCfgs.loginAward[4].award_type;                     //奖励类型
        var award_num  = gameCfgs.loginAward[4].award_num;                      //奖励数量

        if( award_type == 2 ){
            require("PlayerManager").diamond += award_num;
            messageTips("获得钻石"+award_num+"个");
        }else if(award_type == 3){
            require("PlayerManager").screw += award_num;
            messageTips("获得螺丝"+award_num+"个");
        }
        require("PlayerManager").lingqu[4] = true;
        this.button_content.children[4].getComponent(cc.Button).interactable = false;
        this.button_content.children[4].getChildByName("bg").active = false;
        this.button_content.children[4].getChildByName("yilingqu").active = true;
        cc.systemEvent.emit("UI_CHANGE");
    },
    buttonFunc6:function(){
                    //按钮声音
                    require("Audio").play("Click",false,1);
                    var gameCfgs = require("ComMain").gameCfgs;            

        var award_type = gameCfgs.loginAward[5].award_type;                     //奖励类型
        var award_num  = gameCfgs.loginAward[5].award_num;                      //奖励数量

        if( award_type == 2 ){
            require("PlayerManager").diamond += award_num;
            messageTips("获得钻石"+award_num+"个");
        }else if(award_type == 3){
            require("PlayerManager").screw += award_num;
            messageTips("获得螺丝"+award_num+"个");
        }
        require("PlayerManager").lingqu[5] = true;
        this.button_content.children[5].getComponent(cc.Button).interactable = false;
        this.button_content.children[5].getChildByName("bg").active = false;
        this.button_content.children[5].getChildByName("yilingqu").active = true;
        cc.systemEvent.emit("UI_CHANGE");
    },
    buttonFunc7:function(){
                    //按钮声音
                    require("Audio").play("Click",false,1);
                    var gameCfgs = require("ComMain").gameCfgs;            

        var award_type = gameCfgs.loginAward[6].award_type;                     //奖励类型
        var award_num  = gameCfgs.loginAward[6].award_num;                      //奖励数量

        if( award_type == 2 ){
            require("PlayerManager").diamond += award_num;
            messageTips("获得钻石"+award_num+"个");
        }else if(award_type == 3){
            require("PlayerManager").screw += award_num;
            messageTips("获得螺丝"+award_num+"个");
        }
        require("PlayerManager").lingqu[6] = true;
        this.button_content.children[6].getComponent(cc.Button).interactable = false;
        this.button_content.children[6].getChildByName("bg").active = false;
        this.button_content.children[6].getChildByName("yilingqu").active = true;
        cc.systemEvent.emit("UI_CHANGE");
    },

    lingquFunc:function(){
        var gameCfgs = require("ComMain").gameCfgs;                     //
        var login_das = require("PlayerManager").login_days;            //登陆天数   通过登陆天数来控制按钮是否可点击
        var lingqu = require("PlayerManager").lingqu;


        if( login_das >= 1 && lingqu[0] == false ){
                        //按钮声音
                        require("Audio").play("Click",false,1);

            this.buttonFunc1();
            cc.systemEvent.emit("UI_CHANGE");
            return ;
        }

        if( login_das >= 2 && lingqu[1] == false ){
                        //按钮声音
                        require("Audio").play("Click",false,1);

            this.buttonFunc2();
            cc.systemEvent.emit("UI_CHANGE");
            return ;
        }

        if( login_das >= 3 && lingqu[2] == false ){
                        //按钮声音
                        require("Audio").play("Click",false,1);

            this.buttonFunc3();
            cc.systemEvent.emit("UI_CHANGE");
            return ;
            
        }

        if( login_das >= 4 && lingqu[3] == false ){
                        //按钮声音
                        require("Audio").play("Click",false,1);

            this.buttonFunc4();
            cc.systemEvent.emit("UI_CHANGE");
            return ;
        }

        if( login_das >= 5 && lingqu[4] == false ){
                        //按钮声音
                        require("Audio").play("Click",false,1);

            this.buttonFunc5();
            cc.systemEvent.emit("UI_CHANGE");
            return ;
        }

        if( login_das >= 6 && lingqu[5] == false ){
                        //按钮声音
                        require("Audio").play("Click",false,1);

            this.buttonFunc6();
            cc.systemEvent.emit("UI_CHANGE");
            return ;
        }

        if( login_das >= 7 && lingqu[6] == false ){
                        //按钮声音
                        require("Audio").play("Click",false,1);

            this.buttonFunc7();
            cc.systemEvent.emit("UI_CHANGE");
            return ;
        }

        messageTips("奖励已经领取完");
    },

    backFunc:function(){
                    //按钮声音
                    require("Audio").play("Click",false,1);
                    
        this.node.active = false;
    },
    //update (dt) {},
});
