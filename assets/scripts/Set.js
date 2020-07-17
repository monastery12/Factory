

cc.Class({
    extends: cc.Component,

    properties: {
        yy_on:cc.Node,
        yy_off:cc.Node,
        yy_yaogan:cc.Node,

        yx_on:cc.Node,
        yx_off:cc.Node,
        yx_yaogan:cc.Node,

        _yy_open:true,
        _yx_oepn:true,
        

        _open_enable1:true,
        _open_enable2:true,

    },

   

    // onLoad () {},

    start () {

    },


    yingyue_Button:function(){

      

        if(this._open_enable1 == false){
            return ;
        }
        this._open_enable1 = false;
        if(this._yy_open == true){                              //关闭

            require("Audio").stopBG();                          //停止背景

            this.yy_on.active = false;
            this.yy_off.active = true;
            this.yy_yaogan.rotation = 0;
            this._yy_open = false;
        }else{

            require("Audio").refreshBG();                          //重启背景

            this.yy_on.active = true;
            this.yy_off.active = false;
            this.yy_yaogan.rotation = 100;
            this._yy_open = true;
        }

        setTimeout(function(){
            this._open_enable1 = true ;
        }.bind(this),200);


    },

    yingxiao_Button:function(){

                    //按钮声音
                    require("Audio").play("Click",false,1);

        if(this._open_enable2 == false){
            return ;
        }
        this._open_enable2 = false;
        if(this._yx_oepn == true){                              //关闭


            this.yx_on.active = false;
            this.yx_off.active = true;
            this.yx_yaogan.rotation = 0;
            this._yx_oepn = false;
        }else{
            this.yx_on.active = true;
            this.yx_off.active = false;
            this.yx_yaogan.rotation = 100;
            this._yx_oepn = true;
      
        }
        require("Audio").switch();

        if( this._yy_open == false ){
            require("Audio").stopBG();    
        }
        setTimeout(function(){
            this._open_enable2 = true ;
        }.bind(this),200);
    },

    backFunc:function(){
                    //按钮声音
                    require("Audio").play("Click",false,1);
                    
        this.node.active = false;
    },

    // update (dt) {},
});
