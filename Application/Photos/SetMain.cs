using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class SetMain
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly IPhotoAccessor photoAccessor;
            private readonly IUserAccessor userAccessor;
            private readonly DataContext context;
            public Handler(DataContext context, IUserAccessor userAccessor, IPhotoAccessor photoAccessor)
            {
                this.context = context;
                this.userAccessor = userAccessor;
                this.photoAccessor = photoAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user=await context.Users.Include(p=>p.Photos).FirstOrDefaultAsync(x=>x.UserName==userAccessor.GetUsername());

                if(user==null) return null;

                var photo=user.Photos.FirstOrDefault(x=>x.Id==request.Id);

                if(photo==null) return null;

                var currentMain=user.Photos.FirstOrDefault(x=>x.IsMain);

                if(currentMain !=null) currentMain.IsMain=false;

                photo.IsMain=true;
                
                var success=await context.SaveChangesAsync()>0;
                if(success) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failure("Prob setting main photo");

            }
        }
    }
}