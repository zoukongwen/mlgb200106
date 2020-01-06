// 首页：有登录有注册/有欢迎信息有注销
    // 登录
    // 注册
        // 购物车:没有登录不显示购物车

// 点击注册：向后台发送数据，后台接收，保存，存储数据
// 点击登录：向后台发送数据，后台接收，和之前存储的信息，比对，发现重复，返回成功

// 前端接收到成功，做成功的事，失败就做失败的事

// 我们作为后台，规定：
    // 登录接口为：
        // http://localhost:80/api?type=login&user=admin&pass=123
    // 注册接口为：
        // http://localhost:80/api?type=register&user=admin&pass=123

        const http = require("http");
        const fs = require("fs");
        const url = require("url");
        const querystring = require("querystring");
        
        http.createServer((req,res)=>{
            if(req.url != "/favicon.ico"){
                var pathname = url.parse(req.url).pathname;
                if(pathname === "/api"){
                    ajaxHandle(req,res);
                }else{
                    fsHandle(req,res);
                }
            }
        }).listen("80");
        
        let userMsg = [];       //[{user:"",pass:"",onoff:1},{},...]
        
        function ajaxHandle(req,res){
            let str = "";
            req.on("data",(d)=>{
                str += d;
            })
            req.on("end",()=>{
                let data = str ? querystring.parse(str) : url.parse(req.url,true).query;
                if(data.type == "login"){
                    login(res,data)
                }else{
                    register(res,data);
                }
            })
        }
        function login(res,data){
            // 登录
            let on = true;
            for(var i=0;i<userMsg.length;i++){
                if(userMsg[i].user === data.user){
                    on = false;
                    let resMsg = {};
                    if(userMsg[i].pass === data.pass){
                        resMsg.code = 1;
                        resMsg.msg = "登录成功";
                    }else{
                        resMsg.code = 2;
                        resMsg.msg = "密码不符";
                    }
                    res.write(JSON.stringify(resMsg));
                    res.end();
                    return;
                }
            }
            if(on){
                let resMsg = {
                    code:0,
                    msg:"用户名不存在，请先注册"
                }
                res.write(JSON.stringify(resMsg));
                res.end();
            }
        }
        function register(res,data){
            // 注册
            let i = userMsg.some((val)=>{
                return val.user === data.user;
            })
            let resMsg = {};
            if(i){
                resMsg.code = 0;
                resMsg.msg = "用户名重复";
            }else{
                userMsg.push({
                    user:data.user,
                    pass:data.pass,
                    onoff:0
                })
                resMsg.code = 1;
                resMsg.msg = "注册成功";
            }
            res.write(JSON.stringify(resMsg));
            res.end();
        }
        
        function fsHandle(req,res){
            // http://localhost:81/kt/home.html?asdygasd
            const path = "./src" + url.parse(req.url).pathname
            fs.readFile(path,(err,data)=>{
                if(err){
                    res.write("404");
                }else{
                    res.write(data);
                }
                res.end();
            })
        }