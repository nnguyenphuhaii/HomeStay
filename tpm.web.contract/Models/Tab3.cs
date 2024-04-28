using System;
using System.Collections.Generic;

namespace tpm.web.contract.Models
{   

    public class Contract
    {
        public int Contract_ID { get; set; }
        public List<ContractStep> Steps { get; set; }
    }
    public class ContractStep
    {
        public string Name { get; set; }
        public DateTime Completion_Date { get; set; }
        public string FullName { get; set; }
        public string Custom_Name { get; set; }
    }
}
