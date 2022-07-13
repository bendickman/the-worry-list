using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TheWorryList.Domain
{
    public class WorryItem
    {
        public Guid Id { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime ModifiedDate { get; set; }

        public bool IsComplete { get; set; }
        
        public bool IsDeleted { get; set; }
        
        public string Situation { get; set; }//Situation or Trigger i.e. Big exam coming up

        public string Emotions { get; set; }//Emotions or Feelings i.e. anxious and stressed

        public int AnxietyLevel { get; set; }//0 to 10 i.e. 5

        public string Thoughts { get; set; }//What if I fail the exam, my life is over

        public string Beliefs { get; set; }//I must pass this exam, I should be smart enough to pass

        public string ThinkingStyle { get; set; }//Black and white, catastrophising

        public string PositiveResponse { get; set; }//I have revised and know my stuff, I am capable of passing but if I dont its not the end of the world.

        public string Actions { get; set; }//Ensure the revision work has been completed, put things into perspective.
    }
}