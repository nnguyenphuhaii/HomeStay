using tpm.dto.admin.Common;
using tpm.dto.admin.Request.SCM;
using FluentValidation;
using System;
using System.Collections.Generic;

namespace tpm.dto.admin
{
    public class StepsReq : BaseDTO
    {      
        public int Service_Type_ID { get; set; }
    }
    public class AddStepReq : BaseDTO
    {
        public int Service_Type_ID { get; set; }
        public int StepID { get; set;}
        public string StepName { get; set; }
    }
}
