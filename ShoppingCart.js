var shop_cart = document.getElementById("shop-cart");     //撑起父元素的height
shop_cart.style.height = 400 + 'px';
var table = document.getElementsByTagName("table")[0];
var rows = table.rows;

for(var i = 0; i < 4; i++){
	var tr = document.createElement("tr");
	var cells = rows[0].cells;

	table.appendChild(tr);
	for(var j = 0; j < cells.length; j++){
		var td = document.createElement("td");
		tr.appendChild(td);
	}
}
function init(cName, price, num, trId) {
	var tds = rows[trId].cells;
	var input = document.createElement("input");

	tds[0].appendChild(input);
	input.setAttribute("type", "checkbox");
	input.className = "check-box";

	var button4 = document.createElement("button");
	tds[1].appendChild(button4);
	button4.type = "button";
	button4.innerHTML = cName;
	button4.className = "button-no";

	var input4 = document.createElement("input");
	tds[2].appendChild(input4);
	input4.type = "button";
	input4.className = "price";
	input4.style.color = "black";
	input4.value = price.toFixed(2);

	var button = document.createElement("button");
	tds[3].appendChild(button);
	button.type = "button";
	button.className = "button-cut"
	button.innerHTML = "-";

	var input2 = document.createElement("input");
	tds[3].appendChild(input2);
	input2.setAttribute("type", "button");
	input2.value = num;
	input2.className = "button-num";

	var button2 = document.createElement("button");
	tds[3].appendChild(button2);
	button2.type = "button";
	button2.className = "button-add"
	button2.innerHTML = "+";

	var input3 = document.createElement("input");
	tds[4].appendChild(input3);
	input3.type = "button";
	input3.className = "red-type"
	input3.value = parseFloat(num * price).toFixed(2);

	var button3 = document.createElement("button");
	tds[5].appendChild(button3);
	button3.type = "button";
	button3.className = "button-no";
	button3.innerHTML = "删除";
}
init("JavaScript实践", 45.80, 1, 2);
init("PHP基础案例教程", 49.80, 2, 3);
init("HTML+CSS网页制作", 45.20, 5, 4);
init("Java基础入门", 45.00, 8, 5);
var inputTotal = document.getElementsByClassName("input-total")[0];
inputTotal.value = "已选择 0 件商品 总计：0.00";

numTotal = 0; moneyTotal = 0;
var f1 = f2 = f3 = f4 = 1;
var button_adds = document.getElementsByClassName("button-add");
var button_cuts = document.getElementsByClassName("button-cut");
var button_nums = document.getElementsByClassName("button-num");
var small_totals = document.getElementsByClassName("red-type");
var prices = document.getElementsByClassName("price");
button_adds[0].onclick = function (){
	addNum(button_nums[0], small_totals[0], prices[0]);
	if(k1 % 2 != 0){
		changeTotal(inputTotal, button_nums[0], small_totals[0], 100, prices[0]);
	}
};
button_cuts[0].onclick = function () {
	if(button_nums[0].value == 1)
		f1 = 0;
	cutNum(button_nums[0], small_totals[0], prices[0]);
	console.log(f1);
	if(f1 != 0 && k1 % 2 != 0)
		changeTotal(inputTotal, button_nums[0], small_totals[0], 101, prices[0]);
	f1 = 1;
};

button_adds[1].onclick = function (){
	addNum(button_nums[1], small_totals[1], prices[1]);
	if(k2 % 2 != 0)
		changeTotal(inputTotal, button_nums[1], small_totals[1], 100, prices[1]);
};
button_cuts[1].onclick = function () {
	if(button_nums[1].value == 1)
		f2 = 0;
	cutNum(button_nums[1], small_totals[1], prices[1]);
	if(f2 != 0 && k2 % 2 != 0)
		changeTotal(inputTotal, button_nums[1], small_totals[1], 101, prices[1]);
	f2 = 1;
};

button_adds[2].onclick = function (){
	addNum(button_nums[2], small_totals[2], prices[2]);
	if(k3 % 2 != 0)
		changeTotal(inputTotal, button_nums[2], small_totals[2], 100, prices[2]);
};
button_cuts[2].onclick = function () {
	if(button_nums[2].value == 1)
		f3 = 0;
	cutNum(button_nums[2], small_totals[2], prices[2]);
	if(f3 != 0 && k3 % 2 != 0)
		changeTotal(inputTotal, button_nums[2], small_totals[2], 101, prices[2]);
	f3 = 1;
};

button_adds[3].onclick = function (){
	addNum(button_nums[3], small_totals[3], prices[3]);
	if(k4 % 2 != 0)
		changeTotal(inputTotal, button_nums[3], small_totals[3], 100, prices[3]);
};
button_cuts[3].onclick = function () {
	if(button_nums[3].value == 1)
		f4 = 0;
	cutNum(button_nums[3], small_totals[3], prices[3]);
	if(f4 != 0 && k4 % 2 != 0)
		changeTotal(inputTotal, button_nums[3], small_totals[3], 101, prices[3]);
	f4 = 1;
};
function addNum(num, total, price) {
	num.value++;
	total.value = parseFloat(total.value) + parseFloat(price.value);
	total.value = parseFloat(total.value).toFixed(2);
}
function cutNum(num, total, price) {
	if(num.value == 1){
		alert("至少选择一件，或将物品直接删除！");
	}
	else {
		num.value--;
		total.value = parseFloat(total.value) - parseFloat(price.value);
		total.value = parseFloat(total.value).toFixed(2);
	}
}
var k1 = k2 = k3 = k4 = 0;
var check = document.getElementsByClassName("check-box");
check[0].onclick = function () {
	changeTotal(inputTotal, button_nums[0], small_totals[0], k1);
	k1++;
}
check[1].onclick = function () {
	changeTotal(inputTotal, button_nums[1], small_totals[1], k2);
	k2++;
}
check[2].onclick = function () {
	changeTotal(inputTotal, button_nums[2], small_totals[2], k3);
	k3++;
}
check[3].onclick = function () {
	changeTotal(inputTotal, button_nums[3], small_totals[3], k4);
	k4++;
}
function changeTotal(total, numV, sTotal, k, price) {
	if(k === 100){
		numTotal = numTotal + 1;
		moneyTotal = moneyTotal + parseFloat(parseFloat(price.value).toFixed(2));
	}
	else if(k === 101){
		numTotal = numTotal - 1;
		moneyTotal = moneyTotal - parseFloat(parseFloat(price.value).toFixed(2));
	}
	else if(k % 2 === 0) {
		numTotal = numTotal + parseInt(numV.value);
		moneyTotal = moneyTotal + parseFloat(parseFloat(sTotal.value).toFixed(2));
	}
	else{
		numTotal = numTotal - parseInt(numV.value);
		moneyTotal = moneyTotal - parseFloat(parseFloat(sTotal.value).toFixed(2));
	}
	total.value = "已选择 " + numTotal + " 件商品 总计：" + parseFloat(moneyTotal).toFixed(2);
}
var buttonNos = document.getElementsByClassName("button-no");
buttonNos[1].onclick = function () {
	if(k1 != 0 &&  k1 % 2 != 0 )
		changeTotal(inputTotal, button_nums[0], small_totals[0], 1);
	dropRows(rows[2]);
};
buttonNos[3].onclick = function () {
	if(k2 != 0 &&  k2 % 2 != 0 )
		changeTotal(inputTotal, button_nums[1], small_totals[1], 1);
	dropRows(rows[3]);
};
buttonNos[5].onclick = function () {
	if(k3 != 0 &&  k3 % 2 != 0 )
		changeTotal(inputTotal, button_nums[2], small_totals[2], 1);
	dropRows(rows[4]);
};
buttonNos[7].onclick = function () {
	if(k4 != 0 &&  k4 % 2 != 0 )
		changeTotal(inputTotal, button_nums[3], small_totals[3], 1);
	dropRows(rows[5]);
};
function dropRows(rowDrop) {
	rowDrop.parentNode.removeChild(rowDrop);
}

var p1 = new Array("binw", "wei", "li");
var p2 = new Array("hao", "shuai");

p1 = p2;
p1[0] = "jkl";
console.log(p1, p2);