var ProgressController = ($scope, $rootScope, $timeout, $filter, ApiHelper, UtilFactory, DataFactory, $q, CommonFactory) => {
    //#region declare variable
    $scope.Progress = {};

    $scope.Progress.BasicContractInfo = [];
    $scope.Progress.FillBasicContractInfo = {};

    $scope.Progress.ServiceList = [];
    $scope.Progress.LoadServiceList = {};

    $scope.Progress.ProgressTable = [];
    $scope.Progress.ProgressRes = [];
    $scope.Progress.FillProgressTable = {};
    $scope.Progress.ContractProgress = 0;
    $scope.Progress.TotalProgressCaculate = {};
    $scope.Progress.ProgressByServiceCaculate = {};

    $scope.Progress.IsOverdue = {};

    $scope.Progress.ChangeStatus = {};
    //#endregion

    //Fill Basic Info
    $scope.Progress.FillBasicContractInfo = function (ContractID) {
        try {
            var data = { ContractID: ContractID };
            UtilJS.Loading.Show();
            CommonFactory.PostDataAjax("/Contracts/GetTab1ContentByContractID", data,
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
                            response.Tab1Content[0].Contract_Type_ID = Number(response.Tab1Content[0].Contract_Type_ID);
                            $scope.Progress.BasicContractInfo = response.Tab1Content[0] || [];
                            console.log("Info: ", $scope.Progress.BasicContractInfo);
                        }
                    });
                },
                function (error) {
                    UtilJS.Loading.Hide();
                }
            );
        } catch (error) {
            console.log(error.message);
        }
    };

    //Load Service List
    $scope.Progress.LoadServiceList = function (ContractID) {
        try {
            var data = { ContractID: ContractID };
            UtilJS.Loading.Show();
            CommonFactory.PostDataAjax("/Contracts/GetTab2DetailByContractIDToEdit", data,
                function (beforeSend) {
                    $scope.Progress.ServiceList = [];
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
                            $scope.Progress.ServiceList = response.Tab2ContentToEdit || [];
                            console.log("Service List: ", $scope.Progress.ServiceList);
                        }
                    });
                },
                function (error) {
                    UtilJS.Loading.Hide();
                }
            );
        } catch (error) {
            console.log(error.message);
        }
    };

    //Fill Progress Table
    $scope.Progress.FillProgressTable = function () {
        try {
            var data = { ContractID: ContractID };
            UtilJS.Loading.Show();
            CommonFactory.PostDataAjax("/Contracts/GetTab3ContentByContractIDToEdit", data,
                function (beforeSend) {
                    $scope.Progress.ProgressTable = [];
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
                            $scope.Progress.ProgressRes = response.Tab3Content || [];
                            console.log("Response nhận về: ", $scope.Progress.ProgressRes);

                            var content = {};
                            content.Contract_ID = $scope.Progress.ProgressRes[0].Contract_ID;
                            content.Service_Type = [];

                            $timeout(function () {
                                for (let i = 0; i < $scope.Progress.ServiceList.length; i++) {
                                    var STTemp = {};
                                    STTemp.Service_Type_ID = $scope.Progress.ServiceList[i].Service_Type_ID;
                                    STTemp.Name = $scope.Progress.ServiceList[i].Name;
                                    STTemp.Progress = 0;
                                    content.Service_Type.push(STTemp);
                                }
                            }, 200);
                            $timeout(function () {
                                for (let i = 0; i < $scope.Progress.ServiceList.length; i++) {
                                    content.Service_Type[i].StepDetail = [];
                                    for (let j = 0; j < $scope.Progress.ProgressRes.length; j++) {
                                        if ($scope.Progress.ProgressRes[j].Name == content.Service_Type[i].Name) {
                                            let StepDetail = {};
                                            StepDetail.StepID = $scope.Progress.ProgressRes[j].StepID;
                                            if ($scope.Progress.ProgressRes[j].Custom_Name != null) {
                                                StepDetail.StepName = $scope.Progress.ProgressRes[j].Custom_Name;
                                            }
                                            else {
                                                StepDetail.StepName = $scope.Progress.ProgressRes[j].StepName;
                                            }
                                            StepDetail.Completion_Date = moment($scope.Progress.ProgressRes[j].Completion_Date).format("DD/MM/YYYY");
                                            StepDetail.EmployeeID = $scope.Progress.ProgressRes[j].EmployeeID;
                                            StepDetail.FullName = $scope.Progress.ProgressRes[j].FullName;
                                            StepDetail.Status_ID = $scope.Progress.ProgressRes[j].Status_ID;
                                            StepDetail.Detail_ID = $scope.Progress.ProgressRes[j].Detail_ID;
                                            let CurrentDate = moment();
                                            StepDetail.Priority = moment(StepDetail.Completion_Date, 'DD/MM/YYYY').diff(CurrentDate, 'minutes');

                                            content.Service_Type[i].StepDetail.push(StepDetail);
                                        }
                                    }
                                }

                                $scope.Progress.ProgressTable = content.Service_Type;
                                //console.log("Progress Table: ", $scope.Progress.ProgressTable);

                                $scope.Progress.ProgressByServiceCaculate();

                                for (let i = 0; i < $scope.Progress.ProgressTable.length; i++) {
                                    $scope.Progress.ProgressTable[i].StepDetail = _.sortBy($scope.Progress.ProgressTable[i].StepDetail, 'Priority');
                                }

                                //Sắp xếp lại sanh sách các bước
                                //var ProgressTableSort = [];
                                //for (let i = 0; i < $scope.Progress.ProgressTable.length; i++) {
                                //    let temp = {};
                                //    temp.Name = $scope.Progress.ProgressTable[i].Name;
                                //    temp.Progress = $scope.Progress.ProgressTable[i].Progress;
                                //    temp.Service_Type_ID = $scope.Progress.ProgressTable[i].Service_Type_ID;
                                //    temp.StepDetail = _.sortBy($scope.Progress.ProgressTable[i].StepDetail, 'Priority');
                                //    ProgressTableSort.push(temp);
                                //}
                                //$scope.Progress.ProgressTable = ProgressTableSort;

                            }, 200);
                        }
                    });
                },
                function (error) {
                    UtilJS.Loading.Hide();
                }
            );
        } catch (error) {
            console.log(error.message);
        }
    };

    //Check if Step was Overdue
    $scope.Progress.IsOverdue = function (dateString) {
        // Chuyển đổi dateString từ DD/MM/YYYY sang đối tượng Moment
        var completionDate = moment(dateString, "DD/MM/YYYY");

        // Tạo đối tượng Moment cho ngày hiện tại và reset thời gian
        var today = moment().startOf('day'); // Reset ngày hiện tại về 00:00:00

        // So sánh và trả về kết quả
        //console.log(completionDate.isBefore(today));
        return completionDate.isBefore(today);
    };

    //Khởi tạo Lại Tooltip sau mỗi lần Cập Nhật DOM
    $scope.$watch('Progress.ProgressTable', function () {
        $timeout(function () {
            $('[data-bs-popup="tooltip"]').tooltip();
        });
    }, true);

    //Progress By Service Caculate
    $scope.Progress.ProgressByServiceCaculate = function () {
        //Tính tiến độ theo từng dịch vụ
        for (let i = 0; i < $scope.Progress.ProgressTable.length; i++) {
            let countIfStepStatusIDIs1 = 0;
            for (let j = 0; j < $scope.Progress.ProgressTable[i].StepDetail.length; j++) {
                if ($scope.Progress.ProgressTable[i].StepDetail[j].Status_ID === 1) {
                    countIfStepStatusIDIs1++;
                }
            }
            $scope.Progress.ProgressTable[i].Progress = (100 * countIfStepStatusIDIs1 / $scope.Progress.ProgressTable[i].StepDetail.length).toFixed(2);
        }
        console.log("Progress Table: ", $scope.Progress.ProgressTable);
    };

    //Change Status when click on Step
    $scope.Progress.ChangeStatus = function (Contract_ID, Service_Type_ID, Detail_ID) {
        //console.log("ContractID: ", Contract_ID);
        //console.log("Service_Type_ID: ", Service_Type_ID);
        //console.log("StepID: ", Step_ID);
        console.log("Detail_ID: ", Detail_ID);
        //var StepInfo = { Contract_ID: Contract_ID, Service_Type_ID: Service_Type_ID, Step_ID: Step_ID };
        var StepInfo = { Contract_ID: Contract_ID, Detail_ID: Detail_ID };

        try {
            UtilJS.Loading.Show();
            CommonFactory.PostDataAjax("/Contracts/ChangeStatus", StepInfo,
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
                            //location.reload();
                            new Noty({
                                text: 'Đổi trạng thái thành công!',
                                type: 'success'
                            }).show();
                            var now = new Date();
                            //$scope.Progress.FillProgressTable();

                            // Tìm và cập nhật Step cần thiết
                            var service = $scope.Progress.ProgressTable.find(s => s.Service_Type_ID === Service_Type_ID);
                            if (service && service.StepDetail) {
                                var step = service.StepDetail.find(sd => sd.Detail_ID === Detail_ID);
                                if (step) {
                                    step.Status_ID = step.Status_ID === 0 ? 1 : 0; // Đổi giá trị của Status_ID
                                }
                            }

                            var stepInResponse = $scope.Progress.ProgressRes.find(s => s.Detail_ID === Detail_ID);
                            if (stepInResponse) {
                                stepInResponse.Status_ID = stepInResponse.Status_ID === 0 ? 1 : 0;
                            }
                        }
                    });
                },
                function (error) {
                    UtilJS.Loading.Hide();
                }
            );
        } catch (error) {
            console.log(error.message);
        }
    };

    //Hàm tính tổng tiến độ
    $scope.$watch('Progress.ProgressTable', function () {
        //Đếm số Response có Status_ID = 1
        var Status_IdCount = 0;
        for (let i = 0; i < $scope.Progress.ProgressRes.length; i++) {
            if ($scope.Progress.ProgressRes[i].Status_ID == 1) {
                Status_IdCount++;
            }
        }
        $scope.Progress.ContractProgress = (100 * Status_IdCount / $scope.Progress.ProgressRes.length).toFixed(2);

        $scope.Progress.ProgressByServiceCaculate();
    }, true);

    //Execute
    $scope.Progress.FillBasicContractInfo(ContractID);
    $scope.Progress.LoadServiceList(ContractID);
    $scope.Progress.FillProgressTable();
}
ProgressController.$inject = ["$scope", "$rootScope", "$timeout", "$filter", "ApiHelper", "UtilFactory", "DataFactory", "$q", "CommonFactory"];
addController("ProgressController", ProgressController);
