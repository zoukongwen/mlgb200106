class sS{
    constructor(){
        this.dloff = 0;
        this.txt = $("#searchForm").find(".text");
        this.btn = $("#searchForm").find("#search_form");
        this.ss_ul = $(".ss_b").find("ul");
        this.url = "../json/csearch.json";
        this.sign_ul = $("#top_bar").find(".top_l");
        this.li1 = $(".top_l").find(".t_l_1");
        this.li2 = $(".top_l").find(".t_l_2");
        this.li3 = $(".top_l").find(".t_l_3");
        this.li4 = $(".top_l").find(".t_l_4");

        this.qcart = $("#top_bar").find(".qcart");

        this.init();
        this.addEvent();
    }
    init(){
        var that = this;
        this.msg = localStorage.getItem("userMsg") ? JSON.parse(localStorage.getItem("userMsg")) : [{user:"",pass:"",onoff:0}];
        this.i=0;
        var on = this.msg.some((val,index)=>{
            this.i = index;
            return val.onoff != 0;
        })

        if(on){
            // 登录成功
            this.on = true;
            this.dloff = 1;
            var manestr = `<a href="##">${this.msg[this.i].user}，欢迎光临美鲜冻品商城</a>`;
            this.li1.html(manestr);
            this.li2.css({
                display:"none"
            })
            this.li3.css({
                display:"none"
            })
            this.li4.css({
                display:"block"
            })
            // (msg[i].user+"goodid")

        }else{
            // 没有登录
            this.on = false;

            this.dloff = 0;
            var manestr = `<a href="##">欢迎光临美鲜冻品商城</a>`;
            this.li1.html(manestr);
            this.li2.css({
                display:"block"
            })
            this.li3.css({
                display:"block"
            })
            this.li4.css({
                display:"none"
            })
        }
        // console.log(localStorage.getItem("cSearch"))
        this.txt.val(localStorage.getItem("cSearch"))
        // console.log(this.btn.val())

        this.cSe();
        
    }
    addEvent(){
        var that = this;
        this.qcart.on("click",function(){
            if(that.on){
                location.href ="./shoppingCart.html";
            }else{
                $("<div class='mssc'></div>").css({
                    width:"100%",
                    height:"100%",
                    position:"fixed",
                    top:0,
                    zIndex:99,
                    background:"rgba(0, 0, 0, .5)"
                }).appendTo("body");
                $("<div>你还没有登录，去<a href='./signIn.html'>登录</a>吧</div>").css({
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
                    }, 3000);
            }
        })
        this.ss_ul.on("click","a",function(){
            var a = this;
            console.log(this);
            that.cxq(a);
        })
        this.btn.on("click",function(){
            that.cSe();
        })
        this.sign_ul.on("click",".t_l_4",function(){
            var msg = localStorage.getItem("userMsg") ? JSON.parse(localStorage.getItem("userMsg")) : [{user:"",pass:"",onoff:0}];
            var i=0;
            var on = msg.some((val,index)=>{
                i = index;
                return val.onoff != 0;
            })
            msg[i].onoff = 0;
            localStorage.setItem("userMsg",JSON.stringify(msg));
            location.href ="./signIn.html";
        })
    }
    cxq(a){
        // console.log(a)
        // console.log(this.res)
        localStorage.setItem("id",a.getAttribute("ico"));
        location.href ="cDetails.html";
        console.log(a.getAttribute("ico"))
    }
    cSe(){
        var that = this;
        $.ajax({
            url:that.url,
            success:function(res){
                that.res = res;
                that.display();
            console.log(that.res);
            }
        })
    }
    display(){
        var that = this;
        var str = "";
        for(var i = 0;i < this.res.length;i++){
            if(this.res[i].Keyword.indexOf(this.txt.val()) != -1){
                console.log(1111)
                str += `<li>
                            <a href="##" ico="${this.res[i].id}">
                                <img src="${this.res[i].img}" alt="">
                                <p class="ss_b_p">${this.res[i].Price}</p>
                                <p>${this.res[i].brief}</p>
                            </a>
                            <input type="button" class="btn_ss" name="" id="btn_ss" value="加入购物车" index="${this.res[i].id}">
                        </li>`
            }else{
                console.log(222)
                str = "没找到搜索内容"
            }
        }
        this.ss_ul.html(str);
            this.ss_ul.on("click","input",function(){
                if(that.dloff == 1){
                    console.log(this);
                    that.pp = localStorage.getItem(`${that.msg[that.i].user}goodid`) ? JSON.parse(localStorage.getItem(`${that.msg[that.i].user}goodid`)):[];
                        if(that.pp.length == 0){
                            that.pp = [{goodId:this.getAttribute("index"),num:1}];
                        }else{
                            var j = 0;
                            var offon = that.pp.some((val,idx)=>{
                                j = idx
                                return val.goodId == this.getAttribute("index");
                            })
                            if(offon){
                                that.pp[j].num = parseInt(that.pp[j].num) + 1;
                            }else{
                                that.pp.push({goodId:this.getAttribute("index"),num:1});
                            }
                        }
                        localStorage.setItem(`${that.msg[that.i].user}goodid`,JSON.stringify(that.pp));
                        $("<div class='mssc'></div>").css({
                            width:"100%",
                            height:"100%",
                            position:"fixed",
                            top:0,
                            zIndex:99,
                            background:"rgba(0, 0, 0, .5)"
                        }).appendTo("body");
                        $("<div>加入成功</div>").css({
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
                            }, 1000);

                }else{
                    $("<div class='mssc'></div>").css({
                    width:"100%",
                    height:"100%",
                    position:"fixed",
                    top:0,
                    zIndex:99,
                    background:"rgba(0, 0, 0, .5)"
                }).appendTo("body");
                $("<div>你还没有登录，去<a href='./signIn.html'>登录</a>吧</div>").css({
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
                    }, 3000);
                }
            })
    }
}
new sS;