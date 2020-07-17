var PlayerInfo = function(){

    //通用数据
    this.login_days = 1;                                 //登陆天数
    this.lingqu = [false,false,false,false,false,false,false];      //七天领取记录

    this.daily_share_count = 0;                          //分享次数
    this.first_boomer = true;                            //新玩家
    this.video_count = 1000;                                //还剩看视频多少次机会
    this.sign_day = 1;                                   //签到天数

    //制造工厂数据
    this.coin = { unit: 50000, time:0 };           //金币数量
    // this.coin_unit = 0;
    // this.coin_time = 0;

    this.diamond = 100;                                 //钻石数量
    this.screw = 100;                                     //螺丝数量
    
    this.clicks = 0;                                     //敲击次数
    
    this.task_index = -1;                                 //当前的任务索引
    this.task_index1 = 1;
    this.task2_index = -1;                                //限时任务
    this.produce_num = 0;                                //当前生产的数量
    this.produce_num2 = 0;                               //限时任务得生产数量
    this.had_produce_num = 0;
    this.had_produce_num2 = 0;


    this.production_lv = 1;                              //生产机等级       //this.production_rate = 1;     //生产的机器速率，可以省取，通过等级去获取
    this.produceType = 1;                                //当前生产的种类
 


    this.zhizaoji_lv = [0,0,0,0,0,0];                    //制造机器等级       六个制造机的阶数
    this.zhizaoji_intensify_lv = [0,0,0,0,0,0];          //制造机强化等级      



    this.illustrated = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0] ;                            // [  [true,true,true,true,true,true], [], [], [], [],[]   ]图鉴奖励是否领取了 ，用二维分组
    this.illustrated_jiangli = [];                      //
    this.achievement       = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];                               //成就等级
    this.achievement_jindu = [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0];                         //成就进度
    this.achievement_linqu = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];                         //成就奖励是否领取

    //成就值
    this.achievent_dianshu = 0;                                                                       //成就点数

    //任务
    this.yaoqing_num = 0;                                      //邀请玩家得数量
    this.yaoqing_lingqu = false;                                //邀请领取
    this.task_time = 0;

    this.money_jiasu_lv = 1;                                   //资金加速器等级
    this.money_jiasu_jindu = 0;                                //进度
    this.money_jihuo_time = 0;                                  //激活剩余时间
    this.shiping_share_count = 0;                              //视频分享次数

    this.money_jiasu_lv2 = 1;                                   //机器加速器等级
    this.money_jiasu_jindu2 = 0;                                //机器进度
    this.money_jihuo_time2 = 0;                                //激活剩余时间

    //登陆时间
    this.last_login = 0;
    this.task2_time = 0;                                       //任务2 冷却剩余时间 1800秒
    this.svrTimestamp = 0;                                        //服务器下发最新时间

    //抽奖
    this.choujiang_double = 0;
    this.choujiang_count = 1;

    //邀请
    this.invitation_id = -1;            //邀请的id
    this.invitation_num = 0;            //邀请的数量
    this.invitation_lingqu = false;     //是否领取过

    //touxian
    this.touxianlv = 0;                 //头衔等级

    //视频激活
    this.jihuo_count  = [0,0,0,0,0,0];  

    //系统开启
    this.systemKaiqi = [0,0,0,0,0,0,0,0,0];                   //systemKaiqi[0] 到[3]  对应  成就 任务 头衔 图鉴  排行榜 机器 资金 抽奖 



}

var PlayerManager = {
    _data: new PlayerInfo(),
    
    //登陆天数
    set login_days(val){
        if(val != null){
            this._data.login_days = val;
        }
    },
    get login_days(){
        return this._data.login_days;
    },


    //每日分享
    set daily_share_count(val){
        this._data.daily_share_count = val;
    },
    get daily_share_count(){
        return this._data.daily_share_count;
    },

    //新玩家
    set first_boomer(val){
        this._data.first_boomer = val;
    },
    get first_boomer(){
        return this._data.first_boomer;
    },

    //视频次数
    set video_count(val){
        this._data.video_count = val;
    },
    get video_count(){
        return this._data.video_count;
    },

    //签到
    set sign_day(val){
        this._data.sign_day = val;
    },
    get sign_day(){
        return this._data.sign_day;
    },    

    //点击次数
    set clicks(val){
        this._data.clicks = val;
    },
    get clicks(){
        return this._data.clicks;
    },    


    //金币
    set coin( val ){
        if(val != null ){
            this._data.coin = val;
            cc.systemEvent.emit("UI_CHANGE");
        }
    },
    get coin(){
        return this._data.coin;
    },
    
    //钻石
    set diamond( val ){
        if(val != null ){
            this._data.diamond = val;
        }
    },
    get diamond(){
        return this._data.diamond;
    },

    //螺丝
    set screw( val ){
        if(val != null ){
            this._data.screw = val;
        }
    },
    get screw(){
        return this._data.screw;
    },

    //成就
    set achievement(val){
        if(val != null){
            this._data.achievement = val;
        }
    },
    get achievement(){
        return this._data.achievement;
    },

    //供应机器等级
    set production_lv(val){
        if(val != null){
            this._data.production_lv = val;
        }
    },
    get production_lv(){
        return this._data.production_lv;
    },

    //图鉴
    set illustrated(val){
        if(val != null){
            this._data.illustrated = val;
        }
    },
    get illustrated(){
        return this._data.illustrated;
    },

    //任务
    set task_index(val){
        if(val != null){
            this._data.task_index = val;
        }
    },
    get task_index(){
        return this._data.task_index;
    },

    set task2_index(val){
        if(val != null){
            this._data.task2_index = val;
        }
    },
    get task2_index(){
        return this._data.task2_index;
    },

    //制造机等级
    set zhizaoji_lv(val){
        if(val != null){
            this._data.zhizaoji_lv = val;
        }
    },
    get zhizaoji_lv(){
        return this._data.zhizaoji_lv;
    },

    //进阶等级
    set zhizaoji_intensify_lv(val){
        if(val != null){
            this._data.zhizaoji_intensify_lv = val;
        }
    },
    get zhizaoji_intensify_lv(){
        return this._data.zhizaoji_intensify_lv;
    },

    //produceType生产种类
    set produceType(val ){
        if(val != null){
            this._data.produceType = val;
        }
    },
    get produceType(){
        return this._data.produceType;
    },

    set produce_num(val){
        if(val != null){
            this._data.produce_num = val;
        }
    },

    get produce_num(){
        return this._data.produce_num;
    },                                        

    set produce_num2(val){
        if(val != null){
            this._data.produce_num2 = val;
        }
    },

    get produce_num2(){      
        return this._data.produce_num2;
    },        
    
    set had_produce_num(val){
        if(val != null){
            this._data.had_produce_num = val;
        }
    },

    get had_produce_num(){ 
        return this._data.had_produce_num;
    },     
    
    set had_produce_num2(val){
        if(val != null){
            this._data.had_produce_num2 = val;
        }
    },

    get had_produce_num2(){ 
        return this._data.had_produce_num2;
    },        

    set money_jiasu_lv(val){
        if(val != null){
            this._data.money_jiasu_lv = val;
        }
    },
    get money_jiasu_lv(){
        return this._data.money_jiasu_lv;
    },
    set money_jiasu_jindu(val){
        if(val != null){
            this._data.money_jiasu_jindu = val;
        }
    },
    get money_jiasu_jindu(){
        return this._data.money_jiasu_jindu;
    },
    set money_jihuo_time(val){
        if(val != null){
            this._data.money_jihuo_time = val;
        }
    },
    get money_jihuo_time(){
        return this._data.money_jihuo_time;
    },

    //机器加速数据
    set money_jiasu_lv2(val){
        if(val != null){
            this._data.money_jiasu_lv2  = val;
            // money_jiasu_jindu2
            // money_jihuo_time2
        }
    },
    get money_jiasu_lv2(){
        return this._data.money_jiasu_lv2;
    },

    set money_jiasu_jindu2(val){
        if(val != null){
            this._data.money_jiasu_jindu2 = val;
        }
    },

    get money_jiasu_jindu2(){
        return this._data.money_jiasu_jindu2;
    },

    set money_jihuo_time2(val){
        if(val != null){
            this._data.money_jihuo_time2 = val;
        }
    },
    get money_jihuo_time2(){
        return this._data.money_jihuo_time2;
    },

    //视频分享次数
    set shiping_share_count(val){
        if(val != null){
            this._data.shiping_share_count = val;
        }
    },
    get shiping_share_count(){
        return this._data.shiping_share_count;
    },

    set illustrated_jiangli(val){
        if(val != null){
            this._data.illustrated_jiangli = val;
        }
    },
    get illustrated_jiangli(){
        return this._data.illustrated_jiangli;
    },

    set achievement_jindu(val){
        if(val != null){
            this._data.achievement_jindu = val;
        }
    },
    get achievement_jindu(){
        return this._data.achievement_jindu;
    },

    set achievement_linqu(val){
        if(val != null){
            this._data.achievement_linqu = val;
        }
    },
    get achievement_linqu(){
        return this._data.achievement_linqu ;
    },

    set task2_time(val){
        if(val != null){
            this._data.task2_time = val;
        }
    },
    get task2_time(){
        return this._data.task2_time;
    },

    set svrTimestamp(val){
        if(val != null){
            this._data.svrTimestamp = val;
        }
    },
    get svrTimestamp(){
        return this._data.svrTimestamp;
    },
    set last_login(val){
        if(val != null){
            this._data.last_login = val;
        }
    },
    get last_login(){
        return this._data.last_login;
    },
    set choujiang_double(val){
        if(val != null){
            this._data.choujiang_double = val;
        }
    },
    get choujiang_double(){
        return this._data.choujiang_double;
    },
    set choujiang_count(val){
        if(val != null){
            this._data.choujiang_count = val;
        }
    },
    get choujiang_count(){
        return this._data.choujiang_count;
    },

    set task_index1(val){
        if(val != null){
            this._data.task_index1 = val;
        }
    },
    get task_index1(){
        return this._data.task_index1;
    },

    set invitation_id(val){
        if(val != null){
            this._data.invitation_id = val;
        }
    },
    get invitation_id(){
        return this._data.invitation_id;
    },

    set invitation_num(val){
        if(val != null){
            this._data.invitation_num = val;
        }
    },
    get invitation_num(){
        return this._data.invitation_num;
    },

    set invitation_lingqu(val){
        if(val != null){
            this._data.invitation_lingqu = val;
        }
    },

    get invitation_lingqu(){
        return this._data.invitation_lingqu;
    },

    set coin_chip(val){
        this._data.coin_chip = val;
    },
    get coin_chip(){
        return this._data.coin_chip;
    },
    set coin_unit(val){
        this._data.coin_unit = val;
    },
    get coin_unit(){
        return this._data.coin_unit;
    },
    set coin_time(val){
        this._data.coin_time = val;
    },
    get coin_time(){
        return this._data.coin_time;
    },
    set lingqu(val){
        this._data.lingqu = val;
    },
    get lingqu(){
        return this._data.lingqu;
    },
    set touxianlv(val){
        this._data.touxianlv = val;
    },
    get touxianlv(){
        return this._data.touxianlv;
    },

    set jihuo_count(val){
        if(val != null){
            this._data.jihuo_count = val;
        }
    },
    get jihuo_count(){
        return this._data.jihuo_count;
    },

    set systemKaiqi(val){
        if(val != null){
            this._data.systemKaiqi = val;
        }
    },
    get systemKaiqi(){
        return this._data.systemKaiqi;
    },

    set achievent_dianshu(val){
        if(val != null){
            this._data.achievent_dianshu = val;
        }
    },
    get achievent_dianshu(){
        return this._data.achievent_dianshu;
    }





}

console.log( PlayerManager.coin);

module.exports = PlayerManager;

