//Alert

document.addEventListener('DOMContentLoaded', function () {
    Noty.overrideDefaults({
        theme: 'limitless',
        layout: 'topRight',
        type: 'alert',
        timeout: 2500
    });
    window.jAlert = {};
    window.jAlert.Status = { Success: "Success", Error: "Error", Warning: "Warning", Info: "Info" };
    window.jAlert.Success = function (message, callback) {
        BoxNotify.Callback = callback;
        BoxNotify.Success(message);
    }
    window.jAlert.Error = function (message, callback) {
        BoxNotify.Callback = callback;
        BoxNotify.Error(message);
    }
    window.jAlert.Warning = function (message, callback) {
        BoxNotify.Callback = callback;
        BoxNotify.Warning(message);
    }

    window.jAlert.Info = function (message, callback) {
        BoxNotify.Callback = callback;
        BoxNotify.Info(message);
    }
    window.jAlert.Notify = function (objCodeStep, callback) {
        BoxNotify.Callback = callback;
        if (objCodeStep.Status == window.jAlert.Status.Success)
            BoxNotify.Success(objCodeStep.Message);
        else if (objCodeStep.Status == window.jAlert.Status.Warning)
            BoxNotify.Warning(objCodeStep.Message);
        else if (objCodeStep.Status == window.jAlert.Status.Error)
            BoxNotify.Error(objCodeStep.Message);
        else if (objCodeStep.Status == window.jAlert.Status.Info)
            BoxNotify.Info(objCodeStep.Message);
    }
});

function jConfirm(caption, message, callback) {
    let swalInit = swal.mixin({
        buttonsStyling: false,
        customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-light'
        }
    });
    swalInit.fire({
        title: caption,
        text: message,
        icon: 'warning',
        confirmButtonText: 'Chấp nhận',
        cancelButtonText: 'Không',
        showCancelButton: true,
        customClass: {
            confirmButton: 'btn btn-danger',
            cancelButton: 'btn btn-light'
        },
        focusConfirm: false
    }).then(function (result) {
        if (result.value) {
            callback(true);
        }
        else if (result.dismiss === swal.DismissReason.cancel) {
            callback(false);
        }
    });
    //$('.swal2-actions').find('button.stc-swal2-close').focus();
}

var BoxNotify = {
    Callback: undefined,
    Success: function (message) {
        let option = {
            text: message,
            type: 'success'
        };
        if (this.Callback != undefined && typeof this.Callback === "function")
            option.callbacks = {
                afterClose: this.Callback
            };
        new Noty(option).show();
    },
    Error: function (message) {
        let option = {
            text: message,
            type: 'error'
        };
        if (this.Callback != undefined && typeof this.Callback === "function")
            option.callbacks = {
                afterClose: this.Callback
            };
        new Noty(option).show();
    },
    Warning: function (message) {
        let option = {
            text: message,
            type: 'warning'
        };
        if (this.Callback != undefined && typeof this.Callback === "function")
            option.callbacks = {
                afterClose: this.Callback
            };
        new Noty(option).show();
    },
    Info: function (message) {
        let option = {
            text: message,
            type: 'info'
        };
        if (this.Callback != undefined && typeof this.Callback === "function")
            option.callbacks = {
                afterClose: this.Callback
            };
        new Noty(option).show();
    },
    /*
     callbacks: {
        beforeShow: function() {},
        onShow: function() {},
        afterShow: function() {},
        onClose: function() {},
        afterClose: function() {},
        onHover: function() {},
        onTemplate: function() {
            this.barDom.innerHTML = '<div class="my-custom-template noty_body">' + this.options.text + '<div>';
            // Important: .noty_body class is required for setText API method.
        }
    }
     * */
};