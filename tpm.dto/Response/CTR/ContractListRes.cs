using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace tpm.dto.admin
{
	public class ContractListRes
	{
		public int TotalRecord { get; set; }
		public int Contract_ID { get; set; }
		public string Contract_Number { get; set; }
		public string Customer_Company_Name { get; set; }
		public string Signing_Date { get; set; }
		public string End_Date { get; set; }
		public string Value { get; set; }
		public string FullName { get; set; }
		public string Status { get; set; }
		public string Shortname { get; set; }
		public string Host { get; set; }
		public string Path { get; set; }
	}
}
