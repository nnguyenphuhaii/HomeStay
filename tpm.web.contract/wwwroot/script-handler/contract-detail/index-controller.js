var IndexController = ($scope, $rootScope, $timeout, $filter, ApiHelper, UtilFactory, DataFactory, $q, CommonFactory) => {
    //#region declare variable
    $scope.ContractDetail = {};

    $scope.ContractDetail.Tab1 = {};
    $scope.ContractDetail.Tab1.GetTab1Content = {};
    $scope.ContractDetail.Tab1.Content = {};
    $scope.ContractDetail.Tab1.ListContractType = [];
    $scope.ContractDetail.Tab1.FillListContractType = {};

    $scope.ContractDetail.Tab2 = {};
    $scope.ContractDetail.Tab2.GetTab2Content = {};
    $scope.ContractDetail.Tab2.Content = [];

    $scope.ContractDetail.Tab3 = {};
    $scope.ContractDetail.Tab3.GetTab3Content = {};
    $scope.ContractDetail.Tab3.Res = [];
    $scope.ContractDetail.Tab3.Content = [];
    $scope.ContractDetail.Tab3.LoadListContractComplete = [];

    $scope.activeTab = 'contract';
    $scope.ContractDetail.setActiveTab = function (tab) {
        $scope.activeTab = tab;
    };

    $scope.Edit = {};
    //#endregion

    $scope.Edit = function () {
        window.location.href = "/Contracts/Edit/" + ContractID;
    };

    $scope.ContractDetail.Tab1.FillListContractType = function () {
        CommonFactory.PostDataAjax("/Contracts/GetContractType", {},
            function (beforeSend) {
                $scope.ContractDetail.Tab1.ListContractType = [];
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
                        $scope.ContractDetail.Tab1.ListContractType = response.ListContractType || [];
                    }
                });
            },
            function (error) {
                UtilJS.Loading.Hide();
            }
        );
    };

    //#region get tab content
    $scope.ContractDetail.Tab1.GetTab1Content = function (ContractID, ImportContractTypeSelect, GetTab2Content, GetTab3Content) {
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
                            $scope.ContractDetail.Tab1.Content = response.Tab1Content[0] || [];
                            console.log("Tab 1 Content: ", $scope.ContractDetail.Tab1.Content);
                        }
                        ImportContractTypeSelect($scope.ContractDetail.Tab1.Content.Contract_Type_ID);
                        GetTab2Content(ContractID);
                        GetTab3Content(ContractID);
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

    $scope.ContractDetail.Tab1.ImportContractTypeSelect = function (Contract_Type_ID) {
        $(".select:first").val(Contract_Type_ID).trigger('change');
    }

    $scope.ContractDetail.Tab2.GetTab2Content = function (ContractID) {
        try {
            var data = { ContractID: ContractID };
            UtilJS.Loading.Show();
            CommonFactory.PostDataAjax("/Contracts/GetTab2ContentByContractID", data,
                function (beforeSend) {
                    $scope.ContractDetail.Tab2.Content = [];
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
                            $scope.ContractDetail.Tab2.Content = response.Tab2Content || [];
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

    $scope.ContractDetail.Tab3.GetTab3Content = function (ContractID) {
        try {
            var data = { ContractID: ContractID };
            UtilJS.Loading.Show();
            CommonFactory.PostDataAjax("/Contracts/GetTab3ContentByContractID", data,
                function (beforeSend) {
                    $scope.ContractDetail.Tab3.Content = [];
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
                            $scope.ContractDetail.Tab3.Res = response.Tab3Content || [];
                            console.log('12:26 4/12/23: ', $scope.ContractDetail.Tab3.Res);
                            var content = {};
                            content.Contract_ID = $scope.ContractDetail.Tab3.Res[0].Contract_ID;
                            content.Service_Type = [];
                            content.Service_Type.Name = {};
                            content.Service_Type.StepDetail = [];

                            $timeout(function () {
                                for (let i = 0; i < $scope.ContractDetail.Tab2.Content.length; i++) {
                                    var STTemp = {};
                                    STTemp.Name = $scope.ContractDetail.Tab2.Content[i].Name;
                                    content.Service_Type.push(STTemp);
                                }
                            }, 200);
                            $timeout(function () {
                                for (let i = 0; i < $scope.ContractDetail.Tab2.Content.length; i++) {
                                    content.Service_Type[i].StepDetail = [];
                                    for (let j = 0; j < $scope.ContractDetail.Tab3.Res.length; j++) {
                                        if ($scope.ContractDetail.Tab3.Res[j].Name == content.Service_Type[i].Name) {
                                            let StepDetail = {};
                                            if ($scope.ContractDetail.Tab3.Res[j].Custom_Name != null) {
                                                StepDetail.StepName = $scope.ContractDetail.Tab3.Res[j].Custom_Name;
                                            }
                                            else {
                                                StepDetail.StepName = $scope.ContractDetail.Tab3.Res[j].StepName;
                                            }
                                            StepDetail.Completion_Date = moment($scope.ContractDetail.Tab3.Res[j].Completion_Date).format("DD/MM/YYYY");
                                            StepDetail.FullName = $scope.ContractDetail.Tab3.Res[j].FullName;
                                            StepDetail.Service_Type_ID = $scope.ContractDetail.Tab3.Res[j].Service_Type_ID;
                                            StepDetail.Status_ID = $scope.ContractDetail.Tab3.Res[j].Status_ID;

                                            content.Service_Type[i].StepDetail.push(StepDetail);
                                        }
                                    }
                                }
                                console.log(content);
                                $scope.ContractDetail.Tab3.Content = content.Service_Type;
                                console.log("12:48 4/12/23", $scope.ContractDetail.Tab3.Content);
                                var TotalStep = 0;
                                //$timeout(function () {
                                //    for (let i = 0; i < $scope.ContractDetail.Tab3.Content.length; i++) {
                                //        for (let j = 0; j < $scope.ContractDetail.Tab3.Content[i].StepDetail.length; j++) {
                                //            if ($scope.ContractDetail.Tab3.Content[i].StepDetail[j].Status_ID == 1) {
                                //                let data = { Service_Type_ID: $scope.ContractDetail.Tab3.Content[i].StepDetail[j].Service_Type_ID, index: j };
                                //                $scope.ContractDetail.Tab3.LoadListContractComplete.push(data);
                                //            }
                                //        }
                                //    }

                                //    console.log("List Contract Complete: ", $scope.ContractDetail.Tab3.LoadListContractComplete);

                                //    for (let i = 0; i < $scope.ContractDetail.Tab3.LoadListContractComplete.length; i++) {
                                //        let itemClass = '.' + $scope.ContractDetail.Tab3.LoadListContractComplete[i].Service_Type_ID + '-' + $scope.ContractDetail.Tab3.LoadListContractComplete[i].index;
                                //        $(itemClass).prop('checked', true);
                                //    }
                                    
                                //}, 100);
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

    $scope.ContractDetail.Tab1.FillListContractType();
    $scope.ContractDetail.Tab1.GetTab1Content(ContractID, $scope.ContractDetail.Tab1.ImportContractTypeSelect, $scope.ContractDetail.Tab2.GetTab2Content, $scope.ContractDetail.Tab3.GetTab3Content);

    //#endregion

    //#region Load Contract Detail Selected
    //$scope.Contract.OpenContractDetail = function (Contract_Number) {
    //    try {
    //        var data = { Contract_Number: Contract_Number };
    //        UtilJS.Loading.Show();
    //        CommonFactory.PostDataAjax("/Contracts/GetTab1ContentByContractNumber", data,
    //            function (beforeSend) {
    //            },
    //            function (response) {
    //                $timeout(function () {
    //                    UtilJS.Loading.Hide();

    //                    if (response.objCodeStep.Status == jAlert.Status.Error) {
    //                        jAlert.Error(response.objCodeStep.Message, 'Thông báo');
    //                    }
    //                    else if (response.objCodeStep.Status == jAlert.Status.Warning) {
    //                        jAlert.Warning(response.objCodeStep.Message, 'Thông báo');
    //                    }
    //                    else if (response.objCodeStep.Status == jAlert.Status.Success) {
    //                        UtilJS.Loading.Hide();
    //                        alert("Thành công");
    //                    }
    //                });
    //            },
    //            function (error) {
    //                UtilJS.Loading.Hide
    //                console.log(error.message);
    //            }
    //        );
    //    } catch (error) {
    //        console.log(error.message);
    //    }
    //}
    //#endregion
}
IndexController.$inject = ["$scope", "$rootScope", "$timeout", "$filter", "ApiHelper", "UtilFactory", "DataFactory", "$q", "CommonFactory"];
addController("IndexController", IndexController);
