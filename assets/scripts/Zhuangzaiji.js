/**
 * 将物品放置到车里
 * 一次放x个
 */
const MAX = 10;
var _goods_pool = null;

cc.Class({
    extends: cc.Component,

    properties: {
        goodsBg:cc.Sprite,
        _goods_arr:[],              //装载机存放着东西
        _driver:cc.Node,
        _tongzhi:false,
        _dirve_index:0, 
        _next:true,
        _sell_money:0,

        

    },


    onLoad () {
        cc.systemEvent.on("OBJECT_POOL",this.readObjectPool.bind(this));                        //对象池
        cc.systemEvent.on("DRIVER_COMING",this.driverComing.bind(this));                        //车来了    ,     发货
        this._next = true;
    },

    start () {

    },

    //碰撞
    onCollisionEnter:function(other,self){
        var self = this;
        //this._goods_arr.push(  other.node.getChildByName("bg").getComponent(cc.Sprite).spriteFrame );                                   //装载每一个物品
        // if(this._goods_arr.length >= MAX && this._tongzhi == false ){
        //     cc.systemEvent.emit("DRIVER");                                  //通知车来收货
        //     this._tongzhi = true;
        // }

        //将对象放入对象池
        // other.node.removeFromParent(true);
        // _goods_pool.put(other.node);

        this._sell_money += other.node.getComponent("Goods")._value;



        if(self._next == true){
            this._driver = cc.find("Canvas/GameView/drive_0");
        }else{
            this._driver = cc.find("Canvas/GameView/drive_1");
        }
        var spFrame = other.node.getChildByName("bg").getComponent(cc.Sprite).spriteFrame;
        var drive_child = this._driver.getChildByName("goods").getChildByName("g"+self._dirve_index);                 // 
        
        
        other.node.removeFromParent(true);                                                                  //返回内存池
        _goods_pool.put(other.node);

        if(spFrame){
            this.goodsBg.spriteFrame = spFrame;

            var call = cc.callFunc(function(){
                self.goodsBg.node.setPosition(cc.v2(-8.6,37.3));

                drive_child.getComponent(cc.Sprite).spriteFrame = spFrame;
                drive_child.active = true;

                self._dirve_index ++;
                if( self._dirve_index >= 10 ){
                    //setTimeout(function(){
                        if(self._next == true){
                            cc.systemEvent.emit("ZHUANGZAI_OK_1");                                //装载完毕，车辆可以走了

                        }else{
                            cc.systemEvent.emit("ZHUANGZAI_OK_2");                                //装载完毕，车辆可以走了
                        }
                        self._next = !self._next;
                    //},10);
                    self._dirve_index = 0;
                    cc.systemEvent.emit("SELL_MONEY",self._sell_money);                           //卖出去的钱
                    self._sell_money = 0;
                }

            },self);

            var V2 = [ cc.v2(-86,37.3), cc.v2(32,77),cc.v2(90,58.2),cc.v2(123.6,33)];
            this.goodsBg.node.runAction(cc.sequence(cc.bezierTo(0.5,V2),call));
        }

    },



    //车来了，装载货物
    driverComing:function(driver){                                         //dirver 是一个string

        var self = this;
        this._driver = cc.find("Canvas/GameView/"+driver);
        var counts = 0;
        for(var i = 0 ;i< this._goods_arr.length  ;i++){
            var spFrame = this._goods_arr.shift();    
            var drive_child = this._driver.getChildByName("goods").getChildByName("g"+i);                 //                   
            if(spFrame){
                this.goodsBg.spriteFrame = spFrame;

                var call = cc.callFunc(function(){
                    self.goodsBg.node.setPosition(cc.v2(-8.6,37.3));
                    drive_child.getComponent(cc.Sprite).spriteFrame = spFrame;
                    drive_child.active = true;
                    counts ++;
                    if(counts >= 8 ){
                        cc.systemEvent.emit("ZHUANGZAI_OK");                                //装载完毕，车辆可以走了
                    }

                },self);

                var V2 = [ cc.v2(-86,37.3), cc.v2(32,77),cc.v2(90,58.2),cc.v2(123.6,33)];
                this.goodsBg.node.runAction(cc.sequence(cc.bezierTo(0.5,V2),call));
            }
    
        }
    },


    readObjectPool:function(data){
        _goods_pool = data;
    },

    // update (dt) {},
});
