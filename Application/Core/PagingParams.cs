namespace Application.Core
{
    public class PagingParams
    {
        private const int MaxPagedSize = 50;
        public int PageNumber {get; set;} = 1;

        private int pagesize=2;//po defaulte pagesize je 10
        public int PageSize
        {
            get { return pagesize; }
            set { pagesize = (value>MaxPagedSize)? MaxPagedSize : value; }
        }
        
    }
}