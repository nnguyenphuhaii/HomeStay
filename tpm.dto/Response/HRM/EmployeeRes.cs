using System;

namespace tpm.dto.admin.Response
{
    public class EmployeeRes
    {
        public string EmployeeID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName { get; set; }
        public DateTime UpdatedDate { get; set; }
        public DateTime DOB { get; set; }
        public DateTime StartDateWork { get; set; }
        public string PositionName { get; set; }
        public string PositionID { get; set; }
        public string DepartmentName { get; set; }
        public string DepartmentID { get; set; }
        public string GenderName { get; set; }
        public string GenderID { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string EmployeeTypeName { get; set; }
        public string Host { get; set; }
        public string Path { get; set; }
    }
}
