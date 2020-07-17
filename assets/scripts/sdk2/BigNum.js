
/**
 * { 
 *   unit: 12345,
 *   time: 8,
 * }                        //表示12345 后面 八个0
 * 
 */

 const FENGE = 999999999999;
 const QIAN = 1000;
 const THREE = 3;

 const DANWEI = ["",'K','M','T','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
                'aa','bb','cc','dd','ee','ff','gg','hh','ii','jj','kk','ll','mm','nn','oo','pp','qq','rr','ss','tt','uu','vv','ww','xx','yy','zz',
                'AAA','BBB','CCC','DDD','EEE','FFF','GGG','HHH','III','JJJ','KKK','LLL','MMM','NNN','OOO','PPP','QQQ','RRR','SSS','TTT','UUU','VVV','WWW','XXX','YYY','ZZZ'] ;

 var BigNum = {

    //显示
    Show:function( ob ){

        var obj = {unit:ob.unit , time:ob.time };

        if(obj.unit == 0){
            return 0;
        }

        var dw1 = 0;
        var dw2 = parseInt( obj.time / THREE );      
        var yu = obj.time % THREE ;                  

        var qian = 1;
        var qian2 = 1;
        var div1 = obj.unit  ;
        
        while( div1 >= QIAN ){
            dw1 ++;
            qian *= QIAN;
            div1 = obj.unit / qian;
        }
        div1 =  Math.floor( div1*100 ) / 100 ;                      //保留两位小数
        while( yu > 0 ){
            div1 *= 10;
            yu -- ;
        }
        while( div1 >= QIAN ){
            dw1 ++;
            qian2 *= QIAN;
            div1 = div1 / qian2;
        }
        div1 = Math.floor( div1*100 ) / 100 ;                      

        var str = div1.toString() + DANWEI[ (dw1 + dw2 ) ];
        return str;      
    },

    //转换
    changeToObj:function(u,t){
        return { unit: u , time: t }
    },

    //加
    Add:function(aa,bb){

        // if(aa.time == null || bb.time == null || aa.unit == null || bb.unit == null ){
        //     return ;
        // }

        var obj = {unit:0,time:0};
        var a = { unit:aa.unit , time : aa.time };
        var b = { unit:bb.unit , time : bb.time };

        var mul_num = 1;
        if( a.time >= b.time ){
            var sub_time = a.time - b.time ;

            while( sub_time > 0 ){                      //同化单位
                mul_num *= 10;
                sub_time --;
            }
  
            b.unit = Math.round(b.unit / mul_num ) ;
            if( (a.unit + b.unit) <= FENGE ){
                obj.unit = a.unit + b.unit ;
                obj.time = a.time;
            }else{
                obj.unit =  Math.round( (a.unit + b.unit) / 10  );
                obj.time = a.time + 1 ;
            }
        }
        else{
            var sub_time = b.time - a.time ;
            while( sub_time > 0 ){                      
                mul_num *= 10;
                sub_time --;
            }

            a.unit = Math.round(a.unit / mul_num ) ;
            if( (a.unit + b.unit) <= FENGE ){
                obj.unit = a.unit + b.unit ;
                obj.time = b.time;
            }else{
                obj.unit =  Math.round( (a.unit + b.unit) / 10  );
                obj.time = b.time + 1 ;
            }
        }

        return obj;
    },

    //减
    Sub:function(aa,bb){
        // if(aa.time == null || bb.time == null || aa.unit == null || bb.unit == null ){
        //     return ;
        // }

        var obj = {unit:0,time:0};
        var a = { unit:aa.unit , time : aa.time };
        var b = { unit:bb.unit , time : bb.time };
        var mul_num = 1;

        if( a.time >= b.time ){
            var sub_time = a.time - b.time ;

            while( sub_time > 0 ){                      //同化单位
                mul_num *= 10;
                sub_time --;
            }
  
            b.unit = Math.round(b.unit / mul_num ) ;
            obj.unit = a.unit  - b.unit ;
            obj.time = a.time;
        }
        else{
            var sub_time = b.time - a.time ;

            while( sub_time > 0 ){                      
                mul_num *= 10;
                sub_time --;
            }
  
            a.unit = Math.round(a.unit / mul_num ) ;
            obj.unit = a.unit  - b.unit ;
            obj.time = b.time;
        }

        return obj;
    },

    //乘
    Mul:function(aa,bb){

        var obj = {unit:0,time:0};
        var a = { unit:aa.unit , time : aa.time };
        var b = { unit:bb.unit , time : bb.time };

        if( a.unit*b.unit  <=  FENGE ){
            obj.unit = a.unit*b.unit
            obj.time = a.time + b.time ;
        }else{

            obj.unit = Math.round((a.unit*b.unit)/10);
            obj.time = a.time + b.time + 1;
        }

        return obj;
    },

    MulNum:function(aa,num ){
        if(aa.time == null ||  aa.unit == null  ){
            return ;
        }
        var obj = {unit:0,time:0};
        var a = { unit:aa.unit , time : aa.time };

        if( a.unit*num  <=  FENGE ){
            obj.unit = a.unit*num;
            obj.time = a.time  ;
        }else{
            num /= 10;
            var cishu = 1;
            while( num*a.unit > FENGE ){
                num /= 10;
                cishu ++;
            }

            obj.unit = Math.round((a.unit*num));
            obj.time = a.time + cishu; 
        }

        return obj;
    },

    //除
    Div:function(aa,bb){
        if(aa.time == null || bb.time == null || aa.unit == null || bb.unit == null ){
            return ;
        }

        var obj = {unit:0,time:0};
        var a = { unit:aa.unit , time : aa.time };
        var b = { unit:bb.unit , time : bb.time };

        var sub_time = a.time - b.time ; 
        var div_unit =  Math.round( a.unit / b.unit  );

        while(sub_time  < 0 ){
            sub_time ++;
            div_unit /= 10;

        }
        obj.unit = parseInt( div_unit );
        obj.time = sub_time; 

        return obj ;
    },

    //比较a,b   a>b 返回 true  ，反之 false 
    ChargeBig:function(a,b){
        var sub_obj =   this.Sub(a,b);
        return this.JudgeZhen(sub_obj);
    }, 

    JudgeZhen:function(obj){
        return obj.unit >= 0 ? true : false;
    },

    Fenshu:function(obj){
        var sang = 1;
        while(obj.time < 0)
        {
            obj.time ++;
            sang *= 10;
        }

        return obj.unit / sang ;
    },
 
 }

 module.exports = BigNum;


