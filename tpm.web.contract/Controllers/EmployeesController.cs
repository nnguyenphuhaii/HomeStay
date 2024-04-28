using Core.DTO.Response;
using Microsoft.AspNetCore.Mvc;
using System;
using tpm.business;
using tpm.dto.admin;
using tpm.web.contract.Models;

namespace tpm.web.contract.Controllers
{
    public class EmployeesController : Controller
    {
        private readonly EmployeeCreateReqValidator _validator;
        private readonly IEmployeeService _employeeService;
        private readonly IEmployeeTypeService _employeeTypeService;
        private readonly IPositionService _positionService;
        private readonly IDepartmentService _departmentService;
        private readonly IGenderService _genderService;

        public CodeStep objCodeStep = new CodeStep();

        public EmployeesController(EmployeeCreateReqValidator validator,IEmployeeService employeeService,IEmployeeTypeService employeeTypeService,IPositionService positionService, IDepartmentService departmentService, IGenderService genderService)
        {
            _validator = validator;
            _employeeService = employeeService;
            _employeeTypeService = employeeTypeService;
            _positionService = positionService;
            _departmentService = departmentService;
            _genderService = genderService;

        }
        #region Index
        public IActionResult Index1()
        {
            var employees = _employeeService.GetEmployeesWithTypeName();
            var employeeTypes = _employeeTypeService.GetAllEmployees();
            var positions = _positionService.GetAllPositions();
            var departments = _departmentService.GetAllDepartments();
            var genders = _genderService.GetAllGenders();


            ViewBag.Employees = employees;
            ViewBag.EmployeeTypes = employeeTypes;
            ViewBag.Positions = positions;
            ViewBag.Departments = departments;
            ViewBag.Genders = genders;
            return View();
        }
        #endregion

        #region GetEmployee
        [HttpGet]
        public IActionResult GetEmployee(int ID)
        {
            var getEmployee = _employeeService.GetEmployeesByID(ID);

            return Json(new { Employee = getEmployee });
        }
        #endregion

        #region Create New Employee
        [HttpPost]
        public JsonResult Create(EmployeeCreateReq objReq)
        {
            try
            {
                int result = _employeeService.Create(objReq);

                if (result != -1)
                {
                    return Json(new
                    {
                        objCodeStep = new
                        {
                            Status = JsonStatusViewModels.Success,
                            Message = "Tạo mới thành công"
                        },
                    });
                }
                else
                {
                    return Json(new
                    {
                        objCodeStep = new
                        {
                            Status = JsonStatusViewModels.Warning,
                            Message = "Tạo mới không thành công"
                        }
                    });
                }
            }
            catch (Exception objEx)
            {
                return Json(new
                {
                    success = false,
                    message = "Có lỗi xảy ra khi thực hiện tạo mới: " + objEx.Message
                });
            }

        }
        #endregion

        #region Update
        [HttpPost]
        public IActionResult Update(EmployeeUpdateReq objReq)
        {
            try
            {
                int result = _employeeService.Update(objReq);

                if (result != -1)
                {

                    return Json(new
                    {
                        objCodeStep = new
                        {
                            Status = JsonStatusViewModels.Success,
                            Message = "Sửa nhân viên thành công"
                        },
                    });
                }
                else
                {
                    return Json(new
                    {
                        objCodeStep = new
                        {
                            Status = JsonStatusViewModels.Warning,
                            Message = "Sửa nhân viên không thành công"
                        }
                    });
                }
            }
            catch (Exception objEx)
            {
                return Json(new
                {
                    objCodeStep = new
                    {
                        Status = JsonStatusViewModels.Warning,
                        Message = "Có lỗi xảy ra khi thực hiện sửa nhân viên: " + objEx.Message
                    }
                });
            }
        }


        #endregion

        #region Delete
        [HttpPost]
        public JsonResult Delete(string EmployeeID)
        {
            try
            {
                // Gọi phương thức xóa dịch vụ từ service
                int deleteResult = _employeeService.Delete(EmployeeID);

                if (deleteResult != -1)
                {
                    return Json(new
                    {
                        objCodeStep = new
                        {
                            Status = JsonStatusViewModels.Success,
                            Message = "Xoá nhân viên thành công"
                        },
                    });
                }
                else
                {
                    return Json(new
                    {
                        objCodeStep = new
                        {
                            Status = JsonStatusViewModels.Warning,
                            Message = "Xoá nhân viên không thành công!"
                        },
                    });
                }
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    objCodeStep = new
                    {
                        Status = JsonStatusViewModels.Error,
                        Message = "Có lỗi xảy ra trong quá trình xóa nhân viên!" + ex.Message
                    },
                });
            }
        }
        #endregion

        #region Search
        [HttpPost]
        [MvcAuthorize(false)]
        public JsonResult Search()
        {
            try
            {
                objCodeStep.Message = "Lỗi danh sách nhân viên";
                #region check sp trong cache all
                var employees = _employeeService.GetEmployeesWithTypeName();
                if (employees == null)
                {
                    objCodeStep.Status = JsonStatusViewModels.Warning;
                    objCodeStep.Message = $"Không tìm thấy nhân viên";
                    return Json(new
                    {
                        objCodeStep = objCodeStep
                    });
                }
                #endregion
                objCodeStep.Message = "Load danh sách thành công";
                objCodeStep.Status = JsonStatusViewModels.Success;
                return Json(new
                {
                    objCodeStep = objCodeStep,
                    Employees = employees
                });
            }
            catch (Exception ex)
            {
                objCodeStep.Status = JsonStatusViewModels.Error;
                return Json(new
                {
                    objCodeStep = objCodeStep
                });
            }
        }
        #endregion

        #region Get Department
        [HttpPost]
        [MvcAuthorize(false)]
        public JsonResult GetDepartment()
        {
            try
            {
                objCodeStep.Message = "Lỗi danh sách loại phòng ban";
                #region check phòng ban trong cache all
                var departments = _departmentService.GetAllDepartments();
                if (departments == null)
                {
                    objCodeStep.Status = JsonStatusViewModels.Warning;
                    objCodeStep.Message = $"Không tìm thấy phòng ban";
                    return Json(new
                    {
                        objCodeStep = objCodeStep
                    });
                }
                #endregion
                objCodeStep.Message = "Load danh sách phòng ban thành công";
                objCodeStep.Status = JsonStatusViewModels.Success;
                return Json(new
                {
                    objCodeStep = objCodeStep,
                    Departments = departments
                });
            }
            catch (Exception ex)
            {
                objCodeStep.Status = JsonStatusViewModels.Error;
                return Json(new
                {
                    objCodeStep = objCodeStep
                });
            }
        }
        #endregion

        #region Get Position
        [HttpPost]
        [MvcAuthorize(false)]
        public JsonResult GetPosition()
        {
            try
            {
                objCodeStep.Message = "Lỗi danh sách vị trí";
                #region check vị trí trong cache all
                var positions = _positionService.GetAllPositions();
                if (positions == null)
                {
                    objCodeStep.Status = JsonStatusViewModels.Warning;
                    objCodeStep.Message = $"Không tìm thấy vị trí";
                    return Json(new
                    {
                        objCodeStep = objCodeStep
                    });
                }
                #endregion
                objCodeStep.Message = "Load danh sách phòng ban thành công";
                objCodeStep.Status = JsonStatusViewModels.Success;
                return Json(new
                {
                    objCodeStep = objCodeStep,
                    Positions = positions
                });
            }
            catch (Exception ex)
            {
                objCodeStep.Status = JsonStatusViewModels.Error;
                return Json(new
                {
                    objCodeStep = objCodeStep
                });
            }
        }
        #endregion

        #region Get Gender
        [HttpPost]
        [MvcAuthorize(false)]
        public JsonResult GetGender()
        {
            try
            {
                objCodeStep.Message = "Lỗi danh sách giới tính";
                #region check vị trí trong cache all
                var genders = _genderService.GetAllGenders();
                if (genders == null)
                {
                    objCodeStep.Status = JsonStatusViewModels.Warning;
                    objCodeStep.Message = $"Không tìm thấy giới tính";
                    return Json(new
                    {
                        objCodeStep = objCodeStep
                    });
                }
                #endregion
                objCodeStep.Message = "Load danh sách giới tính thành công";
                objCodeStep.Status = JsonStatusViewModels.Success;
                return Json(new
                {
                    objCodeStep = objCodeStep,
                    Genders = genders
                });
            }
            catch (Exception ex)
            {
                objCodeStep.Status = JsonStatusViewModels.Error;
                return Json(new
                {
                    objCodeStep = objCodeStep
                });
            }
        }
        #endregion

        #region Search Employee
        [HttpPost]
        [MvcAuthorize(false)]
        public JsonResult SearchEmployees(EmployeeSearchReq objReq)
        {
            try
            {
                objCodeStep.Message = "Lỗi tìm nhân viên";
                var employeesSearched = _employeeService.SearchEmployees(objReq);

                objCodeStep.Message = "Load danh sách thành công";
                objCodeStep.Status = JsonStatusViewModels.Success;
                return Json(new
                {
                    objCodeStep = objCodeStep,
                    EmployeesSearched = employeesSearched
                });
            }
            catch (Exception ex)
            {
                objCodeStep.Status = JsonStatusViewModels.Error;
                return Json(new
                {
                    objCodeStep = objCodeStep
                });
            }
        }
        #endregion
    }
}
