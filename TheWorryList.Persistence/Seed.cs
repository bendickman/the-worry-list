using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using TheWorryList.Domain;
using TheWorryList.Domain.Identity;

namespace TheWorryList.Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext dataContext, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser { DisplayName = "Ben", UserName = "ben", Email = "ben@test.com"},
                    new AppUser { DisplayName = "Tom", UserName = "tom", Email = "tom@test.com"},
                    new AppUser { DisplayName = "Jane", UserName = "jane", Email = "jane@test.com"},
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "P@ssword1");
                }
            }

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
                },
                new WorryItem
                {
                    CreatedDate = DateTime.Now.AddDays(-6),
                    Situation = "Presentation to give at work",
                    Emotions = "Anxious and worried",
                    Thoughts = "What if I freeze and can't talk",
                    AnxietyLevel = 6,
                    Beliefs = "I'll lose my job",
                    ThinkingStyle = "Catastrophising",
                    PositiveResponse = "I have prepared and practised my presentation, it will be fine",
                    Actions = "Run through notes and practise in the mirror",
                },
                new WorryItem
                {
                    CreatedDate = DateTime.Now.AddDays(-1),
                    Situation = "Panicked in supermarket",
                    Emotions = "Scared and out of control",
                    Thoughts = "I can't go there any more, what if it happens again",
                    AnxietyLevel = 3,
                    Beliefs = "There must be something wrong with me",
                    ThinkingStyle = "Self-critical",
                    PositiveResponse = "I have done this hundreds of times before, just keep calm",
                    Actions = "Imagine being out and feeling very relaxed and calm",
                }
                //add more data
            };

            await dataContext.WorryItems.AddRangeAsync(worryItems);
            await dataContext.SaveChangesAsync();
        }
    }
}