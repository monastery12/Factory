

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        var self = this;

        cc.loader.downloader.loadSubpackage('game', function (err) {
            if (err) {
                console.log("加载资源失败");
                return console.error(err);
            }
            cc.director.loadScene("Game");
            console.log("加载完资源");
        });

    },

    start () {


    },

    // update (dt) {},
});
