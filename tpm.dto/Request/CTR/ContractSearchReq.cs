
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using tpm.dto.admin.Common;

namespace tpm.dto.admin
{
    public class ContractSearchReq : BaseDTO
    {
		public int PageIndex { get; set; }
		public int PageSize { get; set; }
		public string SearchValue { get; set; }
        public string Criteria { get; set; }
        public string SelectedOption { get; set; }
    }
    public class ContractSearchReqValidator : AbstractValidator<ContractSearchReq>
    {
        public ContractSearchReqValidator()
        {
            RuleFor(contract => contract.SearchValue).NotEmpty();
            RuleFor(contract => contract.Criteria).NotEmpty();
        }
    }
}
