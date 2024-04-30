using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using tpm.dto.admin.Response;
using tpm.dto.admin;
using System.Text.Json;

namespace tpm.business
{
	public interface IContractService : IDisposable
	{
		bool Create(ContractCreateReq objReq, out int newContractID);
		bool Update(ContractCreateReq objReq, int Contract_ID);
		int Delete(ContractDeleteReq objReq);
		IEnumerable<ContractRes> ReadAll();
		IEnumerable<ContractRes> GetContractsByID(int Contract_ID);
		IEnumerable<ContractRes> GetContractsWithTypeName();
		IEnumerable<ContractTypeRes> GetContractsTypesWithTypeName();
		IEnumerable<ServiceRes> GetServicesWithTypeName();
		IEnumerable<ContractListRes> GetContractsList(ContractSearchReq obj);
		int Save(String jsonData);
		IEnumerable<ContractTab1Res> GetTab1ContentByContractID(ContractTab1Req Contract_ID);
		IEnumerable<ContractTab2Res> GetTab2ContentByContractID(ContractTab1Req ContractID);
		IEnumerable<ContractTab3Res> GetTab3ContentByContractID(ContractTab1Req ContractID);
		IEnumerable<ContractTab2ToEditRes> GetTab2DetailByContractIDToEdit(ContractTab1Req ContractID);
		IEnumerable<ContractTab3ToEditRes> GetTab3ContentByContractIDToEdit(ContractTab1Req ContractID);
		int UpdateContractDetail(String jsonData);
		IEnumerable<ContractListRes> SearchContract(ContractSearchReq objReq);
		IEnumerable<ContractListRes> ContractSearchByStatus1();
		IEnumerable<ContractListRes> ContractSearchByStatus0();
		int ChangeStepStatus(ContractChangeStepStatusReq obj);
		IEnumerable<AllContractDetailRes> GetAllContractDetail(ContractDetailManagerPagingReq data);
		IEnumerable<AllContractDetailRes> ContractDetailFilter(FilterReq obj);

        #region HomeStay
        public IEnumerable<GetAvailableRoomsRes> GetAvailableRooms();
		public IEnumerable<GetRoomDetailRes> GetRoomDetail(GetRoomDetailReq roomID);
		public IEnumerable<GetRoomDetailRes> GetRoomDetailsByDate(GetRoomDetailsByDateReq roomID);
		public bool RoomBooking(RoomBookingReq booking);
		public bool DeleteBooking(DeleteBookingReq booking_id);
        #endregion
    }
}
