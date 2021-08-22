using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        //derivas sta sve ima iudentitty user a ovo ispod je dodatno sto zelis
        public string DisplayName{get; set;}
        public string Bio {get;set;}
        
        public ICollection<ActivityAttendee> Activities{get;set;}

    }
}