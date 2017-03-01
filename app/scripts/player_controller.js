/**
 * Created by Administrator on 2015/8/5.
 */
define(['jquery','jquery-ui'],function($){
    var html = '<div class="player"><div class="player-controller"><span class="fa fa-play-circle ctrl-play"></span>' 
        '<span class="ctrl-currtime" >00:00</span><span class="ctrl-progress"><span class="progress-duration">' +
        '<span class="progress-drag" ></span></span></span><span class="ctrl-duration" >00:00</span></div></div>';

    var Player = function(param){
        var $container = $(param.container);
        var $audio = $(param.audio);
        var $img = $(param.img);
        var state = 'pause';

        if(this instanceof Player){
            this.audio = $audio;
        }

        $container.html(html);
        var $drag = $container.find('.progress-drag');
        var $playBtn = $container.find('.ctrl-play');
        var $currTime = $container.find('.ctrl-currtime');
        var $duration = $container.find('.ctrl-duration');
        var isSlide = false;
        var imgArr;
        var timeArr;
        if($img != undefined && $img.data('img') != undefined && $img.data('time') != undefined){
            imgArr = ($img.attr('src') + ',' +$img.data('img')).trim().split(',').map(function(elem) {
                return elem.trim();
            });
            timeArr = ('0,' + $img.data('time')).trim().split(',').map(function(elem) {
                return Number(elem.trim());
            });
        }
        var $slider = $('.progress-duration',$container).slider({
            change: function(e,ui){
                $drag.css('width',ui.value + '%');
                if(isSlide){
                    $audio.each(function(){
                        this.play();
                        this.currentTime = ui.value/100*this.duration;
                        this.fastSeek && this.fastSeek(ui.value/100*this.duration);
                    });
                    isSlide = false;
                }
            },
            start: function(){
                isSlide = true;
            }
        });

        $audio.on('loadeddata',function(){
            var nDuration = $audio.prop('duration');
            if(nDuration>0){
                var dateDuration = new Date(nDuration*1000);
                var sec = dateDuration.getSeconds();
                var min = dateDuration.getMinutes();
                $duration.text((min<10?'0'+min:min)+":"+(sec<10?'0'+sec:sec));
            }
        }).trigger('loadeddata');

        $playBtn.click(function(){
            if(state == 'pause'){
                $audio.each(function(){this.play()});
            }
            if(state == 'playing'){
                $audio.each(function(){this.pause()});
            }
        });
        var oldIndex = -1;
        $audio.on('timeupdate',function(){
            var nCurrTime = $(this).prop('currentTime');
            var nDuration = $(this).prop('duration');
            var dateDuration = new Date(nDuration*1000);
            var sec = dateDuration.getSeconds();
            var min = dateDuration.getMinutes();
            var currentIndex=oldIndex,imgTime = -1;
            $duration.text((min<10?'0'+min:min)+":"+(sec<10?'0'+sec:sec));
            var dateCurrTime = new Date(nCurrTime*1000);
            sec = dateCurrTime.getSeconds();
            min = dateCurrTime.getMinutes();
            $currTime.text((min<10?'0'+min:min)+":"+(sec<10?'0'+sec:sec));
            if(!isSlide){
                $slider.slider( "value", nCurrTime/nDuration*100 );
            }
            else{
                $drag.css('width',nCurrTime/nDuration*100 + '%');
            }
            $playBtn.addClass('fa-pause').removeClass('fa-play-circle');
            state = 'playing';
            /*�л�ͼƬ*/
            if($img != undefined){
                if(timeArr != undefined && imgArr != undefined && timeArr.length == imgArr.length){
                    $.each(timeArr,function(index,elem) {
                        if(elem !== '' && elem <= $audio[0].currentTime && elem > imgTime){
                            imgTime = elem;
                            currentIndex = index;
                        }
                    });
                    if( currentIndex != oldIndex){
                        oldIndex = currentIndex;
                        $img.fadeOut(500,function() {
                            $img.attr('src',imgArr[currentIndex]).fadeIn(500);
                        });
                    }

                }
            }

        }).on('pause ended',function(){
            $playBtn.removeClass('fa-pause').addClass('fa-play-circle');
            state = 'pause';
        });
    };
    Player.prototype.play = function(){
        this.audio.each(function(){this.play();});
        this.audio.pause(function(){this.pause();});
    };
    return Player;
});