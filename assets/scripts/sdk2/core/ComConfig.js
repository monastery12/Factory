//最大地块数量
window.MAX_PLACE_NUM = 24;

//最大建筑数量
window.MAX_BUILDING_NUM = 5;


//访问类型
window.VISIT_TYPE = {
    NORMAL : 1,
    FRIEND : 2,
    ATTACK : 3,
    REVENGE : 4,
    
}


var ComConfig = {

    //游戏盒子分配ID
    game_id:0,
    
    //wx服务器配置
    server_url_arr: ["0", "0"],


    server_use: 0,
    version: "1.0.37", 


    box_gift: {
        open: 1,
        gift_id: 1,
        gift_img_arr: [

        ]
    },

    logical: {
        forceAdSpeedUpTimes:3,
        forceShareSpeedUpTimes:3,
        more_game_switch : false,
    },
    
    auditing : false,

    jumpOutShareParam : {
        appId:"",
        path:"paga/index/index?",
        extraData:"",
        envVersion:"",
    },

    more_game: {
 
    },

    more_game_new: {
        open: 1,

        more_game_icon:"",

        more_game_arr: [

        ]
    },

    share_data: {
        open: 1,
        func: {
            system_share: {
                context: [{
                        title: "[揭秘]一玩倾心,二玩钟情,三玩定终身!?",
                        img: ""
                    },
         
                ],
            },
            default: {
                context: [{
                    title: "[猎奇]这是今年最真诚的谎言!!!",
                    img: "g"
                }],
                query: {}                                                                                       //作用？
            }
        }
    },

    ad: {
        open: 1,
        banner_ad: {                                                        //横幅广告
            wx_ad_id: "adunit-52ab5b93f16438e0",                            //adunit-52ab5b93f16438e0
            refresh_time: 30,                                               //广告刷新
            bottom: 0,
            width_percent: 40
        },
        reward_ad: {                                                       //视频广告
            wx_ad_id: "adunit-aea7ba02998957f9"                            //
        },
        table_game_arr : [
            {
                name : "文明进化论",
                icon : "",
                appId : "wx1aa8d27b597c7f71",
                path : "",
                is_red : true,
                extraData : "",
                envVersion : "",
            },
        ],
    },

    service: {
        open: 0
    },

    like: {
        
    },

}

module.exports = ComConfig;
