using tpm.dto.admin.Common;
using tpm.dto.admin.Request.SCM;
using FluentValidation;
using System;
using System.Collections.Generic;

namespace tpm.dto.admin
{
    public class ServiceCreateReq : BaseDTO
    {      
        public int Unit_ID { get; set; }
        public int Quantity { get; set; }
        public decimal Unit_Price { get; set; }
        public decimal Total_Amount { get; set; }
        public int Service_Type_ID { get; set; }      
        public int Contract_ID { get; set; }
    }

    public class ServiceCreateReqValidator : AbstractValidator<ServiceCreateReq>
    {
        public ServiceCreateReqValidator()
        {
            RuleFor(x => x.Unit_ID).NotEmpty().WithMessage("Đơn vị không được để trống");
            RuleFor(x => x.Quantity).NotEmpty().WithMessage("Số lượng không được để trống");
            RuleFor(x => x.Unit_Price).NotEmpty().WithMessage("Đơn giá không được để trống");
            RuleFor(x => x.Total_Amount).NotEmpty().WithMessage("Tổng giá trị không được để trống");
            RuleFor(x => x.Service_Type_ID).NotEmpty().WithMessage("ID loại dịch vụ không được để trống");    
            RuleFor(x => x.Contract_ID).NotEmpty().WithMessage("ID hợp đồng không được để trống");
        }
    }
}
