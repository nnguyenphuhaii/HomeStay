var IndexController = ($scope, $rootScope, $timeout, $filter, ApiHelper, UtilFactory, DataFactory, $q, CommonFactory) => {

    //#region declare variable
    var objExportSearch;
    $scope.ServiceType = {};
    $scope.ServiceType.Pager = { TotalItems: 0, PageSize: 10, CurrentPage: 1 };
    $scope.ServiceType.Lst = [];
    $scope.ServiceType.Search = {};

    $scope.formData = {};
    $scope.formEditData = {};
    $scope.Delete = {};
    $scope.Edit = {};

    $scope.popup = {};
    $scope.popup.serviceTypeIDChoosing = -1;
    var sttChoosing = 1;

    //#endregion

    $scope.ServiceType.Search.Paging = function (intPage) {
        intPage = !intPage ? 1 : intPage;
        $scope.ServiceType.Pager.CurrentPage = intPage;
    };
    $scope.ServiceType.Search.CustomFilter = function (item) {
        if ($scope.ServiceType.Search.Text) {
            if (!UtilJS.String.IsContain(item.Name, $scope.ServiceType.Search.Text)) {
                return false;
            }
        }
        return true;
    };
    //#region search
    $scope.ServiceType.Search.InitData = function (intPage) {
        UtilJS.Loading.Show();
        //intPage = 1;
        if (intPage == undefined) intPage = 1;
        CommonFactory.PostDataAjax("/Services/Search", {},
            function (beforeSend) { },
            function (response) {
                $timeout(function () {
                    UtilJS.Loading.Hide();
                    $scope.ServiceType.Lst = [];
                    if (response.objCodeStep.Status == jAlert.Status.Error) {
                        jAlert.Error(response.objCodeStep.Message, 'Thông báo');
                    }
                    else if (response.objCodeStep.Status == jAlert.Status.Warning) {
                        jAlert.Warning(response.objCodeStep.Message, 'Thông báo');
                    }
                    else if (response.objCodeStep.Status == jAlert.Status.Success) {
                        UtilJS.Loading.Hide();
                        $scope.ServiceType.Lst = response.ServiceTypes || [];
                        $scope.ServiceType.Pager.TotalItems = response.ServiceTypes.length || 0;
                        $scope.ServiceType.Pager.CurrentPage = intPage;
                    }
                });
            },
            function (error) {
                UtilJS.Loading.Hide();
            }
        );
    };
    $scope.ServiceType.Search.InitData();
    //#endregion

    //#region Lấy ký tự đầu
    $scope.LayKyTuDau = function (chuoi) {
        return chuoi.split(' ').map(word => word.charAt(0).toUpperCase()).join('');
    }
    //#endregion

    //#region create
    $scope.submitForm = function () {
        console.log('Tên muốn tạo: ', $scope.formData.name);
        var data = {
            Name: $scope.formData.name,
            ShortName: $scope.LayKyTuDau($scope.formData.name)
        };
        console.log("Data để tạo mới: ", data);
        //data.Name = $scope.formData.name;

        //$.ajax({
        //    url: "/Services/Create",
        //    type: "post",
        //    datatype: "json",
        //    data: data,
        //    success: function () {
        //        new Noty({
        //            text: 'Gửi yêu cầu thêm thành công!',
        //            type: 'success'
        //        }).show();

        //        //BoxNotify.Success("Gửi yêu cầu thêm thành công!");
        //        //jAlert.Success("Gửi yêu cầu thêm thành công!");

        //        $scope.ServiceType.Search.InitData();
        //    },
        //    error: function (error) {
        //        console.log("lỗi khi cập nhật:", error);
        //        //alert("lỗi khi cập nhật. vui lòng kiểm tra console log.");
        //        new Noty({
        //            text: 'Lỗi khi cập nhật. vui lòng kiểm tra console log.',
        //            type: 'error'
        //        }).show();
        //    }
        //});

        CommonFactory.PostDataAjax("/Services/Create", data,
            function (beforeSend) {},
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
                            text: 'Gửi yêu cầu thêm thành công!',
                            type: 'success'
                        }).show();
                        $scope.ServiceType.Search.InitData();
                    }
                });
            },
            function (error) {
                UtilJS.Loading.Hide();
            }
        );

        $("#modal_add_service_type").modal("hide");
    };
    //#endregion

    //#region edit
    $scope.submitEditForm = function () {
        console.log('ID cần update: ', $scope.popup.serviceTypeIDChoosing);
        console.log('Name to update: ', $scope.formEditData.name);

        var pageNum = calculatePageNumber(sttChoosing);

        var data = {
            Service_Type_ID: $scope.popup.serviceTypeIDChoosing,
            Name: $scope.formEditData.name
        };

        $.ajax({
            url: "/Services/Update",
            type: "POST",
            datatype: "json",
            data: data,
            success: function () {
                //alert("Gửi yêu cầu sửa thành công!");
                new Noty({
                    text: 'Gửi yêu cầu sửa thành công!',
                    type: 'success'
                }).show();
                $scope.ServiceType.Search.InitData(pageNum);
            },
            error: function (error) {
                console.log("lỗi khi cập nhật:", error);
                //alert("lỗi khi cập nhật. vui lòng kiểm tra console log.");
                new Noty({
                    text: 'Lỗi khi cập nhật. vui lòng kiểm tra console log.',
                    type: 'error'
                }).show();
            }
        });
        $("#modal_edit_service_type").modal("hide");
    };
    //#endregion

    //#region Delete
    $scope.Delete = function (serviceTypeID, stt) {
        swalInit.fire({
            title: 'Bạn có chắc chắn muốn xoá dịch vụ này?',
            text: 'Bạn sẽ không thể khôi phục dịch vụ đã xoá!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xoá',
            cancelButtonText: 'Huỷ'
        }).then((result) => {
            if (result.isConfirmed) {
                // Xử lý khi người dùng chọn "Yes, delete it!"
                console.log('Người dùng đã xác nhận xóa.');
                // Thêm mã JavaScript bạn muốn thực thi sau khi người dùng xác nhận ở đây.
                // tính số trang của dịch vụ cần xóa
                var pageNum = calculatePageNumber(stt);

                // Ở đây, bạn có thể sử dụng biến serviceTypeID, chẳng hạn để thực hiện các thao tác cập nhật dựa trên ID này.
                console.log("Delete clicked for Service_Type_ID:", serviceTypeID);
                // Tiếp tục thực hiện các hành động cần thiết với serviceTypeID.

                $.ajax({
                    url: "/Services/Delete?serviceTypeID=" + serviceTypeID,
                    type: "POST",
                    dataType: "json", data: {},
                    success: function () {
                        //alert("Gửi yêu cầu xóa thành công!");
                        new Noty({
                            text: 'Gửi yêu cầu xóa thành công!',
                            type: 'success'
                        }).show();
                        $scope.ServiceType.Search.InitData(pageNum);
                    },
                    error: function (error) {
                        console.log("Lỗi khi cập nhật:", error);
                        //alert("Lỗi khi cập nhật. Vui lòng kiểm tra console log.");
                        new Noty({
                            text: 'Lỗi khi cập nhật. vui lòng kiểm tra console log.',
                            type: 'error'
                        }).show();
                    }
                });
            } else {
                // Xử lý khi người dùng chọn "Cancel" hoặc bất kỳ hành động khác
                console.log('Người dùng đã hủy.');
                // Thêm mã JavaScript bạn muốn thực thi sau khi người dùng hủy ở đây.
            }
        });
        
    };
    //#endregion

    //#region Edit
    $scope.Edit = function (serviceTypeID, name, stt) {
        $scope.popup.serviceTypeIDChoosing = serviceTypeID;
        sttChoosing = stt;
        // Ở đây, bạn có thể sử dụng biến serviceTypeID, chẳng hạn để thực hiện các thao tác cập nhật dựa trên ID này.
        console.log("Edit clicked for Service_Type_ID:", $scope.popup.serviceTypeIDChoosing);
        console.log("Name:", name);
        // Tiếp tục thực hiện các hành động cần thiết với serviceTypeID.
        $("#nameInput").val(name);
    };
    //#endregion
    function calculatePageNumber(stt) {
        if ((stt * 1.0 / 5) < 1) {
            return 1;
        } else {
            if ((stt % 5) == 0) {
                return (stt * 1.0 / 5);
            }
            else {
                return (stt * 1.0 / 5) + 1;
            }
        }
        return 1;
    }
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
}
IndexController.$inject = ["$scope", "$rootScope", "$timeout", "$filter", "ApiHelper", "UtilFactory", "DataFactory", "$q", "CommonFactory"];
addController("IndexController", IndexController);
