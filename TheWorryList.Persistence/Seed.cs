using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TheWorryList.Domain;

namespace TheWorryList.Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext dataContext)
        {
            if (dataContext.WorryItems.Any()) return;

            var worryItems = new List<WorryItem>
            {
                new WorryItem
                {
                    CreatedDate = DateTime.Now.AddDays(-5),
                    Situation = "Big exam coming up",
                    Emotions = "Anxious and stressed",
                    Thoughts = "What if I fail, my life is over",
                    AnxietyLevel = 5,
                    Beliefs = "I must pass this exam, I should be smart enough to pass",
                    ThinkingStyle = "Black and white, catastrophising",
                    PositiveResponse = "I have revised hard and am capable of passing",
                    Actions = "Complete my revision and put this into perspective",
                }
                //add more data
            };

            await dataContext.WorryItems.AddRangeAsync(worryItems);
            await dataContext.SaveChangesAsync();
        }
    }
}