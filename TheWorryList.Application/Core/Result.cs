namespace TheWorryList.Application.Core
{
    public class Result<T>
    {
        public bool IsSuccess { get; set; }

        public bool IsUnauthorised { get; set; }

        public T Value { get; set; }

        public KeyValuePair<string, string> Error { get; set; }

        public static Result<T> Success(T value) => new Result<T> {IsSuccess = true, Value = value};

        public static Result<T> Failure(string key, string errorMessage, bool isUnauthorised = false)
        { 
            return new Result<T> 
            {
                IsSuccess = false,
                IsUnauthorised = isUnauthorised ,
                Error = new KeyValuePair<string, string>(key,errorMessage),
            };
        }
    }
}