var RoomDetailController = ($scope, $rootScope, $timeout, $filter, ApiHelper, UtilFactory, DataFactory, $q, CommonFactory) => {
    $scope.home = {};
    $scope.home.roomDetail = {};
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
    $scope.GetRoomDetail();
}
RoomDetailController.$inject = ["$scope", "$rootScope", "$timeout", "$filter", "ApiHelper", "UtilFactory", "DataFactory", "$q", "CommonFactory"];
addController("RoomDetailController", RoomDetailController);
