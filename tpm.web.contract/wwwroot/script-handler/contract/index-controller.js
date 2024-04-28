var IndexController = ($scope, $rootScope, $timeout, $filter, ApiHelper, UtilFactory, DataFactory, $q, CommonFactory) => {
    //#region declare variable
    $scope.Contract = {};
    $scope.Contract.Pager = { TotalItems: 0, PageSize: 10, CurrentPage: 1 };
    $scope.Contract.Lst = [];

    $scope.Contract.LstView = [];

    $scope.Contract.Create = {};
    $scope.Contract.Search = {};
    $scope.Contract.Search.Criteria = {};
    $scope.Contract.Search.Criteria.Lst = ["Mã hợp đồng", "Công ty", "Nhân viên tạo"];
    $scope.Contract.Search.SearchContract = {};
    $scope.Contract.Search.Paging = function (intPage) {
        intPage = !intPage ? 1 : intPage;
        $scope.Contract.Pager.CurrentPage = intPage;
        //$scope.Contract.Search.InitData(intPage);
        $scope.Contract.Search.SearchContract(intPage);
    };

    $scope.Contract.CompleteFilter = {};
    $scope.Contract.selectedOption = {};
    $scope.Contract.Progress = {};

    //#endregion

    //#region Search Contract
    $scope.Contract.Search.SearchContract = function (intPage) {
        try {
            if ($('#search-criteria').val() == null) {
                new Noty({
                    text: 'Vui lòng chọn tiêu chí để tìm kiếm!',
                    type: 'warning'
                }).show();
            }
            if (intPage == undefined) intPage = 1;
            else {
                var data = { PageSize: $scope.Contract.Pager.PageSize, PageIndex: intPage };
                data.SearchValue = $scope.Contract.Search.Value;
                data.Criteria = $scope.Contract.Search.Criteria.Value;
                data.SelectedOption = $scope.Contract.selectedOption;
                console.log("Search Value: ", data);

                CommonFactory.PostDataAjax("/Contracts/SearchContract", data,
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
                                $scope.Contract.Lst = response.Contract || [];
                                $scope.Contract.Pager.TotalItems = response.Contract[0].TotalRecord || 0;
                                //$scope.Contract.Pager.CurrentPage = 1;

                                if ($scope.Contract.Pager.TotalItems < $scope.Contract.Pager.PageSize) {
                                    $scope.Contract.Pager.TotalPages = 1;
                                } else if ($scope.Contract.Pager.TotalItems % $scope.Contract.Pager.PageSize == 0) {
                                    $scope.Contract.Pager.TotalPages = $scope.Contract.Pager.TotalItems / $scope.Contract.Pager.PageSize;
                                } else {
                                    $scope.Contract.Pager.TotalPages = $scope.Contract.Pager.TotalItems / $scope.Contract.Pager.PageSize + 1;
                                }
                            }
                        });

                    },
                    function (error) {
                        UtilJS.Loading.Hide();
                    }
                );
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    //#endregion
    $timeout(function () {
        $timeout(function () {
            $scope.Contract.Search.Paging(1);
        }, 40);

        $scope.Contract.Search.Value = '';
        $('#search-criteria').val('Mã hợp đồng').trigger('change');
        $scope.Contract.selectedOption = 'all';

    }, 40);

    //#region Search
    //$scope.Contract.Search.InitData = function () {
    //    try {
    //    } catch (error) {
    //        console.log(error.message);
    //    }
    //}
    //$scope.Contract.Search.InitData();
    //#endregion

    //#region CompleteFilter
    $scope.Contract.CompleteFilter = function () {
        console.log('Selected Option:', $scope.Contract.selectedOption);
        switch ($scope.Contract.selectedOption) {
            case 'all':
                $timeout(function () {
                    $timeout(function () {
                        $scope.Contract.Search.Paging(1);
                    }, 40);

                    $scope.Contract.Search.Value = '';
                    $('#search-criteria').val('Mã hợp đồng').trigger('change');
                    $scope.Contract.selectedOption = 'all';

                }, 40);
                break;
            case 'completed':
                //CommonFactory.PostDataAjax("/Contracts/ContractSearchByStatus1", {},
                //    function (beforeSend) {
                //        $scope.Contract.Lst = [];
                //    },
                //    function (response) {
                //        $timeout(function () {
                //            UtilJS.Loading.Hide();

                //            if (response.objCodeStep.Status == jAlert.Status.Error) {
                //                jAlert.Error(response.objCodeStep.Message, 'Thông báo');
                //            }
                //            else if (response.objCodeStep.Status == jAlert.Status.Warning) {
                //                jAlert.Warning(response.objCodeStep.Message, 'Thông báo');
                //            }
                //            else if (response.objCodeStep.Status == jAlert.Status.Success) {
                //                UtilJS.Loading.Hide();
                //                $scope.Contract.Lst = response.ContractList || [];
                //            }
                //        });
                //    },
                //    function (error) {
                //        UtilJS.Loading.Hide
                //        console.log(error.message);
                //    }
                //);

                $timeout(function () {
                    $timeout(function () {
                        $scope.Contract.Search.Paging(1);
                    }, 40);

                    $scope.Contract.Search.Value = '';
                    $('#search-criteria').val('Mã hợp đồng').trigger('change');
                    $scope.Contract.selectedOption = 'completed';

                }, 40);

                break;
            case 'notCompleted':
                //CommonFactory.PostDataAjax("/Contracts/ContractSearchByStatus0", {},
                //    function (beforeSend) {
                //        $scope.Contract.Lst = [];
                //    },
                //    function (response) {
                //        $timeout(function () {
                //            UtilJS.Loading.Hide();

                //            if (response.objCodeStep.Status == jAlert.Status.Error) {
                //                jAlert.Error(response.objCodeStep.Message, 'Thông báo');
                //            }
                //            else if (response.objCodeStep.Status == jAlert.Status.Warning) {
                //                jAlert.Warning(response.objCodeStep.Message, 'Thông báo');
                //            }
                //            else if (response.objCodeStep.Status == jAlert.Status.Success) {
                //                UtilJS.Loading.Hide();
                //                $scope.Contract.Lst = response.ContractList || [];
                //            }
                //        });
                //    },
                //    function (error) {
                //        UtilJS.Loading.Hide
                //        console.log(error.message);
                //    }
                //);

                $timeout(function () {
                    $timeout(function () {
                        $scope.Contract.Search.Paging(1);
                    }, 40);

                    $scope.Contract.Search.Value = '';
                    $('#search-criteria').val('Mã hợp đồng').trigger('change');
                    $scope.Contract.selectedOption = 'notCompleted';

                }, 40);

                break;
            default:
            // code block
        }
    };
    //#endregion

    $timeout(function () {
        $('#search-criteria').select2();
    }, 100);
    
    //#region Delete Contract
    $scope.Contract.Delete = function (Contract_ID) {
        console.log("Delete clicked for Contract_ID:", Contract_ID);
        swalInit.fire({
            title: 'Bạn có chắc chắn muốn xoá hợp đồng này?',
            text: 'Bạn sẽ không thể khôi phục hợp đồng đã xoá!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xoá',
            cancelButtonText: 'Huỷ'
        }).then((result) => {
            if (result.isConfirmed) {
                // Xử lý khi người dùng chọn "Yes, delete it!"
                console.log('Người dùng đã xác nhận xóa.');
                //stt = 1;
                //var pageNum = stt;
                // tính số trang của dịch vụ cần xóa
                //var pageNum = calculatePageNumber(stt);

                // Kiểm tra lại ID cần xoá
                console.log("Delete clicked for Contract_ID:", Contract_ID);
                var data = {
                    Contract_ID: Contract_ID
                };
                UtilJS.Loading.Show();
                CommonFactory.PostDataAjax("/Contracts/DeleteContract", data,
                    function (beforeSend) { },
                    function (response) {
                        $timeout(function () {
                            UtilJS.Loading.Hide();
                            if (response.objCodeStep.Status == jAlert.Status.Error) {
                                jAlert.Error(response.objCodeStep.Message, 'Thông báo');
                                new Noty({
                                    text: response.objCodeStep.Message,
                                    type: 'error'
                                }).show();
                            }
                            else if (response.objCodeStep.Status == jAlert.Status.Warning) {
                                jAlert.Warning(response.objCodeStep.Message, 'Thông báo');
                                new Noty({
                                    text: response.objCodeStep.Message,
                                    type: 'warning'
                                }).show();
                            }
                            else if (response.objCodeStep.Status == jAlert.Status.Success) {
                                UtilJS.Loading.Hide();
                                new Noty({
                                    text: 'Xoá hợp đồng thành công!',
                                    type: 'success'
                                }).show();
                                //$scope.Contract.Search.InitData(1);
                                $scope.Contract.Search.Paging(1);
                            }
                        });
                    },
                    function (error) {
                        UtilJS.Loading.Hide();
                    }
                );
            } else {
                // Xử lý khi người dùng chọn "Cancel" hoặc bất kỳ hành động khác
                console.log('Người dùng đã hủy.');
                // Thêm mã JavaScript bạn muốn thực thi sau khi người dùng hủy ở đây.
            }
        });
    }
    //#endregion

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
