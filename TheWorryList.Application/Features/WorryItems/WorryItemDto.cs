using TheWorryList.Application.Features.Profiles;

namespace TheWorryList.Application.Features.WorryItems
{
    public class WorryItemDto
    {
        public Guid Id { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime ModifiedDate { get; set; }

        public bool IsComplete { get; set; }
        
        public bool IsDeleted { get; set; }
        
        public string Situation { get; set; }

        public string Emotions { get; set; }

        public int AnxietyLevel { get; set; }

        public string Thoughts { get; set; }

        public string Beliefs { get; set; }

        public string ThinkingStyle { get; set; }

        public string PositiveResponse { get; set; }

        public string Actions { get; set; }

        public Profile User { get; set; }
    }
}