using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security
{
    public class IsHostRequirement : IAuthorizationRequirement

    {


    }

    public class IsHostRequirementHadler : AuthorizationHandler<IsHostRequirement>
    {
        private readonly DataContext dbContext;
        private readonly IHttpContextAccessor httpContextAccessor;
        public IsHostRequirementHadler(DataContext dbContext, IHttpContextAccessor httpContextAccessor)
        {
            this.httpContextAccessor = httpContextAccessor;
            this.dbContext = dbContext;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
        {
            var userId= context.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if(userId==null) return Task.CompletedTask;//nije auth

            var activityId=Guid.Parse(httpContextAccessor.HttpContext?.Request.RouteValues.SingleOrDefault(x=>x.Key=="id").Value?.ToString());

            var attendee=dbContext.ActivityAttendees
            .AsNoTracking()
            .SingleOrDefaultAsync(x=> x.AppUserId==userId && x.ActivityId==activityId).Result;//jer nemos awaited oveerides

            if(attendee==null) return Task.CompletedTask;

            if(attendee.IsHost) context.Succeed(requirement);

            return Task.CompletedTask;
        }
    }
}