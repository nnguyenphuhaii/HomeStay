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
using FluentValidation;
using FluentValidation.Results;
using tpm.web.contract.Models;
using Newtonsoft.Json;

namespace tpm.web.contract.Controllers
{
    public class ContractsController : Controller
    {
        private readonly IServiceService _serviceService;
        private readonly IServiceTypeService _serviceTypeService;
        private readonly IUnitService _serviceUnit;
        private readonly IContractService _contractService;
        private readonly IContractTypeService _contractTypeService;
        private readonly IStageService _serviceStage;
        private readonly IStepsService _serviceSteps;
        public CodeStep objCodeStep = new CodeStep();

        public ContractsController(IServiceService serviceService,
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
            return View();
        }

        [MvcAuthorize]
        public IActionResult ContractDetailManager()
        {
            return View();
        }

        [MvcAuthorize]
        public IActionResult ProgressManager(int id)
        {
            ViewBag.ContractID = id;
            return View();
        }

        [MvcAuthorize]
        public IActionResult Detail(int id)
        {
            ViewBag.ContractID = id;
            return View();
        }

        [MvcAuthorize]
        public IActionResult Edit(int id)
        {
            ViewBag.ContractID = id;
            return View();
        }

        [HttpGet]
        public IActionResult GetTest()
        {
            return Json(new
            {
                objCodeStep = new
                {
                    Status = CRUDStatusCodeRes.Success,
                    Message = "GET thành công"
                }
            });
        }

        #region GetService
        [MvcAuthorize]
        [HttpGet]
        public IActionResult GetService(int Service_ID)
        {
            var getService = _serviceService.GetServicesByID(Service_ID);

            return Json(new { Service = getService });
        }
        #endregion

        #region GetContract
        [MvcAuthorize]
        [HttpGet]
        public IActionResult GetContract(int Contract_ID)
        {
            var getContract = _contractService.GetContractsByID(Contract_ID);

            return Json(new { Contract = getContract });
        }
        #endregion

        #region Create
        public IActionResult Create()
        {
            var services = _serviceService.GetServicesWithTypeName();
            var serviceTypes = _serviceTypeService.GetAllServiceTypes();
            var units = _serviceUnit.GetAllUnits();
            var contracts = _contractService.GetContractsWithTypeName();
            var contractTypes = _contractTypeService.GetAllContractTypes();
            var stages = _serviceStage.GetAllStages();


            ViewBag.Services = services;
            ViewBag.ServiceTypes = serviceTypes;
            ViewBag.Unit = units;
            ViewBag.Contracts = contracts;
            ViewBag.ContractTypes = contractTypes;
            ViewBag.Stage = stages;



            return View();
        }
        #endregion

        #region CreateContract

        [MvcAuthorize]
        public IActionResult CreateContract()
        {
            return View();
        }
        #endregion

        #region OpenContractDetail
        //[HttpPost]
        //public JsonResult OpenContractDetail(int Contract_Number)
        //{
        //    try
        //    {
        //        int newServiceID = 0;

        //        int result = _contractService.OpenContractDetail(objReq, out newServiceID);

        //        if (result)
        //        {
        //            // Gọi phương thức GetServiceById để lấy thông tin dịch vụ mới
        //            var newService = _serviceService.GetServicesByID(newServiceID);

        //            return Json(new
        //            {
        //                objCodeStep = new
        //                {
        //                    Status = CRUDStatusCodeRes.Success,
        //                    Message = "Tạo mới thành công"
        //                },
        //                Service = newService // Trả về thông tin dịch vụ mới
        //            });
        //        }
        //        else
        //        {
        //            return Json(new
        //            {
        //                objCodeStep = new
        //                {
        //                    Status = CRUDStatusCodeRes.Deny,
        //                    Message = "Tạo mới không thành công"
        //                }
        //            });
        //        }
        //    }
        //    catch (Exception objEx)
        //    {
        //        return Json(new
        //        {
        //            success = false,
        //            message = "Có lỗi xảy ra khi thực hiện tạo mới: " + objEx.Message
        //        });
        //    }

        //}
        #endregion

        #region Create Post
        [MvcAuthorize]
        [HttpPost]
        public JsonResult Create(ServiceCreateReq objReq)
        {
            try
            {
                int newServiceID = 0;

                bool result = _serviceService.Create(objReq, out newServiceID);

                if (result)
                {
                    // Gọi phương thức GetServiceById để lấy thông tin dịch vụ mới
                    var newService = _serviceService.GetServicesByID(newServiceID);

                    return Json(new
                    {
                        objCodeStep = new
                        {
                            Status = CRUDStatusCodeRes.Success,
                            Message = "Tạo mới thành công"
                        },
                        Service = newService // Trả về thông tin dịch vụ mới
                    });
                }
                else
                {
                    return Json(new
                    {
                        objCodeStep = new
                        {
                            Status = CRUDStatusCodeRes.Deny,
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
        [MvcAuthorize]
        [HttpPost]
        public IActionResult Update(ServiceCreateReq objReq, int Service_ID)
        {
            try
            {
                bool result = _serviceService.Update(objReq, Service_ID);

                if (result)
                {
                    // Gọi phương thức GetServiceById để lấy thông tin dịch vụ mới
                    var updateService = _serviceService.GetServicesByID(Service_ID);

                    return Json(new
                    {
                        objCodeStep = new
                        {
                            Status = CRUDStatusCodeRes.Success,
                            Message = "Tạo mới thành công"
                        },
                        Service = updateService // Trả về thông tin dịch vụ mới
                    });
                }
                else
                {
                    return Json(new
                    {
                        objCodeStep = new
                        {
                            Status = CRUDStatusCodeRes.Deny,
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

        #region Delete
        [HttpDelete]
        public JsonResult Delete(ContractDeleteReq data)
        {
            try
            {
                // Gọi phương thức xóa dịch vụ từ service
                int deleteResult = _contractService.Delete(data);

                if (deleteResult != -1)
                {
                    return Json(new
                    {
                        objCodeStep = new
                        {
                            Status = JsonStatusViewModels.Success,
                            Message = "Xoá hợp đồng thành công"
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
                            Message = "Xoá hợp đồng không thành công!"
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
                        Message = "Có lỗi xảy ra trong quá trình xóa hợp đồng: " + "'" + ex.Message + "'"
                    },
                });
            }
        }
        #endregion

        #region Create Contract Post
        [MvcAuthorize]
        [HttpPost]
        public JsonResult CreateContract(ContractCreateReq objReq)
        {
            try
            {
                // Tạo một instance của ServiceCreateReqValidator và kiểm tra xem dữ liệu có hợp lệ hay không
                ContractCreateReqValidator validator = new ContractCreateReqValidator();
                ValidationResult result = validator.Validate(objReq);

                if (result.IsValid)
                {
                    int newContractID = 0;

                    bool createResult = _contractService.Create(objReq, out newContractID);

                    if (createResult)
                    {
                        // Gọi phương thức GetServiceById để lấy thông tin dịch vụ mới
                        var newContract = _contractService.GetContractsByID(newContractID);

                        return Json(new
                        {
                            objCodeStep = new
                            {
                                Status = CRUDStatusCodeRes.Success,
                                Message = "Tạo mới thành công"
                            },
                            Contract = newContract // Trả về thông tin dịch vụ mới
                        });
                    }
                    else
                    {
                        return Json(new
                        {
                            objCodeStep = new
                            {
                                Status = CRUDStatusCodeRes.Deny,
                                Message = "Tạo mới không thành công"
                            }
                        });
                    }
                }
                else
                {
                    // Xử lý khi dữ liệu không hợp lệ, ví dụ: hiển thị thông báo lỗi
                    string errorMessage = string.Join("\n", result.Errors.Select(error => error.ErrorMessage));
                    return Json(new
                    {
                        objCodeStep = new
                        {
                            Status = CRUDStatusCodeRes.Deny,
                            Message = "Dữ liệu không hợp lệ: " + errorMessage
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

        #region Update Contract
        [MvcAuthorize]
        [HttpPost]
        public IActionResult UpdateContract(ContractCreateReq objReq, int Contract_ID)
        {
            try
            {
                bool result = _contractService.Update(objReq, Contract_ID);

                if (result)
                {
                    // Gọi phương thức GetServiceById để lấy thông tin dịch vụ mới
                    var updateContract = _contractService.GetContractsByID(Contract_ID);

                    return Json(new
                    {
                        objCodeStep = new
                        {
                            Status = CRUDStatusCodeRes.Success,
                            Message = "Cập nhật thành công"
                        },
                        Contract = updateContract // Trả về thông tin dịch vụ mới
                    });
                }
                else
                {
                    return Json(new
                    {
                        objCodeStep = new
                        {
                            Status = CRUDStatusCodeRes.Deny,
                            Message = "Cập nhật không thành công"
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

        #region Delete
        [HttpPost]
        public JsonResult DeleteContract(ContractDeleteReq contractID)
        {
            try
            {
                // Gọi phương thức xóa dịch vụ từ service
                int deleteResult = _contractService.Delete(contractID);

                if (deleteResult != -1)
                {
                    return Json(new
                    {
                        objCodeStep = new
                        {
                            Status = JsonStatusViewModels.Success,
                            Message = "Xoá hợp đồng thành công"
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
                            Message = "Xoá hợp đồng không thành công!"
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
                        Message = "Có lỗi xảy ra trong quá trình xóa hợp đồng!" + ex.Message
                    },
                });
            }
        }
        #endregion

        #region ServiceDetail
        public IActionResult ServiceDetail()
        {
            return View();
        }
        #endregion

        #region Search
        [HttpPost]
        [MvcAuthorize(false)]
        public JsonResult Search()
        {
            try
            {
                objCodeStep.Message = "Lỗi danh sách hợp đồng";
                var contracts = _contractService.GetContractsWithTypeName();
                #region check dịch vụ trong cache all
                if (contracts == null)
                {
                    objCodeStep.Status = JsonStatusViewModels.Warning;
                    objCodeStep.Message = $"Không tìm thấy bất kỳ hợp đồng nào";
                    return Json(new
                    {
                        objCodeStep = objCodeStep
                    });
                }
                #endregion

                objCodeStep.Status = JsonStatusViewModels.Success;
                objCodeStep.Message = "Load danh sách hợp đồng thành công";
                return Json(new
                {
                    objCodeStep = objCodeStep,
                    Contract = contracts
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

        #region SearchContract
        [HttpPost]
        [MvcAuthorize(false)]
        public JsonResult SearchContract(ContractSearchReq obj)
        {
            try
            {
                objCodeStep.Message = "Lỗi danh sách hợp đồng";
                var contracts = _contractService.SearchContract(obj);
                #region check dịch vụ trong cache all
                if (contracts == null)
                {
                    objCodeStep.Status = JsonStatusViewModels.Warning;
                    objCodeStep.Message = $"Không tìm thấy bất kỳ hợp đồng nào";
                    return Json(new
                    {
                        objCodeStep = objCodeStep
                    });
                }
                #endregion

                objCodeStep.Status = JsonStatusViewModels.Success;
                objCodeStep.Message = "Load danh sách hợp đồng thành công";
                return Json(new
                {
                    objCodeStep = objCodeStep,
                    Contract = contracts
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

        #region Get Contract Type
        [HttpPost]
        [MvcAuthorize(false)]
        public JsonResult GetContractType()
        {
            try
            {
                objCodeStep.Message = "Lỗi danh sách loại hợp đồng";
                #region check loại hợp đồng trong cache all
                var contractTypes = _contractService.GetContractsTypesWithTypeName();
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
                    ListContractType = contractTypes
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

        #region Get Contracts List
        [HttpPost]
        [MvcAuthorize(false)]
        public JsonResult GetContractsList(ContractSearchReq obj)
        {
            try
            {
                objCodeStep.Message = "Lỗi danh sách hợp đồng";
                #region check loại hợp đồng trong cache all
                var contractLst = _contractService.GetContractsList(obj);
                if (contractLst == null)
                {
                    objCodeStep.Status = JsonStatusViewModels.Warning;
                    objCodeStep.Message = $"Không tìm thấy bất kỳ hợp đồng nào trong Database";
                    return Json(new
                    {
                        objCodeStep = objCodeStep
                    });
                }
                #endregion
                objCodeStep.Message = "Load danh sách hợp đồng thành công";
                objCodeStep.Status = JsonStatusViewModels.Success;
                return Json(new
                {
                    objCodeStep = objCodeStep,
                    ContractList = contractLst
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

        #region ContractSearchByStatus1
        [HttpPost]
        [MvcAuthorize(false)]
        public JsonResult ContractSearchByStatus1()
        {
            try
            {
                objCodeStep.Message = "Lỗi danh sách hợp đồng";
                #region check loại hợp đồng trong cache all
                var contractLst = _contractService.ContractSearchByStatus1();
                if (contractLst == null)
                {
                    objCodeStep.Status = JsonStatusViewModels.Warning;
                    objCodeStep.Message = $"Không tìm thấy bất kỳ hợp đồng nào trong Database";
                    return Json(new
                    {
                        objCodeStep = objCodeStep
                    });
                }
                #endregion
                objCodeStep.Message = "Load danh sách hợp đồng thành công";
                objCodeStep.Status = JsonStatusViewModels.Success;
                return Json(new
                {
                    objCodeStep = objCodeStep,
                    ContractList = contractLst
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

        #region ContractSearchByStatus0
        [HttpPost]
        [MvcAuthorize(false)]
        public JsonResult ContractSearchByStatus0()
        {
            try
            {
                objCodeStep.Message = "Lỗi danh sách hợp đồng";
                #region check loại hợp đồng trong cache all
                var contractLst = _contractService.ContractSearchByStatus0();
                if (contractLst == null)
                {
                    objCodeStep.Status = JsonStatusViewModels.Warning;
                    objCodeStep.Message = $"Không tìm thấy bất kỳ hợp đồng nào trong Database";
                    return Json(new
                    {
                        objCodeStep = objCodeStep
                    });
                }
                #endregion
                objCodeStep.Message = "Load danh sách hợp đồng thành công";
                objCodeStep.Status = JsonStatusViewModels.Success;
                return Json(new
                {
                    objCodeStep = objCodeStep,
                    ContractList = contractLst
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

        #region Get Service List
        [HttpPost]
        [MvcAuthorize(false)]
        public JsonResult GetServiceList()
        {
            try
            {
                objCodeStep.Message = "Lỗi danh sách dịch vụ";
                #region check loại hợp đồng trong cache all
                var services = _contractService.GetServicesWithTypeName();
                if (services == null)
                {
                    objCodeStep.Status = JsonStatusViewModels.Warning;
                    objCodeStep.Message = $"Không tìm thấy bất kỳ dịch vụ nào trong Database";
                    return Json(new
                    {
                        objCodeStep = objCodeStep
                    });
                }
                #endregion
                objCodeStep.Message = "Load danh sách dịch vụ thành công";
                objCodeStep.Status = JsonStatusViewModels.Success;
                return Json(new
                {
                    objCodeStep = objCodeStep,
                    ListService = services
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

        #region Get Service Type List
        [HttpPost]
        [MvcAuthorize(false)]
        public JsonResult GetServiceTypeList()
        {
            try
            {
                objCodeStep.Message = "Lỗi danh sách loại dịch vụ";
                #region check loại dịch vụ trong cache all
                var serviceTypes = _serviceTypeService.GetAllServiceTypes();
                if (serviceTypes == null)
                {
                    objCodeStep.Status = JsonStatusViewModels.Warning;
                    objCodeStep.Message = $"Không tìm thấy bất kỳ loại dịch vụ nào trong Database";
                    return Json(new
                    {
                        objCodeStep = objCodeStep
                    });
                }
                #endregion
                objCodeStep.Message = "Load danh sách loại dịch vụ thành công";
                objCodeStep.Status = JsonStatusViewModels.Success;
                return Json(new
                {
                    objCodeStep = objCodeStep,
                    ListServiceType = serviceTypes
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

        #region Get Unit List
        [HttpPost]
        [MvcAuthorize(false)]
        public JsonResult GetUnitList()
        {
            try
            {
                objCodeStep.Message = "Lỗi danh sách đơn vị tính";
                #region check đơn vị tính trong cache all
                var serviceUnit = _serviceUnit.GetAllUnits();
                if (serviceUnit == null)
                {
                    objCodeStep.Status = JsonStatusViewModels.Warning;
                    objCodeStep.Message = $"Không tìm thấy bất kỳ đơn vị tính nào trong Database";
                    return Json(new
                    {
                        objCodeStep = objCodeStep
                    });
                }
                #endregion
                objCodeStep.Message = "Load đơn vị tính thành công";
                objCodeStep.Status = JsonStatusViewModels.Success;
                return Json(new
                {
                    objCodeStep = objCodeStep,
                    ListUnit = serviceUnit
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

        #region Get Steps by STID
        [HttpPost]
        [MvcAuthorize(false)]
        public JsonResult GetStepsByServiceTypeID(StepsReq objReq)
        {
            try
            {
                objCodeStep.Message = "Lỗi danh sách các bước của dịch vụ!";
                #region check các bước trong cache all
                var Steps = _serviceSteps.GetStepsByServiceTypeID(objReq);
                if (Steps == null)
                {
                    objCodeStep.Status = JsonStatusViewModels.Warning;
                    objCodeStep.Message = $"Không tìm thấy bất kỳ bước nào của loại dịch vụ trong Database";
                    return Json(new
                    {
                        objCodeStep = objCodeStep
                    });
                }
                #endregion
                objCodeStep.Message = "Load các bước thành công";
                objCodeStep.Status = JsonStatusViewModels.Success;
                return Json(new
                {
                    objCodeStep = objCodeStep,
                    StepBySTID = Steps
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
        #endregion

        #region Get Custom Step
        [HttpPost]
        [MvcAuthorize(false)]
        public JsonResult GetCustomStepID()
        {
            try
            {
                objCodeStep.Message = "Lỗi không tìm ra ID";
                var customStep = _serviceSteps.GetCustomStepID();

                if (customStep == -1)
                {
                    objCodeStep.Status = JsonStatusViewModels.Warning;
                    objCodeStep.Message = $"Không tìm thấy Custom Step ID";
                    return Json(new
                    {
                        objCodeStep = objCodeStep
                    });
                }

                objCodeStep.Message = "Load Custom Step ID thành công";
                objCodeStep.Status = JsonStatusViewModels.Success;
                return Json(new
                {
                    objCodeStep = objCodeStep,
                    customStepID = customStep
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
        #endregion

        #region Save
        [HttpPost]
        [MvcAuthorize(false)]
        public JsonResult Save(DataToSave obj)
        {
            string jsonData = JsonConvert.SerializeObject(obj);
            Console.WriteLine(jsonData);
            try
            {
                objCodeStep.Message = "Lỗi";
                var saveStatus = _contractService.Save(jsonData);

                if (saveStatus == -1)
                {
                    objCodeStep.Status = JsonStatusViewModels.Warning;
                    objCodeStep.Message = $"Lưu dữ liệu thất bại";
                    return Json(new
                    {
                        objCodeStep = objCodeStep
                    });
                }

                objCodeStep.Message = "Lưu dữ liệu thành công";
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
        #endregion

        #region ContractDetailFilter
        [HttpPost]
        [MvcAuthorize(false)]
        public JsonResult ContractDetailFilter(FilterReq obj)
        {            
            try
            {
                

                objCodeStep.Message = "Lỗi khi lọc danh sách hợp đồng";
                var contractDetails = _contractService.ContractDetailFilter(obj);

                if (contractDetails == null)
                {
                    objCodeStep.Status = JsonStatusViewModels.Warning;
                    objCodeStep.Message = $"Không tìm thấy bất kỳ hợp đồng nào thoả điều kiện lọc";
                    return Json(new
                    {
                        objCodeStep = objCodeStep
                    });
                }

                objCodeStep.Status = JsonStatusViewModels.Success;
                objCodeStep.Message = "Load lọc danh sách hợp đồng thành công";
                return Json(new
                {
                    objCodeStep = objCodeStep,
                    ContractsDetail = contractDetails
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
        #endregion

        #region UpdateContractDetail
        [HttpPost]
        [MvcAuthorize(false)]
        public JsonResult UpdateContractDetail(DataToUpdate obj)
        {
            string jsonData = JsonConvert.SerializeObject(obj);
            Console.WriteLine(jsonData);
            try
            {
                objCodeStep.Message = "Lỗi";
                var saveStatus = _contractService.UpdateContractDetail(jsonData);

                if (saveStatus == -1)
                {
                    objCodeStep.Status = JsonStatusViewModels.Warning;
                    objCodeStep.Message = $"Lưu dữ liệu thất bại";
                    return Json(new
                    {
                        objCodeStep = objCodeStep
                    });
                }

                objCodeStep.Message = "Lưu dữ liệu thành công";
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
        #endregion

        #region Get Contract Detail By Contract Number
        [HttpPost]
        [MvcAuthorize(false)]
        public JsonResult GetTab1ContentByContractID(ContractTab1Req ObjReq)
        {
            try
            {
                objCodeStep.Message = "Lỗi";
                var result = _contractService.GetTab1ContentByContractID(ObjReq);

                if (result == null)
                {
                    objCodeStep.Status = JsonStatusViewModels.Warning;
                    objCodeStep.Message = $"Lưu dữ liệu thất bại";
                    return Json(new
                    {
                        objCodeStep = objCodeStep
                    });
                }

                objCodeStep.Message = "Lưu dữ liệu thành công";
                objCodeStep.Status = JsonStatusViewModels.Success;
                return Json(new
                {
                    objCodeStep = objCodeStep,
                    Tab1Content = result
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
        public JsonResult GetTab2ContentByContractID(ContractTab1Req ContractNumber)
        {
            try
            {
                objCodeStep.Message = "Lỗi";
                var result = _contractService.GetTab2ContentByContractID(ContractNumber);

                if (result == null)
                {
                    objCodeStep.Status = JsonStatusViewModels.Warning;
                    objCodeStep.Message = $"Lưu dữ liệu thất bại";
                    return Json(new
                    {
                        objCodeStep = objCodeStep
                    });
                }

                objCodeStep.Message = "Lưu dữ liệu thành công";
                objCodeStep.Status = JsonStatusViewModels.Success;
                return Json(new
                {
                    objCodeStep = objCodeStep,
                    Tab2Content = result
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
        public JsonResult GetTab2DetailByContractIDToEdit(ContractTab1Req ContractNumber)
        {
            try
            {
                objCodeStep.Message = "Lỗi";
                var result = _contractService.GetTab2DetailByContractIDToEdit(ContractNumber);

                if (result == null)
                {
                    objCodeStep.Status = JsonStatusViewModels.Warning;
                    objCodeStep.Message = $"Lưu dữ liệu thất bại";
                    return Json(new
                    {
                        objCodeStep = objCodeStep
                    });
                }

                objCodeStep.Message = "Lưu dữ liệu thành công";
                objCodeStep.Status = JsonStatusViewModels.Success;
                return Json(new
                {
                    objCodeStep = objCodeStep,
                    Tab2ContentToEdit = result
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
        public JsonResult GetTab3ContentByContractID(ContractTab1Req ContractNumber)
        {
            try
            {
                objCodeStep.Message = "Lỗi";
                var result = _contractService.GetTab3ContentByContractID(ContractNumber);

                if (result == null)
                {
                    objCodeStep.Status = JsonStatusViewModels.Warning;
                    objCodeStep.Message = $"Lưu dữ liệu thất bại";
                    return Json(new
                    {
                        objCodeStep = objCodeStep
                    });
                }
                objCodeStep.Message = "Lưu dữ liệu thành công";
                objCodeStep.Status = JsonStatusViewModels.Success;
                return Json(new
                {
                    objCodeStep = objCodeStep,
                    Tab3Content = result
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
        public JsonResult GetTab3ContentByContractIDToEdit(ContractTab1Req ContractNumber)
        {
            try
            {
                objCodeStep.Message = "Lỗi";
                var result = _contractService.GetTab3ContentByContractIDToEdit(ContractNumber);

                if (result == null)
                {
                    objCodeStep.Status = JsonStatusViewModels.Warning;
                    objCodeStep.Message = $"Lưu dữ liệu thất bại";
                    return Json(new
                    {
                        objCodeStep = objCodeStep
                    });
                }
                objCodeStep.Message = "Lưu dữ liệu thành công";
                objCodeStep.Status = JsonStatusViewModels.Success;
                return Json(new
                {
                    objCodeStep = objCodeStep,
                    Tab3Content = result
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
        #endregion

        #region Change Status
        [HttpPost]
        [MvcAuthorize(false)]
        public JsonResult ChangeStatus(ContractChangeStepStatusReq obj)
        {
            try
            {
                objCodeStep.Message = "Lỗi khi đổi trạng thái!";
                var result = _contractService.ChangeStepStatus(obj);

                if (result == -1)
                {
                    objCodeStep.Status = JsonStatusViewModels.Warning;
                    objCodeStep.Message = $"Đổi trạng thái không thành công";
                    return Json(new
                    {
                        objCodeStep = objCodeStep
                    });
                }

                objCodeStep.Message = "Đổi trạng thái thành công";
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
        #endregion

        #region GetAllContractDetail
        [HttpPost]
        [MvcAuthorize(false)]
        public JsonResult GetAllContractDetail(ContractDetailManagerPagingReq data)
        {
            try
            {
                objCodeStep.Message = "Lỗi danh sách hợp đồng";
                var contractDetails = _contractService.GetAllContractDetail(data);
                #region check chi tiết hợp đồng trong cache all
                if (contractDetails == null)
                {
                    objCodeStep.Status = JsonStatusViewModels.Warning;
                    objCodeStep.Message = $"Không tìm thấy bất kỳ hợp đồng nào";
                    return Json(new
                    {
                        objCodeStep = objCodeStep
                    });
                }
                #endregion

                objCodeStep.Status = JsonStatusViewModels.Success;
                objCodeStep.Message = "Load danh sách hợp đồng thành công";
                return Json(new
                {
                    objCodeStep = objCodeStep,
                    ContractsDetail = contractDetails
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
    }
}
