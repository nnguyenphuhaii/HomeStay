
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using tpm.dto.admin.Common;

namespace tpm.dto.admin
{
    public class ContractCreateFullReq : BaseDTO
    {
        public string Contract_Number { get; set; }
        public int Contract_Type_ID { get; set; }
        public string Customer_Company_Name { get; set; }
        public string Address { get; set; }
        public string Address2 { get; set; }
        public string Phone { get; set; }
        public string Representative { get; set; }
        public string TIN { get; set; }
        public string Email { get; set; }   
    }
    public class ContractCreateFullReqValidator : AbstractValidator<ContractCreateFullReq>
    {
        public ContractCreateFullReqValidator()
        {
            //RuleFor(contract => contract.Contract_Type_ID).NotEmpty();
            //RuleFor(contract => contract.Contract_Number).NotEmpty();
            //RuleFor(contract => contract.Customer_Company_Name).NotEmpty();
            //RuleFor(contract => contract.Address).NotEmpty();
            //RuleFor(contract => contract.Phone).NotEmpty();
            //RuleFor(contract => contract.MobilePhone).NotEmpty();
            //RuleFor(contract => contract.TIN).NotEmpty();
            //RuleFor(contract => contract.Email).NotEmpty().EmailAddress();
        }
    }
}
