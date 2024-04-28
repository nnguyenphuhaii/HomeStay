
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using tpm.dto.admin.Common;

namespace tpm.dto.admin
{
    public class ContractChangeStepStatusReq : BaseDTO
    {
		public int Contract_ID { get; set; }
		public int Detail_ID { get; set; }
    }
    public class ContractChangeStepStatusReqValidator : AbstractValidator<ContractChangeStepStatusReq>
    {
        public ContractChangeStepStatusReqValidator()
        {
        }
    }
}
