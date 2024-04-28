using System.Collections.Generic;

namespace tpm.web.contract.Models
{
    public class ContractDetailModel
    {
        public int ServiceTypeID { get; set; }
        public int UnitID { get; set; }
        public int Price { get; set; }
        public int Quantity { get; set; }
        public int Total { get; set; }
        public List<StepModel> Step { get; set; }
    }
}
