using tpm.dto.admin.Common;
using tpm.dto.admin.Request.SCM;
using FluentValidation;
using System;
using System.Collections.Generic;

namespace tpm.dto.admin
{
    public class Service_DetailCreateReq : BaseDTO
    {
        public int Detail_ID { get; set; }
        public int Contract_ID { get; set; }
        public int Service_ID { get; set; }
        public DateTime Completion_Date { get; set; }
    }
    public class Service_DetailCreateReqValidator : AbstractValidator<Service_DetailCreateReq>
    {
        public Service_DetailCreateReqValidator()
        {
            RuleFor(x => x.Detail_ID).NotEmpty().WithMessage("ID không được để trống");
        }
    }
}
