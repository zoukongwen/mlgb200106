class good{
    constructor(){
        this.tbody = document.querySelector("tbody");
        this.cbul = document.querySelector(".cart_b ul");
        this.qx = document.querySelector(".thead input");
        console.log(this.tbody)
        this.url = "../json/csearch.json";
        // this.zj = document.querySelector(".zj");
        this.jj = 0;
        this.fxkoff = 0;
        this.spsl = 0;
        this.spzj = 0;
        this.arr = [];
        this.init();
    }
    init(){
        var that = this;
        $.ajax({
            url:that.url,
            success:function(res){
                that.res = res;
                that.display();
                that.addEvent();
            console.log(that.res);
            }
        })
    }
    addEvent(){
        var that = this;
        this.qx.onclick = function(){
            var spsl = 0;
            var spzj = 0;
            if(that.qx.checked){
                for(var i = 0 ;i<that.fxk.length;i++){
                    that.fxk[i].checked = true;
                    spsl += parseInt(that.fxk[i].parentNode.parentNode.childNodes[9].childNodes[1].value);
                    spzj += parseInt(that.fxk[i].parentNode.parentNode.childNodes[11].innerHTML);
                    console.log(that.fxk[i].parentNode.parentNode.childNodes[11])
                }
                that.spsl = spsl;
                that.spzj = spzj;
            }else{
                for(var i = 0 ;i<that.fxk.length;i++){
                    that.fxk[i].checked = false;
                }
                that.spsl = 0;
                that.spzj = 0;
            }
            that.jszj();
        }
        // console.log(this.pp)
        // for(var i = 0;i<this.pp.length;i++){
        //     // this.arr.push("checked");
        // }
        // console.log(this.arr[3])
        // this.tbody.on("input","num",function (eve){
            
        //         if(this.val() < 1){
        //             this.val(1)
        //         }
        //         that.jj = 3;
        //         that.jjdis(this);
            
        // })

        // this.tbody.on("click","input",function (){
        //     console.log(this)
            
        //     if(this.getAttribute("class") == "btnL"){
        //         that.jj = 1;
        //         that.jjdis(this);
        //         console.log(this.parentNode.children[1].value)

        //     }
        //     if(this.getAttribute("id") == "btnR"){
        //         that.jj = 0;
        //         that.jjdis(this);
        //         console.log(this)

        //     }
        //     if(this.getAttribute("id") == "btn"){
        //         that.jj = 2;
        //         that.jjdis(this);
        //         console.log(this)

        //     }
        //     // if(that.target.className === "fxk"){
        //     //     that.jj = 4;
               
        //     //     that.fxksj();
        //     // }
        // })
        // console.log(this.pp)
        this.tbody.oninput = function (eve){
            that.target = eve.target;
            if(that.target.className === "num"){
                if(that.target.value < 1){
                    that.target.value = 1
                }
                that.jj = 3;
                that.jjdis();
            }
        }

        this.tbody.onclick = function (eve){
            that.target = eve.target;
            if(that.target.id === "btnL"){
                that.jj = 1;
            that.jjdis();

            }
            if(that.target.id === "btnR"){
                that.jj = 0;
            that.jjdis();

            }
            if(that.target.id === "btn"){
                that.jj = 2;
            that.jjdis();

            }
            if(that.target.className === "fxk"){
                that.jj = 4;
               
                that.fxksj();
            }
        }
    }
    jszj(){
        var str2 = `<li id="go_cash06">
                        <input type="button" class="submit_all" id="submit_login" value="去结算">
                    </li>
                    <li id="go_cash05"><span>合计(不含运费)：</span><span class="red span_sum">￥<span class="red span_sum">${this.spzj.toFixed(2)}</span></span>&nbsp;</li>
                    <li id="go_cash04">
                        <span>已选：</span>
                        <span class="red span_sum">${this.spsl}</span>
                        <span>件商品</span>
                        <br>
                    </li>`
                this.cbul.innerHTML = str2;
    }
    fxksj(){
            this.jzarr = true;
            var spsl = 0;
            var spzj = 0;
            for(var i = 0 ;i<this.fxk.length;i++){
                if(!this.fxk[i].checked){
                    this.jzarr = false;
                }else{
                    spsl += parseInt(this.fxk[i].parentNode.parentNode.childNodes[9].childNodes[1].value);
                    spzj += parseInt(this.fxk[i].parentNode.parentNode.childNodes[11].innerHTML);
                    console.log(this.fxk[i].parentNode.parentNode.childNodes[11]);
                }
            }
                if(this.jzarr){
                    this.qx.checked = true;
                }else{
                    this.qx.checked = false;

                }
                this.spsl = spsl;
                this.spzj = spzj;
                console.log(this.spsl);
                console.log(this.spzj);
                this.jszj();
    }
    jjdis(){
        var that = this;
        if(this.jj == 1){
            if(this.target.parentNode.children[1].value == 1){
                this.target.parentNode.children[1].value = 1;
            }else{
                this.target.parentNode.children[1].value = this.target.parentNode.children[1].value - 1;
            }
            this.num1 = this.target.parentNode.children[1].value;
        }
        
        if(this.jj == 0){
            this.target.parentNode.children[1].value = parseInt(this.target.parentNode.children[1].value) + 1;
            this.num1 = this.target.parentNode.children[1].value;
        }
        if(this.jj == 2){
            for(var i = 0 ;i<this.pp.length;i++){
                if(this.target.parentNode.parentNode.getAttribute("index") == this.pp[i].goodId){
                    this.pp.splice(i,1);
                    console.log(this.pp);
                    this.target.parentNode.parentNode.remove();
                    localStorage.setItem(`${this.msg[this.i].user}goodid`,JSON.stringify(this.pp))
                    this.display();
                    break;
                }
            }
        }
        if(this.jj == 3){
            this.num1 = this.target.value;
        }
        for(var i = 0 ;i<this.pp.length;i++){
            console.log(this.target.parentNode.parentNode)
            console.log(this.pp[i].goodId)
            if(this.target.parentNode.parentNode.getAttribute("index") == this.pp[i].goodId){
                this.pp[i].num = this.num1;
                console.log(this.num1)
                console.log(this.pp)
                localStorage.setItem(`${this.msg[this.i].user}goodid`,JSON.stringify(this.pp))
                this.display();
                break;
            }
        }
        
        
    }
    display(){
        var that = this;
        // console.log(this.res)
        this.msg = localStorage.getItem("userMsg") ? JSON.parse(localStorage.getItem("userMsg")) : [{user:"",pass:"",onoff:0}];
        this.i=0;
        var on = this.msg.some((val,index)=>{
            this.i = index;
            return val.onoff != 0;
        });

        
        // console.log(`${this.msg[this.i].user}goodid`)
        this.pp = JSON.parse(localStorage.getItem(`${this.msg[this.i].user}goodid`));
        var str = "";
        var j = 0;
        // console.log(typeof JSON.parse(localStorage.getItem("goodid")))
        // console.log(JSON.parse(localStorage.getItem("goodid")))
        console.log(this.pp)

        for(var i = 0 ;i<this.res.length;i++){
            var offon = that.pp.some((val,idx)=>{
                j=idx;
                return val.goodId ==this.res[i].id;
            })
            // console.log(offon)
            // console.log(j)
            // console.log(i)
            if(offon){
                // console.log(this.arr)
                // console.log(j)
                // console.log(this.arr[3])
                str +=`<tr id="tr" index="${this.res[i].id}">
                        <td width="220"><input type="checkbox" class="fxk" name="items" >选择</td>
                        <td width="320"><img src="${this.res[i].img}" alt=""></td>
                        <td width="120">${this.res[i].Spec}</td>
                        <td width="150">${this.res[i].Price}</td>
                        <td width="150"><input type="button" id="btnL" value="-"><input type="text" name="" class="num" value="${that.pp[j].num}"><input type="button" id="btnR" value="+"></td>
                        <td width="120">${(that.pp[j].num*this.res[i].Price.slice(1,this.res[i].Price.length-1)).toFixed(2)}</td>
                        <td width="90" class="td_control_part"><input type="button" id="btn" value="删除"></td>
                    </tr>`
                // str += `<tr id="tr" index="${this.res[i].goodId}">
                //             <th><input type="checkbox" class="fxk"></th>
                //             <th><img src="${this.res[i].img}" alt=""></th>
                //             <th><p>${this.res[i].name}</p></th>
                //             <th>${this.res[i].price}</th>
                //             <th>数量:<input type="button" id="btnL" value="-"><input type="text" name="" class="num" value="${that.pp[j].num}"><input type="button" id="btnR" value="+"></th>
                //             <th>${(that.pp[j].num*this.res[i].price).toFixed(2)}</th>
                //             <th><input type="button" id="btn" value="删除"></th>
                //         </tr>`
            }
            
        }
        // var str2 = `<li id="go_cash06">
        //                 <input type="button" class="submit_all" id="submit_login" value="去结算">
        //             </li>
        //             <li id="go_cash05"><span>合计(不含运费)：</span><span class="red span_sum">￥<span class="red span_sum">${this.spzj.toFixed(2)}</span></span>&nbsp;</li>
        //             <li id="go_cash04">
        //                 <span>已选：</span>
        //                 <span class="red span_sum">${this.spsl}</span>
        //                 <span>件商品</span>
        //                 <br>
        //             </li>`

        // console.log(this.arr);
        // console.log(str);
        // this.cbul.innerHTML = str2;
        this.tbody.innerHTML = str; 
        this.fxk = document.querySelectorAll(".fxk");

    }
}
new good()