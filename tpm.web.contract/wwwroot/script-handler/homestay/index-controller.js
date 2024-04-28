var IndexController = ($scope, $rootScope, $timeout, $filter, ApiHelper, UtilFactory, DataFactory, $q, CommonFactory) => {
    $scope.home = {}
    $scope.home.roomInfo = [
        {
            RoomID: 1,
            RoomName: "Duck",
            Status: 0,
            Note: "string"
        },
        {
            RoomID: 2,
            RoomName: "Dove",
            Status: 1,
            Note: "string"
        },
        {
            RoomID: 3,
            RoomName: "Flamingo",
            Status: 0,
            Note: "string"
        },
        {
            RoomID: 4,
            RoomName: "Sheep",
            Status: 0,
            Note: "string"
        },
        {
            RoomID: 5,
            RoomName: "Mr Bean",
            Status: 1,
            Note: "string"
        }
    ]
}
IndexController.$inject = ["$scope", "$rootScope", "$timeout", "$filter", "ApiHelper", "UtilFactory", "DataFactory", "$q", "CommonFactory"];
addController("IndexController", IndexController);

//#region DatePicker
var DateTimePickers = function () {

    const _componentDaterange = function () {
        if (!$().daterangepicker) {
            console.warn('Warning - daterangepicker.js is not loaded.');
            return;
        }

        $('.daterange-basic').daterangepicker({
            parentEl: '.content-inner'
        });

        $('.daterange-single').daterangepicker({
            parentEl: '.content-inner',
            singleDatePicker: true
        });
    };

    const _componentDatepicker = function () {
        if (typeof Datepicker == 'undefined') {
            console.warn('Warning - datepicker.min.js is not loaded.');
            return;
        }

        $('.datepicker-basic').each(function () {
            new Datepicker(this, {
                container: '.content-inner',
                buttonClass: 'btn',
                prevArrow: document.dir == 'rtl' ? '&rarr;' : '&larr;',
                nextArrow: document.dir == 'rtl' ? '&larr;' : '&rarr;',
                format: 'dd/mm/yyyy'
            });
        });
    };

    return {
        init: function () {
            _componentDaterange();
            _componentDatepicker();
        }
    }
}();

jQuery(function ($) {
    $.datepicker.regional["vi-VN"] =
    {
        closeText: "Đóng",
        prevText: "Trước",
        nextText: "Sau",
        currentText: "Hôm nay",
        monthNames: ["Tháng một", "Tháng hai", "Tháng ba", "Tháng tư", "Tháng năm", "Tháng sáu", "Tháng bảy", "Tháng tám", "Tháng chín", "Tháng mười", "Tháng mười một", "Tháng mười hai"],
        monthNamesShort: ["Một", "Hai", "Ba", "Bốn", "Năm", "Sáu", "Bảy", "Tám", "Chín", "Mười", "Mười một", "Mười hai"],
        dayNames: ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"],
        dayNamesShort: ["CN", "Hai", "Ba", "Tư", "Năm", "Sáu", "Bảy"],
        dayNamesMin: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
        weekHeader: "Tuần",
        dateFormat: "dd/mm/yy",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
    };

    $.datepicker.setDefaults($.datepicker.regional["vi-VN"]);
});

document.addEventListener('DOMContentLoaded', function () {
    DateTimePickers.init();
});
//#endregion