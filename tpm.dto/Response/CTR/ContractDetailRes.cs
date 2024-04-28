using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace tpm.dto.admin
{
    public class ContractDetailRes
	{
		public string Contract_Number { get; set; }
		public int Contract_Type_ID { get; set; }
		public string Customer_Company_Name { get; set; }
		public string Address { get; set; }
		public string Address2 { get; set; }
		public string Phone { get; set; }
		public string Mobile { get; set; }
		public string Representative { get; set; }
		public string TIN { get; set; }
		public string Email { get; set; }
		public List<ServiceDetailRes> Detail { get; set; }
	}
	public class ServiceDetailRes
	{
		public int ServiceTypeID { get; set; }
		public int UnitID { get; set; }
		public int Price { get; set; }
		public int Quantity { get; set; }
		public int Total { get; set; }
		public List<StepDetailRes> Step { get; set; }
	}
	public class StepDetailRes
	{
		public int StepID { get; set; }
		public string Custom_Name { get; set; }
		public DateTime Deadline { get; set; }
		public string EmployeeAssigned { get; set; }
	}
}
