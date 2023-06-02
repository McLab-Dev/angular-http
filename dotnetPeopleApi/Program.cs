using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<PeopleDb>(opt => opt.UseInMemoryDatabase("PeopleList"));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

var app = builder.Build();

app.MapGet("/peoples", async (PeopleDb db) =>
    await db.Peoples.ToListAsync());

app.MapGet("/peoples/registered", async (PeopleDb db) =>
    await db.Peoples.Where(t => t.IsRegistered).ToListAsync());

app.MapGet("/peoples/{id}", async (int id, PeopleDb db) =>
    await db.Peoples.FindAsync(id)
        is People people
            ? Results.Ok(people)
            : Results.NotFound());

app.MapPost("/peoples", async (People people, PeopleDb db) =>
{
    db.Peoples.Add(people);
    await db.SaveChangesAsync();

    return Results.Created($"/peoples/{people.Id}", people);
});

app.MapPut("/peoples/{id}", async (int id, People inputPeople, PeopleDb db) =>
{
    var people = await db.Peoples.FindAsync(id);

    if (people is null) return Results.NotFound();

    people.Name = inputPeople.Name;
    people.IsRegistered = inputPeople.IsRegistered;

    await db.SaveChangesAsync();

    return Results.NoContent();
});

app.MapDelete("/peoples/{id}", async (int id, PeopleDb db) =>
{
    if (await db.Peoples.FindAsync(id) is People people)
    {
        db.Peoples.Remove(people);
        await db.SaveChangesAsync();
        return Results.Ok(people);
    }

    return Results.NotFound();
});

app.MapGet("/", () => "Hello People!");
app.Run();
