class Magnifier{
    constructor(){
        this.sign_ul = $("#top_bar").find(".top_l");
        this.li1 = $(".top_l").find(".t_l_1");
        this.li2 = $(".top_l").find(".t_l_2");
        this.li3 = $(".top_l").find(".t_l_3");
        this.li4 = $(".top_l").find(".t_l_4");
        this.xq_l_t = $(".xq_l").find(".xq_l_t");

        this.qcart = $("#top_bar").find(".qcart");

        this.url = "../json/csearch.json";
        this.cde();
        
        this.xq_r_xr = $(".xq_r").find(".xq_r_xr");

        this.text = $("#active_top").find(".text");
        this.butn = $("#active_top").find("#search_form");
        this.init();
        //这里绑定事件
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
    }
//这里定义绑定的事件
    addEvent(){
        //事件函数内部取不到实例的this，这里将this声明为that

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




        this.btn1.on("click",function(){
            that.txt.val(that.txt.val() - 1)
            if(that.txt.val()<=0){
                that.txt.val(1);
            }
        });
        this.btn2.on("click",function(){
            that.txt.val(parseInt(that.txt.val()) + 1)
        });
        this.btn3.on("click",function(){
            var btn = this;
            that.btn_3(btn);
        });
        this.butn.on("click",function(){
                localStorage.setItem("cSearch",that.text.val());
                location.href ="./cSearch.html";

        });

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
        });


        //这里绑定鼠标进入事件
        this.xobx.on("mouseover",function(){
            //这里绑定进入事件的执行事件
            that.show();
        });
        //这里绑定鼠标离开
        this.xobx.on("mouseout",function(){
            that.hide();
        });
        //这里绑定鼠标移动
        this.xobx.on("mousemove",function(e){

            // var e = this;
            // console.log(e)
            that.move(e);
        });
        
    }
    btn_3(btn){
        var that = this;
        this.msg = localStorage.getItem("userMsg") ? JSON.parse(localStorage.getItem("userMsg")) : [{user:"",pass:"",onoff:0}];
            this.i=0;
            var on = this.msg.some((val,index)=>{
                this.i = index;
                return val.onoff != 0;
            });
        if(on){
        // 登录成功
        console.log(btn)
        that.pp = localStorage.getItem(`${that.msg[that.i].user}goodid`) ? JSON.parse(localStorage.getItem(`${that.msg[that.i].user}goodid`)):[];
            if(that.pp.length == 0){
                that.pp = [{goodId:btn.getAttribute("index"),num:this.txt.val()}];
            }else{
                var j = 0;
                var offon = that.pp.some((val,idx)=>{
                    j = idx
                    return val.goodId == btn.getAttribute("index");
                })
                if(offon){
                    that.pp[j].num = parseInt(this.pp[j].num) + parseInt(this.txt.val());
                }else{
                    that.pp.push({goodId:btn.getAttribute("index"),num:this.txt.val()});
                }
            }
            localStorage.setItem(`${that.msg[that.i].user}goodid`,JSON.stringify(that.pp))
    }else{
        // 没有登录
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

}
cde(){
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
    var str1 = "";
    var str2 = "";
    var id = localStorage.getItem("id");
    console.log(id);
        for(var i = 0;i < this.res.length;i++){
            if(this.res[i].id == id){
                console.log(this.res[i].id)
                console.log(this.res[i])
                str1 += `<div class="s_box">
                            <img src="${this.res[i].img_xq}" alt="">
                            <span></span>
                        </div>
                        <div class="b_box" style="display:none">
                            <img src="${this.res[i].img_xq}" alt="">
                        </div>`;
                str2 += `<h2 oenglish="RUIMAIJIA Coating Powder extra special level 20kg/bag"           ochinese="瑞麦加 裹粉 特级 20kg/袋" id="detail_goods_name">${this.res[i].brief}</h2>
                        <p class="sub_text">${this.res[i].brief}</p>
                        <form action="##">
                        <div class="form_1">
                        <span>美鲜价</span>
                        <span class="jg">${this.res[i].Price}</span>
                        </div>
                        <table class="goods_info">
                        <tbody>
                            <tr>
                                <td class="title">商品规格：</td>
                                <td class="text seller_note">${this.res[i].Spec}</td>
                            </tr>
                            <tr>
                                <td class="title">购买赠送:</td>
                                <td class="text"><span id="jifen">${this.res[i].integral}</span>&nbsp;积分<strong style="font-size: 12px;display: none;">0</strong></td>
                            </tr>
                            <tr>
                                <td class="title">商品货号:</td>
                                <td class="text goods_sn">${this.res[i].id}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="form_2">
                        购买数量<span class="jian">-</span><input type="text" name="" id="sl" value="1"><span class="jia">+</span>
                    </div>
                    <input type="button" name="" id="btn_1" value="加入购物车"  index="${this.res[i].id}">
                </form>`
            }

        }
        console.log(str1)
        this.xq_l_t.html(str1);
        this.xq_r_xr.html(str2);
        this.xobx = $(".xq_l_t").find(".s_box");
        this.xobx = $(".xq_l_t").find(".s_box");
        this.span = $(".xq_l_t").find(".s_box span");
        this.dobx = $(".xq_l_t").find(".b_box");
        this.img = $(".xq_l_t").find(".b_box img");
        this.btn1 = $(".form_2").find(".jian");
        this.btn2 = $(".form_2").find(".jia");
        this.txt = $(".form_2").find("#sl");
        this.btn3 = $(".xq_r").find("#btn_1");
        this.addEvent();



}
//这里定义鼠标进入
show(){
    //这里显示span并给其设置宽高，
    //其中宽高根据比例设置
    // console.log(parseInt(this.xobx.css("width"))*parseInt(this.dobx.css("width"))/parseInt(this.img.css("width")))
    // console.log(parseInt(this.xobx.css("width")))
    // console.log(this.dobx.css("width"))
    // console.log(this.img.css("width"))
    // console.log()
    this.span.css({
        width:parseInt(this.xobx.css("width"))*parseInt(this.dobx.css("width"))/parseInt(this.img.css("width")),
        height:parseInt(this.xobx.css("height"))*parseInt(this.dobx.css("height"))/parseInt(this.img.css("height")),
        display:"block",
        background:"rgba(200,200,200,0.5)"
    });
    // this.span.css({
    //     display:"block",
    //     background:"rgba(200,200,200,0.5)"
    // });
    this.dobx.css({
        display:"block"
    });
}
hide(){
    this.span.css({
        display:"none"
    });
    this.dobx.css({
        display:"none"
    });
}
move(e){
    // console.log(e.clientX)
    // console.log(e.clientY)
    // console.log(this.xq_l_t.offset().left)
    var l = parseInt(e.clientX - this.xq_l_t.position().left -parseInt(this.span.css("width"))/2);
    var t = parseInt(e.clientY - (parseInt(this.xq_l_t.offset().top) - parseInt($(document).scrollTop())) - parseInt(this.span.css("height"))/2);
    // console.log(l,t)

    if(l<0) l=0;
    if(t<0) t=0;
    if(l>(parseInt(this.xobx.css("width"))-parseInt(this.span.css("width")))){
        l=parseInt(parseInt(this.xobx.css("width"))-parseInt(this.span.css("width")))
    }
    if(t>(parseInt(this.xobx.css("height"))-parseInt(this.span.css("height")))){
        t=parseInt(parseInt(this.xobx.css("height"))-parseInt(this.span.css("height")))
    }
    this.span.css({left:l});
    this.span.css({top:t});
    this.img.css({
        left:parseInt(l/(parseInt(this.span.css("width"))-parseInt(this.xobx.css("width")))*(parseInt(this.img.css("width"))-parseInt(this.dobx.css("width")))),
        top:parseInt(t/(parseInt(this.span.css("height"))-parseInt(this.xobx.css("height")))*(parseInt(this.img.css("height"))-parseInt(this.dobx.css("height"))))
    })
    // console.log(l,t)
}
}
new Magnifier();