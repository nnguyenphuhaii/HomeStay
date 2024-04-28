var EditController = ($scope, $rootScope, $timeout, $filter, ApiHelper, UtilFactory, DataFactory, $q, CommonFactory) => {
    //#region declare variable
    $scope.EditContract = {};
    $scope.EditContract.Tab1 = {};
    $scope.EditContract.Tab1.Content = {};
    $scope.EditContract.Tab1.GetTab1Content = {};
    $scope.EditContract.Tab1.ListContractType = [];
    $scope.EditContract.Tab1.FillListContractType = {};

    $scope.EditContract.Tab2 = {};
    $scope.EditContract.Tab2.GetTab2Content = {};
    $scope.EditContract.Tab2.Content = [];
    $scope.EditContract.Tab2.Popup = {};
    $scope.EditContract.Tab2.Popup.ServiceType = [];
    $scope.EditContract.Tab2.Popup.FillServiceTypeList = {};
    $scope.EditContract.Tab2.Popup.UnitList = [];
    $scope.EditContract.Tab2.Popup.FillUnitList = {};
    $scope.EditContract.Tab2.Popup.AddServiceToList = {};
    $scope.EditContract.Tab2.Popup.Price = '0';

    $scope.EditContract.Tab3 = {};
    $scope.EditContract.Tab3.GetTab3Content = {};
    $scope.EditContract.Tab3.Res = [];
    $scope.EditContract.Tab3.Content = [];
    $scope.EditContract.Tab3.LoadEmployeeList = {};
    $scope.EditContract.Tab3.EmployeeLst = [];
    $scope.EditContract.Tab3.Popup = {};
    $scope.EditContract.Tab3.Popup.AddCustomStep = {};
    $scope.EditContract.Tab3.SaveContract = {};
    //$scope.EditContract.Tab3.LoadListContractComplete = [];

    var CustomStepID = -1;

    $scope.activeTab = 'contract';
    $scope.EditContract.setActiveTab = function (tab) {
        $scope.activeTab = tab;
    };
    //#endregion

    $scope.EditContract.Tab1.FillListContractType = function (ContractID, GetTab1Content, GetTab2Content, GetTab3Content, AddSelect2DatePicker, LoadEmployeeList) {
        CommonFactory.PostDataAjax("/Contracts/GetContractType", {},
            function (beforeSend) {
                $scope.EditContract.Tab1.ListContractType = [];
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
                        $scope.EditContract.Tab1.ListContractType = response.ListContractType || [];

                        $("#ctrType").select2();
                    }
                });
                GetTab1Content;
                GetTab2Content;
                GetTab3Content;
                AddSelect2DatePicker;
                LoadEmployeeList;
            },
            function (error) {
                UtilJS.Loading.Hide();
            }
        );
    };

    //#region get contain
    $scope.EditContract.Tab1.GetTab1Content = function (ContractID) {
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
                            $scope.EditContract.Tab1.Content = response.Tab1Content[0] || [];
                            console.log("Tab 1 Content: ",$scope.EditContract.Tab1.Content);
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

    $scope.EditContract.Tab2.GetTab2Content = function (ContractID) {
        try {
            var data = { ContractID: ContractID };
            UtilJS.Loading.Show();
            CommonFactory.PostDataAjax("/Contracts/GetTab2DetailByContractIDToEdit", data,
                function (beforeSend) {
                    $scope.EditContract.Tab2.Content = [];
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
                            $scope.EditContract.Tab2.Content = response.Tab2ContentToEdit || [];
                            console.log("Tab 2 Contain: ", $scope.EditContract.Tab2.Content);
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

    $scope.EditContract.Tab3.GetTab3Content = function (ContractID) {
        try {
            var data = { ContractID: ContractID };
            UtilJS.Loading.Show();
            CommonFactory.PostDataAjax("/Contracts/GetTab3ContentByContractIDToEdit", data,
                function (beforeSend) {
                    $scope.EditContract.Tab3.Content = [];
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
                            $scope.EditContract.Tab3.Res = response.Tab3Content || [];
                            console.log("Response nhận về: ", $scope.EditContract.Tab3.Res);
                            var content = {};
                            content.Contract_ID = $scope.EditContract.Tab3.Res[0].Contract_ID;
                            content.Service_Type = [];
                            //content.Service_Type.Name = {};
                            //content.Service_Type.StepDetail = [];

                            $timeout(function () {
                                for (let i = 0; i < $scope.EditContract.Tab2.Content.length; i++) {
                                    var STTemp = {};
                                    STTemp.Service_Type_ID = $scope.EditContract.Tab2.Content[i].Service_Type_ID;
                                    STTemp.Name = $scope.EditContract.Tab2.Content[i].Name;
                                    content.Service_Type.push(STTemp);
                                }
                            }, 200);
                            $timeout(function () {
                                for (let i = 0; i < $scope.EditContract.Tab2.Content.length; i++) {
                                    content.Service_Type[i].StepDetail = [];
                                    for (let j = 0; j < $scope.EditContract.Tab3.Res.length; j++) {
                                        if ($scope.EditContract.Tab3.Res[j].Name == content.Service_Type[i].Name) {
                                            let StepDetail = {};
                                            StepDetail.StepID = $scope.EditContract.Tab3.Res[j].StepID;
                                            if ($scope.EditContract.Tab3.Res[j].Custom_Name != null) {
                                                StepDetail.StepName = $scope.EditContract.Tab3.Res[j].Custom_Name;
                                            }
                                            else {
                                                StepDetail.StepName = $scope.EditContract.Tab3.Res[j].StepName;
                                            }
                                            StepDetail.Completion_Date = moment($scope.EditContract.Tab3.Res[j].Completion_Date).format("DD/MM/YYYY");
                                            StepDetail.EmployeeID = $scope.EditContract.Tab3.Res[j].EmployeeID;
                                            StepDetail.FullName = $scope.EditContract.Tab3.Res[j].FullName;
                                            StepDetail.Status_ID = $scope.EditContract.Tab3.Res[j].Status_ID;

                                            content.Service_Type[i].StepDetail.push(StepDetail);
                                        }
                                    }
                                }
                                $scope.EditContract.Tab3.Content = content.Service_Type;
                                console.log("11:41: Tab 3 Content", $scope.EditContract.Tab3.Content);

                                //$timeout(function () {
                                //    for (let i = 0; i < $scope.EditContract.Tab3.Content.length; i++) {
                                //        for (let j = 0; j < $scope.EditContract.Tab3.Content[i].StepDetail.length; j++) {
                                //            if ($scope.EditContract.Tab3.Content[i].StepDetail[j].Status_ID == 1) {
                                //                let data = { Service_Type_ID: $scope.EditContract.Tab3.Content[i].Service_Type_ID, index: j };
                                //                $scope.EditContract.Tab3.LoadListContractComplete.push(data);
                                //            }                                            
                                //        }
                                //    }

                                //    console.log("List Contract Complete", $scope.EditContract.Tab3.LoadListContractComplete);

                                //    for (let i = 0; i < $scope.EditContract.Tab3.LoadListContractComplete.length; i++) {
                                //        let itemClass = '.' + $scope.EditContract.Tab3.LoadListContractComplete[i].Service_Type_ID + '-' + $scope.EditContract.Tab3.LoadListContractComplete[i].index;
                                //        $(itemClass).prop('checked', true);
                                //    //}
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

    $scope.EditContract.Tab3.AddSelect2DatePicker = function () {
        $timeout(function () {
            $('.employeeItemSelect2').select2();
            $('.employeeItemDatePicker').daterangepicker({
                parentEl: '.content-inner',
                singleDatePicker: true,
                locale: {
                    format: 'DD/MM/YYYY'
                }
            });
        }, 900);
    };

    $scope.EditContract.Tab3.LoadEmployeeList = function () {
        UtilJS.Loading.Show();
        CommonFactory.PostDataAjax("/Employees/Search", {},
            function (beforeSend) { },
            function (response) {
                $timeout(function () {
                    UtilJS.Loading.Hide();
                    $scope.EditContract.Tab3.EmployeeLst = [];
                    if (response.objCodeStep.Status == jAlert.Status.Error) {
                        jAlert.Error(response.objCodeStep.Message, 'Thông báo');
                    }
                    else if (response.objCodeStep.Status == jAlert.Status.Warning) {
                        jAlert.Warning(response.objCodeStep.Message, 'Thông báo');
                    }
                    else if (response.objCodeStep.Status == jAlert.Status.Success) {
                        UtilJS.Loading.Hide();
                        $scope.EditContract.Tab3.EmployeeLst = response.Employees || [];
                    }
                });
                $timeout(function () {
                    $("#ctrType").val($scope.EditContract.Tab1.Content.Contract_Type_ID).trigger('change');
                    $(".employeeItemSelect2").select2();
                }, 200);
                $timeout(function () {
                    for (let i = 0; i < $scope.EditContract.Tab3.Content.length; i++) {
                        let Service_Type_ID = $scope.EditContract.Tab3.Content[i].Service_Type_ID;
                        for (let j = 0; j < $scope.EditContract.Tab3.Content[i].StepDetail.length; j++) {
                            let id = "#" + "select-" + Service_Type_ID.toString() + "-" + j.toString();
                            $(id).val($scope.EditContract.Tab3.Content[i].StepDetail[j].EmployeeID).trigger('change');                            
                        }
                    }
                }, 300);
            },
            function (error) {
                UtilJS.Loading.Hide();
            }
        );
    };

    $scope.EditContract.Tab2.Popup.FillServiceTypeList = function (FillUnitList, AddSelect2) {
        CommonFactory.PostDataAjax("/Contracts/GetServiceTypeList", {},
            function (beforeSend) {
                $scope.EditContract.Tab2.Popup.ServiceType = [];
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
                        $scope.EditContract.Tab2.Popup.ServiceType = response.ListServiceType || [];
                    }
                });
                FillUnitList;
                AddSelect2;
            },
            function (error) {
                UtilJS.Loading.Hide();
            }
        );
    };

    $scope.EditContract.Tab2.Popup.FillUnitList = function () {
        CommonFactory.PostDataAjax("/Contracts/GetUnitList", {},
            function (beforeSend) {
                $scope.EditContract.Tab2.Popup.UnitList = [];
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
                        $scope.EditContract.Tab2.Popup.UnitList = response.ListUnit || [];
                    }
                });
            },
            function (error) {
                UtilJS.Loading.Hide();
            }
        );
    };

    $scope.EditContract.Tab2.AddSelect2 = function () {
        $timeout(function () {
            $('.select').select2();
        }, 500);
    };

    $scope.EditContract.Tab2.Popup.UpdateTotalService = function () {
        $timeout(function () {
            $scope.EditContract.Tab2.Popup.Price = $scope.EditContract.Tab2.Popup.Price.replace(/[^\d]/g, '');
            var price = parseFloat($scope.EditContract.Tab2.Popup.Price.replace(/[.,]/g, '')) || 0;
            var quantity = parseInt($scope.EditContract.Tab2.Popup.Quantity) || 0;
            $scope.EditContract.Tab2.Popup.Price = price.toLocaleString();
            $scope.EditContract.Tab2.Popup.Total = (price * quantity).toLocaleString();
        }, 100);
    };
    $scope.EditContract.Tab2.Popup.AddServiceToList = function () {
        var service = {};
        service.Contract_ID = $scope.EditContract.Tab2.Content[0].Contract_ID;
        service.Service_Type_ID = $scope.EditContract.Tab2.Popup.ServiceTypeSelected.Service_Type_ID;
        service.Name = $scope.EditContract.Tab2.Popup.ServiceTypeSelected.Name;
        service.Unit_ID = $scope.EditContract.Tab2.Popup.UnitSelected.Unit_ID;
        service.Unit = $scope.EditContract.Tab2.Popup.UnitSelected.Unit;
        service.Unit_Price = $scope.EditContract.Tab2.Popup.Price;
        service.Quantity = $scope.EditContract.Tab2.Popup.Quantity;
        service.Total_Amount = $scope.EditContract.Tab2.Popup.Total;
        $scope.EditContract.Tab2.Content.push(service);
        new Noty({
            text: 'Thêm dịch vụ thành công!',
            type: 'success'
        }).show();
        $("#popupAddService").modal("hide");
    }

    $scope.EditContract.Tab3.GetCustomStepID = function () {
        try {
            UtilJS.Loading.Show();
            CommonFactory.PostDataAjax("/Contracts/GetCustomStepID", {},
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
                            CustomStepID = response.customStepID || [];
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

    $scope.EditContract.Tab3.GetCustomStepID();

    $scope.EditContract.Tab3.Popup.AddCustomStep = function () {
        var serviceTypeSelected = $scope.EditContract.Tab3.Popup.ServiceTypeToCustomSelected.Name;
        let targetObject = _.find($scope.EditContract.Tab3.Content, { Name: serviceTypeSelected });
        //console.log(serviceTypeSelected, CustomStepID);
        console.log(targetObject);

        if (targetObject) {
            // Thêm một Step vào list trên view trước, lưu tính sau
            targetObject.StepDetail.push({ StepID: CustomStepID, StepName: $scope.EditContract.Tab3.Popup.CustomStepName, Completion_Date: "", FullName: "" });
            //console.log($scope.EditContract.Tab3.Content);
        }
    }

    $scope.EditContract.Tab1.FillListContractType(ContractID, $scope.EditContract.Tab1.GetTab1Content(ContractID), $scope.EditContract.Tab2.GetTab2Content(ContractID),
        $scope.EditContract.Tab3.GetTab3Content(ContractID), $scope.EditContract.Tab3.AddSelect2DatePicker(), $scope.EditContract.Tab3.LoadEmployeeList());
    $scope.EditContract.Tab2.Popup.FillServiceTypeList($scope.EditContract.Tab2.Popup.FillUnitList(), $scope.EditContract.Tab2.AddSelect2());
    $scope.EditContract.Tab2.Popup.UpdateTotalService();
    //#end region

    $scope.EditContract.Tab3.SaveContract = function () {
        var tab1 = {};
        tab1.Contract_ID = ContractID;
        tab1.Contract_Number = $scope.EditContract.Tab1.Content.Contract_Number;
        tab1.Contract_Type_ID = $scope.EditContract.Tab1.Content.Contract_Type_ID;
        //tab1.Contract_Type_Name = $scope.EditContract.Tab1.Content.Contract_Type.Contract_Type_Name;
        tab1.Customer_Company_Name = $scope.EditContract.Tab1.Content.Customer_Company_Name;
        tab1.Address = $scope.EditContract.Tab1.Content.Address;
        tab1.Address2 = $scope.EditContract.Tab1.Content.Address2;
        tab1.Phone = $scope.EditContract.Tab1.Content.Phone;
        tab1.Mobile = $scope.EditContract.Tab1.Content.MobilePhone;
        tab1.Representative = $scope.EditContract.Tab1.Content.Representative;
        tab1.TIN = $scope.EditContract.Tab1.Content.TIN;
        tab1.Email = $scope.EditContract.Tab1.Content.Email;
        tab1.EmployeeID = $scope.EditContract.Tab1.Content.EmployeeID;

        console.log("Tab 2 Content: ", $scope.EditContract.Tab2.Content);
        var tab2 = [];
        for (let i = 0; i < $scope.EditContract.Tab2.Content.length; i++) {
            tab2.push({
                Contract_ID: ContractID, ServiceTypeID: $scope.EditContract.Tab2.Content[i].Service_Type_ID, UnitID: $scope.EditContract.Tab2.Content[i].Unit_ID, Price: $scope.EditContract.Tab2.Content[i].Unit_Price,
                Quantity: $scope.EditContract.Tab2.Content[i].Quantity, Total: $scope.EditContract.Tab2.Content[i].Total_Amount
            });
        }
        console.log("Tab 2 Save: ", tab2);

        console.log("Tab 3 Detail: ", $scope.EditContract.Tab3.Content);

        var tab3 = [];
        for (let i = 0; i < $scope.EditContract.Tab2.Content.length; i++) {
            let tab3Contain = {};
            //Nội dung của tab3Contain, bao gồm ServiceTypeID và Steps
            tab3Contain.ServiceTypeID = $scope.EditContract.Tab2.Content[i].Service_Type_ID;
            tab3Contain.Steps = [];

            for (let j = 0; j < $scope.EditContract.Tab3.Content[i].StepDetail.length; j++) {
                let stepDetail = {}; // Object bên trong Steps[]

                stepDetail.StepID = $scope.EditContract.Tab3.Content[i].StepDetail[j].StepID;
                if (stepDetail.StepID == CustomStepID) {
                    stepDetail.Custom_Name = $scope.EditContract.Tab3.Content[i].StepDetail[j].StepName;
                }
                stepDetail.StepName = $scope.EditContract.Tab3.Content[i].StepDetail[j].StepName;
                stepDetail.Deadline = moment($scope.EditContract.Tab3.Content[i].StepDetail[j].Completion_Date, "DD/MM/YYYY").format("MM/DD/YYYY")
                stepDetail.EmployeeAssigned = $scope.EditContract.Tab3.Content[i].StepDetail[j].EmployeeID;
                stepDetail.Status_ID = $scope.EditContract.Tab3.Content[i].StepDetail[j].Status_ID;

                tab3Contain.Steps.push(stepDetail);
            }

            tab3.push(tab3Contain);
        }

        console.log("Tab 3 Save: ", tab3);

        console.log("Tab 1: ", tab1, "Tab 2", tab2, "Tab 3", tab3);

        var DataToUpdate = { tab1, tab2, tab3 };

        console.log("Data To Update: ", DataToUpdate);

        CommonFactory.PostDataAjax("/Contracts/UpdateContractDetail", DataToUpdate,
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
                        new Noty({
                            text: 'Lưu hợp đồng không thành công!',
                            type: 'warning'
                        }).show();
                    }
                    else if (response.objCodeStep.Status == jAlert.Status.Success) {
                        UtilJS.Loading.Hide();
                        new Noty({
                            text: 'Lưu hợp đồng thành công!',
                            type: 'success'
                        }).show();
                        $timeout(function () { window.location.assign('/Contracts/Index'); }, 1000)
                    }
                });
            },
            function (error) {
                UtilJS.Loading.Hide();
            }
        );
    };
}

EditController.$inject = ["$scope", "$rootScope", "$timeout", "$filter", "ApiHelper", "UtilFactory", "DataFactory", "$q", "CommonFactory"];
addController("EditController", EditController);
