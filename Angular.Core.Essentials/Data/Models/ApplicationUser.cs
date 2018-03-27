using Microsoft.AspNetCore.Identity;

namespace Angular.Core.Essentials.Data.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PictureUrl { get; set; }
    }
}
