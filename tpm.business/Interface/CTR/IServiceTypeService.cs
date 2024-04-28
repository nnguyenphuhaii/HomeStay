using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using tpm.dto.admin;
using tpm.dto.admin.Response;

namespace tpm.business
{
    public interface IServiceTypeService : IDisposable
    {
        int Create(Service_TypeCreateReq objReq, out int newService_Type_ID);
        int Update(Service_TypeUpdateReq objReq);
        bool Delete(int Service_Type_ID);
        IEnumerable<ServiceTypeRes> GetAllServiceTypes();
        IEnumerable<ServiceTypeRes> GetServicesTypeByID(int Service_Type_ID);
        IEnumerable<ServiceListStepRes> GetStepByServiceTypeID(int serviceTypeID);
        IEnumerable<ServiceListStepRes> GetAllSteps();
        bool AddExistStepToServiceType(AddStepReq data);
        bool AddNewStepToServiceType(AddStepReq data);
        bool DeleteServiceTypeStep(AddStepReq data);
    }
}

