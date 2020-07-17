

cc.Class({
    extends: cc.Component,

    properties: {
        _pzing:false,
        partic:cc.ParticleSystem,
    },


    onLoad () {
       
    },

    start () {
        var self = this;
    },

    onCollisionEnter:function(other,self){
        if(this._pzing == true){
            return ;
        }
        var my = this;
        this._pzing = true;
        this.partic.resetSystem();
        setTimeout(function(){
            my._pzing = false;
        },500);
    
    }
    


    // update (dt) {},
});
