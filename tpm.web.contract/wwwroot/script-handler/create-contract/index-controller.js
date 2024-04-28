var IndexController = ($scope, $rootScope, $timeout, $filter, ApiHelper, UtilFactory, DataFactory, $q, CommonFactory) => {
    $('.select').select2();
    $scope.CreateContract = {};
    $scope.CreateContract.ListContractType = [];
    $scope.CreateContract.FillListContractType = {};

    $scope.CreateContract.Tab1Content = {};

    $scope.CreateContract.Service = [];
    $scope.CreateContract.FillServiceList = {};

    $scope.CreateContract.ServiceCreated = [];

    $scope.CreateContract.ServiceType = [];
    $scope.CreateContract.FillServiceTypeList = {};

    $scope.CreateContract.UnitList = [];
    $scope.CreateContract.FillUnitList = {};

    $scope.CreateContract.FirstSubmit = {};

    $scope.CreateContract.Tab2 = {};
    $scope.CreateContract.Tab2.lst = [];
    $scope.CreateContract.Tab2.obj = {};
    $scope.CreateContract.Tab2.Delete = {};
    
    $scope.CreateContract.Tab3 = { activeIndex: 0 };
    $scope.CreateContract.Tab3.StepsByServiceTypeID = [];
    $scope.CreateContract.Tab3.GetStepsBySTID = {};
    $scope.CreateContract.Tab3.LoadEmployeeList = {};
    $scope.CreateContract.Tab3.EmployeeLst = [];
    $scope.CreateContract.Tab3.AddCustomStep = {};
    $scope.CreateContract.Tab3.GetCustomStepID = {};
    $scope.CreateContract.Tab3.DeleteStep = {};
    $scope.CreateContract.Tab3.SaveContract = {};
    $scope.CreateContract.Tab3.StepDetail = {
        Deadline: null,
        EmployeeAssigned: null
    };
    var CustomStepID = -1;

    $scope.CreateContract.DatePickerAndSelect2 = {};

    $scope.activeTab = 'contract'; // Tab mặc định khi trang được tải
    $scope.setActiveTab = function (tab) {
        $scope.activeTab = tab;
    };

    $scope.CreateContract.DatePickerAndSelect2 = function () {
        $('.daterange-single').daterangepicker({
            parentEl: '.content-inner',
            singleDatePicker: true
        });
        $('.select').select2();
    };
    $scope.CreateContract.DatePickerAndSelect2();

    $scope.CreateContract.FillServiceTypeList = function () {
        CommonFactory.PostDataAjax("/Contracts/GetServiceTypeList", {},
            function (beforeSend) {
                $scope.CreateContract.ServiceType = [];
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
                        $scope.CreateContract.ServiceType = response.ListServiceType || [];
                    }
                });
            },
            function (error) {
                UtilJS.Loading.Hide();
            }
        );
    };

    $scope.CreateContract.FillUnitList = function () {
        CommonFactory.PostDataAjax("/Contracts/GetUnitList", {},
            function (beforeSend) {
                $scope.CreateContract.UnitList = [];
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
                        $scope.CreateContract.UnitList = response.ListUnit || [];
                    }
                });
            },
            function (error) {
                UtilJS.Loading.Hide();
            }
        );
    };

    $scope.CreateContract.FillListContractType = function () {
        CommonFactory.PostDataAjax("/Contracts/GetContractType", {},
            function (beforeSend) {
                $scope.CreateContract.ListContractType = [];
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
                        $scope.CreateContract.ListContractType = response.ListContractType || [];
                    }
                });
            },
            function (error) {
                UtilJS.Loading.Hide();
            }
        );
    };

    //#region Load List nhân viên
    $scope.CreateContract.Tab3.LoadEmployeeList = function () {
        UtilJS.Loading.Show();
        CommonFactory.PostDataAjax("/Employees/Search", {},
            function (beforeSend) { },
            function (response) {
                $timeout(function () {
                    UtilJS.Loading.Hide();
                    $scope.CreateContract.Tab3.EmployeeLst = [];
                    if (response.objCodeStep.Status == jAlert.Status.Error) {
                        jAlert.Error(response.objCodeStep.Message, 'Thông báo');
                    }
                    else if (response.objCodeStep.Status == jAlert.Status.Warning) {
                        jAlert.Warning(response.objCodeStep.Message, 'Thông báo');
                    }
                    else if (response.objCodeStep.Status == jAlert.Status.Success) {
                        UtilJS.Loading.Hide();
                        $scope.CreateContract.Tab3.EmployeeLst = response.Employees || [];
                    }
                });
            },
            function (error) {
                UtilJS.Loading.Hide();
            }
        );
    };
    $scope.CreateContract.Tab3.LoadEmployeeList();
    //#endregion

    //#region FirstSubmit
    $scope.CreateContract.FirstSubmit = function () {
        $scope.CreateContract.Tab1Content.Contract_Number = $scope.CreateContract.Contract_Number;
        $scope.CreateContract.Tab1Content.Contract_Type_ID = $scope.CreateContract.Contract_Type_ID;
        $scope.CreateContract.Tab1Content.Customer_Company_Name = $scope.CreateContract.Customer_Company_Name;
        $scope.CreateContract.Tab1Content.Address = $scope.CreateContract.Address;
        $scope.CreateContract.Tab1Content.Address2 = $scope.CreateContract.Address2;
        $scope.CreateContract.Tab1Content.Phone = $scope.CreateContract.Phone;
        $scope.CreateContract.Tab1Content.Mobile = $scope.CreateContract.Mobile;
        $scope.CreateContract.Tab1Content.Representative = $scope.CreateContract.Representative;
        $scope.CreateContract.Tab1Content.TIN = $scope.CreateContract.TIN;
        $scope.CreateContract.Tab1Content.Email = $scope.CreateContract.Email;
        $scope.CreateContract.Tab1Content.Employee = $scope.CreateContract.Employee.EmployeeID;

        console.log($scope.CreateContract.Tab1Content);

        $scope.activeTab = 'service';
    };
    //#endregion

    //#region Xoá object khỏi list tab2
    $scope.CreateContract.Tab2.Delete = function (index) {
        $scope.CreateContract.Tab2.lst.splice(index, 1);
    };
    //#end region
    $scope.CreateContract.FillServiceList = function () {
        UtilJS.Loading.Show();
        CommonFactory.PostDataAjax("/Contracts/GetServiceList", {},
            function (beforeSend) {
                $scope.CreateContract.Service = [];
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
                        $scope.CreateContract.Service = response.ListService || [];
                    }
                });
            },
            function (error) {
                UtilJS.Loading.Hide();
            }
        );
    };
    /*$scope.CreateContract.Service.updateTotalService = function () {
        console.log('updateTotal called');
        var price = parseFloat($scope.CreateContract.Service.Price) || 0;
        var quantity = parseInt($scope.CreateContract.Service.Quantity) || 0;

        $scope.CreateContract.Service.Total = price * quantity;
    };*/

    $scope.CreateContract.Tab2.updateTotalService = function () {
        $scope.CreateContract.Service.Price = $scope.CreateContract.Service.Price.replace(/[^\d]/g, '');
        var price = parseFloat($scope.CreateContract.Service.Price.replace(/[.,]/g, '')) || 0;
        var quantity = parseInt($scope.CreateContract.Service.Quantity) || 0;
        $scope.CreateContract.Service.Price = price.toLocaleString();
        $scope.CreateContract.Service.Total = (price * quantity).toLocaleString();
    };

    //#region Lấy 'Step' theo 'Loại Dịch Vụ'
    $scope.CreateContract.Tab3.GetStepsBySTID = function (stid, addService) {
        try {
            UtilJS.Loading.Show();
            var data = {
                Service_Type_ID: stid
            };
            CommonFactory.PostDataAjax("/Contracts/GetStepsByServiceTypeID", data,
                function (beforeSend) {
                },
                function (response) {
                    $timeout(function () {
                        $scope.CreateContract.Tab3.StepsByServiceTypeID = [];
                        UtilJS.Loading.Hide();
                        if (response.objCodeStep.Status == jAlert.Status.Error) {
                            jAlert.Error(response.objCodeStep.Message, 'Thông báo');
                        }
                        else if (response.objCodeStep.Status == jAlert.Status.Warning) {
                            jAlert.Warning(response.objCodeStep.Message, 'Thông báo');
                        }
                        else if (response.objCodeStep.Status == jAlert.Status.Success) {
                            UtilJS.Loading.Hide();
                            $scope.CreateContract.Tab3.StepsByServiceTypeID = response.StepBySTID || [];
                        }
                        addService(stid);
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
    //#endregion

    //#region Thêm Dịch Vụ Vào Danh Sách Dịch Vụ
    $scope.CreateContract.Tab2.AddServiceToList = function () {
        $scope.CreateContract.Tab2.obj = {};
        $scope.CreateContract.Tab2.obj.ServiceTypeSelected = $scope.CreateContract.Service.ServiceTypeSelected;
        $scope.CreateContract.Tab2.obj.ServiceTypeID = $scope.CreateContract.Service.ServiceTypeSelected.Service_Type_ID;
        $scope.CreateContract.Tab2.obj.Unit = $scope.CreateContract.Service.Unit;
        $scope.CreateContract.Tab2.obj.Price = parseFloat($scope.CreateContract.Service.Price.replace(/[.,]/g, '')) || 0;
        $scope.CreateContract.Tab2.obj.Quantity = parseInt($scope.CreateContract.Service.Quantity.replace(/[.,]/g, '')) || 0;
        $scope.CreateContract.Tab2.obj.Total = parseFloat($scope.CreateContract.Service.Total.replace(/[.,]/g, '')) || 0;

        $scope.CreateContract.Tab3.GetStepsBySTID($scope.CreateContract.Tab2.obj.ServiceTypeSelected.Service_Type_ID, $scope.CreateContract.Tab2.cusFunc);

        new Noty({
            text: 'Thêm dịch vụ thành công!',
            type: 'success'
        }).show();
        $("#popupAddService").modal("hide");
    };
    $scope.CreateContract.Tab2.cusFunc = function (stid) {
        $scope.CreateContract.Tab2.obj.Steps = $scope.CreateContract.Tab3.StepsByServiceTypeID;
        $scope.CreateContract.Tab2.lst.push($scope.CreateContract.Tab2.obj);
        $scope.CreateContract.Service.Price = "";
        $scope.CreateContract.Service.Quantity = "";
        $scope.CreateContract.Service.Total = "";
        $timeout(function () {
            $('.employeeItemSelect2-' + stid).select2();
            $('.employeeItemDatePicker-' + stid).daterangepicker({
                parentEl: '.content-inner',
                singleDatePicker: true,
                locale: {
                    format: 'DD/MM/YYYY'
                }
            });
        }, 200);
    }
    //#endregion

    //#region Xoá Step tab3
    $scope.CreateContract.Tab3.DeleteStep = function (StepIDInput, index) {
        let lstIndex = -1;
        let StepIndex = -1;
        for (let i = 0; i < $scope.CreateContract.Tab2.lst.length; i++) {
            for (let j = 0; j < $scope.CreateContract.Tab2.lst[i].Steps.length; j++) {
                if ($scope.CreateContract.Tab2.lst[i].Steps[j].StepID == StepIDInput) {
                    lstIndex = i;
                    StepIndex = j;
                    break;
                }
            }
        }
        $scope.CreateContract.Tab2.lst[lstIndex].Steps.splice(StepIndex, 1);
        console.log($scope.CreateContract.Tab2.lst);
    };
    //#endregion

    //#region Lấy ID của Custom Step
    $scope.CreateContract.Tab3.GetCustomStepID = function () {
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

    $scope.CreateContract.Tab3.GetCustomStepID();
    $scope.CreateContract.Tab3.AddCustomStep = function () {
        var serviceTypeIDSelected = $scope.CreateContract.Tab3.ServiceTypeToCustomSelected.ServiceTypeSelected.Service_Type_ID;

        $scope.CreateContract.Tab3.GetCustomStepID(serviceTypeIDSelected, $scope.CreateContract.Tab3.pushObjToList);

        let targetObject = _.find($scope.CreateContract.Tab2.lst, { ServiceTypeID: serviceTypeIDSelected });
        if (targetObject) {
            // Thêm một Step vào list Step của object con
            targetObject.Steps.push({ StepID: CustomStepID, StepName: $scope.CreateContract.Tab3.CustomStepName });
            console.log($scope.CreateContract.Tab2.lst);
        }
        $timeout(function () {
            $('.employeeItemSelect2-' + serviceTypeIDSelected).select2();
            $('.employeeItemDatePicker-' + serviceTypeIDSelected).daterangepicker({
                parentEl: '.content-inner',
                singleDatePicker: true,
                locale: {
                    format: 'DD/MM/YYYY'
                }
            });
        }, 100);

        $("#popupAddCustomStep").modal("hide");
    };

    //#endregion

    //#region Thêm thẻ active vô Service được chọn
    $scope.CreateContract.Tab3.ActiveService = function (index) {
        $scope.CreateContract.Tab3.activeIndex = index;
        $scope.CreateContract.Tab3.selectedServiceTypeID = $scope.CreateContract.Tab2.lst[index].ServiceTypeSelected.Service_Type_ID;
        $scope.CreateContract.Tab3.GetStepsBySTID($scope.CreateContract.Tab3.selectedServiceTypeID);
    };
    //#endregion

    //#region Lưu hợp đồng dưới dạng json
    //function convertDateFormat(inputDate) {
    //    moment
    //    var parts = inputDate.split("/");
    //    return parts[1] + "/" + parts[0] + "/" + parts[2];
    //}
    $scope.CreateContract.Tab3.SaveContract = function () {
        angular.forEach($scope.CreateContract.Tab2.lst, function (item) {
            angular.forEach(item.Steps, function (step, index) {
                var completionDate = moment($scope.CreateContract.Tab3.StepDetail[index].Deadline, "DD/MM/YYYY").format("MM/DD/YYYY");
                var selectedEmployee = $scope.CreateContract.Tab3.StepDetail[index].EmployeeAssigned;

                if (completionDate && selectedEmployee) {
                    step.Deadline = completionDate;
                    step.EmployeeAssigned = selectedEmployee;
                }
            });
        });

        var DataToSave = {};
        DataToSave.Contract_Number = $scope.CreateContract.Tab1Content.Contract_Number;
        DataToSave.Contract_Type_ID = $scope.CreateContract.Tab1Content.Contract_Type_ID.Contract_Type_ID;
        DataToSave.Customer_Company_Name = $scope.CreateContract.Tab1Content.Customer_Company_Name;
        DataToSave.Address = $scope.CreateContract.Tab1Content.Address;
        DataToSave.Address2 = $scope.CreateContract.Tab1Content.Address2;
        DataToSave.Phone = $scope.CreateContract.Tab1Content.Phone;
        DataToSave.Mobile = $scope.CreateContract.Tab1Content.Mobile;
        DataToSave.Representative = $scope.CreateContract.Tab1Content.Representative;
        DataToSave.TIN = $scope.CreateContract.Tab1Content.TIN;
        DataToSave.Email = $scope.CreateContract.Tab1Content.Email;
        DataToSave.EmployeeID = $scope.CreateContract.Tab1Content.Employee;
        DataToSave.Detail = [];

        var ContractDetailModel = [];

        //var StepModel = [];
        //for (let j = 0; j < $scope.CreateContract.Tab2.lst.length; j++) {
        //    for (let i = 0; i < $scope.CreateContract.Tab2.lst[j].Steps.length; i++) {
        //        var Step = {};
        //        Step.StepID = $scope.CreateContract.Tab2.lst[j].Steps[i].StepID;
        //        Step.Deadline = $scope.CreateContract.Tab2.lst[j].Steps[i].Deadline;
        //        Step.EmployeeAssigned = $scope.CreateContract.Tab2.lst[j].Steps[i].EmployeeAssigned;
        //        StepModel.push(Step);
        //    }
        //}

        for (let i = 0; i < $scope.CreateContract.Tab2.lst.length; i++) {
            var Detail = {};
            Detail.ServiceTypeID = $scope.CreateContract.Tab2.lst[i].ServiceTypeID;
            Detail.UnitID = $scope.CreateContract.Tab2.lst[i].Unit.Unit_ID;
            Detail.Price = $scope.CreateContract.Tab2.lst[i].Price;
            Detail.Quantity = $scope.CreateContract.Tab2.lst[i].Quantity;
            Detail.Total = $scope.CreateContract.Tab2.lst[i].Total;
            Detail.Step = [];
            for (let j = 0; j < $scope.CreateContract.Tab2.lst[i].Steps.length; j++) {
                var StepChild = {};
                StepChild.StepID = $scope.CreateContract.Tab2.lst[i].Steps[j].StepID;
                if (StepChild.StepID == CustomStepID) {
                    StepChild.Custom_Name = $scope.CreateContract.Tab2.lst[i].Steps[j].StepName;
                }
                else {
                    StepChild.Custom_Name = '';
                }

                //StepChild.Deadline = convertDateFormat($scope.CreateContract.Tab2.lst[i].Steps[j].Deadline);

                StepChild.Deadline = moment($scope.CreateContract.Tab2.lst[i].Steps[j].Deadline, "MM-DD-YYYY");

                StepChild.Deadline = $scope.CreateContract.Tab2.lst[i].Steps[j].Deadline;
                StepChild.EmployeeAssigned = $scope.CreateContract.Tab2.lst[i].Steps[j].EmployeeAssigned;
                Detail.Step.push(StepChild);
            }
            DataToSave.Detail.push(Detail);
        }
        console.log('DatatoSave:', DataToSave);
        CommonFactory.PostDataAjax("/Contracts/Save", DataToSave,
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
    //#endregion

    $scope.CreateContract.FillListContractType();
    $scope.CreateContract.FillServiceList();
    $scope.CreateContract.FillServiceTypeList();
    $scope.CreateContract.FillUnitList();

    //#region Khai bao
    if (typeof swal == 'undefined') {
        console.warn('Warning - sweet_alert.min.js is not loaded.');
        return;
    }
    const swalWarningElement = document.querySelector('#sweet_warning');
    if (swalWarningElement) {
        swalWarningElement.addEventListener('click', function () {
            swalInit.fire({
                title: 'Are you sure?',
                text: 'You will not be able to recover this imaginary file!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!'
            });
        });
    }
    const swalInit = swal.mixin({
        buttonsStyling: false,
        customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-light',
            denyButton: 'btn btn-light',
            input: 'form-control'
        }
    });
    document.addEventListener('DOMContentLoaded', function () {
        SweetAlert.initComponents();
    });
    //#endregion
}
IndexController.$inject = ["$scope", "$rootScope", "$timeout", "$filter", "ApiHelper", "UtilFactory", "DataFactory", "$q", "CommonFactory"];
addController("IndexController", IndexController);
