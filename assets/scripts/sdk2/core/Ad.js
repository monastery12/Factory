

var Ad = {

    init(param) {

        if (debugMode()) {
            return;
        }

        var mobile;
        wx.getSystemInfo({
            success(res){
                console.log("res",res);
                mobile = (res.model + "").toLowerCase();
                console.log("the mobile is ",mobile);
            }
        });

        this.cfg = require("ComConfig").ad;         //object 
        this.closeAd = false;
        this.rewarding = false;
        this._rewardAdLoaded = false;
        this.rewardAdSucc = null;
        this.videoCD = true;
        this.videoCDTime = 0;
        // this.ownBannerContainer = param.banner_container;
        // this.ownBanner = param.banner;

        // this.ownBannerContainer.active = false;
        // this.ownBanner.initCtrl({gamelist:this.cfg.ad_game_arr, width:this.ownBanner.node.parent.width * this.cfg.banner_ad.width_percent / 100});
        // this.ownBanner.node.getComponent(cc.Widget).bottom = this.cfg.banner_ad.bottom;

        this.banner = null;
        this.wxSystem = wx.getSystemInfoSync();
        
        if (this.cfg) {
            if (1 == this.cfg.open || 3 == this.cfg.open) {
                this.showBanner();
                this.tmpBanner=setInterval(this.showBanner.bind(this), this.cfg.banner_ad.refresh_time * 1000);
            } else if (2 == this.cfg.open) {
                this.ownBannerContainer.active = true;
            }
        }

        if (this.cfg.reward_ad && this.cfg.reward_ad.wx_ad_id) {
            this.createRewardAd(this.cfg.reward_ad.wx_ad_id);
        }

        console.log("init ad")
    },

    set rewardAdLoaded(value) {
        this._rewardAdLoaded = value;
        cc.systemEvent.emit("REWARD_VIDEO_STATE_CHANGE");
    },

    get rewardAdLoaded() {
        return this._rewardAdLoaded;
    },

    //视频广告                                                              //id也可以放置在配置文件ComConfig.js中，随机拿id创建
    createRewardAd(id) {                                                   

        this.rewardAd = wx.createRewardedVideoAd({ adUnitId: id });

        this.rewardAd.onLoad(function () {                                  //视频广告  加载
            this.rewardAdLoaded = true;
            console.log("rewardAd loaded");
        }.bind(this));

        this.rewardAd.onError(err => {                                      //视频广告 报错
            console.log(err)
        });

        //this.rewardAd.load();

        this.rewardAd.onClose(function (res) {                                          //监听用户点击 关闭广告 按钮的事件
            console.log("rewardAd close")
            console.log(res)
            if (res === undefined || (res && res.isEnded)) {
                // 正常播放结束，可以下发游戏奖励                                         //cc.systemEvent.emit("金币加倍");  cc.systemEvent.emit("钻石加倍");
                console.log("rewardAd close complete")
                this.videoCD = false;
                this.videoCDTime = Math.floor((new Date()).getTime()/1000);                                     //开始视频的时间
                setTimeout(() =>{
                    this.videoCD = true;
                    
                },30000);
                
                this.rewardAdSucc && this.rewardAdSucc();
            } else {
                // 播放中途退出，不下发游戏奖励
                messageTips("请观看完整广告，才能获取奖励");
                console.log("rewardAd close not complete")
            }
            this.rewardAdLoaded = false;
            this.rewarding = false;
            //this.rewardAdComplete();                                              //
        }.bind(this));

    },


    rewardAdComplete() {
       
    },

    //
    rewardAdStart(succ) {
        if(!this.videoCD){
            var ts = Math.floor((new Date()).getTime()/1000) - this.videoCDTime;
            messageTips("视频冷却时间还有" + Math.floor(30 - ts) + "秒");
            return;
        }


        if (this.rewardAd) {
            // if (this.bannerAd != null) {
            //     this.bannerAd.hide();
            //     this.unschedule(this._bannerAdRefresh);
            // }

            console.log("rewardAd start")

            this.rewardAdSucc = succ;

            this.rewarding = true;

            this.rewardAd.show().catch(                                             //show报错，那么
                err => {
                    console.log(err);

                    // this.rewardAd.load();

                    // this.rewardAdSucc && this.rewardAdSucc();

                    this.rewardAd.load().then(                                      //隐藏广告，再显示
                        () => { 
                            this.rewardAd.show().catch (
                                twerr => {
                                    console.log(twerr);
                                    this.rewardAdSucc && this.rewardAdSucc();
                                }
                            )
                        }
                    );
                }
            );
        }
    },


    closeBanner()
    {
        if (debugMode()) {
            return;
        }

        if(this.banner){
           this.banner.hide();
           this.closeAd = true;
        }
        
    },
    openBanner()
    {
        if (debugMode()) {
            return;
        }
        // if (this.banner) {
        //     console.log("banner destroy");
        //     this.banner.destroy()
        //     this.banner = null
        //     if(this.tmpBanner){
        //         clearInterval(this.tmpBanner);
        //     }
            
        // }
        this.banner.show();
        this.closeAd = false;
    },

    

    showBanner() {                                                  //显示广告
        if (debugMode()) {
            return;
        }
        
        if (this.rewarding) {
            return;
        }

        
        if (this.banner) {                                          //存在，则销毁
            console.log("banner destroy");
            this.banner.destroy()
            this.banner = null
        }

        var w = this.wxSystem.windowWidth;
        this.banner = wx.createBannerAd({                                       //创建广告
            adUnitId: this.cfg.banner_ad.wx_ad_id,                              //id从ComConfig中获取
            style: {                                                            //大小 
                left: w * (1 - this.cfg.banner_ad.width_percent / 100) / 2,
                //top: 0,
                top:-934,
                width: w * this.cfg.banner_ad.width_percent / 100
            }
        })
        this.banner.onError(err => {                                            //监听 banner 广告错误事件
            console.log("banner error");
            console.log(err);

            if (this.cfg.open == 3) {
                this.ownBannerContainer.active = true;
            }
        })
        
        this.banner.onResize(this.onResize.bind(this));
        if(this.closeAd){
            this.banner.hide();
        }else{
            this.banner.show().then(() => {
                console.log("banner show success");
    
                if (this.cfg.open == 3) {
                    this.ownBannerContainer.active = false;
                }
            })
        }
        
    },

    onResize() {
        if (!this.banner) {
            return;
        }

        console.log("on ad resize")
        // this.banner.style.top = this.wxSystem.windowHeight - this.banner.style.realHeight - this.cfg.banner_ad.bottom;
        // this.banner.style.left = (this.wxSystem.windowWidth - this.banner.style.realWidth) / 2;
        var mobile;
        var system_rate;
        wx.getSystemInfo({
            success(res){
                console.log("the mobile is " + res.model);
                mobile = (res.model + "").toLowerCase();
                system_rate = (res.system + "").toLowerCase();
            }
        });
        if(system_rate.includes("ios")){
            if(mobile.search(/[iI][pP]hone\s*[xX]/) != -1){
                console.log("this is search", mobile.search(/[iI][pP]hone\s*[xX]/) )
    
                this.banner.style.top = this.wxSystem.windowHeight - this.banner.style.realHeight - this.cfg.banner_ad.bottom + 4;
                this.banner.style.left = (this.wxSystem.windowWidth - this.banner.style.realWidth) / 2;
                
            }else{
                if(this.wxSystem.windowWidth / this.wxSystem.windowHeight <=0.51){
                    this.banner.style.top = this.wxSystem.windowHeight - this.banner.style.realHeight - this.cfg.banner_ad.bottom + 4;
                    this.banner.style.left = (this.wxSystem.windowWidth - this.banner.style.realWidth) / 2;
                }else{
                    cc.log("this is second");
                    this.banner.style.realHeight = this.wxSystem.windowHeight * 0.138;
                    this.banner.style.top = this.wxSystem.windowHeight - this.cfg.banner_ad.bottom - this.banner.style.realHeight - this.wxSystem.windowHeight / 44.5;//this.banner.style.realHeight - this.cfg.banner_ad.bottom;
                    this.banner.style.left = (this.wxSystem.windowWidth - this.banner.style.realWidth) / 2;
                }
            }

        }else{
                cc.log("this is " + mobile )
                cc.log(this.wxSystem.windowHeight);
                cc.log(this.banner.style.realHeight);
                if(this.wxSystem.windowWidth / this.wxSystem.windowHeight <=0.51){
                    cc.log("this is first");
                    this.banner.style.realHeight = this.wxSystem.windowHeight * 0.138;
                    this.banner.style.top = this.wxSystem.windowHeight - this.cfg.banner_ad.bottom - this.banner.style.realHeight - this.wxSystem.windowHeight / 160;//this.banner.style.realHeight - this.cfg.banner_ad.bottom;
                    this.banner.style.left = (this.wxSystem.windowWidth - this.banner.style.realWidth) / 2;
    
                }else{
                    cc.log("this is second");
                    this.banner.style.realHeight = this.wxSystem.windowHeight * 0.138;
                    this.banner.style.top = this.wxSystem.windowHeight - this.cfg.banner_ad.bottom - this.banner.style.realHeight - this.wxSystem.windowHeight / 44.5;//this.banner.style.realHeight - this.cfg.banner_ad.bottom;
                    this.banner.style.left = (this.wxSystem.windowWidth - this.banner.style.realWidth) / 2;
                }
        }
        
    },
}

module.exports = Ad
