/**
 * Created by Dragon Wolf on 2015/1/6.
 * 功能：所有页面的共用js
 *      1.设置顶部和正文内容布局
 */
/*Exit按钮，Ajax提交数据*/

/*定义音量按钮
 * 编写：王亚辉
 * 功能：调节音量大小
 * */
if(window.HTMLAudioElement !== undefined) {
    var _domReadyCall = document.addEventListener ? document.addEventListener.bind(document, 'DOMContentLoaded') :
        function (callBack) {
            document.attachEvent('onreadystatechange', callBack);
        };
    _domReadyCall(function () {
        var audioAuto = document.querySelectorAll('audio[autoplay="autoplay"]');
        for (var i = 0; i < audioAuto.length; i++) {
            audioAuto[i].pause();
        }
    });
}
requirejs(['jquery','jquery-ui','storage','audioIE8'],function($,ui,storage,audioIE8) {
    audioIE8.ready(function() {
        var initVolume = 50;
        var audioArray = $("audio");
        var $volInput = $("input[name ='volume']");
        if($volInput.length > 0 && $volInput.val().length > 0 && !isNaN(Number($volInput.val()))){
            initVolume = $volInput.val();
            storage("localVolume",initVolume);
        }
        else if( storage("localVolume") !== undefined && storage("localVolume") !== null){
            initVolume = storage("localVolume");
        }
        setInterval(function() {
            audioArray = $("audio").each(function() {if(this.volume !== undefined) this.volume = Number($volInput.val() || storage("localVolume") || initVolume)/100;});
        },100);
        audioArray.each(function() {
            this.volume = initVolume/100;
        });
        audioArray.filter('[autoplay="autoplay"]').each(function(){this.play()});
        $("#volAdjust").slider({
            value:initVolume,
            slide:function(event,ui){
                audioArray.each(function() {
                    this.volume = ui.value/100;
                });
                storage("localVolume",ui.value);
                $volInput.val(ui.value);
            }
        });

        $(".volume, .volumeBig").click(function(event) {
            $("#volAdjust").css("display","block");
            event.stopPropagation();
        });
        $(document).click(function(event) {
            $('#volAdjust').hide();
        })
    })
});
/*chrome浏览器按钮字体偏大问题*/
if(window.navigator.userAgent.indexOf("Chrome") !== -1) {
    document.addEventListener('DOMContentLoaded',function() {
        var scaleBtn = document.querySelectorAll('.commonElli,.commonReview,#volButton,.viewArticle,.hideTime a');
        for(var i = 0; i < scaleBtn.length; i++) {
            if(!scaleBtn[i].classList.contains('chrome-fixed')) {
                scaleBtn[i].innerHTML = '<span style="display:inline-block;width:102%;-webkit-transform:scale(0.8)">' + scaleBtn[i].innerHTML + '</span>';
                if(scaleBtn[i].classList.contains('viewArticle')) {
                    scaleBtn[i].firstChild.style.width = '105px';
                    scaleBtn[i].firstChild.style.position = 'relative';
                    scaleBtn[i].firstChild.style.left = '-4px';
                }
                scaleBtn[i].classList.add('chrome-fixed');
            }
        }
    });
}

//禁止复制：禁止CTRL+A CTRL+C，禁止右键
requirejs(['jquery'],function($) {
    var ctrlkey;
    $('body').on('-contextmenu selectstart',function(e) {
        if(!$(e.target).hasClass('allow-select') && $(e.target).parents('.allow-select').length == 0)
            return false;
    }).on('keydown',function(e){
        if(e.which == 17)
            ctrlkey = true;
        if(e.target.tagName.toLowerCase().match(/textarea|input/)) {
            return;
        }
        if($(e.target).hasClass('allow-select')) {
            return;
        }
        if((e.which ==65/* || e.which ==67*/) && ctrlkey)/*禁用ctr+a,ctr+c*/
            return false;
    }).on('keyup',function(e){
        if(e.which ==17)
            ctrlkey = false;
    });
});
/*鼠标左键点击可以拖动滚动条*/
    requirejs(['jquery'],function(){
        $(document).ready(function() {
            if(!('IE_flags' in window) || !(window.IE_flags == 'IE')) {
                $('.Scroll').each(function () {
                    var $thisScroll = $(this);
                    setTimeout(function waitScroll() {
                        /*判断左键是否按下*/
                        var mouseleftdown = false,
                            scrollFlag = false;
                        /*是否滑动了*/

                        var initY, scrollY,initX;
                        var $container = $('.mCSB_container',$thisScroll);
                        var $thisContainer;
                        if ($container.length == 0) {/*等待滚动条插件初始化完成*/
                            setTimeout(waitScroll, 100);
                            return;
                        }
                        $container.children().not('textarea').on('mousedown touchstart', function (e) {
                            if ((e.type === 'mousedown' && e.which === 1) || e.type === 'touchstart') {
                                e.stopPropagation();
                                initY = e.clientY;
                                initX = e.clientX;
                                mouseleftdown = true;
                                $thisScroll.addClass('mouse_grab');
                                $thisContainer = $container.has(this);
                            }
                        });
                        $(document).on('mousemove', function (e) {
                            if (!mouseleftdown) return;
                            if(!scrollFlag && Math.abs(e.clientY-initY) + Math.abs(e.clientX-initX) < 50) return;
                            scrollFlag = true;
                            scrollY = (e.clientY - initY);
                            if ($thisContainer[0].reqRun === undefined || $thisContainer[0].reqRun === true) {
                                initY = e.clientY;
                                $thisContainer[0].reqRun = false;
                            }
                            $thisScroll.mCustomScrollbar('scrollTo', '+=' + scrollY, {
                                moveDragger: false,
                                timeout: 0
                            });
                        }).on('mouseup touchend', function (e) {
                            if (!mouseleftdown) return;
                            mouseleftdown = false;
                            if ($thisContainer != undefined && $thisContainer.length > 0) {
                                $thisScroll.removeClass('mouse_grab');
                            }
                            e.stopPropagation();
                        });
                        $thisScroll.find('li').filter(function () {
                            return 'click' in ($._data(this, 'events')||{});
                        }).children().on('click', function (e) {
                            if (!scrollFlag) return;
                            scrollFlag = false;
                            e.stopImmediatePropagation();
                        });
                        /*如果滚动，取消点击事件*/

                        /*        $('.Scroll').each(function(index,elem) {
                         var $self = $(this),
                         namespace = 'mCS'+'_'+ (index+1);
                         $self.bind("mousedown."+namespace+" touchstart."+namespace+" pointerdown."+namespace+" MSPointerDown."+namespace+" MSPointerDown."+namespace+' mouseover',function(e){
                         $self.find('#mCSB_1_dragger_vertical').trigger(e.type+'.'+namespace);
                         });
                         })*/
                    }, 100);
                });
            }
        });
    });
