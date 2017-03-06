requirejs([ 'jquery', 'audioBar', 'recorder', 'swfobject' ],function ($, audioBar) {
		$(function(){
			var userAgent =navigator.userAgent; //取得浏览器的userAgent字符串
			var b_version=navigator.appVersion;
			var resultHtml='';
			var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器  
	  		var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器 
	      	var browserSure=false;
		    
		    var browserName="";
		    var isOpera=userAgent.indexOf("Opera")>-1;
		    if (isOpera) {
		        browserName= "Opera"
		    }; //判断是否Opera浏览器
		    else if (userAgent.indexOf("Firefox") > -1) {
		        browserName= "FF";
		    } //判断是否Firefox浏览器
		    else if (isChrome){
			  browserName= "Chrome";
			 }
		    else if (isSafari) {
		        browserName= "Safari";
		    } //判断是否Safari浏览器
		    else if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
		        browserName= "IE";
		    }; //判断是否IE浏览器


	      	if (browserName=="Chrome") {
				// alert("浏览器名称："+"Chrome"+"浏览器版本："+ parseFloat(b_version.split('Chrome/')[1]));
				var chrome_version=parseFloat(b_version.split('Chrome/')[1]);
				if(chrome_version<=53){
					browserSure=true;
				}else{  //浏览器不合格版本地与53
					resultHtml='<p>您的浏览器不符合模考要求，请按提示进行操作：</p><p>1.卸载此浏览器<a class="ab-look" target="_blank" href="http://jingyan.baidu.com/article/00a07f3882097982d028dc18.html">点击查看卸载方式</a></p><p>2.下载并安装指定版本谷歌浏览器</p>';
				}
			}else{  //其他浏览器
				resultHtml='<p>请使用考拉屋模考专用谷歌浏览器，下载地址如下：</p>';
			}
			//系统类型判断
			var bit= GetOSInfo(browserName);
			switch(bit){
				case "WOW64":
				resultHtml+='<ul class="platform"><li><div class="iconTest window"></div><p>Windows64位版</p><a href="http://ol1st441k.bkt.clouddn.com/static/browser/53.0.2785.116_chrome_installer64.exe" target="_blank" class="btn btn-down">立即下载</a></li></ul>';
				break;
				case "WOW32":
				resultHtml+='<ul class="platform"><li><div class="iconTest window"></div><p>Windows32位版</p><a href="http://ol1st441k.bkt.clouddn.com/static/browser/53.0.2785.116_chrome_installer.exe" target="_blank" class="btn btn-down">立即下载</a></li></ul>';
				break;
				case "Mac":
				resultHtml+='<ul class="platform"><li><div class="iconTest mac"></div><p>MAC版</p><a href="http://ol1st441k.bkt.clouddn.com/static/browser/googlechrome.dmg" target="_blank" class="btn btn-down">立即下载</a></li></ul>';
				break;
				default:
				resultHtml+='<ul class="platform"><li><div class="iconTest window"></div><p>Windows32位版</p><a href="http://ol1st441k.bkt.clouddn.com/static/browser/53.0.2785.116_chrome_installer.exe" target="_blank" class="btn btn-down">立即下载</a></li><li><div class="iconTest window"></div><p>Windows64位版</p><a href="http://ol1st441k.bkt.clouddn.com/static/browser/53.0.2785.116_chrome_installer64.exe" target="_blank" class="btn btn-down">立即下载</a></li><li><div class="iconTest mac"></div><p>MAC版</p><a href="http://ol1st441k.bkt.clouddn.com/static/browser/googlechrome.dmg" target="_blank" class="btn btn-down">立即下载</a></li></ul>';
				break;
			}
			//停止动画
			setTimeout(function(){
				$(".refresh").css('animation-play-state', 'paused');  //动画开始running
				$("#browserR").removeClass('refresh');
				if(browserSure){
					$("#browserR").addClass('right');
					$(".micro").css("display","block");
				}else{
					$("#browserR").addClass('wrong');
					$(".result01").html(resultHtml);
					$(".result01").css("display","block");
				}
			},300);
		});
		//判断系统类型
		function GetOSInfo()
		{ 
			var _pf=navigator.platform;
			var appVer=navigator.userAgent; 
			if(_pf=="Win32" || _pf == "Windows") 
			{ 
				if(appVer.toUpperCase().indexOf("WOW64")>-1||appVer.toUpperCase().indexOf("WIN64")>-1)
				{ 
					return "WOW64";   //64位
				}
				else
				{ 
					return "WOW32";   //32位
				} 
			}
			else if(_pf=="Win64"){
				return "WOW64";   //64位
			}
			else if(_pf.indexOf("Mac")>-1)
			{ 
				return "Mac"; 
			}
			else
			{ 
				return "Unknow"; 
			} 
		}
	});