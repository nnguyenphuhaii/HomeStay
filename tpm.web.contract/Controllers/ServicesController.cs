using Core.DTO.Response;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using tpm.business;
using tpm.dto.admin;
using Microsoft.AspNetCore.Mvc.Rendering;
using Dapper;
using System;
using tpm.dto.admin.Response;
using tpm.web.contract.Models;
using Microsoft.VisualStudio.Web.CodeGeneration.Contracts.Messaging;

namespace tpm.web.contract.Controllers
{
    public class ServicesController : Controller
    {
        private readonly IServiceService _serviceService;
        private readonly ServiceCreateReqValidator _validator;
        private readonly IServiceTypeService _serviceTypeService;
        private readonly IStepsService _stepsService;
        private readonly IUnitService _serviceUnit;
        public CodeStep objCodeStep = new CodeStep();
        public ServicesController(ServiceCreateReqValidator validator, IServiceTypeService serviceTypeService, IStepsService stepsService)
        {
            _validator = validator;
            _serviceTypeService = serviceTypeService;
            _stepsService = stepsService;
        }
        [HttpGet]
        public IActionResult GetService(int Service_ID)
        {
            var getService = _serviceService.GetServicesByID(Service_ID);

            return Json(new { Service = getService });
        }
        public IActionResult Index()
        {
            var serviceTypes = _serviceTypeService.GetAllServiceTypes();

            ViewBag.ServiceTypes = serviceTypes;

            return View();
        }
        [MvcAuthorize]
        public IActionResult StepManager(int id)
        {
            ViewBag.Service_Type_ID = id;
            return View();
        }
        #region Create Post
        [HttpPost]
        public JsonResult Create(Service_TypeCreateReq objReq)
        {
            try
            {
                int newServiceTypeID = 0;

                int result = _serviceTypeService.Create(objReq, out newServiceTypeID);

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
                            Message = "Tạo mới không thành công!"
                        },
                    });
                }
            }
            catch (Exception objEx)
            {
                return Json(new
                {
                    objCodeStep = new
                    {
                        Status = JsonStatusViewModels.Error,
                        Message = "Có lỗi xảy ra khi thực hiện tạo mới!" + objEx.Message
                    },
                });
            }

        }
        #endregion

        #region Update
        [HttpPost]
        public JsonResult Update(Service_TypeUpdateReq objReq)
        {
            try
            {
                int result = _serviceTypeService.Update(objReq);
                if (result != -1)
                {
                    return Json(new
                    {
                        objCodeStep = new
                        {
                            Status = CRUDStatusCodeRes.Success,
                            Message = "Chỉnh sửa thành công"
                        },
                        //Service = newServiceType // Trả về thông tin dịch vụ mới
                    });
                }
                else
                {
                    return Json(new
                    {
                        objCodeStep = new
                        {
                            Status = CRUDStatusCodeRes.Deny,
                            Message = "Chỉnh sửa không thành công"
                        }
                    });
                }
            }
            catch (Exception objEx)
            {
                return Json(new { success = false, Message = "Có lỗi khi chỉnh sửa loại dịch vụ:\n" + objEx.Message });
            }
        }

        #endregion

        #region Delete
        [HttpPost]
        public JsonResult Delete(int serviceTypeID)
        {
            try
            {
                bool result = _serviceTypeService.Delete(serviceTypeID);

                if (result)
                {
                    // Gọi phương thức GetServiceById để lấy thông tin dịch vụ mới
                    var newServiceType = _serviceTypeService.GetAllServiceTypes();

                    return Json(new
                    {
                        objCodeStep = new
                        {
                            Status = CRUDStatusCodeRes.Success,
                            Message = "Xóa dịch vụ thành công"
                        },
                        Service = newServiceType // Trả về thông tin dịch vụ mới
                    });
                }
                else
                {
                    return Json(new
                    {
                        objCodeStep = new
                        {
                            Status = CRUDStatusCodeRes.Deny,
                            Message = "Xóa dịch vụ không thành công"
                        }
                    });
                }
            }
            catch (Exception objEx)
            {
                return Json(new
                {
                    success = false,
                    message = "Có lỗi xảy ra khi thực hiện xóa: " + objEx.Message
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
                objCodeStep.Message = "Lỗi danh sách loại dịch vụ";
                #region check sp trong cache all
                var types = _serviceTypeService.GetAllServiceTypes();
                if (types == null)
                {
                    objCodeStep.Status = JsonStatusViewModels.Warning;
                    objCodeStep.Message = $"Không tìm thấy loại dịch vụ";
                    return Json(new
                    {
                        objCodeStep = objCodeStep
                    });
                }
                #endregion

                objCodeStep.Status = JsonStatusViewModels.Success;
                objCodeStep.Message = "Load danh sách dịch vụ thành công";
                return Json(new
                {
                    objCodeStep = objCodeStep,
                    ServiceTypes = types
                });
            }
            catch (Exception ex)
            {
                objCodeStep.Status = JsonStatusViewModels.Error;
                objCodeStep.Message = "Lỗi khi load danh sách dịch vụ: " + ex.Message;
                return Json(new
                {
                    objCodeStep = objCodeStep
                });
            }
        }
        #endregion

        #region Search Step
        [HttpPost]
        [MvcAuthorize(false)]
        public JsonResult SearchSteps(StepsReq data)
        {
            try
            {
                objCodeStep.Message = "Lỗi danh sách các bước";
                var Steps = _serviceTypeService.GetStepByServiceTypeID(data.Service_Type_ID);
                #region check dịch vụ trong cache all
                if (Steps == null)
                {
                    objCodeStep.Status = JsonStatusViewModels.Warning;
                    objCodeStep.Message = $"Không tìm thấy bất kỳ bước nào của loại dịch vụ này";
                    return Json(new
                    {
                        objCodeStep = objCodeStep
                    });
                }
                #endregion

                objCodeStep.Status = JsonStatusViewModels.Success;
                objCodeStep.Message = "Load danh sách bước thành công";
                return Json(new
                {
                    objCodeStep = objCodeStep,
                    ListSteps = Steps
                });
            }
            catch (Exception ex)
            {
                objCodeStep.Status = JsonStatusViewModels.Error;
                objCodeStep.Message = "Lỗi khi load danh sách hợp đồng: " + ex.Message;
                return Json(new
                {
                    objCodeStep = objCodeStep
                });
            }
        }
        #endregion

        #region AddExistStepToServiceType
        [HttpPost]
        [MvcAuthorize(false)]
        public JsonResult AddExistStepToServiceType(AddStepReq data)
        {
            try
            {
                objCodeStep.Message = "Lỗi danh sách các bước";
                var result = _serviceTypeService.AddExistStepToServiceType(data);
                #region check dịch vụ trong cache all
                if (result == false)
                {
                    objCodeStep.Status = JsonStatusViewModels.Warning;
                    objCodeStep.Message = $"Thêm Step không thành công";
                    return Json(new
                    {
                        objCodeStep = objCodeStep
                    });
                }
                #endregion

                objCodeStep.Status = JsonStatusViewModels.Success;
                objCodeStep.Message = "Thêm Step thành công";
                return Json(new
                {
                    objCodeStep = objCodeStep
                });
            }
            catch (Exception ex)
            {
                objCodeStep.Status = JsonStatusViewModels.Error;
                objCodeStep.Message = "Lỗi khi load danh sách hợp đồng: " + ex.Message;
                return Json(new
                {
                    objCodeStep = objCodeStep
                });
            }
        }
        #endregion

        #region GetAllSteps
        [HttpPost]
        [MvcAuthorize(false)]
        public JsonResult GetAllSteps()
        {
            try
            {
                objCodeStep.Message = "Lỗi danh sách các bước";
                var Steps = _serviceTypeService.GetAllSteps();
                #region check dịch vụ trong cache all
                if (Steps == null)
                {
                    objCodeStep.Status = JsonStatusViewModels.Warning;
                    objCodeStep.Message = $"Không tìm thấy bất kỳ bước nào";
                    return Json(new
                    {
                        objCodeStep = objCodeStep
                    });
                }
                #endregion

                objCodeStep.Status = JsonStatusViewModels.Success;
                objCodeStep.Message = "Load danh sách bước thành công";
                return Json(new
                {
                    objCodeStep = objCodeStep,
                    ListSteps = Steps
                });
            }
            catch (Exception ex)
            {
                objCodeStep.Status = JsonStatusViewModels.Error;
                objCodeStep.Message = "Lỗi khi load danh sách hợp đồng: " + ex.Message;
                return Json(new
                {
                    objCodeStep = objCodeStep
                });
            }
        }
        #endregion

        #region AddNewStepToServiceType
        [HttpPost]
        [MvcAuthorize(false)]
        public JsonResult AddNewStepToServiceType(AddStepReq data)
        {
            try
            {
                objCodeStep.Message = "Lỗi danh sách các bước";
                var result = _serviceTypeService.AddNewStepToServiceType(data);
                #region check dịch vụ trong cache all
                if (result == false)
                {
                    objCodeStep.Status = JsonStatusViewModels.Warning;
                    objCodeStep.Message = $"Thêm Step mới thất bại";
                    return Json(new
                    {
                        objCodeStep = objCodeStep
                    });
                }
                #endregion

                objCodeStep.Status = JsonStatusViewModels.Success;
                objCodeStep.Message = "Thêm step mới thành công";
                return Json(new
                {
                    objCodeStep = objCodeStep,
                    Result = result
                });
            }
            catch (Exception ex)
            {
                objCodeStep.Status = JsonStatusViewModels.Error;
                objCodeStep.Message = "Lỗi khi thêm Step mới: " + ex.Message;
                return Json(new
                {
                    objCodeStep = objCodeStep
                });
            }
        }
        #endregion

        #region DeleteServiceTypeStep
        [HttpPost]
        [MvcAuthorize(false)]
        public JsonResult DeleteServiceTypeStep(AddStepReq data)
        {
            try
            {
                objCodeStep.Message = "Lỗi danh sách các bước";
                var result = _serviceTypeService.DeleteServiceTypeStep(data);
                #region check dịch vụ trong cache all
                if (result == false)
                {
                    objCodeStep.Status = JsonStatusViewModels.Warning;
                    objCodeStep.Message = $"Xóa Step thất bại";
                    return Json(new
                    {
                        objCodeStep = objCodeStep
                    });
                }
                #endregion

                objCodeStep.Status = JsonStatusViewModels.Success;
                objCodeStep.Message = "Xóa Step thành công";
                return Json(new
                {
                    objCodeStep = objCodeStep,
                    Result = result
                });
            }
            catch (Exception ex)
            {
                objCodeStep.Status = JsonStatusViewModels.Error;
                objCodeStep.Message = "Lỗi khi xóa Step: " + ex.Message;
                return Json(new
                {
                    objCodeStep = objCodeStep
                });
            }
        }
        #endregion
    }
}
