
var IndexController = ($scope, $rootScope, $timeout, $filter, ApiHelper, UtilFactory, DataFactory, $q, CommonFactory) => {

    $scope.FileAvatar = {
        Input: {},
        accept: "image/x-png,image/png,image/jpeg,image/jpg",
        acceptExtension: ["png", "jpg", 'jpeg'],
        src: "",
        type: "",
        name: ""
    };
    $scope.MaxSize = 3;
    $scope.HTTP = new XMLHttpRequest();

    $scope.Employee = {};
    $scope.Employee.DatePickerAndSelect2 = {};
    $scope.Employee.Pager = { TotalItems: 0, PageSize: 10, CurrentPage: 1 };
    $scope.Employee.Lst = [];
    $scope.Employee.Search = {};

    $scope.Employee.Department = {};
    $scope.Employee.Department.Lst = [];

    $scope.Employee.Position = {};
    $scope.Employee.Position.Lst = [];

    $scope.Employee.Gender = {};
    $scope.Employee.Gender.Lst = [];

    $scope.Employee.Delete = {};

    $scope.Employee.Edit = {};
    $scope.Employee.Edit.EmployeeEditIn4 = {};
    $scope.Employee.Edit.FullName = {};

    $scope.popupCreate = {};
    $scope.popupCreate.submitCreateForm = {};
    //$scope.popupCreate.uploadAndCrop();

    $scope.popupEdit = {};
    $scope.popupEdit.submitEditForm = {};

    $scope.popupCreate.FillFullName = function () {
        $scope.popupCreate.fullName = $scope.popupCreate.firstName + " " + $scope.popupCreate.lastName;
    };

    $scope.Employee.Search.Paging = function (intPage) {
        intPage = !intPage ? 1 : intPage;
        $scope.Employee.Pager.CurrentPage = intPage;
    };
    //$scope.Employee.Search.CustomFilter = function (item) {
    //    if ($scope.Employee.Search.Text) {
    //        if (!UtilJS.String.IsContain(item.Name, $scope.Employee.Search.Text)) {
    //            return false;
    //        }
    //    }
    //    return true;
    //};
    $scope.selectImage = function () {
        document.getElementById("fileInput").click();
    };
    var cropper; // Lưu tham chiếu tại đây

    document.getElementById("fileInput").addEventListener("change", function () {
        var file = this.files[0];
        $scope.FileAvatar.type = this.files[0].type;
        var reader = new FileReader();
        reader.onload = function (e) {

            $scope.$apply(function () {
                $scope.imageSrc = e.target.result;
            });

            // Hủy bỏ cropper hiện tại (nếu có)
            if (cropper) {
                cropper.destroy();
            }

            $timeout(function () {
                const image = document.getElementById('imageDemo');
                cropper = new Cropper(image, {
                    aspectRatio: 1,
                    autoCropArea: 1,
                    cropBoxResizable: false
                });
            }, 150)
        }
        reader.readAsDataURL(file);
    });
    $scope.selectImageEdit = function () {
        document.getElementById("fileInputEdit").click();
    };

    document.getElementById("fileInputEdit").addEventListener("change", function () {
        var file = this.files[0];
        $scope.FileAvatar.type = this.files[0].type;
        var reader = new FileReader();
        reader.onload = function (e) {

            $scope.$apply(function () {
                $scope.imageSrcEdit = e.target.result;
            });

            // Hủy bỏ cropper hiện tại (nếu có)
            if (cropper) {
                cropper.destroy();
            }

            $timeout(function () {
                const image = document.getElementById('imageDemoEdit');
                cropper = new Cropper(image, {
                    aspectRatio: 1,
                    autoCropArea: 1,
                    cropBoxResizable: false
                });
            }, 150)
        }
        reader.readAsDataURL(file);
    });
    $scope.createEmployee = function () {
        $scope.popupCreate.selectedGender = 1;
        $("#createDOB, #createFWD").daterangepicker({
            parentEl: '.content-inner',
            singleDatePicker: true,
            locale: {
                format: 'DD/MM/YYYY'
            }
        });
        $timeout(function () {
            $scope.Employee.Edit.EmployeeEditIn4.FirstName = "";
            $scope.Employee.Edit.EmployeeEditIn4.LastName = "";

        }, 100);


    }
    //#region search Employees
    $scope.searchEmployees = function () {
        console.log("Từ khoá cần tìm: " + $scope.Employee.Search.Text);
        var data = {
            KeySearch: $scope.Employee.Search.Text,
            PageIndex: 1,
            PageSize: 10
        };

        UtilJS.Loading.Show();
        CommonFactory.PostDataAjax("/Employees/SearchEmployees", data,
            function (beforeSend) { },
            function (response) {
                $timeout(function () {
                    UtilJS.Loading.Hide();
                    $scope.Employee.Lst = [];
                    if (response.objCodeStep.Status == jAlert.Status.Error) {
                        jAlert.Error(response.objCodeStep.Message, 'Thông báo');
                    }
                    else if (response.objCodeStep.Status == jAlert.Status.Warning) {
                        jAlert.Warning(response.objCodeStep.Message, 'Thông báo');
                    }
                    else if (response.objCodeStep.Status == jAlert.Status.Success) {
                        UtilJS.Loading.Hide();
                        $scope.Employee.Lst = response.EmployeesSearched || [];
                    }
                });
            },
            function (error) {
                UtilJS.Loading.Hide();
            }
        );
    };
    //#endregion

    //#region fill department
    $scope.Employee.Department.Get = function () {
        UtilJS.Loading.Show();
        CommonFactory.PostDataAjax("/Employees/GetDepartment", {},
            function (beforeSend) { },
            function (response) {
                $timeout(function () {
                    UtilJS.Loading.Hide();
                    $scope.Employee.Department.Lst = [];
                    if (response.objCodeStep.Status == jAlert.Status.Error) {
                        jAlert.Error(response.objCodeStep.Message, 'Thông báo');
                    }
                    else if (response.objCodeStep.Status == jAlert.Status.Warning) {
                        jAlert.Warning(response.objCodeStep.Message, 'Thông báo');
                    }
                    else if (response.objCodeStep.Status == jAlert.Status.Success) {
                        UtilJS.Loading.Hide();
                        $scope.Employee.Department.Lst = response.Departments || [];
                    }
                });
            },
            function (error) {
                UtilJS.Loading.Hide();
            }
        );
    };
    $scope.Employee.Department.Get();
    //#endregion

    //#region fill positon
    $scope.Employee.Position.Get = function () {
        UtilJS.Loading.Show();
        CommonFactory.PostDataAjax("/Employees/GetPosition", {},
            function (beforeSend) { },
            function (response) {
                $timeout(function () {
                    UtilJS.Loading.Hide();
                    $scope.Employee.Position.Lst = [];
                    if (response.objCodeStep.Status == jAlert.Status.Error) {
                        jAlert.Error(response.objCodeStep.Message, 'Thông báo');
                    }
                    else if (response.objCodeStep.Status == jAlert.Status.Warning) {
                        jAlert.Warning(response.objCodeStep.Message, 'Thông báo');
                    }
                    else if (response.objCodeStep.Status == jAlert.Status.Success) {
                        UtilJS.Loading.Hide();
                        $scope.Employee.Position.Lst = response.Positions || [];
                    }
                });
            },
            function (error) {
                UtilJS.Loading.Hide();
            }
        );
    };
    $scope.Employee.Position.Get();
    //#endregion

    //#region fill gender
    $scope.Employee.Gender.Get = function () {
        UtilJS.Loading.Show();
        CommonFactory.PostDataAjax("/Employees/GetGender", {},
            function (beforeSend) { },
            function (response) {
                $timeout(function () {
                    UtilJS.Loading.Hide();
                    $scope.Employee.Gender.Lst = [];
                    if (response.objCodeStep.Status == jAlert.Status.Error) {
                        jAlert.Error(response.objCodeStep.Message, 'Thông báo');
                    }
                    else if (response.objCodeStep.Status == jAlert.Status.Warning) {
                        jAlert.Warning(response.objCodeStep.Message, 'Thông báo');
                    }
                    else if (response.objCodeStep.Status == jAlert.Status.Success) {
                        UtilJS.Loading.Hide();
                        $scope.Employee.Gender.Lst = response.Genders || [];
                    }
                });
            },
            function (error) {
                UtilJS.Loading.Hide();
            }
        );
    };
    $scope.Employee.Gender.Get();
    //#endregion

    //#region search
    $scope.Employee.Search.InitData = function (intPage) {
        UtilJS.Loading.Show();
        if (intPage == undefined) intPage = 1;
        CommonFactory.PostDataAjax("/Employees/Search", {},
            function (beforeSend) { },
            function (response) {
                $timeout(function () {
                    UtilJS.Loading.Hide();
                    $scope.Employee.Lst = [];
                    if (response.objCodeStep.Status == jAlert.Status.Error) {
                        jAlert.Error(response.objCodeStep.Message, 'Thông báo');
                    }
                    else if (response.objCodeStep.Status == jAlert.Status.Warning) {
                        jAlert.Warning(response.objCodeStep.Message, 'Thông báo');
                    }
                    else if (response.objCodeStep.Status == jAlert.Status.Success) {
                        UtilJS.Loading.Hide();
                        $scope.Employee.Lst = response.Employees || [];
                        $scope.Employee.Pager.TotalItems = response.Employees.length || 0;
                        $scope.Employee.Pager.CurrentPage = intPage;
                    }
                });
            },
            function (error) {
                UtilJS.Loading.Hide();
            }
        );
    };
    $scope.Employee.Search.InitData(1);
    //#endregion

    $scope.UploadFile = function (blob) {
        UtilJS.Loading.Show();
        $scope.HTTP.open("POST", "/FileManagement/UploadAvatar", true);
        var formData = new FormData();
        formData.append("file", blob);
        $scope.HTTP.send(formData);
    };


    //#region Submit Form Create Employee
    $scope.popupCreate.submitCreateForm = function () {
        if ($scope.popupCreate.firstName == undefined ||
            $scope.popupCreate.lastName == undefined ||
            $scope.popupCreate.fullName == undefined ||
            $scope.popupCreate.phone == undefined ||
            $scope.popupCreate.email == undefined ||
            $scope.popupCreate.selectedPosition == undefined ||
            $scope.popupCreate.selectedDepartment == undefined
        ) {
            new Noty({
                text: "Vui lòng điền đủ thông tin!",
                type: 'warning'
            }).show();
        } else {
            //var img = {
            //    method: "getCroppedCanvas",
            //    option: {
            //        height: 300,
            //        width: 300
            //    }
            //};

            result = cropper.getCroppedCanvas();
            result.toBlob(function (blob) {
                $timeout(() => {
                    $scope.UploadFile(blob);
                });
            }, $scope.FileAvatar.type);

            $scope.HTTP.onreadystatechange = function (event) {
                if ($scope.HTTP.readyState == 4 && $scope.HTTP.status == 200) {
                    $timeout(() => {
                        UtilJS.Loading.Hide();
                        var response = JSON.parse($scope.HTTP.responseText);
                        //----------------------------------------------------------
                        if (response.objCodeStep.Status == 0) {

                            var data = {
                                FirstName: $scope.popupCreate.firstName,
                                LastName: $scope.popupCreate.lastName,
                                FullName: $scope.popupCreate.fullName,
                                GenderID: $scope.popupCreate.selectedGender,
                                Phone: $scope.popupCreate.phone,
                                Email: $scope.popupCreate.email,
                                PositionID: $scope.popupCreate.selectedPosition.PositionID,
                                DepartmentID: $scope.popupCreate.selectedDepartment.DepartmentID,
                                DOB: moment($scope.popupCreate.DOB, "DD/MM/YYYY").format("MM/DD/YYYY"),
                                StartDateWork: moment($scope.popupCreate.firstWorkDate, "DD/MM/YYYY").format("MM/DD/YYYY"),
                                host: response.objCodeStep.host,
                                path: response.objCodeStep.path
                            }

                            UtilJS.Loading.Show();
                            CommonFactory.PostDataAjax("/Employees/Create", data,
                                function (beforeSend) { },
                                function (response) {
                                    $timeout(function () {
                                        UtilJS.Loading.Hide();
                                        $scope.Employee.Lst = [];
                                        if (response.objCodeStep.Status == jAlert.Status.Warning) {
                                            jAlert.Warning(response.objCodeStep.Message, 'Thông báo');
                                            new Noty({
                                                text: response.objCodeStep.Message,
                                                type: 'warning'
                                            }).show();
                                        }
                                        else if (response.objCodeStep.Status == jAlert.Status.Success) {
                                            UtilJS.Loading.Hide();
                                            new Noty({
                                                text: 'Thêm nhân viên thành công!',
                                                type: 'success'
                                            }).show();
                                            $scope.Employee.Search.InitData(1);
                                        }
                                    });
                                },
                                function (error) {
                                    UtilJS.Loading.Hide();
                                }
                            );
                        } else {
                            jAlert.Error("Upload avatar thất bại", 'Thông báo');
                            return;
                        }

                        //if (response.statusCode != 200) {
                        //    jAlert.Error("Upload avatar thất bại", 'Thông báo');
                        //    return;
                        //}
                        //if (response.statusCode == 200 && response.Success) {
                        //    //objFileNew.FilePathSaved = response.Data.PathFile;
                        //    //objFileNew.FilePathRelative = response.FilePathRelative;
                        //    $scope.UpdateAvatar(response);//update dữ liệu
                        //}
                        console.log(response);
                    }, 200);
                }
                else if ($scope.HTTP.readyState == 4 && $scope.HTTP.status != 200) {
                    $timeout(() => {
                        UtilJS.Loading.Hide();
                        if ($scope.HTTP.status == 404) {
                            jAlert.Error("Định dạng file không đúng.", 'Thông báo');
                        }
                        else if ($scope.HTTP.status == 0 || $scope.HTTP.status == 401) {
                            jAlert.Warning("Phiên làm việc đã hết hạn, vui lòng đăng nhập lại.");
                        }
                        else {
                            jAlert.Error("Lỗi status " + $scope.HTTP.status, 'Thông báo');
                            console.log($scope.HTTP);
                        }
                    }, 200);
                }
                $scope.$apply();
            }

            $("#modal_create_employee").modal("hide");
        }
    }
    //#endregion

    //#region submitEditForm
    $scope.popupEdit.submitEditForm = function () {
        try {

            if ($scope.Employee.Edit.EmployeeEditIn4.FirstName == undefined ||
                $scope.Employee.Edit.EmployeeEditIn4.LastName == undefined ||
                $scope.Employee.Edit.EmployeeEditIn4.FullName == undefined ||
                $scope.Employee.Edit.EmployeeEditIn4.Phone == undefined ||
                $scope.Employee.Edit.EmployeeEditIn4.Email == undefined ||
                $scope.Employee.Edit.EmployeeEditIn4.PositionID == undefined ||
                $scope.Employee.Edit.EmployeeEditIn4.DepartmentID == undefined
            ) {
                new Noty({
                    text: "Vui lòng điền đủ thông tin!",
                    type: 'warning'
                }).show();
            } else {
                if ($('#imageDemoEdit').attr('src') == undefined) {
                    console.log('ID cần update: ', $scope.Employee.Edit.EmployeeEditIn4.EmployeeID);
                    var data = {
                        avatarUpdate: 0,
                        employeeid: $scope.Employee.Edit.EmployeeEditIn4.EmployeeID,
                        firstname: $scope.Employee.Edit.EmployeeEditIn4.FirstName,
                        lastname: $scope.Employee.Edit.EmployeeEditIn4.LastName,
                        fullname: $scope.Employee.Edit.EmployeeEditIn4.FullName,
                        dob: moment($scope.Employee.Edit.EmployeeEditIn4.DOB, "DD/MM/YYYY").format("MM/DD/YYYY"),
                        startdatework: moment($scope.Employee.Edit.EmployeeEditIn4.StartDateWork, "DD/MM/YYYY").format("MM/DD/YYYY"),
                        genderid: $scope.Employee.Edit.EmployeeEditIn4.GenderID,
                        phone: $scope.Employee.Edit.EmployeeEditIn4.Phone,
                        email: $scope.Employee.Edit.EmployeeEditIn4.Email,
                        positionid: $scope.Employee.Edit.EmployeeEditIn4.PositionID,
                        departmentid: $scope.Employee.Edit.EmployeeEditIn4.DepartmentID
                    }
                    console.log("Data cần Update: ", data);


                    UtilJS.Loading.Show();
                    CommonFactory.PostDataAjax("/Employees/Update", data,
                        function (beforeSend) { },
                        function (response) {
                            $timeout(function () {
                                UtilJS.Loading.Hide();
                                $scope.Employee.Lst = [];
                                if (response.objCodeStep.Status == jAlert.Status.Warning) {
                                    jAlert.Warning(response.objCodeStep.Message, 'Thông báo');
                                }
                                else if (response.objCodeStep.Status == jAlert.Status.Success) {
                                    UtilJS.Loading.Hide();
                                    new Noty({
                                        text: 'Sửa nhân viên thành công!',
                                        type: 'success'
                                    }).show();
                                    $scope.Employee.Search.InitData(1);
                                    $("#modal_edit_employee").modal("hide");
                                }
                            });
                        },
                        function (error) {
                            UtilJS.Loading.Hide();
                        }
                    );
                }
                else {
                    result = cropper.getCroppedCanvas();
                    result.toBlob(function (blob) {
                        $timeout(() => {
                            $scope.UploadFile(blob);
                        });
                    }, $scope.FileAvatar.type);

                    $scope.HTTP.onreadystatechange = function (event) {
                        if ($scope.HTTP.readyState == 4 && $scope.HTTP.status == 200) {
                            $timeout(() => {
                                UtilJS.Loading.Hide();
                                var response = JSON.parse($scope.HTTP.responseText);
                                //----------------------------------------------------------
                                if (response.objCodeStep.Status == 0) {
                                    console.log('ID cần update: ', $scope.Employee.Edit.EmployeeEditIn4.EmployeeID);

                                    var data = {
                                        avatarUpdate: 1,
                                        employeeid: $scope.Employee.Edit.EmployeeEditIn4.EmployeeID,
                                        firstname: $scope.Employee.Edit.EmployeeEditIn4.FirstName,
                                        lastname: $scope.Employee.Edit.EmployeeEditIn4.LastName,
                                        fullname: $scope.Employee.Edit.EmployeeEditIn4.FullName,
                                        dob: moment($scope.Employee.Edit.EmployeeEditIn4.DOB, "DD/MM/YYYY").format("MM/DD/YYYY"),
                                        startdatework: moment($scope.Employee.Edit.EmployeeEditIn4.StartDateWork, "DD/MM/YYYY").format("MM/DD/YYYY"),
                                        genderid: $scope.Employee.Edit.EmployeeEditIn4.GenderID,
                                        phone: $scope.Employee.Edit.EmployeeEditIn4.Phone,
                                        email: $scope.Employee.Edit.EmployeeEditIn4.Email,
                                        positionid: $scope.Employee.Edit.EmployeeEditIn4.PositionID,
                                        departmentid: $scope.Employee.Edit.EmployeeEditIn4.DepartmentID,
                                        host: response.objCodeStep.host,
                                        path: response.objCodeStep.path
                                    }
                                    console.log("Data cần Update: ", data);


                                    UtilJS.Loading.Show();
                                    CommonFactory.PostDataAjax("/Employees/Update", data,
                                        function (beforeSend) { },
                                        function (response) {
                                            $timeout(function () {
                                                UtilJS.Loading.Hide();
                                                $scope.Employee.Lst = [];
                                                if (response.objCodeStep.Status == jAlert.Status.Warning) {
                                                    jAlert.Warning(response.objCodeStep.Message, 'Thông báo');
                                                }
                                                else if (response.objCodeStep.Status == jAlert.Status.Success) {
                                                    UtilJS.Loading.Hide();
                                                    new Noty({
                                                        text: 'Sửa nhân viên thành công!',
                                                        type: 'success'
                                                    }).show();
                                                    $scope.Employee.Search.InitData(1);
                                                    $("#modal_edit_employee").modal("hide");
                                                }
                                            });
                                        },
                                        function (error) {
                                            UtilJS.Loading.Hide();
                                        }
                                    );

                                } else {
                                    jAlert.Error("Upload avatar thất bại", 'Thông báo');
                                    return;
                                }

                                //if (response.statusCode != 200) {
                                //    jAlert.Error("Upload avatar thất bại", 'Thông báo');
                                //    return;
                                //}
                                //if (response.statusCode == 200 && response.Success) {
                                //    //objFileNew.FilePathSaved = response.Data.PathFile;
                                //    //objFileNew.FilePathRelative = response.FilePathRelative;
                                //    $scope.UpdateAvatar(response);//update dữ liệu
                                //}
                                console.log(response);
                            }, 200);
                        }
                        else if ($scope.HTTP.readyState == 4 && $scope.HTTP.status != 200) {
                            $timeout(() => {
                                UtilJS.Loading.Hide();
                                if ($scope.HTTP.status == 404) {
                                    jAlert.Error("Định dạng file không đúng.", 'Thông báo');
                                }
                                else if ($scope.HTTP.status == 0 || $scope.HTTP.status == 401) {
                                    jAlert.Warning("Phiên làm việc đã hết hạn, vui lòng đăng nhập lại.");
                                }
                                else {
                                    jAlert.Error("Lỗi status " + $scope.HTTP.status, 'Thông báo');
                                    console.log($scope.HTTP);
                                }
                            }, 200);
                        }
                        $scope.$apply();
                    }
                }
            }

        } catch (error) {
            console.log(error.message);
        }
    }
    //#endregion


    //#region Delete
    $scope.Employee.Delete = function (EmployeeID, stt) {
        console.log("Delete clicked for EmployeeID:", EmployeeID);
        swalInit.fire({
            title: 'Bạn có chắc chắn muốn xoá nhân viên này?',
            text: 'Bạn sẽ không thể khôi phục nhân viên đã xoá!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xoá',
            cancelButtonText: 'Huỷ'
        }).then((result) => {
            if (result.isConfirmed) {
                // Xử lý khi người dùng chọn "Yes, delete it!"
                console.log('Người dùng đã xác nhận xóa.');
                stt = 1;
                var pageNum = stt;
                // tính số trang của dịch vụ cần xóa
                //var pageNum = calculatePageNumber(stt);

                // Kiểm tra lại ID cần xoá
                console.log("Delete clicked for EmployeeID:", EmployeeID);
                var data = {
                    EmployeeID: EmployeeID
                };

                UtilJS.Loading.Show();
                CommonFactory.PostDataAjax("/Employees/Delete", data,
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
                                    text: 'Xoá nhân viên thành công!',
                                    type: 'success'
                                }).show();
                                $scope.Employee.Search.InitData(pageNum);
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

    };
    //#endregion

    //#region Fill Full Name Popup Edit
    $scope.FillFullName = function () {
        console.log($scope.Employee.Edit.EmployeeEditIn4.FullName);
        $scope.Employee.Edit.EmployeeEditIn4.FullName = $scope.Employee.Edit.EmployeeEditIn4.FirstName + " " + $scope.Employee.Edit.EmployeeEditIn4.LastName;
    };
    //#endregion

    //#region Lấy EmployeeID của nhân viên cần Edit

    $scope.Employee.Edit = function (EmployeeID, FirstName, LastName, FullName, DOB, StartDateWork, Phone, Email, DepartmentID, PositionID, GenderID, Host, Path) {
        try {
            //var containerWidth = $('#image-container-edit').width();
            //$('#image-container-edit').height(containerWidth);

            $scope.Employee.Edit.EmployeeEditIn4 = {};
            //$scope.Employee.popupEdit.EmployeeEditIn4 = {};
            $scope.Employee.Edit.EmployeeEditIn4.EmployeeID = EmployeeID;
            $scope.Employee.Edit.EmployeeEditIn4.FirstName = FirstName;
            $scope.Employee.Edit.EmployeeEditIn4.LastName = LastName;
            $scope.Employee.Edit.EmployeeEditIn4.FullName = $scope.Employee.Edit.EmployeeEditIn4.FirstName + " " + $scope.Employee.Edit.EmployeeEditIn4.LastName;
            $scope.Employee.Edit.EmployeeEditIn4.DOB = moment(DOB).format("DD/MM/YYYY");
            $scope.Employee.Edit.EmployeeEditIn4.StartDateWork = moment(StartDateWork).format("DD/MM/YYYY");
            $scope.Employee.Edit.EmployeeEditIn4.Phone = Phone;
            $scope.Employee.Edit.EmployeeEditIn4.Email = Email;
            $scope.Employee.Edit.EmployeeEditIn4.DepartmentID = DepartmentID;
            $scope.Employee.Edit.EmployeeEditIn4.PositionID = PositionID;
            $scope.Employee.Edit.EmployeeEditIn4.GenderID = GenderID;
            $timeout(function () {
                $('#selectedPositionEdit').val(PositionID).trigger('change');
                $('#selectedDepartmentEdit').val(DepartmentID).trigger('change');
                $scope.Employee.Edit.EmployeeEditIn4.GenderID = parseInt(GenderID);
            }, 100);

            $('#DOBEdit, #StartDateWorkEdit').daterangepicker({
                parentEl: '.content-inner',
                singleDatePicker: true,
                locale: {
                    format: 'DD/MM/YYYY'
                }
            });

            $timeout(function () {
                try {
                    if (cropper) {
                        cropper.destroy();
                        // Xóa avatar cũ
                        $('#imageDemoEdit').attr('ng-src', '{{imageSrcEdit}}').removeAttr('src');
                    }
                    
                    $scope.imageSrcEdit = Host + Path;
                    $('#imageDemoEdit').attr('style', 'width: 100%');
                } catch (ex) {
                    console.log(ex.message);
                }
            }, 100)

            console.log($scope.Employee.Edit.EmployeeEditIn4);

            console.log('Chạy tới bước đỗ dữ liệu vào bảng edit với dữ liệu là: ', $scope.Employee.Lst);
            console.log('Dữ liệu được đỗ ra: ', $scope.Employee.Edit.EmployeeEditIn4);
        } catch (error) {
            console.log("Lỗi: " + error.message);
        }
    }
    //#endregion

    $scope.Employee.DatePickerAndSelect2 = function () {
        //$('.daterange-single').daterangepicker({
        //    parentEl: '.content-inner',
        //    singleDatePicker: true,
        //    locale: {
        //        format: 'DD/MM/YYYY'
        //    }
        //});
        $('.select').select2();
    };
    $scope.Employee.DatePickerAndSelect2();

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

var SetCropImg = function () {
    var $cropper = $(".cropper"),
        options = {
            aspectRatio: 1,
            preview: '#preview',
            crop: function (e) {
            }
        };
    // Initialize cropper with options
    $cropper.cropper('destroy').cropper(options);
    function b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        var blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }
}