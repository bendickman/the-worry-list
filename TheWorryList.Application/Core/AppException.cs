using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TheWorryList.Application.Core
{
    public class AppException
    {
        public AppException(int statusCode, string message, string stackTrace = null)
        {
            StatusCode = statusCode;
            Message = message;
            StackTrace = stackTrace;
        }

        public int StatusCode { get; set; }

        public string Message { get; set; }

        public string StackTrace { get; set; }
    }
}