using Microsoft.EntityFrameworkCore;

class PeopleDb : DbContext
{
    public PeopleDb(DbContextOptions<PeopleDb> options)
        : base(options) { }

    public DbSet<People> Peoples => Set<People>();
}
