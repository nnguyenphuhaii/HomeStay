using Core.DataAccess.Interface;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using tpm.dto.admin;
using tpm.dto.admin.Response;

namespace tpm.business
{
    public class EmployeeService : IEmployeeService
    {
        #region Private Fields

        private readonly Lazy<IRepository> _objRepository;
        private readonly Lazy<IReadOnlyRepository> _objReadOnlyRepository;
        private bool _disposedValue;

        #endregion

        #region Constructors

        public EmployeeService(Lazy<IRepository> objRepository, Lazy<IReadOnlyRepository> objReadOnlyRepository)
        {
            _objRepository = objRepository;
            _objReadOnlyRepository = objReadOnlyRepository;
        }

        #endregion

        #region List, ReadALL
        public IEnumerable<EmployeeRes> List()
        {
            return ReadAll();
        }


        public IEnumerable<EmployeeRes> ReadAll()
        {
            var result = _objReadOnlyRepository.Value.StoreProcedureQuery<EmployeeRes>("HRM.Employee_ReadAll");
            if (result == null)
            {
                result = new List<EmployeeRes>();
            }
            return result;
        }
        #endregion

        #region GetEmployeesWithTypeName
        public IEnumerable<EmployeeRes> GetEmployeesWithTypeName()
        {
            var result = _objReadOnlyRepository.Value.StoreProcedureQuery<EmployeeRes>("HRM.GetEmployeeWithTypeName");
            if (result == null)
            {
                result = new List<EmployeeRes>();
            }
            return result;
        }
        #endregion

        #region GetEmployeesByID
        public IEnumerable<EmployeeRes> GetEmployeesByID(int ID)
        {
            var result = _objReadOnlyRepository.Value.StoreProcedureQuery<EmployeeRes>("HRM.GetEmployeeByID", new { ID });
            if (result == null)
            {
                result = new List<EmployeeRes>();
            }
            return result;
        }
        #endregion

        #region Create
        public int Create(EmployeeCreateReq objReq)
        {
            try
            {
                // Kiểm tra các thông tin bắt buộc
                //if (string.IsNullOrEmpty(objReq.EmployeeID) || string.IsNullOrEmpty(objReq.FullName) ||
                //    objReq.DOB == null || objReq.DepartmentID <= 0 || objReq.PositionID <= 0 ||
                //    objReq.GenderID <= 0 || string.IsNullOrEmpty(objReq.Phone) || string.IsNullOrEmpty(objReq.Email) ||
                //    objReq.EmployeeTypeID <= 0)
                //{
                //    newID = 0;
                //    return false;
                //}

                //Lấy ID mới nhất trong DB
                var lastestID = _objReadOnlyRepository.Value.Connection.ExecuteScalar<int>("HRM.Employee_Lastest_ID", commandType: CommandType.StoredProcedure);

                // Tạo một đối tượng DynamicParameters để lưu trữ các tham số truyền vào stored procedure
                var param = new DynamicParameters();

                // Thêm các tham số với giá trị từ các thuộc tính của đối tượng obj truyền vào
                param.Add("@LastEmployeeID", lastestID);
                param.Add("@FirstName", objReq.FirstName);
                param.Add("@LastName", objReq.LastName);
                param.Add("@FullName", objReq.FullName);
                param.Add("@DOB", objReq.DOB);
                param.Add("@StartDateWork", objReq.StartDateWork);
                param.Add("@DepartmentID", objReq.DepartmentID);
                param.Add("@PositionID", objReq.PositionID);
                param.Add("@GenderID", objReq.GenderID);
                param.Add("@Phone", objReq.Phone);
                param.Add("@Email", objReq.Email);
                param.Add("@Host", objReq.host);
                param.Add("@Path", objReq.path);

                // Thực hiện gọi stored procedure để thêm dữ liệu vào database
                var result = _objReadOnlyRepository.Value.Connection.Execute("HRM.Employee_Create", param, commandType: CommandType.StoredProcedure);

                // Kiểm tra Service_ID mới
                if (result > 0)
                {
                    // Trả về kết quả thành công
                    return result;
                }

                // Trả về false nếu không tạo mới được dữ liệu
                return -1;
            }
            catch (Exception ex)
            {
                // Xử lý lỗi và ném ra ngoại lệ
                throw new Exception("Có lỗi xảy ra trong quá trình thực thi stored procedure.", ex);
            }
        }
        #endregion

        #region Update
        public int Update(EmployeeUpdateReq objReq)
        {
            try
            {
                // Tạo một đối tượng DynamicParameters để lưu trữ các tham số truyền vào stored procedure
                var param = new DynamicParameters();

                // Thêm các tham số với giá trị từ các thuộc tính của đối tượng obj truyền vào
                param.Add("@EmployeeID", objReq.EmployeeID);
                param.Add("@FirstName", objReq.FirstName);
                param.Add("@LastName", objReq.LastName);
                param.Add("@FullName", objReq.FullName);
                param.Add("@DOB", objReq.DOB);
                param.Add("@StartDateWork", objReq.StartDateWork);
                param.Add("@DepartmentID", objReq.DepartmentID);
                param.Add("@PositionID", objReq.PositionID);
                param.Add("@GenderID", objReq.GenderID);
                param.Add("@Phone", objReq.Phone);
                param.Add("@Email", objReq.Email);
                param.Add("@Host", objReq.Host);
                param.Add("@Path", objReq.Path);

                var result = -1;

                switch (objReq.AvatarUpdate)
                {
                    case 0:
                        result = _objReadOnlyRepository.Value.Connection.Execute("HRM.Employee_Update_Without_Avatar", param, commandType: CommandType.StoredProcedure);
                        break;
                    case 1:
                        result = _objReadOnlyRepository.Value.Connection.Execute("HRM.Employee_Update", param, commandType: CommandType.StoredProcedure);
                        break;
                }

                // Thực hiện gọi stored procedure để cập nhật dữ liệu trong database
                //var result = _objReadOnlyRepository.Value.Connection.ExecuteScalar<int>("HRM.Employee_Update", param, commandType: CommandType.StoredProcedure);
                //var result = _objReadOnlyRepository.Value.Connection.Execute("HRM.Employee_Update", param, commandType: CommandType.StoredProcedure);
                if (result > 0)
                {
                    return result;
                }

                return -1;
            }
            catch (Exception ex)
            {
                // Xử lý lỗi và ném ra ngoại lệ
                throw new Exception("Có lỗi xảy ra trong quá trình thực thi stored procedure.", ex);
            }
        }
        #endregion

        #region Delete
        public int Delete(string EmployeeID)
        {
            try
            {
                // Tạo một đối tượng DynamicParameters để lưu trữ các tham số truyền vào stored procedure
                var param = new DynamicParameters();

                // Thêm tham số với giá trị từ serviceId truyền vào
                param.Add("@EmployeeID", EmployeeID);

                // Thực hiện gọi stored procedure để xóa dữ liệu trong database
                var result = _objReadOnlyRepository.Value.Connection.Execute("HRM.Employee_Detete", param, commandType: CommandType.StoredProcedure);

                // Kiểm tra số dòng trả về
                if (result > 0)
                {
                    // Trả về kết quả thành công
                    return result;
                }

                // Trả về false nếu không tìm thấy dữ liệu trong kết quả trả về
                return -1;
            }
            catch (Exception ex)
            {
                // Xử lý lỗi và ném ra ngoại lệ
                throw new Exception("Có lỗi xảy ra trong quá trình thực thi stored procedure.", ex);
            }
        }
        #endregion

        #region Dispose
        protected virtual void Dispose(bool disposing)
        {
            if (!_disposedValue)
            {
                if (disposing)
                {
                    if (_objRepository.IsValueCreated)
                        _objRepository.Value.Dispose();
                    if (_objReadOnlyRepository.IsValueCreated)
                        _objReadOnlyRepository.Value.Dispose();
                }
                _disposedValue = true;
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        ~EmployeeService()
        {
            Dispose(false);
        }
        #endregion

        #region Search Employees
        public IEnumerable<EmployeeRes> SearchEmployees(EmployeeSearchReq objReq)
        {
            try
            {
                // Tạo một đối tượng DynamicParameters để lưu trữ các tham số truyền vào stored procedure
                var param = new DynamicParameters();

                // Thêm các tham số với giá trị từ các thuộc tính của đối tượng obj truyền vào             
                param.Add("@KeySearch", objReq.KeySearch);
                param.Add("@PageIndex", objReq.PageIndex);
                param.Add("@PageSize", objReq.PageSize);

                // Thực hiện gọi stored procedure 
                //ResultQuantity = _objReadOnlyRepository.Value.Connection.ExecuteScalar<int>("HRM.Employee_Search", param, commandType: CommandType.StoredProcedure);
                //var result = _objReadOnlyRepository.Value.Connection.Execute("HRM.Employee_Search", param, commandType: CommandType.StoredProcedure);
                //newService_Type_ID = _objReadOnlyRepository.Value.Connection.Execute("HRM.ServiceType_Create", param, commandType: CommandType.StoredProcedure);
                var result = _objReadOnlyRepository.Value.StoreProcedureQuery<EmployeeRes>("HRM.Employee_Search", param);

                // Kiểm tra kết quả trả về
                if (result == null)
                {
                    // Trả về danh sách rỗng
                    return new List<EmployeeRes>();
                }

                // Trả về object result
                return result;
            }
            catch (Exception ex)
            {
                // Xử lý lỗi và ném ra ngoại lệ
                throw new Exception("Có lỗi xảy ra trong quá trình thực thi stored procedure." + ex.Message, ex);
            }
        }
        #endregion

    }
}
