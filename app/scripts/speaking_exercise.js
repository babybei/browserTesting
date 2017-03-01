/**
 * Created by Administrator on 2014/12/23.
 */
/* 口语测试 */
requirejs(
    [ 'jquery', 'audioBar', 'recorder', 'swfobject' ],
    function ($, audioBar) {
        $(document)
            .ready(
            function () {

                // Embedding flash object
                // ---------------------------------------------------------------------------------------------
                var appWidth = 1;
                var appHeight = 1;
                var flashvars = {
                    'upload_image': '/static/toefl/img/upload.png'
                };
                var params = {};
                var attributes = {
                    'id': "recorderApp",
                    'name': "recorderApp"
                };
                swfobject
                    .embedSWF(
                    $('#recordswf').data('url'),
                    "flashcontent", appWidth,
                    appHeight, "11.0.0", "",
                    flashvars, params, attributes);
                var $flashApp = $("#recorderApp");
                var levelStop = 0;
                // Handling FWR events
                // ------------------------------------------------------------------------------------------------
//                var mainDialog = new Dialog({ok: '确定', title: '录音提醒', message: '请确保您的系统正确安装了flash播放器！修复后重启浏览器！'});
//                mainDialog.show();
                window.fwr_event_handler = function fwr_event_handler() {
//                	mainDialog.close(true);
                	$('#no-flashplayer').remove();
                    var name;
                    switch (arguments[0]) {
                        case "no_microphone_found":
                            var dialog = new Dialog({ok: '确定', title: '录音提醒', message: '找不到麦克风，请检查设备是否可用！修复后重启浏览器！'});
                            dialog.show();
                            break;
                        case "microphone_not_connected":
                            var dialog = new Dialog({ok: '确定', title: '录音提醒', message: '找不到麦克风，请检查设备！修复后重启浏览器！'});
                            dialog.show();
                            break;
                        case "ready":
                            FWRecorder.isReady = true;
                            FWRecorder.uploadFormId = "#uploadForm";
                            FWRecorder.uploadFieldName = "audio1.wav";
                            $("#recording").removeClass(
                                "butInvalid");
                            FWRecorder.connect("recorderApp", 0);

                            break;

                        case "microphone_user_request":
                            FWRecorder.showPermissionWindow({
                                permanent: true
                            });
                            $flashApp.addClass("floating");
                            break;

                        case "microphone_connected":
                            FWRecorder.isConnected = true;
                            break;

                        case "permission_panel_closed":
                            FWRecorder.defaultSize();
                            $flashApp.removeClass("floating");
                            break;

                        case "recording":
                            levelStop = 0;
                            FWRecorder.observeLevel();
                            break;

                        case "recording_stopped":
                            levelStop = 1;
                            break;

                        case "observing_level":
                            break;

                        case "microphone_level":
                            var $volumeBar = $(".record-volume-bar");
                            if (!levelStop) {
                                $volumeBar.css({
                                    width: arguments[1] * 100
                                        + '%'
                                });
                            } else {
                                $volumeBar.css({
                                    width: '0px'
                                });
                            }
                            break;

                        case "observing_level_stopped":
                            $volumeBar.css({
                                width: 0
                            });
                            break;

                        case "save_pressed":
                            FWRecorder.updateForm();
                            break;

                        case "saving":
                            name = arguments[1];
                            break;

                        case "saved":
                            name = arguments[1];
                            var response = arguments[2];
                            // saveRecord(response);
                            break;

                        case "save_failed":
                            name = arguments[1];
                            var errorMessage = arguments[2];
                            break;

                        case "save_progress":
                            name = arguments[1];
                            var bytesLoaded = arguments[2];
                            var bytesTotal = arguments[3];
                            break;
                        case "returnMp3Base64":
                            name = arguments[1];
                            recordPost(name);
                            break;
                        default:
                            break;

                    }
                };

                /* 开始录音 */
               /* var aud = $("audio");
                aud.onended = function() {
                    alert("音频播放完成");
                };*/
                $("#recording")
                    .click(
                    function () {
                        if (!$(this).hasClass(
                            "butInvalid")) {
                            FWRecorder.record(
                                'audio',
                                "audio.wav");
                            if (FWRecorder.isConnected) {
                                FWRecorder
                                    .record(
                                    'audio',
                                    "audio.wav");
                                $(this)
                                    .addClass(
                                    "butInvalid");
                                $("#stop")
                                    .removeClass(
                                    "butInvalid");
                            }
                        };
                        
                    });
                /* 停止录音 */
                $("#stop")
                    .click(
                    function () {
                    	
                        if (!$(this).hasClass(
                            "butInvalid")) {
                            FWRecorder
                                .stopRecording("audio");
                            $(this).addClass(
                                "butInvalid");
                            $("#play").removeClass(
                                "butInvalid");
                            $("#js_next")
                                .removeClass(
                                "invalid-continue");
                        }
                     
                    });
                /* 播放录音 */
                $("#play")
                    .click(
                    function () {
                        if (!$(this).hasClass(
                            "butInvalid")
                            && FWRecorder
                                .isMicrophoneAccessible()) {
                            $("#retry")
                                .removeClass(
                                "butInvalid");

                            if ($(this)
                                .text()
                                .indexOf("Play") != -1) {
                                $(this).text(
                                    "Pause");
                                FWRecorder
                                    .playBack('audio');
                            } else if ($(this)
                                .text()
                                .indexOf(
                                "Pause") != -1) {

                                $(this)
                                    .text(
                                    "Play");
                                FWRecorder
                                    .pausePlayBack('audio');
                            }
                        }
                    });
                /* 重新录音 */
                $("#retry")
                    .click(
                    function () {
                        if (!$(this).hasClass(
                            "butInvalid")
                            && FWRecorder
                                .isMicrophoneAccessible()) {
                            FWRecorder
                                .stopPlayBack();
                            $("#recording")
                                .removeClass(
                                "butInvalid");
                            $(this).addClass(
                                "butInvalid");
                            $("#play").addClass(
                                "butInvalid");
                        }
                    })

                /* continue进入下一页面 */
                $("#js_next").click(
                    function () {
                        if (!$("#js_next").hasClass(
                            "invalid-continue")) {
                            FWRecorder.stopPlayBack();
                            /*
                             * FWRecorder
                             * .stopObservingLevel();
                             */
                            ajaxPost();
                        }

                    });
            })

    });

function ajaxPost() {
    var audioArray = (function () {
        var nodes = document.getElementsByTagName('audio'), nodeArr = [], i;
        for (i = 0; i < nodes.length; i++) {
            nodeArr.push(nodes[i]);
        }
        return nodeArr;
    })();
    requirejs([ 'audioIE8' ], function (audioIE8) {
        audioIE8.ready(function () {
            audioArray.forEach(function (elem) {
                if (elem.pause !== undefined)
                    elem.pause();
            });
        });
    });
    var contentDiv = $("#speak-content");
    var step = $("#step").val();
    var u = $("#u").val();
    var timuInp = $("#curTimuId");

    var postData = {};
    postData.u = u;
    postData.step = step;
    if($('#oper_type')){
    	postData.type = $('#oper_type').val();
    }
    // alert(timuInp);
    if (timuInp.length > 0 && timuInp.val().length > 0) {
        postData.timuId = timuInp.val();
    }
    var loadTimu = $("#loadTimu");
    if (loadTimu.length > 0 && loadTimu.val().length > 0) {
        postData.loadTimu = loadTimu.val();
    }
    contentDiv.children().remove();
    // alert(postData.timuId);
    $.ajax({
        type: "POST",
        url: "/exercise/ajaxRequest",
        async: false,
        data: postData,
        success: function (data) {
            var locat = data.match(/<redirect>([\w\W]*?)<\/redirect>/);
            if (Array.isArray(locat) && locat.length > 1) {
                window.location = decodeURIComponent(locat[1]);
            } else {
                postSuccess(data);
            }
        }
    });
}
function postSuccess(data) {

	if(data == 'close'){
		window.close();
		return;
	}
    $("#recorderApp").removeClass("saveButton");
    var contentDiv = $("#speak-content");
    var inDiv = $(data);
    contentDiv.append(inDiv);

    // 判断是否显示continue按钮
    var showContinue = $("#showContinue");
    if (showContinue != null && showContinue.length > 0) {
        var show = showContinue.val();
        if (show == "true") {
            $(".button-top").css("display", "block");
        } else {
            $(".button-top").css("display", "none");
            $(".volumeBig").addClass("volumeSolo");
        }
    } else {
        $(".button-top").css("display", "none");
        $(".volumeBig").addClass("volumeSolo");
    }

    var recordPage = $("#recordPage");
    if (recordPage.length > 0) {
        requirejs([ 'audioIE8' ], function (audioIE8) {
            audioIE8.ready(function () {
                setTimeout(registListener, 1000)
            })
        });
    }

    var timuIndex = $("#timuIndex");
    var timuCount = $("#timuCount");
    if (timuIndex != null && timuIndex.length > 0 && timuIndex.val().length > 0
        && timuCount != null && timuCount.length > 0
        && timuCount.val().length > 0) {
        var index = timuIndex.val();
        $(".quesTitle").text("Question " + index + " of " + timuCount.val());
    } else {
        $(".quesTitle").text("");
    }

    setTimeout(function () {
        var problem = $('.problem');
        if (problem.length > 0) {
            requirejs([ 'audioIE8' ], function (audioIE8) {
                audioIE8.ready(function () {
                    problem[0].play();
                })
            });
        }
    }, 1000);
}

// ----------------------------异步发送录音数据----------------------------------------
function recordPostr(base64Data) {
    var u = $("#u").val();
    var timuId = $("#curTimuId").val();
    $.ajax({
        type: "POST",
        url: "/exercise/voicePost",
        async: false,
        data: {
            u: u,
            timuId: timuId,
            base64: base64Data
        },
        success: function (data) {
            if ('success' != data) {
                var dialog = new Dialog({ok: '确定', title: '录音提醒', message: '对不起，录音失败，请刷新页面，重新录入该题！'});
                dialog.show();
            } else {
                ajaxPost();
            }
        }
    });
}
function recordPost(base64Data) {
    var blob = FWRecorder.getMp3Blob(base64Data);
    var formDt = new FormData();

    var u = $("#u").val();
    var timuInp = $("#curTimuId");

    // alert(timuInp);
    formDt.append('u', u);
    if (timuInp.length > 0 && timuInp.val().length > 0) {
        formDt.append('timuId', timuInp.val());
    }
    formDt.append('audio1.mp3', blob, 'audio1.mp3');
//    ajaxRequest.send(formDt);
    $.ajax({
        type: "POST",
        url: "/exercise/voicePost",
        async: false,
        processData: false,
        contentType: false,
        data: formDt,
        success: function (data) {
            if ('success' != data) {
                var dialog = new Dialog({ok: '确定', title: '录音提醒', message: '对不起，麦克风异常，录音失败，请刷新页面，重新录入该题！'});
                dialog.show();
            } else {
                ajaxPost();
            }
        },
        error: function (data) {
            var dialog = new Dialog({ok: '确定', title: '录音提醒', message: '对不起，请求超时，您可以点击<em>确定</em>手动提交，或者刷新页面，重新录入该题！',okFunction:function(){recordPost(base64Data)}});
            dialog.show();
        },
        timeout: function (data) {
            var dialog = new Dialog({ok: '确定', title: '录音提醒', message: '对不起，请求超时，您可以点击<em>确定</em>手动提交，或者刷新页面，重新录入该题！',okFunction:function(){recordPost(base64Data)}});
            dialog.show();
        }
    });
}

// ------------------------------------------------------------------------------
function saveRecord(path) {
    var u = $("#u").val();
    var timuInp = $("#curTimuId");
    var timuId = '';
    if (timuInp.length > 0 && timuInp.val().length > 0) {
        timuId = timuInp.val();
    }
    var postData = {};
    postData.u = u;
    postData.timuId = timuId;
    postData.path = path;

    $.ajax({
        type: "POST",
        url: "/exercise/recordPost",
        async: false,
        data: postData,
        success: function (data) {
            ajaxPost();
        }
    });
}

function registListener() {
    /* 问题结束时，显示进度条 */
    requirejs(
        [ 'audioBar', 'recorder', 'swfobject' ],
        function (audioBar) {
            var config = {

            }
            var responseTimeMaxVal = $("#responseTime").val();
            if (responseTimeMaxVal <= 0) {
                responseTimeMaxVal = 45;
            }
            var preparationTimeMaxVal = $("#preparationTime").val();
            if (preparationTimeMaxVal <= 0) {
                preparationTimeMaxVal = 15;
            }
            var speakQuestion = document.getElementById("speakQuestion");
            var speakPrepare = document.getElementById("speakPrepare");
            var speakSpeak = document.getElementById("speakSpeak");
            speakQuestion.play();
            $(speakQuestion)
                .on(
                'ended',
                function () {

                    setTimeout(
                        function () {
                            $(".record-bars").css(
                                'display', 'block');
                            speakPrepare.play();
                            $(speakPrepare)
                                .on(
                                'ended',
                                function () {
                                    audioBar
                                        .movingBar({
                                            maxValue: preparationTimeMaxVal,
                                            internalTime: 20,
                                            overValueId: "record-time",
                                            progressBarId: "speak-percent-bar",
                                            ended: function () {
                                                $(
                                                    ".prepare")
                                                    .css(
                                                    "display",
                                                    "none");
                                                $(
                                                    ".speak")
                                                    .css(
                                                    "display",
                                                    "block");
                                                $(
                                                    "#record-percent-num")
                                                    .text(
                                                    "0%");
                                                $(
                                                    "#record-time")
                                                    .text(
                                                        "00:"
                                                        + responseTimeMaxVal);
                                                $(
                                                    "#speak-percent-bar")
                                                    .css(
                                                    "width",
                                                    "0");
                                                speakSpeak
                                                    .play();
                                                $(
                                                    speakSpeak)
                                                    .on(
                                                    'ended',
                                                    function () {
                                                        FWRecorder
                                                            .record(
                                                            'audio1',
                                                            'audio1.wav');
                                                        // levelStop
                                                        // = 0;
                                                        // FWRecorder.observeLevel();
                                                        audioBar
                                                            .movingBar({
                                                                maxValue: responseTimeMaxVal,
                                                                internalTime: 20,
                                                                overValueId: "record-time",
                                                                percentId: "record-percent-num",
                                                                progressBarId: "speak-percent-bar",
                                                                ended: function () {
                                                                    var $flashApp = $("#recorderApp");
                                                                    // levelStop
                                                                    // = 1;
                                                                    // FWRecorder.stopObservingLevel();
                                                                    // 录音结束，进行表单的提交
                                                                    FWRecorder
                                                                        .stopRecording("audio1");
                                                                    // $flashApp.addClass("saveButton");
                                                                    $(
                                                                        ".record-volume-bar")
                                                                        .css(
                                                                        'width',
                                                                        '0');
                                                                    // 提示考生，正在进行口语录音保存
                                                                    $(
                                                                        "#speak-content")
                                                                        .append(
                                                                        "<div class='loading'><i class='icon-spinner icon-spin'></i> 正在保存...</div>");
                                                                    setTimeout(
                                                                        function () {
                                                                            FWRecorder
                                                                                .onConvert2MP3('audio1')
                                                                        },
                                                                        500);
                                                                }
                                                            })
                                                    })

                                            }
                                        })
                                })

                        }, 1000)

                });
        })
}