
const YAOQING = [1,2,3,4,5];
const ACHI_YAOQING = 10;
cc.Class({
    extends: cc.Component,

    properties: {
        
        jiangli_1:cc.Node,
        jiangli_2:cc.Node,
        jiangle_3:cc.Node,

        yaoqing_button:cc.Node,
        jiangli_button:cc.Node,

        yaoqing_num:cc.Label,
        jiangli_num:cc.Label,

        _yaoqing_num:0,
        _had_yaoqing_num:0,

        _jiangli_id:0,
        _jiangli_num:0,

        _chushihua:false,


    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
       
    },

    start () {

    },
    onEnable:function(){
        this.init();
    },


    init:function(){
        var invitation = require("ComMain").gameCfgs.invitation;
        if( require("PlayerManager").invitation_id == -1 && require("PlayerManager").invitation_lingqu == false){                           //初始化邀请
       
            var rnum = parseInt( Math.random()*5 );                             //邀请id
            var iindex = YAOQING[rnum];
           
            this._yaoqing_num = invitation[iindex].number;                      //邀请人数
            this._jiangli_id = invitation[iindex].awardtype;                    //奖励id
            this._jiangli_num = invitation[iindex].value;                               //奖励数量
            this._had_yaoqing_num = 0;                                          //已经邀请人的数量

            require("PlayerManager").invitation_id = iindex;                    //邀请id
            require("PlayerManager").invitation_num = 0;
        }else{      
            var iindex = require("PlayerManager").invitation_id;  
            if( iindex == -1 ){
                return ;
            }

            this._yaoqing_num = invitation[iindex].number;                      //邀请人数
            this._jiangli_id  = invitation[iindex].awardtype;                    //奖励id
            this._jiangli_num = invitation[iindex].value;                               //奖励数量
            this._had_yaoqing_num =   require("PlayerManager").invitation_num ; //已经邀请人的数量
        }

        if(this._jiangli_id == 1 ){
            this.jiangli_1.active = true;
            this.jiangli_2.active = false;
            this.jiangle_3.active = false;
        }else if(this._jiangli_id == 2){
            this.jiangli_1.active = false;
            this.jiangli_2.active = true;
            this.jiangle_3.active = false;
        }else{
            this.jiangli_1.active = false;
            this.jiangli_2.active = false;
            this.jiangle_3.active = true;
        }

        this.yaoqing_num.string = (this._had_yaoqing_num).toString() +"/"+ (this._yaoqing_num).toString();            //邀请
        this.jiangli_num.string = this._jiangli_num;            //奖励

    },

    //邀请按钮
    yaoqingFunc:function(){
        var self = this;
        require("sdk_4399").shareGame(function(){
            self.yaoqingGet();
        })
    },

    //点击领取
    lingquFunc:function(){
        if(this._had_yaoqing_num  >= this._yaoqing_num ){

            if(require("PlayerManager").invitation_lingqu == true){
                messageTips("已经领取过奖励了");
                return ;
            }

            if(this._jiangli_id == 1){                                                  //奖励金币
                require("PlayerManager").coin += ( this._jiangli_num );
            }else if(this._jiangli_id == 2){                                            //奖励钻石
                require("PlayerManager").diamond += ( this._jiangli_num);
            }else if(this._jiangli_id == 3){                                            //奖励螺丝
                require("PlayerManager").screw += ( this._jiangli_num );
            }

            //require("PlayerManager").invitation_num = 0;                         //领取之后重置
            require("PlayerManager").invitation_id = -1;
            messageTips("领取成功");
            require("PlayerManager").invitation_lingqu = true ;
        }else{
            messageTips("邀请人数不够");
        }
    },

    //邀请成功回调
    yaoqingGet:function(){


        if(this._had_yaoqing_num < this._yaoqing_num ){
            require("PlayerManager").invitation_num ++;                //邀请增加
            require("PlayerManager").achievement_jindu[ACHI_YAOQING] ++;            //要求好友成就
            this.init();
        }

    },

    backFunc:function(){
        this.node.active = false;
    },


});
