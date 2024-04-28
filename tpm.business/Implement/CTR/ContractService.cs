using Core.DataAccess.Interface;
using Dapper;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using tpm.dto.admin;
using tpm.dto.admin.Response;

namespace tpm.business
{
    public class ContractService : IContractService
	{
		#region GetContractList
		public IEnumerable<ContractListRes> GetContractsList(ContractSearchReq obj)
		{
			// Tạo một đối tượng DynamicParameters để lưu trữ các tham số truyền vào stored procedure
			var param = new DynamicParameters();

			// Thêm các tham số với giá trị từ các thuộc tính của đối tượng obj truyền vào             
			param.Add("@PageIndex", obj.PageIndex);
			param.Add("@PageSize", obj.PageSize);

			// Thực hiện gọi stored procedure để thêm dữ liệu vào database
			var result = _objReadOnlyRepository.Value.StoreProcedureQuery<ContractListRes>("CTR.Generate_Contract_List", param);
			if (result == null)
			{
				result = new List<ContractListRes>();
			}

			//var groupedContracts = result
			//    .GroupBy(c => c.Contract_ID)
			//    .Select(group => new ContractListRes
			//    {
			//        Contract_ID = group.Key,
			//        Contract_Number = group.First().Contract_Number,
			//        Customer_Company_Name = group.First().Customer_Company_Name,
			//        Signing_Date = group.First().Signing_Date,
			//        End_Date = group.First().End_Date,
			//        Value = group.First().Value,
			//        FullName = group.First().FullName,
			//        Status = group.First().Status,
			//        Shortname = string.Join(", ", group.Select(c => c.Shortname))
			//    })
			//    .ToList();
			//return groupedContracts;
			return result;
		}
		#endregion

		#region ContractSearchByStatus1
		public IEnumerable<ContractListRes> ContractSearchByStatus1()
		{
			var result = _objReadOnlyRepository.Value.StoreProcedureQuery<ContractListRes>("CTR.ContractSearchByStatus1");
			if (result == null)
			{
				result = new List<ContractListRes>();
			}

			var groupedContracts = result
				.GroupBy(c => c.Contract_ID)
				.Select(group => new ContractListRes
				{
					Contract_ID = group.Key,
					Contract_Number = group.First().Contract_Number,
					Customer_Company_Name = group.First().Customer_Company_Name,
					Signing_Date = group.First().Signing_Date,
					End_Date = group.First().End_Date,
					Value = group.First().Value,
					FullName = group.First().FullName,
					Status = group.First().Status,
					Shortname = string.Join(", ", group.Select(c => c.Shortname))
				})
				.ToList();
			return groupedContracts;
		}
		#endregion

		#region ContractSearchByStatus0
		public IEnumerable<ContractListRes> ContractSearchByStatus0()
		{
			var result = _objReadOnlyRepository.Value.StoreProcedureQuery<ContractListRes>("CTR.ContractSearchByStatus0");
			if (result == null)
			{
				result = new List<ContractListRes>();
			}

			var groupedContracts = result
				.GroupBy(c => c.Contract_ID)
				.Select(group => new ContractListRes
				{
					Contract_ID = group.Key,
					Contract_Number = group.First().Contract_Number,
					Customer_Company_Name = group.First().Customer_Company_Name,
					Signing_Date = group.First().Signing_Date,
					End_Date = group.First().End_Date,
					Value = group.First().Value,
					FullName = group.First().FullName,
					Status = group.First().Status,
					Shortname = string.Join(", ", group.Select(c => c.Shortname))
				})
				.ToList();
			return groupedContracts;
		}
		#endregion

		#region GetContractTypesWithTypeName
		public IEnumerable<ContractTypeRes> GetContractsTypesWithTypeName()
		{
			var result = _objReadOnlyRepository.Value.StoreProcedureQuery<ContractTypeRes>("CTR.ContractType_ReadAll");
			if (result == null)
			{
				result = new List<ContractTypeRes>();
			}
			return result;
		}
		#endregion

		#region GetServicesWithTypeName
		public IEnumerable<ServiceRes> GetServicesWithTypeName()
		{
			var result = _objReadOnlyRepository.Value.StoreProcedureQuery<ServiceRes>("CTR.GetServicesWithTypeName");
			if (result == null)
			{
				result = new List<ServiceRes>();
			}
			return result;
		}
		#endregion

		#region Private Fields

		private readonly Lazy<IRepository> _objRepository;
		private readonly Lazy<IReadOnlyRepository> _objReadOnlyRepository;
		private bool _disposedValue;

		#endregion

		#region Constructors

		public ContractService(Lazy<IRepository> objRepository, Lazy<IReadOnlyRepository> objReadOnlyRepository)
		{
			_objRepository = objRepository;
			_objReadOnlyRepository = objReadOnlyRepository;
		}

		#endregion

		#region List, ReadAll
		public IEnumerable<ContractRes> List()
		{
			return ReadAll();
		}


		public IEnumerable<ContractRes> ReadAll()
		{
			var result = _objReadOnlyRepository.Value.StoreProcedureQuery<ContractRes>("CTR.Contract_ReadAll");
			if (result == null)
			{
				result = new List<ContractRes>();
			}
			return result;
		}
		#endregion

		#region GetContractsWithTypeName
		public IEnumerable<ContractRes> GetContractsWithTypeName()
		{
			var result = _objReadOnlyRepository.Value.StoreProcedureQuery<ContractRes>("CTR.GetContractsWithTypeName");
			if (result == null)
			{
				result = new List<ContractRes>();
			}
			return result;
		}
		#endregion

		#region GetContractsByID
		public IEnumerable<ContractRes> GetContractsByID(int Contract_ID)
		{
			var result = _objReadOnlyRepository.Value.StoreProcedureQuery<ContractRes>("CTR.GetContractByID", new { Contract_ID });
			if (result == null)
			{
				result = new List<ContractRes>();
			}
			return result;
		}
		#endregion

		#region OpenContractDetail
		public IEnumerable<ContractDetailRes> OpenContractDetail(int Contract_Number)
		{
			var result = _objReadOnlyRepository.Value.StoreProcedureQuery<ContractDetailRes>("CTR.GetContractByID");
			if (result == null)
			{
				result = new List<ContractDetailRes>();
			}
			return result;
		}
		#endregion

		#region Create Old
		public bool Create(ContractCreateReq objReq, out int newContractID)
		{
			try
			{
				if (objReq.Contract_Type_ID <= 0 ||
					string.IsNullOrEmpty(objReq.Contract_Number) ||
					string.IsNullOrEmpty(objReq.Customer_Company_Name) ||
					string.IsNullOrEmpty(objReq.Address) ||
					string.IsNullOrEmpty(objReq.Phone) ||
					string.IsNullOrEmpty(objReq.MobilePhone) ||
					string.IsNullOrEmpty(objReq.TIN) ||
					string.IsNullOrEmpty(objReq.Email))
				{
					// Trả về false nếu thông tin không đủ
					newContractID = 0;
					return false;
				}

				// Tạo một đối tượng DynamicParameters để lưu trữ các tham số truyền vào stored procedure
				var param = new DynamicParameters();

				// Thêm các tham số với giá trị từ các thuộc tính của đối tượng obj truyền vào             
				param.Add("@Contract_Type_ID", objReq.Contract_Type_ID);
				param.Add("@Contract_Number", objReq.Contract_Number);
				param.Add("@Customer_Company_Name", objReq.Customer_Company_Name);
				param.Add("@Address", objReq.Address);
				param.Add("@Phone", objReq.Phone);
				param.Add("@MobilePhone", objReq.MobilePhone);
				param.Add("@TIN", objReq.TIN);
				param.Add("@Email", objReq.Email);

				// Thực hiện gọi stored procedure để thêm dữ liệu vào database
				newContractID = _objReadOnlyRepository.Value.Connection.ExecuteScalar<int>("CTR.Contract_Create", param, commandType: CommandType.StoredProcedure);

				// Kiểm tra Contract_ID mới
				if (newContractID > 0)
				{
					// Trả về kết quả thành công
					return true;
				}

				// Trả về false nếu không tạo mới được dữ liệu
				return false;
			}
			catch (Exception ex)
			{
				// Xử lý lỗi và ném ra ngoại lệ
				throw new Exception("Có lỗi xảy ra trong quá trình thực thi stored procedure.", ex);
			}
		}

		public int Save(String jsonData)
		{
			try
			{
				var param = new DynamicParameters();
				param.Add("@jsonData", jsonData);
				var rowAffect = _objReadOnlyRepository.Value.Connection.ExecuteScalar<int>("CTR.Contract_Save", param, commandType: CommandType.StoredProcedure);
				Console.WriteLine(rowAffect);
				if (rowAffect > 0)
				{
					// Trả về kết quả thành công
					return rowAffect;
				}

				// Trả về false nếu không có dòng nào được thêm
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
		public bool Update(ContractCreateReq objReq, int Contract_ID)
		{
			try
			{
				if (objReq.Contract_Type_ID <= 0 ||
					string.IsNullOrEmpty(objReq.Contract_Number) ||
					string.IsNullOrEmpty(objReq.Customer_Company_Name) ||
					string.IsNullOrEmpty(objReq.Address) ||
					string.IsNullOrEmpty(objReq.Phone) ||
					string.IsNullOrEmpty(objReq.MobilePhone) ||
					string.IsNullOrEmpty(objReq.TIN) ||
					string.IsNullOrEmpty(objReq.Email))
				{
					// Trả về false nếu thông tin không đủ
					return false;
				}

				// Tạo một đối tượng DynamicParameters để lưu trữ các tham số truyền vào stored procedure
				var param = new DynamicParameters();

				// Thêm các tham số với giá trị từ các thuộc tính của đối tượng obj truyền vào
				param.Add("@Contract_ID", Contract_ID);
				param.Add("@Contract_Type_ID", objReq.Contract_Type_ID);
				param.Add("@Contract_Number", objReq.Contract_Number);
				param.Add("@Customer_Company_Name", objReq.Customer_Company_Name);
				param.Add("@Address", objReq.Address);
				param.Add("@Phone", objReq.Phone);
				param.Add("@MobilePhone", objReq.MobilePhone);
				param.Add("@TIN", objReq.TIN);
				param.Add("@Email", objReq.Email);

				// Thực hiện gọi stored procedure để cập nhật dữ liệu trong database
				_objReadOnlyRepository.Value.Connection.Execute("CTR.Contract_Update", param, commandType: CommandType.StoredProcedure);

				// Trả về kết quả thành công
				return true;
			}
			catch (Exception ex)
			{
				// Xử lý lỗi và ném ra ngoại lệ
				throw new Exception("Có lỗi xảy ra trong quá trình thực thi stored procedure.", ex);
			}
		}


		#endregion

		#region Delete
		public int Delete(ContractDeleteReq objReq)
		{
			try
			{
				// Tạo một đối tượng DynamicParameters để lưu trữ các tham số truyền vào stored procedure
				var param = new DynamicParameters();

				// Thêm tham số với giá trị từ contractID truyền vào
				param.Add("@Contract_ID", objReq.Contract_ID);

				// Thực hiện gọi stored procedure để xóa dữ liệu trong database
				var storedProcedureResult = _objReadOnlyRepository.Value.Connection.Execute("CTR.Contract_Delete", param, commandType: CommandType.StoredProcedure);
				// Kiểm tra số dòng trả về

				if (storedProcedureResult > 0)
				{
					// Trả về kết quả thành công
					return storedProcedureResult;
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

		#region SearchContract
		public IEnumerable<ContractListRes> SearchContract(ContractSearchReq objReq)
		{
			try
			{
				// Tạo một đối tượng DynamicParameters để lưu trữ các tham số truyền vào stored procedure
				var param = new DynamicParameters();

				// Thêm tham số với giá trị từ contractID truyền vào
				param.Add("@PageIndex", objReq.PageIndex);
				param.Add("@PageSize", objReq.PageSize);
				param.Add("@KeySearch", objReq.SearchValue);

				var storedProcedureResult = new List<ContractListRes>();

				switch (objReq.Criteria)
				{
					case "Mã hợp đồng":
						switch (objReq.SelectedOption)
						{
							case "all":
								storedProcedureResult = _objReadOnlyRepository.Value.StoreProcedureQuery<ContractListRes>("CTR.ContractSearchByContractNumber", param).ToList();
								break;
							case "completed":
								storedProcedureResult = _objReadOnlyRepository.Value.StoreProcedureQuery<ContractListRes>("CTR.ContractSearchByContractNumberComplete", param).ToList();
								break;
							case "notCompleted":
								storedProcedureResult = _objReadOnlyRepository.Value.StoreProcedureQuery<ContractListRes>("CTR.ContractSearchByContractNumberNotComplete", param).ToList();
								break;
						}
						break;
					case "Công ty":
						switch (objReq.SelectedOption)
						{
							case "all":
								storedProcedureResult = _objReadOnlyRepository.Value.StoreProcedureQuery<ContractListRes>("CTR.ContractSearchByCompanyName", param).ToList();
								break;
							case "completed":
								storedProcedureResult = _objReadOnlyRepository.Value.StoreProcedureQuery<ContractListRes>("CTR.ContractSearchByCompanyNameComplete", param).ToList();
								break;
							case "notCompleted":
								storedProcedureResult = _objReadOnlyRepository.Value.StoreProcedureQuery<ContractListRes>("CTR.ContractSearchByCompanyNameNotComplete", param).ToList();
								break;
						}
						break;
					case "Nhân viên tạo":
						switch (objReq.SelectedOption)
						{
							case "all":
								storedProcedureResult = _objReadOnlyRepository.Value.StoreProcedureQuery<ContractListRes>("CTR.ContractSearchByEmployeeName", param).ToList();
								break;
							case "completed":
								storedProcedureResult = _objReadOnlyRepository.Value.StoreProcedureQuery<ContractListRes>("CTR.ContractSearchByEmployeeNameComplete", param).ToList();
								break;
							case "notCompleted":
								storedProcedureResult = _objReadOnlyRepository.Value.StoreProcedureQuery<ContractListRes>("CTR.ContractSearchByEmployeeNameNotComplete", param).ToList();
								break;
						}
						break;
				}

				//if (objReq.Criteria == "Mã hợp đồng")
				//{
				//    storedProcedureResult = _objReadOnlyRepository.Value.StoreProcedureQuery<ContractListRes>("CTR.ContractSearchByContractNumber", param).ToList();
				//}
				//else if (objReq.Criteria == "Công ty")
				//{
				//    storedProcedureResult = _objReadOnlyRepository.Value.StoreProcedureQuery<ContractListRes>("CTR.ContractSearchByCompanyName", param).ToList();
				//}
				//else if (objReq.Criteria == "Nhân viên tạo")
				//{
				//    storedProcedureResult = _objReadOnlyRepository.Value.StoreProcedureQuery<ContractListRes>("CTR.ContractSearchByEmployeeName", param).ToList();
				//}

				//else
				//{
				//    storedProcedureResult = _objReadOnlyRepository.Value.Connection.Execute("CTR.Contract_Delete", param, commandType: CommandType.StoredProcedure);
				//}

				// Kiểm tra số dòng trả về

				if (storedProcedureResult == null)
				{
					// Trả về kết quả thành công
					return new List<ContractListRes>();
				}

				//var groupedContracts = storedProcedureResult
				//.GroupBy(c => c.Contract_ID)
				//.Select(group => new ContractListRes
				//{
				//    Contract_ID = group.Key,
				//    Contract_Number = group.First().Contract_Number,
				//    Customer_Company_Name = group.First().Customer_Company_Name,
				//    Signing_Date = group.First().Signing_Date,
				//    End_Date = group.First().End_Date,
				//    Value = group.First().Value,
				//    FullName = group.First().FullName,
				//    Status = group.First().Status,
				//    Shortname = string.Join(", ", group.Select(c => c.Shortname))
				//})
				//.ToList();
				//return groupedContracts;
				return storedProcedureResult;
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


		~ContractService()
		{
			Dispose(false);
		}
		#endregion

		#region Get Tab1 Content By Contract ID
		public IEnumerable<ContractTab1Res> GetTab1ContentByContractID(ContractTab1Req Contract_ID)
		{
			try
			{
				var param = new DynamicParameters();
				param.Add("@ContractID", Contract_ID.ContractID);
				var result = _objReadOnlyRepository.Value.Connection.Query<ContractTab1Res>("CTR.GetTab1DetailByContractID", param, commandType: CommandType.StoredProcedure);

				if (result == null)
				{
					result = new List<ContractTab1Res>();
				}
				return result;
			}
			catch (Exception ex)
			{
				throw new Exception("Có lỗi xảy ra trong quá trình thực thi stored procedure: " + ex.Message, ex);
			}
		}
		#endregion

		#region Get Tab2 Content By Contract ID
		public IEnumerable<ContractTab2Res> GetTab2ContentByContractID(ContractTab1Req ContractID)
		{
			try
			{
				var param = new DynamicParameters();
				param.Add("@ContractID", ContractID.ContractID);
				var result = _objReadOnlyRepository.Value.Connection.Query<ContractTab2Res>("CTR.GetTab2DetailByContractID", param, commandType: CommandType.StoredProcedure);

				if (result == null)
				{
					result = new List<ContractTab2Res>();
				}
				return result;
			}
			catch (Exception ex)
			{
				throw new Exception("Có lỗi xảy ra trong quá trình thực thi stored procedure: " + ex.Message, ex);
			}
		}
		#endregion

		#region Get Tab3 Content By Contract ID
		public IEnumerable<ContractTab3Res> GetTab3ContentByContractID(ContractTab1Req ContractID)
		{
			try
			{
				var param = new DynamicParameters();
				param.Add("@ContractID", ContractID.ContractID);
				var result = _objReadOnlyRepository.Value.Connection.Query<ContractTab3Res>("CTR.GetTab3DetailByContractID", param, commandType: CommandType.StoredProcedure);

				if (result == null)
				{
					result = new List<ContractTab3Res>();
				}
				return result;
			}
			catch (Exception ex)
			{
				throw new Exception("Có lỗi xảy ra trong quá trình thực thi stored procedure: " + ex.Message, ex);
			}
		}
		#endregion

		#region Get Tab2, Tab3 Content By Contract ID To Edit
		public IEnumerable<ContractTab2ToEditRes> GetTab2DetailByContractIDToEdit(ContractTab1Req ContractID)
		{
			try
			{
				var param = new DynamicParameters();
				param.Add("@ContractID", ContractID.ContractID);
				var result = _objReadOnlyRepository.Value.Connection.Query<ContractTab2ToEditRes>("CTR.GetTab2DetailByContractIDToEdit", param, commandType: CommandType.StoredProcedure);

				if (result == null)
				{
					result = new List<ContractTab2ToEditRes>();
				}
				return result;
			}
			catch (Exception ex)
			{
				throw new Exception("Có lỗi xảy ra trong quá trình thực thi stored procedure: " + ex.Message, ex);
			}
		}

		public IEnumerable<ContractTab3ToEditRes> GetTab3ContentByContractIDToEdit(ContractTab1Req ContractID)
		{
			try
			{
				var param = new DynamicParameters();
				param.Add("@ContractID", ContractID.ContractID);
				var result = _objReadOnlyRepository.Value.Connection.Query<ContractTab3ToEditRes>("CTR.GetTab3DetailByContractIDToEdit", param, commandType: CommandType.StoredProcedure);

				if (result == null)
				{
					result = new List<ContractTab3ToEditRes>();
				}
				return result;
			}
			catch (Exception ex)
			{
				throw new Exception("Có lỗi xảy ra trong quá trình thực thi stored procedure: " + ex.Message, ex);
			}
		}
		#endregion

		#region EditContractDetail
		public int UpdateContractDetail(String jsonData)
		{
			try
			{
				var param = new DynamicParameters();
				param.Add("@jsonData", jsonData);
				var rowAffect = _objReadOnlyRepository.Value.Connection.ExecuteScalar<int>("CTR.Contract_Update", param, commandType: CommandType.StoredProcedure);
				Console.WriteLine(rowAffect);
				if (rowAffect > 0)
				{
					// Trả về kết quả thành công
					return rowAffect;
				}

				// Trả về false nếu không có dòng nào được thêm
				return -1;
			}
			catch (Exception ex)
			{
				// Xử lý lỗi và ném ra ngoại lệ
				throw new Exception("Có lỗi xảy ra trong quá trình thực thi stored procedure.", ex);
			}
		}
        #endregion

        #region ContractDetailFilter
        public IEnumerable<AllContractDetailRes> ContractDetailFilter(FilterReq obj)
        {
            try
            {
                var param = new DynamicParameters();
                param.Add("@PageIndex", obj.PageIndex);
                param.Add("@PageSize", obj.PageSize);

				FilterMaterial newObject = new FilterMaterial();
                newObject.StatusID = obj.StatusID;
                newObject.ServiceTypeID = obj.ServiceTypeID;
                newObject.EmployeeID = obj.EmployeeID;

                string jsonData = JsonConvert.SerializeObject(newObject);
                Console.WriteLine(jsonData);		

                param.Add("@jsonData", jsonData);
                
                //var rowAffect = _objReadOnlyRepository.Value.Connection.ExecuteScalar<int>("CTR.GetAllContractDetailFilter", param, commandType: CommandType.StoredProcedure);
                //Console.WriteLine(rowAffect);
                //if (rowAffect > 0)
                //{
                //    // Trả về kết quả thành công
                //    return rowAffect;
                //}

                //// Trả về false nếu không có dòng nào được thêm
                //return -1;
                IEnumerable<AllContractDetailRes> result = new List<AllContractDetailRes>();

                if (obj.StatusID == null && obj.ServiceTypeID == null && obj.EmployeeID == null) {
                    // Hiện All
                    result = _objReadOnlyRepository.Value.StoreProcedureQuery<AllContractDetailRes>("CTR.GetAllContractDetail", param);
                }
				else if (obj.StatusID != null && obj.ServiceTypeID == null && obj.EmployeeID == null)
				{
                    result = _objReadOnlyRepository.Value.StoreProcedureQuery<AllContractDetailRes>("CTR.GetAllContractDetailFilterAllA", param);
                }
                else if (obj.StatusID == null && obj.ServiceTypeID != null && obj.EmployeeID == null)
                {
                    result = _objReadOnlyRepository.Value.StoreProcedureQuery<AllContractDetailRes>("CTR.GetAllContractDetailFilterAllB", param);
                }
                else if (obj.StatusID != null && obj.ServiceTypeID != null && obj.EmployeeID == null)
                {
                    result = _objReadOnlyRepository.Value.StoreProcedureQuery<AllContractDetailRes>("CTR.GetAllContractDetailFilterAllAB", param);
                }
                else if (obj.StatusID == null && obj.ServiceTypeID == null && obj.EmployeeID != null)
                {
                    result = _objReadOnlyRepository.Value.StoreProcedureQuery<AllContractDetailRes>("CTR.GetAllContractDetailFilterAllC", param);
                }
                else if (obj.StatusID != null && obj.ServiceTypeID == null && obj.EmployeeID != null)
                {
                    result = _objReadOnlyRepository.Value.StoreProcedureQuery<AllContractDetailRes>("CTR.GetAllContractDetailFilterAllAC", param);
                }
                else if (obj.StatusID == null && obj.ServiceTypeID != null && obj.EmployeeID != null)
                {
                    result = _objReadOnlyRepository.Value.StoreProcedureQuery<AllContractDetailRes>("CTR.GetAllContractDetailFilterAllBC", param);
                }
				else
				{
                    result = _objReadOnlyRepository.Value.StoreProcedureQuery<AllContractDetailRes>("CTR.GetAllContractDetailFilterAll", param);
                }

                //var result = _objReadOnlyRepository.Value.StoreProcedureQuery<AllContractDetailRes>("CTR.GetAllContractDetailFilter", param);
                if (result == null)
                {
                    result = new List<AllContractDetailRes>();
                }
                return result;
            }
            catch (Exception ex)
            {
                // Xử lý lỗi và ném ra ngoại lệ
                throw new Exception("Có lỗi xảy ra trong quá trình thực thi stored procedure.", ex);
            }
        }
        #endregion

        #region ChangeStatus
        public int ChangeStepStatus(ContractChangeStepStatusReq obj)
        {
            try
            {
                var param = new DynamicParameters();
                param.Add("@Contract_ID", obj.Contract_ID);
                param.Add("@Detail_ID", obj.Detail_ID);
                //var rowAffect = _objReadOnlyRepository.Value.Connection.ExecuteScalar<int>("CTR.ChangeStepStatus", param, commandType: CommandType.StoredProcedure);
                var rowAffect = _objReadOnlyRepository.Value.Connection.Execute("CTR.ChangeStepStatus", param, commandType: CommandType.StoredProcedure);
                Console.WriteLine(rowAffect);
                if (rowAffect > 0)
                {
                    // Trả về kết quả thành công
                    return rowAffect;
                }

                // Trả về false nếu không có dòng nào được update
                return -1;
            }
            catch (Exception ex)
            {
                // Xử lý lỗi và ném ra ngoại lệ
                throw new Exception("Có lỗi xảy ra trong quá trình thực thi stored procedure.", ex);
            }
        }
        #endregion

        #region GetAllContractDetail
        public IEnumerable<AllContractDetailRes> GetAllContractDetail(ContractDetailManagerPagingReq data)
        {
			try
			{
                var param = new DynamicParameters();
                param.Add("@PageIndex", data.PageIndex);
                param.Add("@PageSize", data.PageSize);

                var result = _objReadOnlyRepository.Value.StoreProcedureQuery<AllContractDetailRes>("CTR.GetAllContractDetail", param);
				if (result == null)
				{
					result = new List<AllContractDetailRes>();
				}
				return result;
			}
			catch (Exception ex)
			{
				// Xử lý lỗi và ném ra ngoại lệ
				throw new Exception("Có lỗi xảy ra trong quá trình thực thi stored procedure.", ex);
			}
        }
        #endregion
    }
}
