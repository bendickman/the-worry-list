using Microsoft.AspNetCore.Identity;

namespace TheWorryList.Domain.Identity
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }

        public string Bio { get; set; } = "Tell us a bit about you...";

        public ICollection<WorryItem> WorryItems { get; set; } = new List<WorryItem>();
    }
}