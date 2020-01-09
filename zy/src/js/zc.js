class Register{
    constructor(){
        this.user = $(".zc_c").find("#extend_field5");
        this.pass1 = $(".zc_c").find("#password");
        // this.pass2 = $(".zc_c").find("#confirm_password");
        this.btn = $("form").find("#registsubmit");
        this.span = $("form").find("span");
        this.yz = $("form").find("#yz");
        this.sx = $("form").find("#sx");
        this.yzm = $("form").find(".yz_m_m");
        this.ze_onoff = false;
        // this.ze();
        this.addEvent();
    }
    // ze(){

    //    var reg = /^\w{3,5}$/;
    //     if(reg.test(this.user.val()) && reg.test(this.pass1.val())){
    //         this.ze_onoff = true;
    //     }else{
    //         this.ze_onoff = false;
    //     }
    // }
    addEvent(){
        var that = this;

        this.btn.on("click",function(){
            // if(that.ze_onoff){
                that.u = that.user.val();
                that.p = that.pass1.val();
                that.setData()
            // }else{
            //     $("<div class='mssc'>输入格式有误</div>").css({
            //         width:400,
            //         height:400,
            //         background:"#fff",
            //         border:"1px solid #0f0",
            //         fontSize:"16px",
            //         lineHeight:"400px",
            //         textAlign:"center",
            //         position:"absolute",
            //         left:0,
            //         right:0,
            //         top:0,
            //         bottom:0,
            //         margin:"auto"
            //     }).appendTo("body");
            //     setTimeout(() => {
            //         $(".mssc").remove();
            //         this.user.val("");
            //         this.pass1.val("");
            //         // this.pass2.val("");
            //     }, 3000);
            // }
        })

    }
    setData(){
        // localStorage:[{user:"admin",pass:123,onoff:0},{},......]
        this.msg = localStorage.getItem("userMsg") ? JSON.parse(localStorage.getItem("userMsg")) : [];

        var b = this.msg.some((val)=>{
            return val.user === this.u;
        })
        if(b){
            // this.span.css({
            //     color:"#000"
            // });
            $("<div class='mssc'></div>").css({
                width:"100%",
                height:"100%",
                position:"fixed",
                top:0,
                zIndex:99,
                background:"rgba(0, 0, 0, .5)"
            }).appendTo("body");
            $("<div>你这个用户名太火了，换一个吧</div>").css({
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
                    this.user.val("");
                    this.pass1.val("");
                }, 3000);
            // $("<div class='mssc'>你这个用户名太火了，换一个吧</div>").css({
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
            //     $(".mssc").remove();
            //     this.user.val("");
            //     this.pass1.val("");
            //     // this.pass2.val("");
            // }, 3000);

        }else{

            this.msg.push({
                user:this.u,
                pass:this.p,
                onoff:0
            })
            localStorage.setItem("userMsg",JSON.stringify(this.msg));
            $("<div class='mssc'></div>").css({
                width:"100%",
                height:"100%",
                position:"fixed",
                top:0,
                zIndex:99,
                background:"rgba(0, 0, 0, .5)"
            }).appendTo("body");
            $("<div>恭喜注册功能，3秒后跳转到<a href='./signIn.html'>登录</a></div>").css({
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
                    location.href = "./signIn.html";
                }, 3000);
            // $("<div>恭喜注册功能，3秒后跳转到<a href='./signIn.html'>登录</a></div>").css({
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
            //     location.href = "./signIn.html";
            // }, 3000);
        }
    }
}

new Register();