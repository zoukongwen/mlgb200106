;(function($,jQuery){
    "use strict";
    $.fn.banner = function(options){
        var that = this;
        options = options || {};
        this._lyobj = {
            btn:options.btn===false ? false : true,
            list:options.list=== false ? false : true,
            autoPlay:options.autoPlay === false ? false : true,
            delayTime:options.delayTime || 3000,
            moveTime:options.moveTime || 200,
            index:options.index || 0,
            iPrev:options.img.length-1,
            wid:options.width || 1000,
            heig:options.height || 300,
            img:options.img || [],
            imgp:options.imgp || [],
            imgs:options.imgs || [],
            imgc:options.imgc || [],
        }
        // 渲染布局....
        this._lyobj.init = function(){
            let str = "";
            for(var i = 0 ; i<this.img.length;i++){
                str += `<a href="##">
                <img src="${this.img[i]}" alt="">
                <p>${this.imgp[i]}</p>
                <p><span>${this.imgs[i]}</span><i>${this.imgc[i]}</i></p>
                </a>`;

            }
        
        that.html(`<div class="imgbox">${str}</div>`).css({
            // width:that._lyobj.wid*4,
            // height:that._lyobj.heig,
            position:"relative",
            // overflow:"hidden"
        }).children(".imgbox").css({
            // float:left,
            position:"absolute",
            left:0,
            top:0
            // width:140,
            // height:140
        }).find("a").css({
            // position:"absolute",
            // left:that._lyobj.wid,
            // top:0,
            display:"block",
            borderLeft:"1px #333 solid",
            // borderLeft:"1px #333 solid",
            float:"left",
            width:237,
            height:243
        }).eq(0).css({
            // left:0
        }).end().find("img").css({
            margin:"15px auto",
            width:140,
            height:140,
            display:"block"
        }).end().find("p").css({
            width:130,
            height:44,
            margin:"5px auto",
            lineHeight:"22px",
            marginBottom:5,
            overflow:"hidden",
            fontSize: "12px",
            color: "#666"
        }).end().find("span").css({
            
            overflow:"hidden",
            fontSize: "18px",
            color: "#E4462C"
        });
        }
        this._lyobj.init();

//现在做按钮功能，切换图片
        this._lyobj.leftClick = function(){
            console.log("左")
            
            if(that._lyobj.index == 0){
                
                that._lyobj.index = that._lyobj.img.length / 4-1;
                that._lyobj.iPrev = 0;
            }else{
                that._lyobj.iPrev = that._lyobj.index;
                that._lyobj.index--;
            }
            console.log(that._lyobj.index)
            // console.log(that._lyobj.iPrev)
            that._lyobj.btnMove(-1);
        }
        this._lyobj.rightClick = function(){
            console.log("右")
            if(that._lyobj.index == that._lyobj.img.length / 4-1){
                
                that._lyobj.index = 0;
                that._lyobj.iPrev = that._lyobj.img.length / 4-1;
            }else{
                that._lyobj.iPrev = that._lyobj.index;
                that._lyobj.index++;
            }
            console.log(that._lyobj.index)
            // console.log(that._lyobj.iPrev)
            that._lyobj.btnMove(-1);

        }

        // 这里是页面的渲染方法
        this._lyobj.btnMove = function(type){
            // let images = that.find(".imgbox");
            console.log(that.find(".imgbox").eq(0))
            that.find(".imgbox").eq(0).stop().animate({
                left:this.wid * type * this.index * 4
            },this.moveTime);
            console.log(this.index)
        // .end().eq(this.index).css({
        //         left:- this.wid * type
        //     }).stop().animate({
        //         left:0
        //     },this.moveTime)
        //     //判断有没有小圆点，有的时候，给小圆点设置样式
        //     if(!this.list) return;
        //     $(".imgbox").find("li").css("background","rgba(200,200,200,0.8)").eq(this.index).css("background","red");
        }




        // //先判断有没有左右按钮的功能
        if(this._lyobj.btn){
            
        
            $(`<input type="button" id="left" value="<">`).css({left:0}).appendTo(this).after($(`<input type="button" id="right" value=">">`).css({right:0})).parent().children("input").css({
                position:"absolute",
                top:(that._lyobj.heig - 40)/2,
                width:40,
                height:40,
                border:"none",
                backgroundColor:"rgba(200,200,200,0.8)"
            })
            $("#left").on("click",this._lyobj.leftClick);
            $("#right").on("click",this._lyobj.rightClick);
        }

        // //先判断有没有小圆点
        // if(this._lyobj.list){
        //     let str = "";
        //     for(var i = 0;i<this._lyobj.img.length;i++){
        //         str += `<li></li>`
        //     }
        //     $(`<ul>${str}</ul>`).css({
        //         width:"100%",
        //         height:40,
        //         margin:0,
        //         padding:0,
        //         // backgroundColor:"red",
        //         listStyle:"none",
        //         position:"absolute",
        //         left:0,
        //         bottom:0,
        //         height:40,
        //         display:"flex",
        //         justifyContent:"center",
        //         alignItems:"center",
        //         lineHeight:"40px"
        //     }).appendTo(".imgbox").children("li").css({
        //         width:40,
        //         height:40,
        //         borderRadius:"50%",
        //         background:"rgba(200,200,200,0.8)",
        //         margin:"0 10px",
        //         textAlign:"center"
        //     }).eq(this._lyobj.index).css("background","red").end()
        //     .on("click",function(){
        //         console.log($(this).index())
        //         if($(this).index() > that._lyobj.index){
        //             that._lyobj.listMove($(this).index(),-1)
        //         }
        //         if($(this).index() < that._lyobj.index){
        //             that._lyobj.listMove($(this).index(),1)
        //         }
        //         that._lyobj.index = $(this).index();
        //     })

        // }
        // this._lyobj.listMove = function(iNow,type){
        //     let images = $(".imgbox").children("a");
        //     images.eq(this.index).css({
        //         left:0
        //     }).stop().animate({
        //         left:this.wid * type
        //     }).end().eq(iNow).css({
        //         left:- this.wid * type
        //     }).stop().animate({
        //         left:0
        //     })
        //     $(".imgbox").find("li").css("background","rgba(200,200,200,0.8)").eq(iNow).css("background","red");
        // }
        




        // //这里判断是否需要自动播放先
        if(this._lyobj.autoPlay){
            this.t = setInterval(()=>{
                this._lyobj.rightClick();
            },this._lyobj.delayTime)
        }
        this.hover(function(){
            clearInterval(that.t);
        },function(){
            that.t = setInterval(()=>{
                that._lyobj.rightClick();
            },that._lyobj.delayTime)
        })

    }
})($,jQuery);