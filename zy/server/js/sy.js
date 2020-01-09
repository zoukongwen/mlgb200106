class sY{
    constructor(){
        this.banner = $(".banner1");
        this.ss_ul = $(".flot_tab").find("ul");
        this.sign_ul = $("#top_bar").find(".top_l");
        this.li1 = $(".top_l").find(".t_l_1");
        this.li2 = $(".top_l").find(".t_l_2");
        this.li3 = $(".top_l").find(".t_l_3");
        this.li4 = $(".top_l").find(".t_l_4");
        this.cartNum = $(".top_r").find(".cart_num");
        
        this.qcart = $("#top_bar").find(".qcart");


        this.text = $("#active_top").find(".text");
        this.butn = $("#active_top").find("#search_form");
        // console.log(this.text)
        // console.log(this.butn)


        this.url = "../json/csearch.json";
        this.addEvent();
        this.cSe();
        this.init();
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
            that.cxq(a);
        })
        this.butn.on("click",function(){
            localStorage.setItem("cSearch",that.text.val());
            location.href ="./cSearch.html";

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
        localStorage.setItem("id",a.getAttribute("ico"));
        location.href ="cDetails.html";
    }
    cSe(){
        var that = this;
        $.ajax({
            url:that.url,
            success:function(res){
                that.res = res;
                that.display();
            }
        })
    }
    display(){
        var str = "";
        for(var i = 0;i < this.res.length;i++){
                str += `<li>
                            <a href="##" ico="${this.res[i].id}">
                                <img src="${this.res[i].img}" alt="">
                                <p class="ss_b_p">${this.res[i].Price}</p>
                                <p>${this.res[i].brief}</p>
                            </a>
                        </li>`
        }
        this.ss_ul.html(str);
    }
    init(){
        this.banner.banner({
            //必传,数组,图片路径
            img:["../images/banner_lb_1.jpg","../images/banner_lb_2.jpg","../images/banner_lb_3.jpg","../images/banner_lb_4.jpg","../images/banner_lb_5.jpg","../images/banner_lb_6.jpg","../images/banner_lb_1.jpg","../images/banner_lb_2.jpg","../images/banner_lb_3.jpg","../images/banner_lb_4.jpg","../images/banner_lb_5.jpg","../images/banner_lb_6.jpg"],
            imgp:["绿啄木鸟 披萨专用面粉 25kg/袋 预计到货时间1月8日",
            "绿啄木鸟 披萨专用面粉 25kg/袋 预计到货时间1月8日",
            "绿啄木鸟 披萨专用面粉 25kg/袋 预计到货时间1月8日",
            "绿啄木鸟 披萨专用面粉 25kg/袋 预计到货时间1月8日",
            "绿啄木鸟 披萨专用面粉 25kg/袋 预计到货时间1月8日",
            "绿啄木鸟 披萨专用面粉 25kg/袋 预计到货时间1月8日","绿啄木鸟 披萨专用面粉 25kg/袋 预计到货时间1月8日",
            "绿啄木鸟 披萨专用面粉 25kg/袋 预计到货时间1月8日",
            "绿啄木鸟 披萨专用面粉 25kg/袋 预计到货时间1月8日",
            "绿啄木鸟 披萨专用面粉 25kg/袋 预计到货时间1月8日",
            "绿啄木鸟 披萨专用面粉 25kg/袋 预计到货时间1月8日",
            "绿啄木鸟 披萨专用面粉 25kg/袋 预计到货时间1月8日"],
            imgs:["￥452.00元","￥452.00元","￥452.00元","￥452.00元","￥452.00元","￥452.00元","￥452.00元","￥452.00元","￥452.00元","￥452.00元","￥452.00元","￥452.00元"],
            imgc:["￥452","￥452","￥452","￥452","￥452","￥452","￥452","￥452","￥452","￥452","￥452","￥452"],
            btn:true,              //可选，默认为true
            list:false,             //可选，默认为true
            autoPlay:true,         //可选，默认为true
            delayTime:3000,         //可选，默认为2000
            moveTime:500,           //可选，默认为200
            index:0,                 //可选，默认为0
            width:238,              //可选，默认1000
            height:243              //可选，默认300
        });

        var msg = localStorage.getItem("userMsg") ? JSON.parse(localStorage.getItem("userMsg")) : [{user:"",pass:"",onoff:0}];
        var i=0;
        var on = msg.some((val,index)=>{
            i = index;
            return val.onoff != 0;
        })

        if(on){
            this.on = true;
            // 登录成功
            var manestr = `<a href="##">${msg[i].user}，欢迎光临美鲜冻品商城</a>`;
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
            this.on = false;
            // 没有登录
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
        
        // oUserName.innerHTML = msg[i].user;


    }
    
}
new sY;