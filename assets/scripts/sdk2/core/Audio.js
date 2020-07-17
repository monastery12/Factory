
var Audio = {
    init() {
        this.clips = new Map()
        let infos = [
            { name: "Click", file: "Click", volumn: 1 },                  //场景切换   声音
            { name: "Kaiguan", file: "Kaiguan", volumn: 1 },                                
            { name: "Money", file: "Kaiguan", volumn: 1 },                               
            { name: "New", file: "Kaiguan", volumn: 1 },                               
            { name: "Tip", file: "Kaiguan", volumn: 1 },              
            { name: "ZZJ1", file: "ZZJ1", volumn: 1 },       
            { name: "ZZJ2", file: "ZZJ2", volumn: 1 },       
            { name: "ZZJ3", file: "ZZJ3", volumn: 1 },       
            { name: "ZZJ4", file: "ZZJ4", volumn: 1 },                         
            //{ name: "Kaiguan", file: "Kaiguan", volumn: 1 },                               

        ]
        for (let i in infos) {
            let info = infos[i]
            cc.loader.loadRes("audio/" + info.file, cc.AudioClip, function(err, clip) {
                if (null == err) {
                    this.clips.set(info.name, {clip: clip, volumn: info.volumn})
                }
            }.bind(this))
        }
        cc.sys.localStorage.setItem("audio",true);
        let on = cc.sys.localStorage.getItem("audio")
        console.log(`getItem audio: ${on}`)
        if (on) {
            this.on = ("true" === on)
        } else {
            this.on = true
        }
        this.bgID = null
        this.bgName = null
    }, 

    switch() {
        this.on = !this.on
        if(this.on)
        {
            cc.audioEngine.resumeMusic();
        }else
        {
            cc.audioEngine.pauseMusic();
        }
        cc.sys.localStorage.setItem("audio", `${this.on}`)
        if(this.on){
            this.refreshBG()
        }else{
            this.stopBG();
        }
        
    },

    loadBG() {
        //return
        let infos = [
            {name: "BG", file: "BG", volumn: 2},
            // {name: "BGchg", file: "bgChg", volumn: 1},
            // {name: "BGspeed", file: "bgSpeed", volumn: 1},
        ]
        for (let i in infos) {
            let info = infos[i]
            cc.loader.loadRes("audio/" + info.file, cc.AudioClip, function(err, clip) {
                if (null == err) {
                    this.clips.set(info.name, {clip: clip, volumn: info.volumn})
                    this.refreshBG()
                }
            }.bind(this))
        }
    },

    stopBG() {
        if ( this.bgID !== undefined ) {
            cc.audioEngine.stop(this.bgID)
            this.bgID = null
            this.bgName = null
        }
    },

    refreshBG() {
        if (!this.on) {
            this.stopBG()
            return
        }

        // let speed = (require("PlayerManager").speedUpTime > 0)
         let name = "BG"
        // if (this.bgName === name) {
        //     return
        // }

        this.stopBG()

        // if (speed) {
        //     this.play("BGchg")
        // }

        this.bgID = this.play(name, true)
        if (this.bgID) {
            this.bgName = name
        }
    },

    play(name, loop, volumn) {
        if (!this.on) {
            return null
        }

        let clip = this.clips.get(name)
        if (clip) {
            if (!volumn) {
                volumn = clip.volumn
            }

            if (!loop) {
                loop = false
            }
            return cc.audioEngine.play(clip.clip, loop, volumn);
        }
        return null
    },
}

module.exports = Audio
