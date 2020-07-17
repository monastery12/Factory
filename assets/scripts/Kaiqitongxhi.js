

cc.Class({
    extends: cc.Component,

    properties: {
        
        renwu_node:cc.Node,
        chengjiu_node:cc.Node,
        tujian_node:cc.Node,
        touxian_node:cc.Node,

        ///////////////////////////////
        rank_node:cc.Node,                          // 5 
      //  machine_node:cc.Node,                       // 6
       // money_node:cc.Node,                         // 7 
        choujiang_node:cc.Node,                     // 8
        qiandao_node:cc.Node,                       //9


        _tongzhi_array:[] ,
    },


    onLoad () {
        cc.systemEvent.on("KAIQI_RENWU",this.kaiqirenwu.bind(this));
        cc.systemEvent.on("KAIQI_CHENGJIU",this.kaiqichengjiu.bind(this));
        cc.systemEvent.on("KAIQI_TOUXIAN",this.kaiqitouxian.bind(this));
        //cc.systemEvent.on("KAIQI_TUJIAN",this.kaiqitujian.bind(this));

        //cc.systemEvent.on("KAIQI_RANK",this.kaiqirank.bind(this));
        //cc.systemEvent.on("KAIQI_MACHINE",this.kaiqimachine.bind(this));
        //cc.systemEvent.on("KAIQI_MONEY",this.kaiqimoney.bind(this));
        cc.systemEvent.on("KAIQI_CHOUJIANG",this.kaiqichoujiang.bind(this));
        cc.systemEvent.on("KAIQI_QIANDAO",this.kaiqiqiandao.bind(this));
    },

    start () {

    },

    kaiqiqiandao:function(){

        if(this._tongzhi_array.length == 0){
            this._tongzhi_array.push( this.qiandao_node );
            this.qiandao_node.active = true;
        }else{
            this._tongzhi_array.push(this.qiandao_node);
        }
    },

    //开启任务
    kaiqirenwu:function(){

        if(this._tongzhi_array.length == 0){
            this._tongzhi_array.push( this.renwu_node );
            this.renwu_node.active = true;
        }else{
            this._tongzhi_array.push(this.renwu_node);
        }
    },

    //开启成就
    kaiqichengjiu:function(){
        if(this._tongzhi_array.length == 0){
            this._tongzhi_array.push( this.chengjiu_node );
            this.chengjiu_node.active = true;
        }else{
            this._tongzhi_array.push(this.chengjiu_node);
        }
    },

    //开启头衔
    kaiqitouxian:function(){
        if(this._tongzhi_array.length == 0){
            this._tongzhi_array.push( this.touxian_node );
            this.touxian_node.active = true;
        }else{
            this._tongzhi_array.push(this.touxian_node);
        }
    },

    //开启图鉴
    kaiqitujian:function(){
        // if(this._tongzhi_array.length == 0){
        //     this._tongzhi_array.push( this.tujian_node );
        //     this.tujian_node.active = true;
        // }else{
        //     this._tongzhi_array.push(this.tujian_node);
        // }
    },

    //开启排行榜
    kaiqirank:function(){

        if(this._tongzhi_array.length == 0){
            this._tongzhi_array.push( this.rank_node );
            this.rank_node.active = true;
        }else{
            this._tongzhi_array.push(this.rank_node);
        }
    },

    //开启机器加速
    kaiqimachine:function(){

        if(this._tongzhi_array.length == 0){
            this._tongzhi_array.push( this.machine_node );
            this.machine_node.active = true;
        }else{
            this._tongzhi_array.push(this.machine_node);
        }
    },

    //开启资金加速
    kaiqimoney:function(){

        if(this._tongzhi_array.length == 0){
            this._tongzhi_array.push( this.money_node );
            this.money_node.active = true;
        }else{
            this._tongzhi_array.push(this.money_node);
        }
    },

    //开启抽奖
    kaiqichoujiang:function(){

        if(this._tongzhi_array.length == 0){
            this._tongzhi_array.push( this.choujiang_node );
            this.choujiang_node.active = true;
        }else{
            this._tongzhi_array.push(this.choujiang_node);
        }
    },


    sureRenwu:function(){
        var now_node  = this._tongzhi_array.shift();
        now_node.active = false;

        if( now_node == this.renwu_node ){
            cc.systemEvent.emit("OPEN_CHOUTI",2);           //任务2
        }

        if( now_node == this.chengjiu_node ){
            cc.systemEvent.emit("OPEN_CHOUTI",1);           //成就1
        }

        if( now_node == this.tujian_node ){
            cc.systemEvent.emit("OPEN_CHOUTI",3);           //图鉴3
        }

        if( now_node == this.touxian_node ){
            cc.systemEvent.emit("OPEN_CHOUTI",4);           //头衔4
        }

        if( now_node == this.rank_node ){
            cc.systemEvent.emit("OPEN_CHOUTI",5);
        }

        // if( now_node == this.machine_node ){
        //     cc.systemEvent.emit("OPEN_CHOUTI",6);
        // }

        // if( now_node == this.money_node ){
        //     cc.systemEvent.emit("OPEN_CHOUTI",7);
        // }

        if( now_node == this.choujiang_node ){
            cc.systemEvent.emit("OPEN_CHOUTI",8);
        }
        if(now_node == this.qiandao_node){
            cc.systemEvent.emit("OPEN_CHOUTI",9);
        }
        

        if(this._tongzhi_array.length > 0 ){
            var node = this._tongzhi_array.shift();
            node.active = true;
        }
    
    },

    // update (dt) {},
});
