/**
 * Created by 吴青龙 on 2014/12/17.
 * 功能：requireJS配置，在调用require.js前调用，其他文件无需再定义require.config
 */
if(typeof require_conf_run != 'object') (function () {
    var scriptEle = document.querySelectorAll("head > script");
    var baseUrl = scriptEle[scriptEle.length - 1].getAttribute("src").replace(/\w+(\.\w+)*$/, '../../app');
    while(baseUrl.match(/\w+\/\.\.\//)) {
        baseUrl = baseUrl.replace(/\w+\/\.\.\//,'');
    }
    requirejs.config({
        nodeIdCompat: 0,
        //By default load any module IDs from js/lib
        waitSeconds: 0,//禁止超时
        baseUrl: baseUrl,
        //except, if the module ID starts with "app",
        //load it from the js/app directory. paths
        //config is relative to the baseUrl, and
        //never includes a ".js" extension sinces
        //the paths config could be for a directory.
        paths: {
           //'jquery': 'http://libs.baidu.com/jquery/1.10.2/jquery.min',
             'jquery': '../bower_components/jquery/dist/jquery',
             'jquery-ui': 'scripts/jquery-ui.min',
            //'jquery-ui': 'http://apps.bdimg.com/libs/jqueryui/1.10.4/jquery-ui.min',
            /*'icheck': 'icheck/icheck.min',
            'ScrollBar': 'jquery.mCustomScrollbar.min',
            'mouseWheel': 'jquery.mousewheel.min',*/
            'recorder': 'FlashWavRecord/recorder',
            'swfobject': 'FlashWavRecord/swfobject',
            /*'circleBar': 'jquery.circliful.min',
            'calendario': 'jquery.calendario',
            'modernizr': 'modernizr.custom.63321',
            'zip': 'jszip.min',*/
            /*'switchButton': 'bootstrap-switch.min',*/
             'bootstrap':'../bower_components/bootstrap/dist/js/bootstrap.min',
            //'bootstrap':'http://libs.baidu.com/bootstrap/3.3.0/js/bootstrap.min',
            /*'respond':'respond',*/
            'jPlayer': 'scripts/jquery-jplayer.min',
           /* 'slick':'slick/1.4.1/slick',
            'imagePicker':'image-picker.min',
            'isLoading':'is-loading/jquery.isloading',
            'SuperSlide':'jquery.SuperSlide.2.1.1',
            'stars':'star-rating',
            'echarts':'echarts-all',
            'pie':'Pie',
            'jtab':'jquery.tabs',
            'history': 'history/v1.8b2/jquery.history',
            'validate':'jquery-validate/jquery.validate',
            'datePicker':'My97DatePicker/WdatePicker',
            'videojs':'videojs/video',*/
            'bootstrap3':'../bower_components/bootstrap/dist/js/bootstrap.min',
          /*  'bootbox':'bootstrap/js/bootbox/bootbox',*/

//      自定义模块
           /* 'scrollTO': '../common/js/ours_mod/scrollto',*/
            'storage': 'scripts/storage',
            /*'submitAnswer': '../common/js/ours_mod/submitAnswer',
            'insertExcise': '../common/js/ours_mod/insertexcise',
            'countWord': '../common/js/ours_mod/count_word',*/
            'audioBar': 'scripts/audio_bar',
            /*'countTime': '../common/js/ours_mod/count_time',*/
            /*'canvas': '../common/js/ours_mod/canvas',*/
            /*'wav2mp3': '../common/js/ours_mod/mp3encoder/recordmp3',*/
            /*'mp3Lame': '../common/js/ours_mod/mp3encoder/libmp3lame',*/
            'audioIE8': 'scripts/audio_ie8',
            /*'ajaxLoading': '../common/js/ours_mod/ajax_loading',
            'dialog': '../common/js/ours_mod/dialog',*/
            'playerController': 'scripts/player_controller',
            /*'editText':'../common/js/ours_mod/editText',
            'waterfall':'../common/js/ours_mod/waterfall_load',*/
            /*'timer':'../gre/js/timer',
            'calculator':'../gre/js/calculator',
            'formSubmitter':'../gre/js/formSubmitter',*/
           /* 'h5record': '../common/js/h5record',*/

//      其他非AMD JS文件
            /*'speakingNoHTML5': '../toefl/speaking/js/speaking'*/
        },
        shim: {
            'jquery-ui': {
                deps: ['jquery']
            },
            'circleBar': {
                deps: ['jquery']
            },
            'calendario': {
                deps: ['jquery']
            },
            'icheck': {
                deps: ['jquery']
            },
            'bootstrap':{
                deps: ['jquery']
            },
            'bootstrap3':{
                deps: ['jquery']
            },
            'ScrollBar':{
                deps: ['jquery']
            },
            'slick':{
                deps: ['jquery']
            },
            'imagePicker':{
                deps: ['jquery']
            },
            'isLoading':{
                deps: ['jquery']
            },

            'SuperSlide':{
                deps: ['jquery']
            },

            'star':{
                deps: ['jquery']
            },
            'jtab':{
                deps: ['jquery']
            },
            'history': {
                deps: ['jquery'],
                exports: 'History'
            },
            'ajaxLoading':{
                deps:['isLoading']
            }
        }
    });
    require_conf_run = {};
})();