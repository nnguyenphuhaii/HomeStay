using Core.DTO.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace tpm.dto.admin.Response
{
    public class PagingRes<T>
	{
		public CRUDStatusCodeRes StatusCode { get; set; }

		public string ErrorMessage { get; set; }

		public int TotalRecord { get; set; }

		public int? CurrentPageIndex { get; set; }

		public int? PageSize { get; set; }

		public ICollection<T> Records { get; set; }


	}
}
