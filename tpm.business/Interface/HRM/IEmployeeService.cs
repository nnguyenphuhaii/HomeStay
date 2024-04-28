using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using tpm.dto.admin;
using tpm.dto.admin.Response;

namespace tpm.business
{
    public interface IEmployeeService : IDisposable
    {
        int Create(EmployeeCreateReq objReq);
        int Update(EmployeeUpdateReq objReq);
        int Delete(string EmployeeID);
        IEnumerable<EmployeeRes> ReadAll();
        IEnumerable<EmployeeRes> GetEmployeesByID(int ID);
        IEnumerable<EmployeeRes> GetEmployeesWithTypeName();
        IEnumerable<EmployeeRes> SearchEmployees(EmployeeSearchReq objReq);
    }
}
