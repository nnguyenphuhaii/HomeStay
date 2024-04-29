var RoomDetailController = ($scope, $rootScope, $timeout, $filter, ApiHelper, UtilFactory, DataFactory, $q, CommonFactory) => {
    $scope.home = {};
    $scope.home.roomDetail = {};
    $scope.home.roomName = '';
    $scope.GetRoomDetail = function () {
        CommonFactory.PostDataAjax("/Home/GetRoomDetail", { room_id: room_id },
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
                        $scope.home.roomDetail = response.RoomDetail || [];
                        console.log($scope.home.roomDetail);
                    }
                });

            },
            function (error) {
                jAlert.Error(error.Message);
            }
        );
    };
    $scope.home.checkRoomName = function () {
        switch (room_id) {
            case 1: $scope.home.roomName = 'Phòng Duck';
                break;
            case 2: $scope.home.roomName = 'Phòng Dove';
                break;
            case 3: $scope.home.roomName = 'Phòng Flamingo';
                break;
            case 4: $scope.home.roomName = 'Phòng Sheep';
                break;
            case 5: $scope.home.roomName = 'Phòng Mr. Bean';
                break;
            default: $scope.home.roomName = 'ID phòng chưa được định nghĩa';
                break;
        }
        console.log($scope.home.roomName)
    };
    $scope.GetRoomDetailsByDate = function () {
        CommonFactory.PostDataAjax("/Home/GetRoomDetailsByDate", { room_id: room_id, start_date: moment($scope.Date, "DD/MM/YYYY").format("YYYY-MM-DD"), end_date: moment($scope.Date, "DD/MM/YYYY").format("YYYY-MM-DD") },
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
                        $scope.home.roomDetail = response.RoomDetail || [];
                        for (let i = 0; i < $scope.home.roomDetail.length; i++) {
                            $scope.home.roomDetail[i].start_date = moment($scope.home.roomDetail[i].start_date).format('DD/MM/YYYY');
                            $scope.home.roomDetail[i].end_date = moment($scope.home.roomDetail[i].end_date).format('DD/MM/YYYY');
                        }
                    }
                });
            },
            function (error) {
                jAlert.Error(error.Message);
            }
        );
    };
    $scope.changeDetailByDate = function () {
        var currentDay = moment($('#Date').val(), "DD/MM/YYYY").format("YYYY-MM-DD");
        CommonFactory.PostDataAjax("/Home/GetRoomDetailsByDate", { room_id: room_id, start_date: currentDay, end_date: currentDay },
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
                        $scope.home.roomDetail = response.RoomDetail || [];
                        for (let i = 0; i < $scope.home.roomDetail.length; i++) {
                            $scope.home.roomDetail[i].start_date = moment($scope.home.roomDetail[i].start_date).format('DD/MM/YYYY');
                            $scope.home.roomDetail[i].end_date = moment($scope.home.roomDetail[i].end_date).format('DD/MM/YYYY');
                        }
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
    $scope.home.checkRoomName();
    $scope.fillCurrentDay();
    $scope.GetRoomDetailsByDate();
}
RoomDetailController.$inject = ["$scope", "$rootScope", "$timeout", "$filter", "ApiHelper", "UtilFactory", "DataFactory", "$q", "CommonFactory"];
addController("RoomDetailController", RoomDetailController);

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