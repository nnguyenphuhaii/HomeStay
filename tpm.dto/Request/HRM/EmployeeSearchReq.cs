using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using tpm.dto.admin.Common;

namespace tpm.dto.admin
{
    public class EmployeeSearchReq : BaseDTO
    {
        public string KeySearch { get; set; }  
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
    }
    public class EmployeeSearchReqValidator : AbstractValidator<EmployeeSearchReq>
    {
        public EmployeeSearchReqValidator()
        {
            RuleFor(x => x.PageIndex)
                .NotEmpty().WithMessage("Cần truyền vào PageIndex");
            RuleFor(x => x.PageSize)
                .NotEmpty().WithMessage("Cần truyền vào PageSize");
        }
    }
}
