using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace tpm.dto.admin.Response
{
    public class ServiceDetailRes
    {
        public int Detail_ID { get; set; }
        public int Contract_ID { get; set; }
        public int Service_ID { get; set; }
        public DateTime Complete_Date { get; set; }
        public byte Status { get; set; }
        public int CreatedUser { get; set; }
        public DateTime CreatedDate { get; set; }
        public int UpdateUser { get; set; }
        public DateTime UpdatedDate { get; set; }
        public int EmployeeID { get; set; }
    }
}
