using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Application.Core
{
    public class PagedList<T>: List<T>
    {
        public PagedList(IEnumerable<T> items, int count, int pageNumber, int pagesize)
        {
            TotalPages = (int)Math.Ceiling(count/(double)pagesize);
            CurrentPage = pageNumber;
            PageSize = pagesize;
            TotalCount = count;
            AddRange(items);
        }

        public int TotalPages {get; set;}
        public int CurrentPage{get;set;}
        public int PageSize {get;set;}
        public int TotalCount {get; set;}   

        public static async Task<PagedList<T>> CreateAsync(IQueryable<T> source,int pageNumber, int pagesize)
        {
         var count= await source.CountAsync();//broj itema prije pagiancije
         var items= await source.Skip((pageNumber-1)*pagesize).Take(pagesize).ToListAsync(); //  npr 12 itema, i pagesize je 10, da se dobije prvih 10,
         // 1-1 puta 0 je 0, a druga stranica je 2-1 puta 10,i dobit cemo iducih 10 str
         return new PagedList<T>(items, count,pageNumber,pagesize);
        }     
    }
}