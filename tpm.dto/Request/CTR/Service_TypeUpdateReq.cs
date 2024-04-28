using tpm.dto.admin.Common;
using tpm.dto.admin.Request.SCM;
using FluentValidation;
using System;
using System.Collections.Generic;

namespace tpm.dto.admin
{
    public class Service_TypeUpdateReq : BaseDTO
    {
        public int Service_Type_ID { get; set; }
        public string Name { get; set; }
    }
    public class Service_TypeUpdateReqValidator : AbstractValidator<Service_TypeUpdateReq>
    {
        public Service_TypeUpdateReqValidator()
        {
            RuleFor(x => x.Service_Type_ID).NotEmpty().WithMessage("ID không được để trống");
            RuleFor(x => x.Name).NotEmpty().WithMessage("Tên dịch vụ không được để trống");
        }
    }
}
