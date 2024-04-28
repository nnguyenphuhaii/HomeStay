var IndexController = ($scope, $rootScope, $timeout, $filter, ApiHelper, UtilFactory, DataFactory, $q, CommonFactory) => {
    $scope.home = {}
    $scope.home.GetAvailableRooms = function () {
        CommonFactory.PostDataAjax("/Home/GetAvailableRooms", {},
            function (beforeSend) {
            },
            function (response) {
                $timeout(function () {
                    if (response.objCodeStep.Status == jAlert.Status.Error) {
                        jAlert.Error(response.objCodeStep.Message);
                    }
                    else if (response.objCodeStep.Status == jAlert.Status.Warning) {
                        jAlert.Warning(response.objCodeStep.Message);
                    }
                    else if (response.objCodeStep.Status == jAlert.Status.Success) {
                        $scope.home.roomInfo = response.AvailableRooms || [];
                    }
                });

            },
            function (error) {
                jAlert.Error(error.Message);
            }
        );
    };
    $scope.fillCurrentDay = function () {
        var currentDateFormatted = moment().format('DD/MM/YYYY');
        $scope.Date = currentDateFormatted;
    }
    $scope.home.GetAvailableRooms();
    $scope.fillCurrentDay();
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

document.addEventListener('DOMContentLoaded', function () {
    DateTimePickers.init();
});
//#endregion