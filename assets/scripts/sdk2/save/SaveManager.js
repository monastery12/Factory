var SaveManager = {

    saveDic: new Object(),

    saveData: null,

    readNetData : null,                             
    readStorageData : null,

    saveTime: null,

    syncCount: 0,

    server_force_change : false,

    init() {
        cc.systemEvent.on("CLIENT_GAME_START", this.autoSaveStart, this);                                   //自动保存，五秒钟保存一次
        cc.systemEvent.on("CLIENT_GAME_HIDE", this.onGameHide, this);                                       //游戏隐藏就需要保持数据了
        //cc.systemEvent.on("V2_User_releaseForceEmpty", exitGame);                                           //强制清空（清空了将让用户退出游戏）
        cc.systemEvent.on("V2_User_getPackData2", this.getPackData, this);                                  //收到数据  (登陸會收到)
    },

    register(name, wirte, read) {
        this.saveDic[name] = { name: name, wirte: wirte, read: read };
    },

    //写到緩存  sync为true时发送到服务器
    save(sync) {

        //写所有的数据到内存（缓存）
        this.writeGameData();
        //写所有的数据到strage(本地持久化)
        this.writeGameDataToStrage();
    },
    //自動保存
    autoSaveStart() {
        this.asIrl = setInterval(this.autoSave.bind(this), 5000);
    },
    //處於後臺保存
    onGameHide() {
        this.save();
    },
    //自動保存
    autoSave() {
        
        this.save();
    },

    //写obj数据到内存
    writeObjectInfo(org, tar) {
        for (var key in org) {
            tar[key] = org[key];
        }
    },
    //數據打上時間
    writeTimestamp(obj) {
        //obj.timestamp = require("PlayerManager").timeStamp();
        obj.timestamp = (new Date).getTime();
    },
    //數據打上版本號
    writeVersion(obj) {
        obj.version = require("ComConfig").version;
    },

    //写所有的数据到緩存
    writeGameData() {
        this.saveData = {};
        //this.writeTimestamp(this.saveData);                         //saveData.timestamp = PlayerManager.timeStamp()
        this.writeVersion(this.saveData);

        this.saveData.ts = (new Date).getTime();

         //累计时间
        if(require("PlayerManager").last_login != 0){
           require("PlayerManager").achievement_jindu[5] += (0 + parseInt( ( (require("PlayerManager").svrTimestamp - require("PlayerManager").last_login )/(1000*60*60) )*100)/100)  ;
        } 
        require("PlayerManager").last_login =  (require("PlayerManager").svrTimestamp + 0);

        this.saveData.playerData = require("PlayerManager")._data;
        this.saveData.shareData  = require("ShareCountManager")._count;
        // var arr = require("PlayerManager").skin_arr;
        // for(var i = 0 ;i<arr.length;i++){
        //     arr[i] = true;
        // }
        // this.saveData.playerData.skin_arr = arr ;

        // for (var val in this.saveDic) {
        //     this.saveData[val] = new Object();
        //     this.saveDic[val].wirte(this.saveData[val]);
        // }
    },

    //读取最新數據，比較本地數據跟網絡數據
    readGameData() {

        var useData = null;

        // var netTs = (this.readNetData && this.readNetData.timestamp) ? this.readNetData.timestamp : -1;
        // var storageTs = (this.readStorageData && this.readStorageData.timestamp) ? this.readStorageData.timestamp : -1;
        // var netTs = (this.readNetData && this.readNetData.ts) ? this.readNetData.ts : -1;
        var netTs = -1 ;
        var storageTs = 2
        if (storageTs > netTs) {
            console.log("using read storage data");
            useData = this.readStorageData;
            cc.systemEvent.emit("UPDATE_VIEW_COIN");
        } else {
            console.log("using read net data");
            useData = this.readNetData;
        }

        if (!useData) {
            useData = {timestamp:-1, version:"0.0.1"}
        }

        cc.log(useData);

        // for (var val in this.saveDic) {
        //     this.saveDic[val].read(useData[val], useData.version);
        // }

        /**
         * useData的數據結構   { playerManager:{} , shareData:{}, ts: int , version :" " }
         */
        if( useData && useData.data && useData.data.playerData){                                                                                     //获取存档                         
            require("PlayerManager")._data = useData.data.playerData;
        }
 
        if(useData && useData.version){
            require("ComConfig").version = useData.version;
        }

        this.saveData = useData;                //
        
        cc.systemEvent.emit("CLIENT_COM_STANDBY");  //登陆完成
        cc.systemEvent.emit("UPDATE_VIEW_SANXIAO",this.saveData);
        
    },

    //写入所有的数据到Storge
    writeGameDataToStrage: function () {


        var storgeObj = {};
        storgeObj.key = "local_save_data";
        storgeObj.data = JSON.stringify(this.saveData);
        storgeObj.fail = function (err) {
            console.log(err);
            console.log("警告，游戏写入数据异常");
        }
        //wx.setStorage(storgeObj);                               //调用微信的三方api来本地持久化
        cc.sys.localStorage.setItem("GAME_DATA",JSON.stringify( storgeObj) );
    },

    //向服务器发送全部的数据 写数据到服务器
    writeGameDataToServer: function () {
    
    },

    //读取所有数据从Storge
    readGameDataFromStorge: function () {


        //改为同步读取
        try {
            //var data = wx.getStorageSync("local_save_data");
            var data = cc.sys.localStorage.getItem("GAME_DATA");
            this.readStorageData = JSON.parse(data);
            this.readStorageData.data =  JSON.parse(  JSON.parse(data).data );

        } catch (error) {
            console.log("read storage data fatal error=json parse failed");
            this.readStorageData = null;
        }
        

    },

    getPackData(evt) {
        this.readGameDataFromServer(evt.detail);
    },

    //读取数据从服务器
    readGameDataFromServer: function (msg) {

        if (msg.force_empty) {
            this.server_force_change = true;

            var storgeObj = {};
            storgeObj.key = "local_save_data";
            storgeObj.data = msg.packed_data;
            storgeObj.fail = function (err) {
                console.log(err);
                console.log("警告，游戏写入数据异常");
            }
            wx.setStorage(storgeObj);
        }

        try {
            //this.readNetData = JSON.parse(msg.packed_data);
            var data_json = JSON.parse(msg); 
            this.readNetData = JSON.parse(data_json.data);

            //this.readNetData = JSON.parse(msg);                                                 //切水果服务器数据包
            if (!this.checkGameDataUsable(this.readNetData)) {
                console.log("read server data fatal error=data error");
                //this.readNetData = null;
 
            }
        } catch (error) {
            console.log("read server data fatal error=json parse failed");
            this.readNetData = null;
            this.readData();
        }
    },

    checkGameDataUsable(data) {
        //if (data.timestamp != undefined && data.version != undefined) {
        if (data.ts != undefined && data.version != undefined) {                        //切水果服务器传递的是ts不是timestamp
            return true;
        } else {
            return false;
        }
    },

    /**
     * 读本地跟网络数据，用来比较数据
     */
    readData(){
        var storageData = null;
        try{
            var data = null;
            if (cc.sys.browserType != cc.sys.BROWSER_TYPE_WECHAT_GAME){
                data = cc.sys.localStorage.getItem("CuttingFruit");
            }else{
                data = wx.getStorageSync("CuttingFruit");
            }
            
            storageData = JSON.parse(data);
        }catch(err){
            //JQLog(err);
        }
        if(!storageData){
            if(!this.readNetData){
                cc.systemEvent.emit("INIT_START_VIEW");                         //本地跟服务器都没有数据
                cc.systemEvent.emit("UPDATE_VIEW_COIN");
                return;
            }else{                                                              //本地没有，服务器有数据
                if(!this.checkGameDataUsable(this.readNetData)){                    //如果数据不可用             //检查数据是否可用（只要有时间data.ts  跟 版本号data.version 就可用）
                    this.readNetData = null;
                    cc.systemEvent.emit("INIT_START_VIEW");
                    cc.systemEvent.emit("UPDATE_VIEW_COIN");
                    return;
                }
            }
        }else{                                                                  //本地有数据
            if(!this.checkGameDataUsable(storageData)){                         //如果本地数据不可用
                storageData = null;
                cc.systemEvent.emit("INIT_START_VIEW");
                cc.systemEvent.emit("UPDATE_VIEW_COIN");
                return;
            }
        }

        if (cc.sys.browserType != cc.sys.BROWSER_TYPE_WECHAT_GAME){             
            this.saveData = storageData;
        }else{
            if(!this.readNetData){                                                  //服务器数据没有
                if(!storageData){                                               //本地数据也没
                    return;
                }else{
                    this.saveData = storageData;                                //存在本地数据，选本地数据
                }
            }else if(!storageData){                                             
                this.saveData = this.readNetData;                                   //选服务器数据
            }else{                                                              //服务器/本地数据都存在
                if(storageData.ts > this.readNetData.ts){                           //比较两者的保存时间，选用时间最新的
                    this.saveData = storageData;
                }else{
                    this.saveData = this.readNetData;
                }
            }
            
        }
       
        if(this.saveData.playerData){                                           //读取到时间之后，遍历playerData，将玩家数据保存
            // for(var key in this.saveData.playerData){
            //     require("PlayerManager")._data[key] = this.saveData.playerData[key];
            // }
            cc.systemEvent.emit("UPDATE_VIEW_COIN");
        }
     
        cc.systemEvent.emit("UPDATE_VIEW_COIN");
        cc.systemEvent.emit("CHCEK_ROUNTINE");
    },

}

module.exports = SaveManager;
