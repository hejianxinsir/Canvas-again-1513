
let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

autoSetCanvas();
listenUser();

let previousDot = {x: undefined, y: undefined};
let using = false;
let eraserEnabled = false;
let lineWidth = 2;

// 绘画工具
eraser.onclick = function(){
	eraserEnabled = true;
	eraser.classList.add('active');
	brush.classList.remove('active');
}
brush.onclick = function(){
	eraserEnabled = false;
	eraser.classList.remove('active');
	brush.classList.add('active');
}
clear.onclick = function(){
	context.clearRect(0,0,canvas.width,canvas.height)
}
download.onclick = function(){
	var a = document.createElement('a');
	var url = canvas.toDataURL('image/png');
	document.body.appendChild(a);
	a.href = url;
	a.download = '我的画作';
	a.click();
}

// 切换颜色
black.onclick = function(){
	context.strokeStyle = 'black';
	black.classList.add('active');
	brown.classList.remove('active');
	orange.classList.remove('active');
}
brown.onclick = function(){
	context.strokeStyle = 'brown';
	black.classList.remove('active');
	brown.classList.add('active');
	orange.classList.remove('active');
}
orange.onclick = function(){
	context.strokeStyle = 'orange';
	black.classList.remove('active')
	brown.classList.remove('active');
	orange.classList.add('active');
}

// 切换粗细
thick.onclick = function(){
	context.lineWidth = 7
	thick.classList.add('active');
	medium.classList.remove('active')
	thin.classList.remove('active')
}
medium.onclick = function(){
	context.lineWidth = 4
	thick.classList.remove('active');
	medium.classList.add('active')
	thin.classList.remove('active')

}
thin.onclick = function(){
	context.lineWidth = 2
	thick.classList.remove('active');
	medium.classList.remove('active')
	thin.classList.add('active')

}

// 监听用户动作
function listenUser(){
	if(document.ontouchstart !== undefined){
		// 触屏设备
			canvas.ontouchstart = function(aa){
				using = true;
				let x = aa.touches[0].clientX;
				let y = aa.touches[0].clientY;
				previousDot = {x: x, y: y};
			}
			canvas.ontouchmove= function(aa){
				let x = aa.touches[0].clientX;
				let y = aa.touches[0].clientY;
			 	let presentDot = {x: x, y: y};
			
				if(eraserEnabled){
					if(using){
						context.clearRect(x,y,20,20)
					}
				}else{
					if(using){
							drawLine(previousDot.x, previousDot.y, presentDot.x, presentDot.y);
							previousDot = presentDot;
					}
				}
			}
			canvas.ontouchend	= function(){
				using = false;
			}


	}else{
		// 非触屏设备
	}
	canvas.onmousedown = function(aa){
		using = true;
		let {clientX,clientY} = aa;
		previousDot = {x: clientX, y: clientY};
	}
	canvas.onmousemove = function(aa){
		let x = aa.clientX;
		let y = aa.clientY;
	 	let presentDot = {x: x, y: y};
	
		if(eraserEnabled){
			if(using){
				context.clearRect(x,y,20,20)
			}
		}else{
			if(using){
					drawLine(previousDot.x, previousDot.y, presentDot.x, presentDot.y);
					previousDot = presentDot;
			}
		}
	}
	canvas.onmouseup= function(){
		using = false;
	}
}



function drawLine(x1,y1,x2,y2){
	context.beginPath();
	context.moveTo(x1,y1);
	context.lineTo(x2,y2);
	context.closePath();
	context.stroke();
}

function drawCircle(x,y){
	context.beginPath();
	context.arc(x,y,1,0,Math.PI*2);
	context.fill();
	context.lineWidth = lineWidth;
}

function autoSetCanvas(){
	window.onresize = function(){
		setPageWidth();
	}
	
	setPageWidth();
	function setPageWidth(){
		let pageWidth = document.documentElement.clientWidth;
		let pageHeight = document.documentElement.clientHeight;
		canvas.width = pageWidth;
		canvas.height = pageHeight;
	}
}
