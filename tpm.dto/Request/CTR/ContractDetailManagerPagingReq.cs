
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using tpm.dto.admin.Common;

namespace tpm.dto.admin
{
    public class ContractDetailManagerPagingReq : BaseDTO
    {
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
    }
}
