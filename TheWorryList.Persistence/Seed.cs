using Microsoft.AspNetCore.Identity;
using TheWorryList.Domain;
using TheWorryList.Domain.Identity;

namespace TheWorryList.Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext dataContext, UserManager<AppUser> userManager)
        {
            var users = new List<AppUser>();
            if (!userManager.Users.Any())
            {
                users = new List<AppUser>
                {
                    new AppUser { DisplayName = "Ben", UserName = "ben", Email = "ben@test.com"},
                    new AppUser { DisplayName = "Rob", UserName = "rob", Email = "rob@test.com"},
                    new AppUser { DisplayName = "Fred", UserName = "fred", Email = "fred@test.com"},
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "dMfF1WA7IWXq@");
                }

            }
            else
            {
                users = userManager.Users.ToList();
            }

            if (!dataContext.WorryItems.Any())
            {
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
                        AppUser = users[0],
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
                        AppUser = users[1],
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
                        AppUser = users[2],
                    }
                };

                await dataContext.WorryItems.AddRangeAsync(worryItems);
                await dataContext.SaveChangesAsync();
            }
        }
    }
}