
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using tpm.dto.admin.Common;

namespace tpm.dto.admin
{
    public class FilterMaterial : BaseDTO
    {
        public List<int> StatusID { get; set; }
        public List<int> ServiceTypeID { get; set; }
        public List<string> EmployeeID { get; set; }
    }

    public class FilterReq : BaseDTO
    {
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public List<int> StatusID { get; set; }
        public List<int> ServiceTypeID { get; set; }
        public List<string> EmployeeID { get; set; }
    }
}
