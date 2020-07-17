const POSSIBLE = 0.9;                   //可能性
const TIME_1 = 2;                       //转动一圈
const TIME_2 = 3;                       //转动两圈
const TIME_3 = 4;                       
const TIME_4 = 5;
const TIME_5 = 8;           

cc.Class({
    extends: cc.Component,

    properties: {
        panel:cc.Node,

        num_1:cc.Label,
        num_2:cc.Label,
        num_3:cc.Label,
        num_4:cc.Label,
        num_5:cc.Label,
        num_6:cc.Label,

        icon_1:cc.Sprite,
        icon_2:cc.Sprite,
        icon_3:cc.Sprite,
        icon_4:cc.Sprite,
        icon_5:cc.Sprite,
        icon_6:cc.Sprite,

        next_double_node:cc.Node,
        cj_count_node:cc.Label,
        choujiangButton:cc.Node,

        chouzhong_bg1:cc.Node,
        chouzhong_bg2:cc.Node,
        chouzhong_bg3:cc.Node,
        chouzhong_bg4:cc.Node,
        chouzhong_bg5:cc.Node,
        chouzhong_bg6:cc.Node,

        shipingButton:cc.Button,
        fenxiangButton:cc.Button,
        backButton:cc.Button,
        cjButton:cc.Button,

        _assest:null,
        _gameCfgs:null,
        _array:[],                       

        _localposion:null,
        _startTime:null,
        _left_right:null,                 //false:左转          true:右转

        //_test:0,

    },

    onLoad () {
        var self = this
        // this._animCtrl  = this.choujiangButton.getComponent(cc.Animation);
        // this._animState = this._animCtrl.getAnimationState('scale');

        // this.panel.on(cc.Node.EventType.TOUCH_START,function(event){
        //     self._localposion = event.getLocation();
        //     self._startTime = (new Date()).getTime();
        // });

        // this.panel.on(cc.Node.EventType.TOUCH_END,function(event){
        //     /**
        //      * 通过计算滑动的距离跟时间差，来决定需要转动多少圈
        //      * 两次滑动的X差值决定了左右滑动
        //      */
        //     var sub_time = (new Date()).getTime() - self._startTime;                //时间差
        //     self._left_right = ( event.getLocation().x - self._localposion.x ) > 0 ? true:false;
        //     var sub_length = event.getLocation().x - self._localposion.x;

        //     var rate = parseInt(sub_length/sub_time)/100;
        //     switch(rate){
        //         case 0:console.log("请大力滑动");messageTips("请用力滑动");break;
        //         case 1:self.runPanel(TIME_1);break;
        //         case 2:self.runPanel(TIME_2);break;
        //         case 3:self.runPanel(TIME_3);break;
        //         case 4:self.runPanel(TIME_4);break;
        //         case 5:self.runPanel(TIME_5);break;
        //         default:self.runPanel(TIME_2);break;
        //     }
        // });

        // this.panel.on(cc.Node.EventType.TOUCH_MOVE,function(event){
        //     var x = event.getDeltaX()                                            //获取鼠标距离上一次事件移动的 X轴距离
        //     var y = event.getDeltaY()                                            //获取鼠标距离上一次事件移动的 Y轴距离
        // });

        // this.panel.on(cc.Node.EventType.TOUCH_CANCEL,function(){

        // });
    },

    start () {
    },

    onEnable(){
        this._gameCfgs = require("ComMain").gameCfgs;

        for(var i = 0; i < 6 ; i++){
            for(var j = 0; j < this._gameCfgs.zhuanpan[i].prop*100 ; j++){
                this._array.push(i)
            }
        }

        this.panel.rotation = 0;
        this.init();
        this.initView();
    },
    

    onChoujiangBtn:function(){

               //按钮声音
               require("Audio").play("Click",false,1);

        if(require("PlayerManager").choujiang_count > 0){
            var times = parseInt( Math.random()*3 + 1 );
            this.runPanel(times);
            require("PlayerManager").choujiang_count --;
            this.init();
        }else{
            //
        }   

       

    },

    runPanel:function(times){
        
        this.shipingButton.interactable = false;
        this.backButton.interactable = false;
        this.fenxiangButton.interactable = false;
        this.cjButton.interactable = false;

        var rnum = parseInt( Math.random()*100  );                          //
        var index = this._array[rnum];                                              //奖励类型
        //var index_piancha = parseInt( ( Math.random()- 0.5 ) *45 )
        if(index == 5 && require("PlayerManager").choujiang_double > 0 ){
            index += 1;
        }
        //index = this._test ++;

        var award_id = this._gameCfgs.zhuanpan[index].award_id;                    //奖品1 2 3 4 5
        var award_num = this._gameCfgs.zhuanpan[index].award_num;                  //奖励数量

        var rdu = 360 -  this.panel.rotation % 360 ;

        var rotate_dusu = times*360 + (index )*60 + rdu //+ index_piancha;
        var duation_time = times*1;
        var rotate = new cc.rotateBy(duation_time,rotate_dusu);

        var callFunc = cc.callFunc(function(){
            switch(award_id){
                case 1: this.choujiang_1(award_num) ; break;
                case 2: this.choujiang_2(award_num) ; break;
                case 3: this.choujiang_3(award_num) ; break;
                case 4: this.choujiang_4(award_num) ; break;
                case 5: this.choujiang_5(award_num) ; break;
                case 6: this.choujiang_6(award_num) ; break;
           }
           switch(index){
               case 0:this.chouzhong_bg1.active = true;break;
               case 1:this.chouzhong_bg2.active = true;break;
               case 2:this.chouzhong_bg3.active = true;break;
               case 3:this.chouzhong_bg4.active = true;break;
               case 4:this.chouzhong_bg5.active = true;break;
               case 5:this.chouzhong_bg6.active = true;break;
           }


           this.shipingButton.interactable = true;
           this.backButton.interactable = true;
           this.fenxiangButton.interactable = true;
           this.cjButton.interactable = true;
        },this);


        //最后的缓慢转动
            var rotate_0 = new cc.rotateBy(1,270);
            var rotate_1 = new cc.rotateBy(1,180);
            var rotate_2 = new cc.rotateBy(1,135);
            var rotate_3 = new cc.rotateBy(1,90);
            var rotate_4 = new cc.rotateBy(2,45);
        this.panel.runAction(cc.sequence(rotate,rotate_0,rotate_1,rotate_2,rotate_3,rotate_4,callFunc));
    },

    choujiang_1:function(award_num){
        if( require("PlayerManager").choujiang_double > 0){
            require("PlayerManager").choujiang_double --;
            require("PlayerManager").coin += (award_num*2); 
            messageTips("奖励加倍,获得金币"+ award_num);
        }else{
            require("PlayerManager").coin += award_num; 
            messageTips("获得金币"+ award_num);
        }

      
        cc.systemEvent.emit("UI_CHANGE");
    },
    choujiang_2:function(award_num){

        if( require("PlayerManager").choujiang_double > 0){
            require("PlayerManager").choujiang_double --;
            require("PlayerManager").diamond += (award_num*2) ; 
            messageTips("奖励加倍,获得钻石"+ award_num*2);
        }else{
            require("PlayerManager").diamond += award_num; 
            messageTips("获得钻石"+ award_num)
        }
        cc.systemEvent.emit("UI_CHANGE");
    },
    choujiang_3:function(award_num){

        if( require("PlayerManager").choujiang_double > 0 ){
            require("PlayerManager").choujiang_double --;
            require("PlayerManager").screw += (award_num*2); 
            messageTips("奖励加倍,获得零件"+ award_num*2) ;
        }else{
            require("PlayerManager").screw += award_num; 
            messageTips("获得零件"+ award_num) 
        }

        cc.systemEvent.emit("UI_CHANGE");
    },
    choujiang_4:function(award_num){                                                                    //再来一次？

        if(  require("PlayerManager").choujiang_double > 0 ){
            require("PlayerManager").choujiang_count += (award_num*2); 
            require("PlayerManager").choujiang_double --;
            messageTips("奖励翻倍,获得抽奖次数+"+award_num*2 );
        }else{
            require("PlayerManager").choujiang_count += award_num; 
            messageTips("获得抽奖次数+"+award_num);
        }
        this.init();
    },
    choujiang_5:function(award_num){
        require("PlayerManager").choujiang_double += 1;
        messageTips("获得: 下次奖励翻倍 ")
        this.init();
    },
    choujiang_6:function(award_num){

    },

    initView:function(){
        var self = this;

        var icon_id1 = this._gameCfgs.zhuanpan[0].award_id  ;  
        var num_str1 = this._gameCfgs.zhuanpan[0].award_num ;

        var icon_id2 = this._gameCfgs.zhuanpan[1].award_id  ;  
        var num_str2 = this._gameCfgs.zhuanpan[1].award_num ;

        var icon_id3 = this._gameCfgs.zhuanpan[2].award_id  ;  
        var num_str3 = this._gameCfgs.zhuanpan[2].award_num ;

        var icon_id4 = this._gameCfgs.zhuanpan[3].award_id  ;  
        var num_str4 = this._gameCfgs.zhuanpan[3].award_num ;

        var icon_id5 = this._gameCfgs.zhuanpan[4].award_id  ;  
        var num_str5 = this._gameCfgs.zhuanpan[4].award_num ;

        var icon_id6 = this._gameCfgs.zhuanpan[5].award_id  ;  
        var num_str6 = this._gameCfgs.zhuanpan[5].award_num ;

        self.num_1.string = num_str1;
        self.num_2.string = num_str2;
        self.num_3.string = num_str3;
        self.num_4.string = num_str4;
        self.num_5.string = num_str5;
        self.num_6.string = num_str6;

        if( this._assest == null){
            cc.loader.loadRes("plist/choujiang", cc.SpriteAtlas, function (err, atlas) {                   //加载图集
                if(err == null){
                    self._assest = atlas;
                    self.icon_1.spriteFrame = self._assest.getSpriteFrame(icon_id1.toString());
                    self.icon_2.spriteFrame = self._assest.getSpriteFrame(icon_id2.toString());
                    self.icon_3.spriteFrame = self._assest.getSpriteFrame(icon_id3.toString());
                    self.icon_4.spriteFrame = self._assest.getSpriteFrame(icon_id4.toString());
                    self.icon_5.spriteFrame = self._assest.getSpriteFrame(icon_id5.toString());
                    self.icon_6.spriteFrame = self._assest.getSpriteFrame(icon_id6.toString());
                }
             });
        }else{
            self.icon_1.spriteFrame = self._assest.getSpriteFrame(icon_id1.toString());
            self.icon_2.spriteFrame = self._assest.getSpriteFrame(icon_id2.toString());
            self.icon_3.spriteFrame = self._assest.getSpriteFrame(icon_id3.toString());
            self.icon_4.spriteFrame = self._assest.getSpriteFrame(icon_id4.toString());
            self.icon_5.spriteFrame = self._assest.getSpriteFrame(icon_id5.toString());
            self.icon_6.spriteFrame = self._assest.getSpriteFrame(icon_id6.toString());
        }
    },

    init:function(){
        this.cj_count_node.string = "今日可抽奖次数:" + require("PlayerManager").choujiang_count;

        if(require("PlayerManager").choujiang_count > 0){
            this.node.getChildByName("shiping_double_jiangli").active = false;
            this.node.getChildByName("share_double_jiangli").active = false;
            this.choujiangButton.active = true;

        }else{
            if(require("PlayerManager").video_count > 0 ){
                this.node.getChildByName("shiping_double_jiangli").active = true;
                this.node.getChildByName("share_double_jiangli").active = false;
            }else{
                this.node.getChildByName("shiping_double_jiangli").active = false;
                this.node.getChildByName("share_double_jiangli").active = true;
            }
            this.choujiangButton.active = false;
        }

        //this.color_bg2.active = false;
        if(  require("PlayerManager").choujiang_double > 0  ){
            this.next_double_node.active = true;
            //this.next_double_node.getComponent(cc.Label).string = "下次奖励翻倍次数X "+  require("PlayerManager").choujiang_double
            //this.next_double_node.getComponent(cc.Label).string 
        }else{
            this.next_double_node.active = false;
        }
   

        if(require("PlayerManager").choujiang_count > 0){
            this.choujiangButton.getComponent(cc.Button).interactable = true;
            //this._animCtrl.play('scale'); 

            
        }else{
            this.choujiangButton.getComponent(cc.Button).interactable = false;
            //this._animCtrl.stop('scale'); 
        }

        this.chouzhong_bg1.active = false;
        this.chouzhong_bg2.active = false;
        this.chouzhong_bg3.active = false;
        this.chouzhong_bg4.active = false;
        this.chouzhong_bg5.active = false;
        this.chouzhong_bg6.active = false;


    },


        //视频加倍
        shipingDoubleButton:function(){

    

            //require("Ad").rewardAd.show();                                          //从小往上弹出视频广告rewardAdStart
            require("Ad").videoCD = true;
            require("Ad").rewardAdStart(this.onShipingGet);
    
    
        },
    
        //分享加倍
        shareDoubleButton:function(){



            var self = this;
    
            var obj  = {
                name:"leave_double",
                callback:{
                    func:self.onShareGetCoinSucc,
                    target:self,
                }
            }
    
            cc.systemEvent.emit("COM_SHARE_GAME",obj);    
        },
    
        //分享奖励
        onShareGetCoinSucc:function(){

            require("PlayerManager").choujiang_count ++;
            this.init();
            messageTips("分享成功抽奖次数加一");
        },
    
        //视频奖励
        onShipingGet:function(){
            require("PlayerManager").video_count --;
            require("PlayerManager").choujiang_count ++;
            this.init();
            messageTips("观看视频获得抽奖次数加一")
        },


    backClick:function(){
        this.node.active = false;
    }


});
