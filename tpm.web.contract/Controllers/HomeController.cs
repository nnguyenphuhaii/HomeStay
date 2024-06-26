﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using tpm.business;
using tpm.dto.admin;
using tpm.web.contract.Models;

namespace tpm.web.contract.Controllers
{
    public class HomeController : BaseController
    {
        private readonly IServiceService _serviceService;
        private readonly IServiceTypeService _serviceTypeService;
        private readonly IUnitService _serviceUnit;
        private readonly IContractService _contractService;
        private readonly IContractTypeService _contractTypeService;
        private readonly IStageService _serviceStage;
        private readonly IStepsService _serviceSteps;
        public CodeStep objCodeStep = new CodeStep();

        public HomeController(IServiceService serviceService,
            IServiceTypeService serviceTypeService, IUnitService serviceUnit, IContractService contractService,
            IContractTypeService contractTypeService, IStageService serviceStage, IStepsService serviceSteps)
        {
            _serviceService = serviceService;
            _serviceTypeService = serviceTypeService;
            _serviceUnit = serviceUnit;
            _contractService = contractService;
            _contractTypeService = contractTypeService;
            _serviceStage = serviceStage;
            _serviceSteps = serviceSteps;
        }

        [MvcAuthorize]
        public IActionResult Index()
        {
            //return RedirectToAction("Index", "Contracts");
            return View("Indexv1");
        }

        [MvcAuthorize]
        public IActionResult RoomDetail(int id)
        {
            ViewBag.room_id = id;
            return View();
        }

        [MvcAuthorize]
        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        [HttpPost]
        [MvcAuthorize(false)]
        public JsonResult GetAvailableRooms()
        {
            try
            {
                objCodeStep.Message = "Lỗi danh sách phòng";
                #region check loại hợp đồng trong cache all
                var contractTypes = _contractService.GetAvailableRooms();
                if (contractTypes == null)
                {
                    objCodeStep.Status = JsonStatusViewModels.Warning;
                    return Json(new
                    {
                        objCodeStep = objCodeStep
                    });
                }
                #endregion
                objCodeStep.Message = "Load danh sách phòng thành công";
                objCodeStep.Status = JsonStatusViewModels.Success;
                return Json(new
                {
                    objCodeStep = objCodeStep,
                    AvailableRooms = contractTypes
                });
            }
            catch (Exception ex)
            {
                objCodeStep.Status = JsonStatusViewModels.Error;
                objCodeStep.Message = ex.Message;
                return Json(new
                {
                    objCodeStep = objCodeStep
                });
            }
        }
        [HttpPost]
        [MvcAuthorize(false)]
        public JsonResult GetAvailableRoomsByDate(GetAvailableRoomsReq date)
        {
            try
            {
                objCodeStep.Message = "Lỗi danh sách phòng";
                #region check loại hợp đồng trong cache all
                var contractTypes = _contractService.GetAvailableRoomsByDate(date);
                if (contractTypes == null)
                {
                    objCodeStep.Status = JsonStatusViewModels.Warning;
                    return Json(new
                    {
                        objCodeStep = objCodeStep
                    });
                }
                #endregion
                objCodeStep.Message = "Load danh sách phòng thành công";
                objCodeStep.Status = JsonStatusViewModels.Success;
                return Json(new
                {
                    objCodeStep = objCodeStep,
                    AvailableRooms = contractTypes
                });
            }
            catch (Exception ex)
            {
                objCodeStep.Status = JsonStatusViewModels.Error;
                objCodeStep.Message = ex.Message;
                return Json(new
                {
                    objCodeStep = objCodeStep
                });
            }
        }
        [HttpPost]
        [MvcAuthorize(false)]
        public JsonResult GetRoomDetail(GetRoomDetailReq roomID)
        {
            try
            {
                objCodeStep.Message = "Lỗi danh sách loại hợp đồng";
                #region check loại hợp đồng trong cache all
                var contractTypes = _contractService.GetRoomDetail(roomID);
                if (contractTypes == null)
                {
                    objCodeStep.Status = JsonStatusViewModels.Warning;
                    objCodeStep.Message = $"Không tìm thấy bất kỳ loại hợp đồng nào trong Database";
                    return Json(new
                    {
                        objCodeStep = objCodeStep
                    });
                }
                #endregion
                objCodeStep.Message = "Load danh sách loại hợp đồng thành công";
                objCodeStep.Status = JsonStatusViewModels.Success;
                return Json(new
                {
                    objCodeStep = objCodeStep,
                    RoomDetail = contractTypes
                });
            }
            catch (Exception ex)
            {
                objCodeStep.Status = JsonStatusViewModels.Error;
                objCodeStep.Message = ex.Message;
                return Json(new
                {
                    objCodeStep = objCodeStep
                });
            }
        }
        [HttpPost]
        [MvcAuthorize(false)]
        public JsonResult GetRoomDetailsByDate(GetRoomDetailsByDateReq room)
        {
            try
            {
                objCodeStep.Message = "Lỗi danh sách phòng";
                #region check loại hợp đồng trong cache all
                var contractTypes = _contractService.GetRoomDetailsByDate(room);
                if (contractTypes == null)
                {
                    objCodeStep.Status = JsonStatusViewModels.Warning;
                    objCodeStep.Message = $"Không tìm thấy bất kỳ loại hợp đồng nào trong Database";
                    return Json(new
                    {
                        objCodeStep = objCodeStep
                    });
                }
                #endregion
                objCodeStep.Message = "Load chi tiết phòng thành công";
                objCodeStep.Status = JsonStatusViewModels.Success;
                return Json(new
                {
                    objCodeStep = objCodeStep,
                    RoomDetail = contractTypes
                });
            }
            catch (Exception ex)
            {
                objCodeStep.Status = JsonStatusViewModels.Error;
                objCodeStep.Message = ex.Message;
                return Json(new
                {
                    objCodeStep = objCodeStep
                });
            }
        }
        [HttpPost]
        [MvcAuthorize(false)]
        public JsonResult RoomBooking(RoomBookingReq booking)
        {
            try
            {
                objCodeStep.Message = "Lỗi khi thêm lịch hẹn";
                #region check loại hợp đồng trong cache all
                var deleteStatus = _contractService.RoomBooking(booking);
                if (deleteStatus == false)
                {
                    objCodeStep.Status = JsonStatusViewModels.Warning;
                    objCodeStep.Message = "Lịch hẹn đã bị trùng";
                    return Json(new
                    {
                        objCodeStep = objCodeStep
                    });
                }
                #endregion
                objCodeStep.Message = "Thêm lịch hẹn thành công";
                objCodeStep.Status = JsonStatusViewModels.Success;
                return Json(new
                {
                    objCodeStep = objCodeStep,
                    RoomDetail = deleteStatus
                });
            }
            catch (Exception ex)
            {
                objCodeStep.Status = JsonStatusViewModels.Error;
                objCodeStep.Message = ex.Message;
                return Json(new
                {
                    objCodeStep = objCodeStep
                });
            }
        }
        [HttpPost]
        [MvcAuthorize(false)]
        public JsonResult DeleteBooking(DeleteBookingReq booking)
        {
            try
            {
                objCodeStep.Message = "Lỗi khi xóa lịch hẹn";
                #region check loại hợp đồng trong cache all
                var deleteStatus = _contractService.DeleteBooking(booking);
                if (deleteStatus == false)
                {
                    objCodeStep.Status = JsonStatusViewModels.Warning;
                    return Json(new
                    {
                        objCodeStep = objCodeStep
                    });
                }
                #endregion
                objCodeStep.Message = "Xóa lịch hẹn thành công";
                objCodeStep.Status = JsonStatusViewModels.Success;
                return Json(new
                {
                    objCodeStep = objCodeStep
                });
            }
            catch (Exception ex)
            {
                objCodeStep.Status = JsonStatusViewModels.Error;
                objCodeStep.Message = ex.Message;
                return Json(new
                {
                    objCodeStep = objCodeStep
                });
            }
        }
    }
}
