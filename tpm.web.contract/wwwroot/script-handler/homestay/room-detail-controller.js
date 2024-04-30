var RoomDetailController = ($scope, $rootScope, $timeout, $filter, ApiHelper, UtilFactory, DataFactory, $q, CommonFactory) => {
    $scope.home = {};
    $scope.booking = {};
    $scope.home.roomDetail = {};
    $scope.home.roomName = '';
    $scope.home.roomInfo = [];
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
    $scope.setupPopup = function () {
        $timeout(function () {
            $('#RoomSelector').select2();
            $('#RoomSelector').val(0).trigger('change');
        }, 100);
    };
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
    $scope.convertTo24Hour = function (time) {
        // Tách giờ và phút từ chuỗi thời gian
        var splitTime = time.split(':');
        var hour = parseInt(splitTime[0]);
        var minute = parseInt(splitTime[1]);

        // Nếu là PM và không phải 12 giờ, thì thêm 12 giờ
        if (time.toLowerCase().includes('pm') && hour !== 12) {
            hour += 12;
        }

        // Nếu là AM và là 12 giờ, thì giảm 12 giờ
        if (time.toLowerCase().includes('am') && hour === 12) {
            hour = 0;
        }

        // Định dạng lại giờ và phút
        var formattedHour = (hour < 10) ? '0' + hour : hour;
        var formattedMinute = (minute < 10) ? '0' + minute : minute;

        // Trả về chuỗi thời gian 24 giờ
        return formattedHour + ':' + formattedMinute;
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
        currentDay = null;
    };
    $scope.fillCurrentDay = function () {
        var currentDateFormatted = moment().format('DD/MM/YYYY');
        $scope.Date = currentDateFormatted;
    }
    $scope.booking.book = function () {
        var [start_date, start_time, end_date, end_time] = $scope.booking.dateRangeBooking.match(/\d{2}\/\d{2}\/\d{4}|(?<=\d{4} )\d{1,2}:\d{2} (am|pm)/g);   
        console.log('.')
        CommonFactory.PostDataAjax("/Home/RoomBooking", { room_id: $scope.booking.roomSelected, start_date: start_date, end_date: end_date, start_time: $scope.convertTo24Hour(start_time), end_time: $scope.convertTo24Hour(end_time), guest_name: $scope.booking.guest_name, note: $scope.booking.note },
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
                        jAlert.Success(response.objCodeStep.Message);
                    }
                });
            },
            function (error) {
                jAlert.Error(error.Message);
            }
        );
    };
    $scope.home.checkRoomName();
    $scope.fillCurrentDay();
    $scope.GetRoomDetailsByDate();
    $scope.home.GetAvailableRooms();
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

        $('.daterange-time').daterangepicker({
            parentEl: '.content-inner',
            timePicker: true,
            locale: {
                format: 'MM/DD/YYYY h:mm a'
            }
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