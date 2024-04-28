var StepManagerController = ($scope, $rootScope, $timeout, $filter, ApiHelper, UtilFactory, DataFactory, $q, CommonFactory) => {

    //#region declare variable
    $scope.StepManager = {};
    $scope.StepManager.StepsLst = [];
    $scope.StepManager.GetStepByServiceTypeID = {};
    $scope.StepManager.AddStepByServiceTypeID = {};
    $scope.StepManager.GetAllSteps = {};
    $scope.StepManager.AllStepsInDb = [];
    $scope.StepManager.AddStep = {};
    $scope.StepManager.SaveStep = {};
    $scope.StepManager.IsChanged = 0;
    //#endregion

    // Sự kiện xóa Step
    $scope.StepManager.DeleteStep = function (StepID) {
        var curDate = new Date();
        console.log(curDate.getHours() + ":" + curDate.getMinutes());
        curDate = null;
        console.log("Service_Type_ID:", Service_Type_ID);
        console.log("StepID;", StepID);

        $timeout(function () {
            var data = {
                Service_Type_ID: Service_Type_ID,
                StepID: StepID
            };
            UtilJS.Loading.Show();
            CommonFactory.PostDataAjax("/Services/DeleteServiceTypeStep", data,
                function (beforeSend) {
                },
                function (response) {
                    $timeout(function () {
                        UtilJS.Loading.Hide();
                        if (response.objCodeStep.Status == jAlert.Status.Error) {
                            jAlert.Error(response.objCodeStep.Message, 'Thông báo');
                        }
                        else if (response.objCodeStep.Status == jAlert.Status.Warning) {
                            jAlert.Warning(response.objCodeStep.Message, 'Thông báo');
                        }
                        else if (response.objCodeStep.Status == jAlert.Status.Success) {
                            UtilJS.Loading.Hide();
                            new Noty({
                                text: 'Xóa Step thành công!',
                                type: 'success'
                            }).show();
                            $scope.StepManager.GetStepByServiceTypeID(Service_Type_ID);
                        }
                    });
                },
                function (error) {
                    UtilJS.Loading.Hide();
                }
            );
        }, 100);
    }

    // Sự kiện khi đóng Popup
    $scope.StepManager.CloseModal = function () {
        if ($scope.StepManager.IsChanged == 1) {
            $scope.StepManager.GetStepByServiceTypeID(Service_Type_ID);
            $scope.StepManager.IsChanged == 0;
        }
    };

    // Lưu Step vừa thêm
    $scope.StepManager.SaveStep = function () {
        if ($scope.StepManager.StepSelected == null && $scope.StepManager.NewStepName == undefined) {
            new Noty({
                text: "Phải có tên Step mới!!!",
                type: 'warning'
            }).show();
            return 0;
        }

        if ($scope.StepManager.NewStepName == undefined) {
            $scope.StepManager.AddStepByServiceTypeID(Service_Type_ID, 0, $scope.StepManager.StepSelected);
        } else {
            $scope.StepManager.AddStepByServiceTypeID(Service_Type_ID, 1, $scope.StepManager.NewStepName);
        }
    };

    //Hàm lấy tất cả bước trong DB
    $scope.StepManager.GetAllSteps = function () {
        $timeout(function () {
            UtilJS.Loading.Show();
            CommonFactory.PostDataAjax("/Services/GetAllSteps", {},
                function (beforeSend) {
                },
                function (response) {
                    $timeout(function () {
                        UtilJS.Loading.Hide();
                        if (response.objCodeStep.Status == jAlert.Status.Error) {
                            jAlert.Error(response.objCodeStep.Message, 'Thông báo');
                        }
                        else if (response.objCodeStep.Status == jAlert.Status.Warning) {
                            jAlert.Warning(response.objCodeStep.Message, 'Thông báo');
                        }
                        else if (response.objCodeStep.Status == jAlert.Status.Success) {
                            UtilJS.Loading.Hide();
                            $scope.StepManager.AllStepsInDb = response.ListSteps || [];

                            var curDate = new Date();
                            console.log(curDate.getHours() + ":" + curDate.getMinutes(), $scope.StepManager.AllStepsInDb);
                            curDate = null;
                        }
                    });
                },
                function (error) {
                    UtilJS.Loading.Hide();
                }
            );
        }, 100);
    };

    //Sự kiện khi bấm vào nút thêm Step
    $scope.StepManager.AddStep = function () {
        if ($scope.StepManager.AllStepsInDb.length == 0) {
            $scope.StepManager.GetAllSteps();
        }
        $timeout(function () {
            $('.select').select2();
        }, 500);
    };

    // Thêm Step vào Loại dịch vụ theo Service Type ID
    $scope.StepManager.AddStepByServiceTypeID = function (Service_Type_ID, Status, StepIn4) {
        $timeout(function () {
            switch (Status) {
                case 0:
                    var data = {
                        Service_Type_ID: Service_Type_ID,
                        StepID: StepIn4
                    };
                    UtilJS.Loading.Show();
                    CommonFactory.PostDataAjax("/Services/AddExistStepToServiceType", data,
                        function (beforeSend) {
                        },
                        function (response) {
                            $timeout(function () {
                                UtilJS.Loading.Hide();
                                if (response.objCodeStep.Status == jAlert.Status.Error) {
                                    jAlert.Error(response.objCodeStep.Message, 'Thông báo');
                                }
                                else if (response.objCodeStep.Status == jAlert.Status.Warning) {
                                    jAlert.Warning(response.objCodeStep.Message, 'Thông báo');
                                }
                                else if (response.objCodeStep.Status == jAlert.Status.Success) {
                                    UtilJS.Loading.Hide();
                                    new Noty({
                                        text: 'Lưu hợp đồng thành công!',
                                        type: 'success'
                                    }).show();
                                    $scope.StepManager.IsChanged = 1;
                                }
                            }, 100);
                        },
                        function (error) {
                            UtilJS.Loading.Hide();
                        }
                    );
                    break;
                case 1:
                    var data = {
                        Service_Type_ID: Service_Type_ID,
                        StepName: StepIn4
                    };
                    UtilJS.Loading.Show();
                    CommonFactory.PostDataAjax("/Services/AddNewStepToServiceType", data,
                        function (beforeSend) {
                        },
                        function (response) {
                            $timeout(function () {
                                UtilJS.Loading.Hide();
                                if (response.objCodeStep.Status == jAlert.Status.Error) {
                                    jAlert.Error(response.objCodeStep.Message, 'Thông báo');
                                }
                                else if (response.objCodeStep.Status == jAlert.Status.Warning) {
                                    jAlert.Warning(response.objCodeStep.Message, 'Thông báo');
                                }
                                else if (response.objCodeStep.Status == jAlert.Status.Success) {
                                    UtilJS.Loading.Hide();
                                    new Noty({
                                        text: 'Lưu hợp đồng thành công!',
                                        type: 'success'
                                    }).show();
                                    $scope.StepManager.IsChanged = 1;
                                    $scope.StepManager.GetAllSteps();
                                }
                            }, 100);
                        },
                        function (error) {
                            UtilJS.Loading.Hide();
                        }
                    );
                    break;
            }
        }, 100);
    }

    //Get Step By Service Type ID
    $scope.StepManager.GetStepByServiceTypeID = function (Service_Type_ID) {
        $timeout(function () {
            var data = { Service_Type_ID: Service_Type_ID };
            UtilJS.Loading.Show();
            CommonFactory.PostDataAjax("/Services/SearchSteps", data,
                function (beforeSend) {
                },
                function (response) {
                    $timeout(function () {
                        UtilJS.Loading.Hide();
                        if (response.objCodeStep.Status == jAlert.Status.Error) {
                            jAlert.Error(response.objCodeStep.Message, 'Thông báo');
                        }
                        else if (response.objCodeStep.Status == jAlert.Status.Warning) {
                            jAlert.Warning(response.objCodeStep.Message, 'Thông báo');
                        }
                        else if (response.objCodeStep.Status == jAlert.Status.Success) {
                            UtilJS.Loading.Hide();
                            $scope.StepManager.StepsLst = response.ListSteps || [];
                        }
                    }, 100);
                },
                function (error) {
                    UtilJS.Loading.Hide();
                }
            );
        }, 100);
    };

    //Execute    
    $scope.StepManager.GetStepByServiceTypeID(Service_Type_ID);
}
StepManagerController.$inject = ["$scope", "$rootScope", "$timeout", "$filter", "ApiHelper", "UtilFactory", "DataFactory", "$q", "CommonFactory"];
addController("StepManagerController", StepManagerController);
