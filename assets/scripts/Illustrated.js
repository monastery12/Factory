// const ILLUSTRATED = [ 
//                         [  { name:" ", click:3 , value:5 , reward:0 , number:5  } ,{},{},{},{},{} ],
//                         [ {},{},{},{},{},{} ],
//                         [ {},{},{},{},{},{} ],
//                         [ {},{},{},{},{},{} ],
//                         [ {},{},{},{},{},{} ],
//                         [ {},{},{},{},{},{} ],
//                     ];


cc.Class({
    extends: cc.Component,

    properties: {
        back:cc.Node,
        item:cc.Node,
        content:cc.Node,



        _illustrated:null,                              //成就
        _ill_jiangli:null,
        _gameCfgs:null,
        _item:null,
        _assest:null,
        _BigNum:null,
        _item_lock:null,
    },


    onLoad () {
        var self = this;
        this.linqu_tag = false;
        this._BigNum = require("BigNum");
        cc.systemEvent.on("TUJIAN_LINQU",this.lingquButton.bind(this));
        cc.systemEvent.on("PRODUCE_CHOOSE",this.produceChoose.bind(this));
        // cc.loader.loadRes("Images/gongyingji/produce_choose", cc.SpriteAtlas, function (err, atlas) {                   //加载图集
        //     if(err == null){
        //         self._assest = atlas;
        //     }
        // });

        // cc.loader.loadRes("prefab/ill_Item", function (err, prefab) {
        //     if(err == null){
        //         self._item = cc.instantiate(prefab);
        //     }
        // });

        // cc.loader.loadRes("prefab/ill_lock",function(err,prefab){
        //     if(err == null ){
        //         self._item_lock = cc.instantiate(prefab)
        //     }
        // });
        
             
    },

    start () {
        
    },

    onEnable(){
        var self = this;
        //setTimeout(function(){
            if(self._item == null || self._assest == null || self._item_lock  == null  ){
                cc.loader.loadRes("Images/gongyingji/produce_choose", cc.SpriteAtlas, function (err, atlas) {                   //加载图集
                    if(err == null){
                        self._assest = atlas;
                        cc.loader.loadRes("prefab/ill_Item", function (err, prefab) {
                            if(err == null){
                                self._item = cc.instantiate(prefab);
                                cc.loader.loadRes("prefab/ill_lock",function(err,prefab){
                                    if(err == null ){
                                        self._item_lock = cc.instantiate(prefab)
                                        self.updateView();
                                    }
                                });
                            }
                        });
                    }
                });
        
            
        
             
            }else{
                self.updateView();
            }
          
         
        //},200);
    },

    updateView:function(){
        var self = this;
        //this.node.opacity = 0;

        this._illustrated = require("PlayerManager").illustrated;
        this._gameCfgs = require("ComMain").gameCfgs;

        if( require("PlayerManager").illustrated_jiangli == 0 ){
            for(var a = 0;a<15;a++){
                require("PlayerManager").illustrated_jiangli[a] = new Array();
                for(var b =0 ; b < 6;b++){
                    require("PlayerManager").illustrated_jiangli[a][b] = true;
                }
            }
        }
        this._ill_jiangli = require("PlayerManager").illustrated_jiangli;
        

        var en_num  = 0;
        for( var m = 0; m < this._illustrated.length && this._illustrated[m] > 0 ;m++){
            en_num ++;
        }
        if( (this.content.children.length -1) < en_num ){
            this.content.removeAllChildren(true);
        }

        for(var i = 0;i< this._illustrated.length && this._illustrated[i] > 0 ;i++){

            if( (this.content.children.length -1) == en_num ){
                var ill = this.content.children[i];
                var item = ill.getChildByName("ill_Item");
                var item_bg = ill.getChildByName("ill_bg");
            }else{
                   //加载item
                if(this._item){
                var ill = cc.instantiate(this._item);
                var item = ill.getChildByName("ill_Item");
                var item_bg = ill.getChildByName("ill_bg");
                }else{
                cc.loader.loadRes("prefab/ill_Item.prefab", function (err, prefab) {
                    if(err == null){
                        self._item = cc.instantiate(prefab);
                        var ill = cc.instantiate(self._item);
                        var item = ill.getChildByName("ill_Item");
                        var item_bg = ill.getChildByName("ill_bg");
                    }
                });
                }
            }

         
            
            /**
             * 新增合并图鉴跟供应机选择
             */
            var ill_name = item_bg.getChildByName("name").getComponent(cc.Label);       //
            var ill_btn = item_bg.getChildByName("choose");                             //
            var ill_time = item_bg.getChildByName("time").getComponent(cc.Label);

            var rate_str = "rate"+ (i+1).toString();
            var dengji = require("PlayerManager").production_lv;
            ill_time.string =  "供应速度:"+ require("ComMain").gameCfgs.produce[dengji][rate_str] + "秒"; 
            ill_name.string  = require("ComMain").gameCfgs.goods[ (i+1)*6].typename          //
            ill_btn.getComponent(cc.Sprite).produce_index = (i+1);
            ill_btn.on(cc.Node.EventType.TOUCH_START,function( event ){
                cc.systemEvent.emit("PRODUCE_CHOOSE",event);
            });
            

            for(var j = 0;j < 6 ; j++ ){
                //设置item
                item.children[j].active = true;
                var icon_node  = item.children[j].getChildByName("icon").getComponent(cc.Sprite);
                var name_node  = item.children[j].getChildByName("name").getComponent(cc.Label);
                var value_node = item.children[j].getChildByName("value").getComponent(cc.Label);
                var click_node = item.children[j].getChildByName("click").getComponent(cc.Label);

                var jiangli_node = item.children[j].getChildByName("jiangli_node");

                if(j < this._illustrated[i] ){
                    jiangli_node.active = true;
                }
        
                var index = i*6 + j + 1;
                var url_cion = (i+1).toString() + j.toString();
                var name_str  = this._gameCfgs.goods[ index ].name;
                var value_str = this._gameCfgs.goods[ index ].value;
                var click_str = this._gameCfgs.goods[ index ].click;

                //加载图片
                if(this._assest){
                    icon_node.spriteFrame = this._assest.getSpriteFrame(url_cion);
                }else{
                    cc.loader.loadRes("Images/gongyingji/produce_choose", cc.SpriteAtlas, function (err, atlas) {                   //加载图集
                        if(err == null){
                            self._assest = atlas;
                            icon_node.spriteFrame = this._assest.getSpriteFrame(url_cion);
                        }
                     });
                }
                //名字，价格，生命
                if(j < this._illustrated[i] ){
                    name_node.string = name_str;
                    value_node.string = this._BigNum.Show( value_str );
                    click_node.string = this._BigNum.Show( click_str ) ;
                }else{
                    name_node.string  = "?";
                    value_node.string = "?";
                    click_node.string = "?";
                }
             
  

                if( this._gameCfgs.handbook[ index ].awardstype == -1 ){
                    jiangli_node.active = false;
                }else if( this._gameCfgs.handbook[ index ].awardstype == 1 ){                                   //有奖励
                    if( this._ill_jiangli[i][j] == true ){                                                      //再判断奖励是否领取
                        jiangli_node.getChildByName("jiangli_id_1").active = true;
                        //this._ill_jiangli[i][j] = false;
                    }else{
                        jiangli_node.active = false;
                    }
                }else if( this._gameCfgs.handbook[ index ].awardstype == 2 ){
                    if( this._ill_jiangli[i][j] == true ){                                                      //再判断奖励是否领取
                        jiangli_node.getChildByName("jiangli_id_2").active = true;
                        //this._ill_jiangli[i][j] = false;
                    }else{
                        jiangli_node.active = false;
                    }
                }else if( this._gameCfgs.handbook[ index ].awardstype == 3 ){
                    if( this._ill_jiangli[i][j] == true ){                                                      //再判断奖励是否领取
                        jiangli_node.getChildByName("jiangli_id_3").active = true;
                        //this._ill_jiangli[i][j] = false;
                    }else{
                        jiangli_node.active = false;
                    }
                }

                jiangli_node.getChildByName("jiangli_num").getComponent(cc.Label).string  = this._gameCfgs.handbook[ index ].value ;

                var jiangli_btn = jiangli_node.getChildByName("lingqu");
                jiangli_btn.getComponent(cc.Sprite).ii = i;
                jiangli_btn.getComponent(cc.Sprite).jj = j;

                jiangli_btn.on(cc.Node.EventType.TOUCH_START,function( event ){
                    cc.systemEvent.emit("TUJIAN_LINQU",event);
                });
                ill.parent = this.content;

            }

            for(var m =  0 ; m < 6 ; m++ ){
                if(m >= this._illustrated[i] ){
                    item.children[m].getChildByName("icon").color = new cc.Color(0,0,0);
                    item.children[m].getChildByName("jiangli_node").active = false;
                }else{
                    item.children[m].getChildByName("icon").color = new cc.Color(255,255,255);
              
                    //item.children[m].getChildByName("jiangli_node").active = true;
                }
            }

            // if( this._illustrated[i] < 5){
            //     item.children[6].active = true;
            // }else{
            //     item.children[6].active = false;
            // }

        }
        this.node.opacity = 255;

        
     
        if( this.needDengji() ){

            // if( (this.content.children.length -1) == en_num ){
            //     var ill_lock = this.content.children[ en_num  ];
            // }else{
            //     var ill_lock = cc.instantiate(this._item_lock);
            // }

            var chil = this.content.getChildByName("ill_lock");
            if(chil){
                this.content.removeChild(chil);
            }
            var ill_lock = cc.instantiate(this._item_lock);
 
            ill_lock.getChildByName("lb").getComponent(cc.Label).string = "供应机达到"+ this.needDengji() + "级开启新材料";
            ill_lock.parent = this.content;
        }

           /**
         * 初始化界面的亮与暗
         */
        // var biaoji = (require("PlayerManager").produceType - 1);   
        // for(var i = 0;i<this.content.children.length-1;i++){
        //     if( i == biaoji ){
        //         self.content.children[i].getChildByName("ill_bg").getChildByName("xuanzhong").active = true;
        //         self.content.children[i].getChildByName("ill_bg").getChildByName("choose").getChildByName("weixuanzhong").active = false;
        //         self.content.children[i].getChildByName("ill_bg").getChildByName("choose").getChildByName("xuanzhong").active = true;
        //         // //
        //         // self.content.children[i].getChildByName("choose").getChildByName("bg").active = false;
        //         // self.content.children[i].getChildByName("choose").color = new cc.Color(255,255,255);
        //     }else{
        //         self.content.children[i].getChildByName("ill_bg").getChildByName("xuanzhong").active = false;
        //         self.content.children[i].getChildByName("ill_bg").getChildByName("choose").getChildByName("weixuanzhong").active = true;
        //         self.content.children[i].getChildByName("ill_bg").getChildByName("choose").getChildByName("xuanzhong").active = false;
        //         // self.content.children[i].getChildByName("color_bg").active = true;
        //         // //self.content.children[i].getChildByName("choose").getChildByName("bg").active = true;
        //         // self.content.children[i].getChildByName("choose").color = new cc.Color(105,91,91);
  
        //     }
        // }
        this.updatechoose();
        this.node.opacity = 255;
    },


    backclick:function(){
                    //按钮声音
                    require("Audio").play("Click",false,1);

        this.node.active = false;
    },

    //点击领取
    lingquButton:function(event){

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
        
        var i = target.getComponent(cc.Sprite).ii;;
        var j = target.getComponent(cc.Sprite).jj;;
        var index = i*6 + j + 1;
        require("PlayerManager").illustrated_jiangli[i][j] = false;

        if( this._gameCfgs.handbook[ index ].awardstype == -1 ){
  
        }else if( this._gameCfgs.handbook[ index ].awardstype == 1 ){                                   //有奖励
            require("PlayerManager").coin += this._gameCfgs.handbook[ index ].value;
        }else if( this._gameCfgs.handbook[ index ].awardstype == 2 ){
            require("PlayerManager").diamond += this._gameCfgs.handbook[ index ].value;     
        }else if( this._gameCfgs.handbook[ index ].awardstype == 3 ){
            require("PlayerManager").screw += this._gameCfgs.handbook[ index ].value;    
        }

        cc.systemEvent.emit("UI_CHANGE");
        this.updateView();
    },

    produceChoose:function(event){
         //按钮声音
         require("Audio").play("Click",false,1);

        var target = event.target;
        var produce_index = target.getComponent(cc.Sprite).produce_index ;
        require("PlayerManager").produceType = produce_index ;                    
        cc.systemEvent.emit("PRODUCE_CHANGE",produce_index);              //同通改变生产

        if( require("PlayerManager").illustrated[produce_index - 1] == 0 ){
            require("PlayerManager").illustrated[produce_index - 1] = 1;
            var obj = {
                z:produce_index,
                d:1,
            }
            cc.systemEvent.emit("FAXIAN_NEW_GOODS",obj);
        }     

            //换壁纸
            cc.systemEvent.emit("CHANGE_BIZHI");   
            this.updatechoose();    
    },
  //供应机多少级开启新材料
  needDengji:function(){
          
    var dengji = require("PlayerManager").production_lv;
    var enableindex = require("ComMain").gameCfgs.produce[dengji].enable ;                               //可以生产种类
    var produce = require("ComMain").gameCfgs.produce;


    for(var i = 1 ;i< 500;i++){
        if(produce[i].enable  == ( enableindex + 1 ) ){
            return i;
            break;
        }
     }
    return -1;
    },

    updatechoose:function(){
        var self = this;
        var biaoji = (require("PlayerManager").produceType - 1);   
        for(var i = 0;i<this.content.children.length-1;i++){
            if( i == biaoji ){
                self.content.children[i].getChildByName("ill_bg").getChildByName("xuanzhong").active = true;
                self.content.children[i].getChildByName("ill_bg").getChildByName("choose").getChildByName("weixuanzhong").active = false;
                self.content.children[i].getChildByName("ill_bg").getChildByName("choose").getChildByName("xuanzhong").active = true;
                self.content.children[i].getChildByName("ill_bg").getChildByName("bg_bg").active = true;
                var item = self.content.children[i].getChildByName("ill_Item");
                for(var j = 0; j<item.children.length;j++){
                    item.children[j].getChildByName("item_bg").active = true;
                }
                // //
                // self.content.children[i].getChildByName("choose").getChildByName("bg").active = false;
                // self.content.children[i].getChildByName("choose").color = new cc.Color(255,255,255);
            }else{
                self.content.children[i].getChildByName("ill_bg").getChildByName("xuanzhong").active = false;
                self.content.children[i].getChildByName("ill_bg").getChildByName("choose").getChildByName("weixuanzhong").active = true;
                self.content.children[i].getChildByName("ill_bg").getChildByName("choose").getChildByName("xuanzhong").active = false;
                self.content.children[i].getChildByName("ill_bg").getChildByName("bg_bg").active = false;
                var item = self.content.children[i].getChildByName("ill_Item");
                for(var j = 0; j<item.children.length;j++){
                    item.children[j].getChildByName("item_bg").active = false;
                }
                // self.content.children[i].getChildByName("color_bg").active = true;
                // //self.content.children[i].getChildByName("choose").getChildByName("bg").active = true;
                // self.content.children[i].getChildByName("choose").color = new cc.Color(105,91,91);
  
            }
        }
    },



    // update (dt) {},
});
