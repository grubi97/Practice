using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }


        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                this._context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var act = await _context.Activities.FindAsync(request.Id);

                if (act == null) return null;

                _context.Remove(act);
                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("failed to delete");

                return Result<Unit>.Success(Unit.Value);
            }
        }

    }
}