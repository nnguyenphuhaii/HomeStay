var RoomDetailController = ($scope, $rootScope, $timeout, $filter, ApiHelper, UtilFactory, DataFactory, $q, CommonFactory) => {
    $scope.home = {};
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
    $scope.home.GetAvailableRooms();
}
RoomDetailController.$inject = ["$scope", "$rootScope", "$timeout", "$filter", "ApiHelper", "UtilFactory", "DataFactory", "$q", "CommonFactory"];
addController("RoomDetailController", RoomDetailController);

$('.daterange-time').daterangepicker({
    parentEl: '.content-inner',
    timePicker: true,
    locale: {
        format: 'MM/DD/YYYY h:mm a'
    }
});