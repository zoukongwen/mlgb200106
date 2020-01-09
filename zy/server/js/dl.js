class Login{
    constructor(){
        this.user = $("form").find("#username");
        this.pass = $("form").find("#password");
        this.btn = $("form").find("#loginsubmit");
        this.span = $("form").find("#remember");

        this.addEvent();
    }
    addEvent(){
        var that = this;
        this.btn.on("click",function(){
            that.u = that.user.val();
            that.p = that.pass.val();
            that.getData();
        });
    }
    getData(){
        this.msg = localStorage.getItem("userMsg") ? JSON.parse(localStorage.getItem("userMsg")) : [];

        var b = true;
        for(var i=0;i<this.msg.length;i++){
            if(this.msg[i].user === this.u){
                b = false;
                if(this.msg[i].pass === this.p){
                    $("<div class='mssc'></div>").css({
                        width:"100%",
                        height:"100%",
                        position:"fixed",
                        top:0,
                        zIndex:99,
                        background:"rgba(0, 0, 0, .5)"
                    }).appendTo("body");
                    $("<div>登录成功，3秒后跳转到<a href='./homePage.html'>首页</a></div>").css({
                            width:400,
                            height:400,
                            zIndex:100,
                            background:"#fff",
                            border:"1px solid #0f0",
                            fontSize:"16px",
                            borderRadius:"10px",
                            lineHeight:"400px",
                            textAlign:"center",
                            position:"absolute",
                            left:0,
                            right:0,
                            top:0,
                            bottom:0,
                            margin:"auto"
                        }).appendTo(".mssc");
                        setTimeout(() => {
                            $(".mssc").remove();
                        location.href = "./homePage.html";

                        }, 3000);
                    // $("<div>登录成功，3秒后跳转到<a href='./homePage.html'>首页</a></div>").css({
                    //     width:400,
                    //     height:400,
                    //     background:"#fff",
                    //     border:"1px solid #0f0",
                    //     fontSize:"16px",
                    //     lineHeight:"400px",
                    //     textAlign:"center",
                    //     position:"absolute",
                    //     left:0,
                    //     right:0,
                    //     top:0,
                    //     bottom:0,
                    //     margin:"auto"
                    // }).appendTo("body");
                    // setTimeout(() => {
                    //     location.href = "./homePage.html";
                    // }, 3000);

                    this.msg[i].onoff = 1;
                    localStorage.setItem("userMsg",JSON.stringify(this.msg));

                }else{
                    $("<div class='mssc'>密码不对，重新输入密码</div>").css({
                        width:400,
                        height:400,
                        background:"#fff",
                        border:"1px solid #0f0",
                        fontSize:"16px",
                        lineHeight:"400px",
                        textAlign:"center",
                        position:"absolute",
                        left:0,
                        right:0,
                        top:0,
                        bottom:0,
                        margin:"auto"
                    }).appendTo("body");
                    setTimeout(() => {
                        $(".mssc").remove();
                        this.user.val("");
                        this.pass1.val("");
                        this.pass2.val("");
                    }, 3000);
                }
                break;
            }
        }
        if(b){
            $("<div class='mssc'>你的用户名还没有注册，去<a href='./register.html'>注册</a>吧</div>").css({
                width:400,
                height:400,
                background:"#fff",
                border:"1px solid #0f0",
                fontSize:"16px",
                lineHeight:"400px",
                textAlign:"center",
                position:"absolute",
                left:0,
                right:0,
                top:0,
                bottom:0,
                margin:"auto"
            }).appendTo("body");
            setTimeout(() => {
                $(".mssc").remove();
                this.user.val("");
                this.pass1.val("");
                this.pass2.val("");
            }, 3000);
        }
    }
}

new Login();