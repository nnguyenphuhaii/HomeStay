using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace tpm.dto.admin
{
    public class ContractRes
    {
        public int Contract_ID { get; set; }
        public string Contract_Type_Name { get; set; }
        public string Contract_Number { get; set; }
        public string Customer_Company_Name { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string TIN { get; set; }
        public string Email { get; set; }
        public float Progress { get; set; }
        public float Value { get; set; }
        public bool Status { get; set; }
        public string FullName { get; set; }
        public string Shortname { get; set; }
	}
    public class AllContractDetailRes
    {
        public int Detail_ID { get; set; }
        public int Contract_ID { get; set; }
        public int Service_Type_ID { get; set; }
        public string Name { get; set; }
        public int StepID { get; set; }
        public string StepName { get; set; }
        public string Completion_Date { get; set; }
        public int EmployeeID { get; set; }
        public int SignedEmployeeID { get; set; }
		public string FullName { get; set; }
		public string SignedEmployeeName { get; set; }
        public string Custom_Name { get; set; }
        public int Status_ID { get; set; }
        public String Contract_Number { get; set; }
        public string Representative { get; set; }
        public sbyte ServiceProcess { get; set; }
        public double Value { get; set; }
        public string Host {  get; set; }
        public string Path {  get; set; }
        public int TotalRecords {  get; set; }
        public string UpdatedDate { get; set; }
    }
    public class GetAvailableRoomsRes
    {
        public int? room_id { get; set; }
        public string room_name { get; set;}
        public int? max_capacity { get; set;}
        public int? status { get; set; }
    }
    public class GetRoomDetailReq
    {
        public int room_id { get; set; }
    }
    public class GetRoomDetailRes
    {
        public string room_name { get; set;}
        public string start_date { get; set;}
        public string end_date { get; set;}
        public TimeSpan start_time { get; set;}
        public TimeSpan end_time { get; set;}
        public string guest_name{ get; set;}
        public string note{ get; set;}
    }
}
