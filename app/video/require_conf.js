/**
 * Created by 吴青龙 on 2014/12/17.
 * 功能：requireJS配置，在调用require.js前调用，其他文件无需再定义require.config
 */
if(typeof require_conf_run != 'object') (function () {
    var scriptEle = document.querySelectorAll("head > script");
    var baseUrl = scriptEle[scriptEle.length - 1].getAttribute("src").replace(/\w+(\.\w+)*$/, '../../');
    while(baseUrl.match(/\w+\/\.\.\//)) {
        baseUrl = baseUrl.replace(/\w+\/\.\.\//,'');
    }
    requirejs.config({
        nodeIdCompat: 0,
        waitSeconds: 0,//禁止超时
        baseUrl: baseUrl,
        paths: {
             'jquery': '../bower_components/jquery/dist/jquery',
             'jquery-ui': 'video/jquery-ui.min',
            'recorder': 'FlashWavRecord/recorder',
            'swfobject': 'FlashWavRecord/swfobject',
             'bootstrap':'../bower_components/bootstrap/dist/js/bootstrap.min',
            'jPlayer': 'video/jquery-jplayer.min',

//      自定义模块
            'audioBar': 'video/audio_bar',
            'audioIE8': 'video/audio_ie8',
            'playerController': 'video/player_controller'
        },
        shim: {
            'jquery-ui': {
                deps: ['jquery']
            },
            'bootstrap':{
                deps: ['jquery']
            }
        }
    });
})();