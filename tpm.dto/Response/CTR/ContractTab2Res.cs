using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace tpm.dto.admin
{
    public class ContractTab2Res
	{
        public int Contract_ID { get; set; }
        public string Name { get; set; }
        public string Unit { get; set; }
        public float Unit_Price { get; set; }
        public int Quantity { get; set; }
        public float Total_Amount { get; set; }
	}
    public class ContractTab2ToEditRes
    {
        public int Contract_ID { get; set; }
        public int Service_Type_ID { get; set; }
        public string Name { get; set; }
        public string Unit { get; set; }
        public string Unit_ID { get; set; }
        public float Unit_Price { get; set; }
        public int Quantity { get; set; }
        public float Total_Amount { get; set; }
    }
}
