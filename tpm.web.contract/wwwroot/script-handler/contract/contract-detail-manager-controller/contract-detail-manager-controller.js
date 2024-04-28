var ContractDetailManagerController = ($scope, $rootScope, $timeout, $filter, ApiHelper, UtilFactory, DataFactory, $q, CommonFactory) => {
    //#region declare variable
    $scope.ContractDetail = {};
    $scope.ContractDetail.Pager = { TotalItems: 0, PageSize: 20, CurrentPage: 1 };
    $scope.ContractDetail.Search = {};
    $scope.ContractDetail.Search.Paging = function (intPage) {
        intPage = !intPage ? 1 : intPage;
        $scope.ContractDetail.Pager.CurrentPage = intPage;
        //$scope.ContractDetail.Search.InitData(intPage);
        //$scope.ContractDetail.Search.SearchContract(intPage);
        //$scope.ContractDetail.FillProgressTable(intPage);
        $scope.ContractDetail.Filter(intPage);
    };
    $scope.ContractDetail.ProgressTable = [];
    $scope.ContractDetail.FillProgressTable = {};
    $scope.ContractDetail.ChangeStatus = {};
    $scope.ContractDetail.LoadFilterContent = {};
    $scope.ContractDetail.ContractStatusFilter = [];
    $scope.ContractDetail.ServiceTypeFilter = [];
    $scope.ContractDetail.EmployeeFullNameFilter = [];
    $scope.selectedItems = {
        contractStatus: {},
        serviceTypeID: {},
        employeeID: {}
    };
    //#endregion

    // Filter
    $scope.ContractDetail.Filter = function (intPage) {
        console.log("Selected Items: ", $scope.selectedItems);
        var ContractStatusFilter = [];
        var filterMaterial = {
            PageSize: $scope.ContractDetail.Pager.PageSize,
            PageIndex: intPage,
            statusID: {},
            serviceTypeID: {},
            employeeID: {}
        };

        filterMaterial.serviceTypeID = Object.keys($scope.selectedItems.serviceTypeID).filter(key => $scope.selectedItems.serviceTypeID[key] === true).map(function (key) {
            return parseInt(key);
        });
        filterMaterial.statusID = Object.keys($scope.selectedItems.contractStatus).filter(key => $scope.selectedItems.contractStatus[key] === true).map(function (key) {
            switch (key) {
                case 'completed':
                    return 1;
                case 'notCompleted':
                    return 0;
            }
        });
        // filterMaterial.contractStatus = Object.keys($scope.selectedItems.contractStatus);
        // filterMaterial.serviceTypeID = Object.keys($scope.selectedItems.serviceTypeID);
        filterMaterial.employeeID = Object.keys($scope.selectedItems.employeeID).filter(key => $scope.selectedItems.employeeID[key] === true);

        console.log("filterMaterial", filterMaterial);

        CommonFactory.PostDataAjax("/Contracts/ContractDetailFilter", filterMaterial,
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
                        //$scope.ContractDetail.ProgressTable = response.ContractsDetail || [];
                        console.log("Response ban đầu: ", response.ContractsDetail);

                        if (response.ContractsDetail.length !== 0) {
                            $scope.ContractDetail.Pager.TotalItems = response.ContractsDetail[0].TotalRecords || 0;
                        } else {
                            $scope.ContractDetail.Pager.TotalItems = 0;
                        }

                        var responseMerged = [];

                        response.ContractsDetail.forEach(currentContract => {
                            const existingContract = responseMerged.find(contract =>
                                contract.Contract_ID === currentContract.Contract_ID &&
                                contract.Contract_Number === currentContract.Contract_Number &&
                                contract.Representative === currentContract.Representative &&
                                contract.SignedEmployeeName === currentContract.SignedEmployeeName &&
                                contract.Value === currentContract.Value &&
                                contract.ServiceProcess === currentContract.ServiceProcess
                            );

                            const serviceDetails = {
                                Completion_Date: moment(currentContract.Completion_Date).format("DD/MM/YYYY"),
                                Custom_Name: currentContract.Custom_Name,
                                Detail_ID: currentContract.Detail_ID,
                                Status_ID: currentContract.Status_ID,
                                EmployeeID: currentContract.EmployeeID,
                                FullName: currentContract.FullName,
                                StepName: currentContract.StepName,
                                // Add other properties here
                            };

                            if (existingContract) {
                                const existingService = existingContract.Detail.find(service =>
                                    service.Service_Type_ID === currentContract.Service_Type_ID &&
                                    service.Name === currentContract.Name
                                );

                                if (existingService) {
                                    existingService.Details.push(serviceDetails);
                                } else {
                                    existingContract.Detail.push({
                                        Service_Type_ID: currentContract.Service_Type_ID,
                                        Name: currentContract.Name,
                                        Details: [serviceDetails]
                                    });
                                }
                            } else {
                                responseMerged.push({
                                    Contract_ID: currentContract.Contract_ID,
                                    Contract_Number: currentContract.Contract_Number,
                                    Representative: currentContract.Representative,
                                    SignedEmployeeName: currentContract.SignedEmployeeName,
                                    Host: currentContract.Host,
                                    Path: currentContract.Path,
                                    Value: currentContract.Value,
                                    ServiceProcess: currentContract.ServiceProcess,
                                    Detail: [{
                                        Service_Type_ID: currentContract.Service_Type_ID,
                                        Name: currentContract.Name,
                                        Details: [serviceDetails]
                                    }]
                                });
                            }
                        });

                        var delDetail = [];

                        responseMerged.forEach(contract => {
                            contract.Detail.forEach(detail => {
                                delDetail.push({
                                    Contract_ID: contract.Contract_ID,
                                    Contract_Number: contract.Contract_Number,
                                    Representative: contract.Representative,
                                    SignedEmployeeName: contract.SignedEmployeeName,
                                    Host: contract.Host,
                                    Path: contract.Path,
                                    Value: contract.Value,
                                    ServiceProcess: contract.ServiceProcess,
                                    Name: detail.Name,
                                    Service_Type_ID: detail.Service_Type_ID,
                                    Details: detail.Details
                                });
                            });
                        });

                        var temp = [];
                        delDetail.forEach(detail => {
                            if (temp.length === 0 || !temp.includes(detail.Contract_ID)) {
                                temp.push(detail.Contract_ID);
                                detail.isRowspan = true;
                                detail.rowspan = delDetail.filter(d => d.Contract_ID === detail.Contract_ID).length;
                            } else {
                                detail.isRowspan = false;
                            }
                        });

                        delDetail.sort((a, b) => a.Contract_ID - b.Contract_ID);

                        $scope.ContractDetail.ProgressTable = delDetail;

                        // Dọn dẹp biến tạm
                        responseMerged = [];
                        delDetail = [];
                        temp = [];

                    }
                });
            },
            function (error) {
                UtilJS.Loading.Hide();
            }
        );
    }

    //Load nội dung của 3 list filter
    $scope.ContractDetail.LoadFilterContent = function () {
        $('.select').select2();
        //Load nội dung list tình trạng hợp đồng

        //Load nội dung list loại dịch vụ
        UtilJS.Loading.Show();
        CommonFactory.PostDataAjax("/Contracts/GetServiceTypeList", {},
            function (beforeSend) {
                $scope.ContractDetail.ServiceTypeFilter = [];
            },
            function (response) {
                UtilJS.Loading.Hide();
                if (response.objCodeStep.Status == jAlert.Status.Error) {
                    jAlert.Error(response.objCodeStep.Message, 'Thông báo');
                }
                else if (response.objCodeStep.Status == jAlert.Status.Warning) {
                    jAlert.Warning(response.objCodeStep.Message, 'Thông báo');
                }
                else if (response.objCodeStep.Status == jAlert.Status.Success) {
                    UtilJS.Loading.Hide();
                    $scope.ContractDetail.ServiceTypeFilter = response.ListServiceType || [];
                }
            },
            function (error) {
                UtilJS.Loading.Hide();
            }
        );

        //Load nội dung list tên nhân viên
        $timeout(function () {
            UtilJS.Loading.Show();
            CommonFactory.PostDataAjax("/Employees/Search", {},
                function (beforeSend) {
                    $scope.ContractDetail.EmployeeFullNameFilter = [];
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
                            $scope.ContractDetail.EmployeeFullNameFilter = response.Employees || [];
                            console.log($scope.ContractDetail.EmployeeFullNameFilter);
                        }
                    });
                },
                function (error) {
                    UtilJS.Loading.Hide();
                }
            );
        }, 100)
    };

    //Check if Step was Overdue
    $scope.ContractDetail.IsOverdue = function (dateString) {
        // Chuyển đổi dateString từ DD/MM/YYYY sang đối tượng Moment
        var completionDate = moment(dateString, "DD/MM/YYYY");

        // Tạo đối tượng Moment cho ngày hiện tại và reset thời gian
        var today = moment().startOf('day'); // Reset ngày hiện tại về 00:00:00

        // So sánh và trả về kết quả
        //console.log(completionDate.isBefore(today));
        return completionDate.isBefore(today);
    };

    //Change Status
    $scope.ContractDetail.ChangeStatus = function (Contract_ID, Service_Type_ID, Detail_ID) {
        console.log("Contract_ID: ", Contract_ID);
        console.log("Service_Type_ID: ", Service_Type_ID);
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
                            //$scope.ContractDetail.FillProgressTable();

                            // Tìm và cập nhật Step cần thiết
                            var contract = $scope.ContractDetail.ProgressTable.find(s => s.Contract_ID === Contract_ID && s.Service_Type_ID === Service_Type_ID);
                            if (contract && contract.Details) {
                                var step = contract.Details.find(sd => sd.Detail_ID === Detail_ID);
                                if (step) {
                                    step.Status_ID = step.Status_ID === 0 ? 1 : 0; // Đổi giá trị của Status_ID
                                }
                            }

                            // var stepInResponse = $scope.Progress.ProgressRes.find(s => s.Detail_ID === Detail_ID);
                            // if (stepInResponse) {
                            //     stepInResponse.Status_ID = stepInResponse.Status_ID === 0 ? 1 : 0;
                            // }
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

    //Fill ProgressTable
    $scope.ContractDetail.FillProgressTable = function (intPage) {
        try {
            if (intPage == undefined) intPage = 1;

            var data = { PageSize: $scope.ContractDetail.Pager.PageSize, PageIndex: intPage };
            UtilJS.Loading.Show();
            CommonFactory.PostDataAjax("/Contracts/GetAllContractDetail", data,
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

                            console.log("Response nhận về: ", response.ContractsDetail);
                            $scope.ContractDetail.ProgressTable = response.ContractsDetail;

                            $scope.ContractDetail.Pager.TotalItems = response.ContractsDetail[0].TotalRecords || 0;

                            var responseMerged = [];

                            for (let i = 0; i < response.ContractsDetail.length; i++) {
                                const currentContract = response.ContractsDetail[i];
                                const existingContractIndex = responseMerged.findIndex(contract =>
                                    contract.Contract_ID === currentContract.Contract_ID &&
                                    contract.Contract_Number === currentContract.Contract_Number &&
                                    contract.Representative === currentContract.Representative &&
                                    contract.SignedEmployeeName === currentContract.SignedEmployeeName &&
                                    contract.Value === currentContract.Value &&
                                    contract.ServiceProcess === currentContract.ServiceProcess
                                );

                                if (existingContractIndex !== -1) {
                                    // Contract exists, find or create Service_Type_ID and Name object
                                    const existingServiceIndex = responseMerged[existingContractIndex].Detail.findIndex(service =>
                                        service.Service_Type_ID === currentContract.Service_Type_ID &&
                                        service.Name === currentContract.Name
                                    );

                                    if (existingServiceIndex !== -1) {
                                        // Service_Type_ID and Name exist, add other details to existing service
                                        responseMerged[existingContractIndex].Detail[existingServiceIndex].Details.push({
                                            Completion_Date: moment(currentContract.Completion_Date).format("DD/MM/YYYY"),
                                            Custom_Name: currentContract.Custom_Name,
                                            Detail_ID: currentContract.Detail_ID,
                                            Status_ID: currentContract.Status_ID,
                                            EmployeeID: currentContract.EmployeeID,
                                            FullName: currentContract.FullName,
                                            StepName: currentContract.StepName,
                                            // Add other properties here
                                        });
                                    } else {
                                        // Service_Type_ID and Name do not exist, create a new service
                                        const detailLength = responseMerged[existingContractIndex].Detail.length;
                                        responseMerged[existingContractIndex].Detail.push({
                                            Service_Type_ID: currentContract.Service_Type_ID,
                                            Name: currentContract.Name,
                                            Details: [{
                                                Completion_Date: moment(currentContract.Completion_Date).format("DD/MM/YYYY"),
                                                Custom_Name: currentContract.Custom_Name,
                                                Detail_ID: currentContract.Detail_ID,
                                                Status_ID: currentContract.Status_ID,
                                                EmployeeID: currentContract.EmployeeID,
                                                FullName: currentContract.FullName,
                                                StepName: currentContract.StepName,
                                                // Add other properties here
                                            }]
                                        });
                                    }
                                } else {
                                    // Contract does not exist, create a new contract with a new service
                                    responseMerged.push({
                                        Contract_ID: currentContract.Contract_ID,
                                        Contract_Number: currentContract.Contract_Number,
                                        Representative: currentContract.Representative,
                                        SignedEmployeeName: currentContract.SignedEmployeeName,
                                        Host: currentContract.Host,
                                        Path: currentContract.Path,
                                        Value: currentContract.Value,
                                        ServiceProcess: currentContract.ServiceProcess,
                                        Detail: [{
                                            Service_Type_ID: currentContract.Service_Type_ID,
                                            Name: currentContract.Name,
                                            Details: [{
                                                Completion_Date: moment(currentContract.Completion_Date).format("DD/MM/YYYY"),
                                                Custom_Name: currentContract.Custom_Name,
                                                Detail_ID: currentContract.Detail_ID,
                                                Status_ID: currentContract.Status_ID,
                                                EmployeeID: currentContract.EmployeeID,
                                                FullName: currentContract.FullName,
                                                StepName: currentContract.StepName,
                                                // Add other properties here
                                            }]
                                        }]
                                    });
                                }
                            }

                            console.log("Merged: ", responseMerged);

                            var delDetail = [];
                            for (let i = 0; i < responseMerged.length; i++) {
                                for (let j = 0; j < responseMerged[i].Detail.length; j++) {
                                    var objTemp = {
                                        Contract_ID: responseMerged[i].Contract_ID,
                                        Contract_Number: responseMerged[i].Contract_Number,
                                        Representative: responseMerged[i].Representative,
                                        SignedEmployeeName: responseMerged[i].SignedEmployeeName,
                                        Host: responseMerged[i].Host,
                                        Path: responseMerged[i].Path,
                                        Value: responseMerged[i].Value,
                                        ServiceProcess: responseMerged[i].ServiceProcess,
                                        Name: responseMerged[i].Detail[j].Name,
                                        Service_Type_ID: responseMerged[i].Detail[j].Service_Type_ID,
                                        Details: responseMerged[i].Detail[j].Details
                                    };
                                    delDetail.push(objTemp);
                                }
                            }

                            console.log("DelDetail: ", delDetail);

                            var temp = [];
                            for (let i = 0; i < delDetail.length; i++) {
                                if (temp.length == 0 || temp.includes(delDetail[i].Contract_ID) == false) {
                                    temp.push(delDetail[i].Contract_ID);
                                    delDetail[i].isRowspan = true;
                                    var count = 0;
                                    for (let j = 0; j < delDetail.length; j++) {
                                        if (delDetail[i].Contract_ID == delDetail[j].Contract_ID) {
                                            count++;
                                        }
                                    }
                                    delDetail[i].rowspan = count;
                                }
                                else {
                                    delDetail[i].isRowspan = false;
                                }
                            }

                            $scope.ContractDetail.ProgressTable = delDetail;

                            console.log("All Detail: ", $scope.ContractDetail.ProgressTable);
                            responseMerged = [];
                            delDetail = [];
                            temp = [];
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

    //Khởi tạo Lại Tooltip sau mỗi lần Cập Nhật DOM
    $scope.$watch('ContractDetail.ProgressTable', function () {
        $timeout(function () {
            $('[data-bs-popup="tooltip"]').tooltip();
        });
    }, true);

    //Execute
    //$scope.ContractDetail.FillProgressTable(1);
    $scope.ContractDetail.LoadFilterContent();
    $scope.ContractDetail.Search.Paging(1);

}
ContractDetailManagerController.$inject = ["$scope", "$rootScope", "$timeout", "$filter", "ApiHelper", "UtilFactory", "DataFactory", "$q", "CommonFactory"];
addController("ContractDetailManagerController", ContractDetailManagerController);
