//跨浏览器事件处理程序
var eventUtil = {
	//添加句柄
	//element:要操作的元素
	//type:事件的名称
	//handle:事件处理程序函数
	addHandler: function(element, type, handler){
		if(element.addEventListener){
			element.addEventListener(type,handler,false);
		}else if(element.attachEvent){
			element.attachEvent("on"+type,handler);
		}else{
			//elment[onclick] = element.onclick
			element["on"+type]= handler;//注意此处不能用. 
		}
	},
	//删除句柄
	removeHandler: function(element, type, handler){

		if(element.removeEventListener){

			element.removeEventListener(type,handler,false);
			
		}else if(element.detachEvent){
			element.detachEvent("on"+type, handler);
			console.log("删除");
		}else{
			element["on"+type] = null;
		}
	},
	//获取事件
	getEvent: function(event){
		return event ? event : window.event;
	},
	//获取事件类型
	getType: function(event){
		return event.type;
	},
	//获取事件目标
	getElement: function(event){
		return event.target || event.srcElement;
	},
	//阻止事件的默认行为
	preventDefault: function(event){
		if(event.preventDefault){
			event.preventDefault();
		}else{
			event.returnValue = false;
		}
	},
	//阻止事件冒泡
	stopPropagation:function(event){
		if(event.stopPropagation){
			event.stopPropagation();
		}else{
			event.cancleBubble = true;
		}
	},
	//添加多个事件处理程序
	multiHandle : function(event){
		switch(event.type){
			case "click":
				alert("click");
				break;
			case "mouseover":
				event.target.style.backgroundColor = "red";
				break;
			case "mouseout":
				event.target.style.backgroundColor = "";
				break;
		}
	}


}