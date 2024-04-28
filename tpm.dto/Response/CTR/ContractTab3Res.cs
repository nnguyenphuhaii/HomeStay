using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace tpm.dto.admin
{
    public class ContractTab3Res
	{
        public int Contract_ID { get; set; }
        public string Name { get; set; }
        public string StepName { get; set; }
        public int Service_Type_ID { get; set; }
        public DateTime Completion_Date { get; set; }
        public string FullName { get; set; }
        public string Custom_Name { get; set; }
        public int Status_ID { get; set; }
    }
    public class ContractTab3ToEditRes
    {
        public int Detail_ID { get; set; }
        public int Contract_ID { get; set; }
        public int Service_Type_ID { get; set; }
        public string Name { get; set; }
        public int StepID { get; set; }
        public string StepName { get; set; }
        public DateTime Completion_Date { get; set; }
        public int EmployeeID { get; set; }
        public string FullName { get; set; }
        public string Custom_Name { get; set; }
        public int Status_ID { get; set; }
    }
}
