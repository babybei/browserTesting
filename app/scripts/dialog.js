/**
 * Created by Administrator on 2015/7/22.
 */
var Dialog = function (param) {
    this.param = param;


    /**
     * 展示
     */
    this.show = function () {
        var ad = $('#alert-dialog');
        if (ad && ad.length > 0) {
            ad.css('display', 'block');
        } else {
            createDialogDIV(param);
            ad = $('#alert-dialog');
            ad.css('display', 'block');
        }
    }

    var closeDialog = function (remove) {
        if (remove) {
            $('#alert-dialog').remove();
        } else {
            $('#alert-dialog').css('display', 'none');
        }
    }

    this.close = function(remove){
        closeDialog(remove);
    }

    function createDialogDIV(pams) {

        //边框
        var border = $('<div id="alert-dialog"></div>');
        border.attr('tabindex', '-1');
        border.attr('role', 'dialog');
        border.attr('aria-describedby', 'ui-dialog-time-over');
        border.attr('aria-labelledby', 'ui-id-1');
        border.css('height', 'auto');
        border.css('width', '274.945456887567px');
        border.css('top', '262px');
        border.css('left', '545px');
        border.css('z-index', '101');
        border.css('display', 'none');
        border.addClass('ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-dialog-buttons');

        var titleDiv = $('<div></div>');
        titleDiv.addClass('ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix');
        var span = $('<span id="ui-id-1"></span>');
        span.addClass('ui-dialog-title');
        span.text(pams.title);
        titleDiv.append(span);

        var closeBtn = $('<button></button>');
        closeBtn.attr('type', 'button');
        closeBtn.attr('role', 'button');
        closeBtn.attr('title', 'Close');
        closeBtn.addClass('ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only ui-dialog-titlebar-close');
        closeBtn.click(function () {
            closeDialog(true);
        });
        span = $('<span></span>');
        span.addClass('ui-button-icon-primary ui-icon ui-icon-closethick');
        closeBtn.append(span);
        span = $('<span></span>');
        span.addClass('ui-button-text');
        span.text("Close");
        closeBtn.append(span);
        titleDiv.append(closeBtn);
        border.append(titleDiv);

        var content = $('<div id="ui-dialog-time-over"></div>');
        content.css('width', 'auto');
        content.css('min-height', '27px');
        content.css('max-height', 'none');
        content.css('height', 'auto');
        var p = $('<p></p>');
        p.html(pams.message);
        content.append(p);
        border.append(content);

        if (pams.ok && pams.ok.length > 0 || pams.cancle && pams.cancle.length > 0) {
            var btnDiv = $('<div></div>');
            btnDiv.addClass('ui-dialog-buttonpane ui-widget-content ui-helper-clearfix');
            var cbtnDiv = $('<div></div>');
            cbtnDiv.addClass('ui-dialog-buttonset');
            var okBtn = $('<button></button>');
            okBtn.attr('role', 'button');
            okBtn.attr('type', 'button');
            okBtn.addClass('ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only');
            span = $('<span></span>');
            span.addClass('ui-button-text');
            span.text(pams.ok);
            okBtn.append(span);
            okBtn.click(function () {
                closeDialog(true);
                if (pams.okFunction) {
                    pams.okFunction();
                }
            });
            cbtnDiv.append(okBtn);
            btnDiv.append(cbtnDiv);
            border.append(btnDiv);
        }
        console.log($('body'));
        console.log(border);
        $('body').append(border);
    }
}