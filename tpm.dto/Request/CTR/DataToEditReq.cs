
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using tpm.dto.admin.Common;

namespace tpm.dto.admin
{
    public class DataToUpdate : BaseDTO
    {
        public EditTab1Req tab1 { get; set; }
        public List<EditTab2Req> tab2 { get; set; }
        public List<EditTab3Req> tab3 { get; set; }
}
    public class EditTab1Req : BaseDTO
    {
        public int Contract_ID { get; set; }
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
        public string EmployeeID { get; set; }
        //public List<EditTab2Req> tab2 { get; set; }
        //public List<EditTab3Req> tab3 { get; set; }
    }
    public class EditTab2Req
    {
        public int Contract_ID { get; set; }
        public int ServiceTypeID { get; set; }
        public int UnitID { get; set; }
        public int Price { get; set; }
        public int Quantity { get; set; }
        public int Total { get; set; }
    }
    public class EditTab3Req
    {
        public int ServiceTypeID { get; set; }
        public List<EditTab3Step> Steps { get; set; }
    }
    public class EditTab3Step
    {
        public int StepID { get; set; }
        public string StepName { get; set; }
        public string Custom_Name { get; set; }
        public DateTime Deadline { get; set; }
        public string EmployeeAssigned { get; set; }
        public byte Status_ID { get; set; }
    }
}
