using System;

namespace tpm.web.contract.Models
{
    public class StepModel
    {
        public int StepID { get; set; }
        public string Custom_Name { get; set; }
        public DateTime Deadline { get; set; }
        public string EmployeeAssigned { get; set; }
    }
}
