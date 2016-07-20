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
	},
	//获取鼠标点击时，在视口中的水平和垂直坐标
	getClient: function(event){
		return event.clientX + "," +event.clientY;
	},
	//获取鼠标点击时，在页面中的水平和垂直坐标
	getPage: function(event){
		var pageX = event.pagex;
		var pageY = event.pageY;

		if(pageX === undefined){
			pageX = event.clientX + (document.body.scrollLeft || document.documentElement.scrollLeft);
		}
		if(pageY === undefined){
			pageY = event.clientY + (document.body.scrollTop || document.documentElement.scrollTop);
		}
		return pageX + ","+ pageY;
	},
	//获取鼠标点击时，在屏幕中的水平和垂直坐标
	getScreen: function(event){
		return event.screenX + "," + event.screenY;
	},
	//获取修改键的状态
	getKeys: function(event){
		var keys = new Array();
		if(event.shiftKey){
			keys.push("shift");
		}
		if(event.ctrlKey){
			keys.push("ctrl");
		}
		if(event.altKey){
			keys.push("alt");
		}
		if(event.metaKey){
			keys.push("meta");
		}
		return keys;
	},
	//获取相关元素
	getRelatedTarget: function(event){
		if(event.relatedTarget){
			return event.relatedTarget;
		}else if(event.toElement){
			return event.toElement;
		}else if(event.formElement){
			return event.fromElement;
		}else{
			return null;
		}
	}
	//获取鼠标按钮
	getButton: function(event){
		if(document.implementation.hasFeature("MouseEvents","2.0")){
			return event.button;
		}else{
			switch(event.button){
				case 0:
				case 1:
				case 3:
				case 5:
				case 7:
					return 0;//表示主鼠标按钮
				case 2:
				case 6:
					return 2;//表示次鼠标按钮
				case 4:
					return 1;//表示中间的鼠标按钮
			}
		}
	}


}