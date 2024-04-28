
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using tpm.dto.admin.Common;

namespace tpm.dto.admin
{
    public class ContractTab1Req : BaseDTO
    {
        public string ContractID { get; set; }
    }
}
