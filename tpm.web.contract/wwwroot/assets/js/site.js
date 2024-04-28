const toggleBtn = document.querySelector('.toggle-btn');
let isToggleOn = true;

toggleBtn.addEventListener('click', function () {
    isToggleOn = !isToggleOn;
    toggleBtn.innerHTML = isToggleOn ? '<i class="fa-solid fa-toggle-on fa-lg"></i>' : '<i class="fa-solid fa-toggle-off fa-lg"></i>';
});

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.classList.add("active");

    // Lưu tab hiện tại vào sessionStorage
    var currentTab = '#' + evt.currentTarget.id;
    sessionStorage.setItem('defaultTab', currentTab);
}

// Xử lý sự kiện khi tải trang
window.onload = function () {
    document.getElementById("Tab1").style.display = "block";
    document.getElementById("Tab1").classList.add("active");
};


// hàm đóng popup
function closePopupE() {
    $("#myPopupE").hide();
    $(".overlay").hide();
    $("body").removeClass("popup-active");

    location.reload();

    $("#employeeID").val("");
    $("#fullName").val("");
    $("#phone").val("");
    $("#email").val("");
    $("#dob").val("");
}

function closePopupS() {
    $("#myPopup").hide();
    $(".overlay").hide();
    $("body").removeClass("popup-active");
    location.reload();
    $("#unitPrice").val("");
    $("#quantity").val("");
    $("#totalAmount").val("");
}

/*function closePopupC() {
    $("#myPopupC").hide();
    $(".overlay").hide();
    $("body").removeClass("popup-active");
    location.reload();
    $("#contractNumber").val("");
    $("#customerCompanyName").val("");
    $("#address").val("");
    $("#phone").val("");
    $("#mobilePhone").val("");
    $("#tin").val("");
    $("#email").val("");
}*/


// hàm mở popup create
function openCreatePopup() {
    $("#myPopup").show();
    $(".overlay").show();
    $("body").addClass("popup-active");
}
// hàm mở popup create employee
function openCreatePopupE() {
    $("#myPopupE").show();
    $(".overlay").show();
    $("body").addClass("popup-active");
}

// hàm mở popup create contract
/*function openCreatePopupC() {
    $("#myPopupC").show();
    $(".overlay").show();
    $("body").addClass("popup-active");
}*/

// hàm mở popup edit contract
/*function openEditPopupC(contractID) {
    $("#myPopupC").show();
    $(".overlay").show();
    $("body").addClass("popup-active");
    selectedContractID = contractID;


    if (contractID) {
        getContractByID(contractID, function (getContract) {
            if (getContract) {

                var contractTypeName = getContract.Contract_Type_Name;
                var $contractsTypeDropdown = $("#contractsTypeDropdown");
                $contractsTypeDropdown
                    .find("option")
                    .filter(function () {
                        return $(this).text().trim() === contractTypeName;
                    })
                    .prop("selected", true);

                $("#contractNumber").val(getContract.Contract_Number);
                $("#customerCompanyName").val(getContract.Customer_Company_Name);
                $("#address").val(getContract.Address);
                $("#address2").val(getContract.Address);
                $("#phone").val(getContract.Phone);
                $("#mobilePhone").val(getContract.MobilePhone);
                $("#tin").val(getContract.TIN);
                $("#email").val(getContract.Email);
            }
        });
    }
}*/

// hàm mở popup edit Employee
function openEditPopupE(id) {
    $("#myPopupE").show();
    $(".overlay").show();
    $("body").addClass("popup-active");
    selectedID = id;


    if (id) {
        getEmployeeByID(id, function (getEmployee) {
            if (getEmployee) {
                var genderName = getEmployee.GenderName;
                var departmentName = getEmployee.DepartmentName;
                var positionName = getEmployee.PositionName;
                var employeeTypeName = getEmployee.EmployeeTypeName;
                var $genderTypeDropdown = $("#genderTypeDropdown");
                var $departmentTypeDropdown = $("#departmentTypeDropdown");
                var $positionTypeDropdown = $("#positionTypeDropdown");
                var $employeeTypeDropdown = $("#employeeTypeDropdown");
                var dob = new Date(getEmployee.DOB);
                var year = dob.getFullYear().toString().padStart(4, "0");
                var month = (dob.getMonth() + 1).toString().padStart(2, "0");
                var day = dob.getDate().toString().padStart(2, "0");
                var formattedDOB = year + "-" + month + "-" + day;

                $genderTypeDropdown
                    .find("option")
                    .filter(function () {
                        return $(this).text().trim() === genderName;
                    })
                    .prop("selected", true);

                $departmentTypeDropdown
                    .find("option")
                    .filter(function () {
                        return $(this).text().trim() === departmentName;
                    })
                    .prop("selected", true);

                $positionTypeDropdown
                    .find("option")
                    .filter(function () {
                        return $(this).text().trim() === positionName;
                    })
                    .prop("selected", true);

                $employeeTypeDropdown
                    .find("option")
                    .filter(function () {
                        return $(this).text().trim() === employeeTypeName;
                    })
                    .prop("selected", true);

                $("#employeeID").val(getEmployee.EmployeeID);
                $("#dob").val(formattedDOB);
                $("#fullName").val(getEmployee.FullName);
                $("#phone").val(getEmployee.Phone);
                $("#email").val(getEmployee.Email);
            }
        });
    }
}

// hàm mở popup edit Service
function openEditPopupS(serviceID) {
    $("#myPopup").show();
    $(".overlay").show();
    $("body").addClass("popup-active");
    selectedServiceID = serviceID;

    if (serviceID) {
        getServiceByID(serviceID, function (getService) {
            if (getService) {
                var serviceTypeName = getService.Service_Type_Name;
                var unit = getService.Unit;
                var $serviceTypeDropdown = $("#serviceTypeDropdown");
                var $unitDropdown = $("#unitDropdown");

                $serviceTypeDropdown
                    .find("option")
                    .filter(function () {
                        return $(this).text().trim() === serviceTypeName;
                    })
                    .prop("selected", true);

                $unitDropdown
                    .find("option")
                    .filter(function () {
                        return $(this).text().trim() === unit;
                    })
                    .prop("selected", true);

                $("#unitPrice").val(getService.Unit_Price);
                $("#quantity").val(getService.Quantity);
                $("#totalAmount").val(getService.Total_Amount);
            }
        });
    }
}


// hàm lấy dữ liệu theo id
function getEmployeeByID(id, callback) {
    $.ajax({
        url: "/Employees/GetEmployee",
        type: "GET",
        dataType: "json",
        data: { ID: id },
        success: function (data) {
            var getEmployee = data.Employee[0];
           

            if (typeof callback === "function") {
                callback(getEmployee);
            }
        },
        error: function (xhr, status, error) {
            console.log("Lỗi khi lấy dữ liệu:", error);
            alert("Lỗi khi lấy dữ liệu. Vui lòng kiểm tra console log.");
        },
    });
}

// hàm lấy dữ liệu Service id
function getServiceByID(serviceID, callback) {
    $.ajax({
        url: "/Contracts/GetService",
        type: "GET",
        dataType: "json",
        data: { Service_ID: serviceID },
        success: function (data) {
            var getService = data.Service[0];
            if (typeof callback === "function") {
                callback(getService);
            }
        },
        error: function (xhr, status, error) {
            console.log("Lỗi khi lấy dịch vụ:", error);
            alert("Lỗi khi lấy dịch vụ. Vui lòng kiểm tra console log.");
        },
    });
}

// hàm lấy contract theo id
function getContractByID(contractID, callback) {
    $.ajax({
        url: "/Contracts/GetContract",
        type: "GET",
        dataType: "json",
        data: { Contract_ID: contractID },
        success: function (data) {
            var getContract = data.Contract[0];

            if (typeof callback === "function") {
                callback(getContract);
            }
        },
        error: function (xhr, status, error) {
            console.log("Lỗi khi lấy dữ liệu:", error);
            alert("Lỗi khi lấy dữ liệu. Vui lòng kiểm tra console log.");
        },
    });
}

// hàm delete nhân viên
function deleteEmployee(event, id) {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của liên kết

    var $deletedRow = $(event.target).closest('tr'); // Lấy thẻ cha là <tr> chứa dòng

    // Gửi Ajax request để xóa dịch vụ
    $.ajax({
        url: '/Employees/Delete',
        type: 'DELETE',
        dataType: 'json',
        data: { ID: id },
        success: function (result) {
            alert("Xóa thành công!");

            // Loại bỏ dòng vừa click xoá khỏi bảng
            $deletedRow.remove();
        },
        error: function () {
            alert("Lỗi: Xóa không thành công!");
        }
    });
}

// hàm delete dịch vụ
function deleteService(event, serviceID) {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của liên kết

    var $deletedRow = $(event.target).closest('tr'); // Lấy thẻ cha là <tr> chứa dòng

    // Gửi Ajax request để xóa dịch vụ
    $.ajax({
        url: '/Contracts/Delete',
        type: 'DELETE',
        dataType: 'json',
        data: { serviceID: serviceID },
        success: function (result) {
            alert("Xóa dịch vụ thành công!");

            // Loại bỏ dòng vừa click xoá khỏi bảng
            $deletedRow.remove();
        },
        error: function () {
            alert("Lỗi: Xóa dịch vụ không thành công!");
        }
    });
}

// hàm delete contract
function deleteContract(event, contractID) {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của liên kết

    var $deletedRow = $(event.target).closest('tr'); // Lấy thẻ cha là <tr> chứa dòng

    // Gửi Ajax request để xóa dịch vụ
    $.ajax({
        url: '/Contracts/DeleteContract',
        type: 'DELETE',
        dataType: 'json',
        data: { contractID: contractID },
        success: function (result) {
            alert("Xóa dịch vụ thành công!");

            // Loại bỏ dòng vừa click xoá khỏi bảng
            $deletedRow.remove();
        },
        error: function () {
            alert("Lỗi: Xóa dịch vụ không thành công!");
        }
    });
}

// Hàm lấy gia trị value
function getIndexByValue(selectElement, value) {
    return selectElement.find("option[value='" + value + "']").index();
}

// hàm tính toán dịch vụ
function initializeScript() {
    $('#unitPrice').inputmask({
        alias: 'numeric',
        groupSeparator: ',',
        autoGroup: true,
        digits: 0,
        prefix: '',
        rightAlign: false
    });

    var unitPrice = parseFloat($('#unitPrice').val().replace(/,/g, ''));
    var quantity = parseFloat($('#quantity').val());
    var totalAmount = unitPrice * quantity;

    // Định dạng và gán giá trị mặc định cho totalAmount
    $('#totalAmount').val(totalAmount.toLocaleString() + ' VNĐ');

    $('#unitPrice, #quantity').on('input', calculateTotalAmount);

    function calculateTotalAmount() {
        var unitPrice = parseFloat($('#unitPrice').val().replace(/,/g, ''));
        var quantity = parseFloat($('#quantity').val());
        var totalAmount = unitPrice * quantity;

        $('#totalAmount').val(totalAmount.toLocaleString() + ' VNĐ');
    }
}

$(document).ready(function () {
    initializeScript();
});
