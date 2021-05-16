namespace API.DTOs
{
    public class UserDto
    {
        //informacija koja se salje nazad useru kad se uloga
        public string DisplayName{get; set;}
        public string Token{get; set;}
        public string Username{get; set;}
        public string Image{get; set;}
    }
}