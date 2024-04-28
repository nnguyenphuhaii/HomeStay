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
using Microsoft.AspNetCore.Http;
using System.IO;
using System.Threading.Tasks;
using tpm.dto;
using System.Net.NetworkInformation;
using static System.Net.WebRequestMethods;

namespace tpm.web.contract.Controllers
{
    public class FileManagementController : Controller
    {
        private readonly IServiceService _serviceService;
        private readonly IServiceTypeService _serviceTypeService;
        private readonly IUnitService _serviceUnit;
        private readonly IContractService _contractService;
        private readonly IContractTypeService _contractTypeService;
        private readonly IStageService _serviceStage;
        private readonly IStepsService _serviceSteps;
        public CodeStep objCodeStep = new CodeStep();

        public FileManagementController(IServiceService serviceService,
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

        [HttpPost]
        public async Task<IActionResult> UploadAvatar([FromForm] IFormFile file)
        {
            if (file == null || file.Length == 0)
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

            // Lấy tên file
            var fileName = Path.GetFileName(file.FileName);

            var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", "avatars", DateTime.Now.Year.ToString());
            //var path = Path.Combine("http://tpm.techk.edu.vn", "wwwroot", "uploads", "avatars", DateTime.Now.Year.ToString());

            if (!Directory.Exists(path))
            {
                // Nếu chưa tồn tại, tạo thư mục
                Directory.CreateDirectory(path);
            }
            path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", "avatars", DateTime.Now.Year.ToString(), DateTime.Now.Month.ToString());
            //path = Path.Combine("http://tpm.techk.edu.vn", "wwwroot", "uploads", "avatars", DateTime.Now.Year.ToString(), DateTime.Now.Month.ToString());
            if (!Directory.Exists(path))
            {
                // Nếu chưa tồn tại, tạo thư mục
                Directory.CreateDirectory(path);
            }

            // Lấy đuôi file
            // Bước 1: phân tách chuỗi file.ContentType thành các phần
            string[] parts = file.ContentType.Split('/');
            // Đường dẫn lưu trữ file
            var fileNameExtension = '.' + parts[parts.Length - 1];
            var randomFileName = System.Guid.NewGuid().ToString().Replace("-","") + fileNameExtension;
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", "avatars", DateTime.Now.Year.ToString(), DateTime.Now.Month.ToString(), randomFileName);
            //var filePath = Path.Combine("http://tpm.techk.edu.vn", "wwwroot", "uploads", "avatars", DateTime.Now.Year.ToString(), DateTime.Now.Month.ToString(), randomFileName);

            // Ghi file lên đĩa
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return Json(new
            {
                objCodeStep = new
                {
                    Status = CRUDStatusCodeRes.Success,
                    Message = "Cập nhật thành công",
                    path = "/" + Path.Combine("uploads", "avatars", DateTime.Now.Year.ToString(), DateTime.Now.Month.ToString(), randomFileName).Replace("\\", "/"),
                    host = AppSetting.Common.AvatarHost
                    //host = "http://tpm.techk.edu.vn"
                },
            });
        }
    }
}
