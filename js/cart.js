var types = ['All', 'Hottrend', 'Luxury'];
var products = [{name: 'Barocco Silhouette Chambray Shirt', gia: 300.000, img: '../img/versace/svs1.webp', donViTinh: 'cái', soLuong: 100, type: 'Fashion'},
                {name: 'Barocco Silhouette Shirt', gia: 300.000, img: '../img/item/it6.webp', donViTinh: 'cái', soLuong: 100, type: 'Fashion'},
                {name: 'Sơ mi trắng', gia: 580.000, img: '../img/versace/vs2.webp', donViTinh: 'cái', soLuong: 100, type: 'Fashion'},
                {name: 'Áo sơ mi dài tay', gia: 590.000, img: '../img/versace/vs1.webp', donViTinh: 'cái', soLuong: 100, type: 'Fashion'},
                {name: 'Quần tây', gia: 600.000, img: '../img/versace/svs2.webp', donViTinh: 'cái', soLuong: 100, type: 'Fashion'},
                {name: 'Quần jeans', gia: 800.00, img: '../img/versace/svs1.webp', donViTinh: 'cái', soLuong: 100, type: 'Fashion'},
                {name: 'Áo', gia: 105, img: '../img/versace/vs3.webp', donViTinh: 'cái', soLuong: 100, type: 'Fashion'},
                {name: 'Áo sơ mi đen trắng hot', gia: 350.000, img: '../img/item/it4.webp', donViTinh: 'cái', soLuong: 100, type: 'Fashion'},
                {name: 'Áo sơ mi đen trắng hot', gia: 350.000, img: '../img/item/it2.webp', donViTinh: 'cái', soLuong: 100, type: 'Fashion'}];
var c = 'cart';
var cart = JSON.parse(localStorage.getItem(c));
if(cart === null)cart = new Array();
var soLuong = 0;
if(cart.length !== 0){
    for(var cc of cart){
        var flagg = 0;
        for(var p of products){
            if(cc.name === p.name){
                flagg = 1;
                if(p.soLuong < cc.soLuong){
                    cc.soLuong = p.soLuong;
                    soLuong += cc.soLuong;
                }
                else
                    soLuong += cc.soLuong;
                if(cc.soLuong === 0){
                    cart.splice(cart.indexOf(cc), 1);
                }
            }
        }
        if(flagg === 0) cart.splice(cart.indexOf(cc), 1);
    }
}
localStorage.setItem(c, JSON.stringify(cart));
function themHang(p, amount){
    var ca = {name: p.name, gia: p.gia, img: p.img, donViTinh: p.donViTinh, soLuong: amount, type: p.type};
    soLuong += parseInt(amount);
    var flag = 0;
    for(var car in cart){
        if(cart[car].name === ca.name){
            flag = 1;
            cart[car].soLuong += ca.soLuong;
            break;
        }
    }
    if(flag === 0)cart.push(ca);
    $("#amount").show();// trường hợp thêm lần đầu tiên
    if(soLuong > 99)
        $("#amount").text("99+");
    else
        $("#amount").text(soLuong);
    localStorage.setItem(c, JSON.stringify(cart));
}
$(document).ready(function () {
    if(soLuong === 0){
        $("#amount").hide();
    }
    else{
        $("#amount").show();
        if(soLuong > 99)
            $("#amount").text("99+");
        else
            $("#amount").text(soLuong);
    }
    $("#them").click(function(){
        var re = /^\d*$/g;
        var soLuongMua = $("#soLuongMua").val();
        if(!re.test(soLuongMua)){
            $("#tbSoLuongMua").text('Chỉ được nhập số tự nhiên!');
            return;
        }
        $("#tbSoLuongMua").text('');
        themHang(product, parseInt($("#soLuongMua").val()));
    });
});