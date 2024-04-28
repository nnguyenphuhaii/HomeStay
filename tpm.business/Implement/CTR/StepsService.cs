using Core.DataAccess.Interface;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using tpm.dto.admin;

namespace tpm.business
{
    public class StepsService : IStepsService
    {
        #region Private Fields

        private readonly Lazy<IRepository> _objRepository;
        private readonly Lazy<IReadOnlyRepository> _objReadOnlyRepository;
        private bool _disposedValue;

        #endregion

        #region Constructors

        public StepsService(Lazy<IRepository> objRepository, Lazy<IReadOnlyRepository> objReadOnlyRepository)
        {
            _objRepository = objRepository;
            _objReadOnlyRepository = objReadOnlyRepository;
        }

        #endregion

        #region GetStepsByServiceTypeID
        public IEnumerable<StepsRes> GetStepsByServiceTypeID(StepsReq objReq)
        {
            var param = new DynamicParameters();
            param.Add("@Service_Type_ID", objReq.Service_Type_ID);
            var result = _objReadOnlyRepository.Value.Connection.Query<StepsRes>("CTR.GetStepsByServiceTypeID", param, commandType: CommandType.StoredProcedure);

            if (result == null)
            {
                return new List<StepsRes>();
            }
            return result;
        }
        #endregion

        #region Get Custom StepID
        public int GetCustomStepID()
        {
            var result = _objReadOnlyRepository.Value.Connection.ExecuteScalar<int>("MAT.GetCustomStepID", commandType: CommandType.StoredProcedure);
            if (result == 0)
            {
                return -1;
            }
            return result;
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

        ~StepsService()
        {
            Dispose(false);
        }
        #endregion
    }
}
