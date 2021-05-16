using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string DisplayName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]//ovjde moze regular expression nije ti se tad dalo
        public string Password { get; set; }
        [Required]
        public string UserName { get; set; }
    }
}