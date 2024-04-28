using System.Collections.Generic;

namespace tpm.web.contract.Models
{
    public class DataToSave
    {
        public string Contract_Number { get; set; }
        public int Contract_Type_ID { get; set;}
        public string Customer_Company_Name { get; set;}
        public string Address { get; set; }
        public string Address2 { get; set; }
        public string Phone { get; set; }
        public string Mobile { get; set; }
        public string Representative { get; set; }
        public string TIN { get; set; }
        public string Email { get; set; }
        public string EmployeeID { get; set; }
        public List<ContractDetailModel> Detail { get; set; }
    }
}
