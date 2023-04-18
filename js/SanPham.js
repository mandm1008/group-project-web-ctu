const btn = document.querySelectorAll("button");


btn.forEach(function(button,index){
   
    button.addEventListener("click",function(event){{
      
        var btnItem = event.target;
        var sanpham = btnItem.parentElement;
     
        
        
        var anhsanpham = sanpham.querySelector(" img").src;
     
        var tensanpham = sanpham.querySelector(" h4").innerText;
       
        var giasanpham =sanpham.querySelector(".sale").innerText;
        
        addcart(anhsanpham,tensanpham,giasanpham);
    }})
})

function addcart(anhsanpham,tensanpham,giasanpham){

    var themsanpham = document.createElement("tr");
    var ssanpham = document.querySelectorAll(".cotgiohang tr");
    for(var i=0;i<ssanpham.length;i++){
        var sanphamtrunglap= document.querySelectorAll(".ten");
        if(sanphamtrunglap[i].innerHTML==tensanpham){
            alert("Sản phẩm đã có trong giỏ hàng");
            return;
        }
    }
   
    var sanphamdcthem ='<div class="sanpham"><img style="height: 60px;width: 60px;" src="'+anhsanpham+'" alt="TSUKI GA MICHIBIKU ISEKAI DOUCHUU"><h3 class="ten">'+tensanpham+'</h3><span>'+giasanpham+'</span><input value="1" type="number" min="1" style="height: 25px;width: 35px;">SL</input>';
    themsanpham.innerHTML = sanphamdcthem;
    var giohang1 = document.querySelector(".cotgiohang");
   giohang1.append(themsanpham);
}
