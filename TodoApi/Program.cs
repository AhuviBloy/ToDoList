using Microsoft.EntityFrameworkCore;
using TodoApi;
var builder = WebApplication.CreateBuilder(args);
//cors (adding the cors definition)
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

//DbContext configuration
builder.Services.AddDbContext<ToDoDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("ToDoDB"), 
                     ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("ToDoDB"))));


// הוסף את השירותים לאישור
builder.Services.AddAuthorization();


//swagger
builder.Services.AddSwaggerGen();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddControllers();


var app = builder.Build();


//using in cors
app.UseCors();

// Enable Swagger UI
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();  
}

// וודא שהשירותים הנדרשים לאישור נמצאים לפני שימוש ב- UseAuthorization
app.UseAuthentication(); // אם אתה משתמש באימות
app.UseAuthorization();  // הוספת הגישה לאישור



//get
app.MapGet("/items", async (ToDoDbContext db) =>
{
    return await db.Items.ToListAsync(); // שליפת כל המשימות
});

//post
app.MapPost("/items",async (ToDoDbContext db,Item newItem) =>{
    await db.Items.AddAsync(newItem);
    await db.SaveChangesAsync();
    return Results.Created($"/items/{newItem.Id}", newItem);
});

//Put
app.MapPut("/items/{id}", async (ToDoDbContext db, int id, bool isComplete) =>{
    var item = await db.Items.FindAsync(id);
    if (item == null) return Results.NotFound($"Item with ID {id} not found.");
    
    item.IsComplete = isComplete;
    await db.SaveChangesAsync();
    return Results.Ok(item);
});

//delete
app.MapDelete("/items/{id}", async (int id, ToDoDbContext db) =>
{
    var item = await db.Items.FindAsync(id);
    if (item is null) return Results.NotFound();

    db.Items.Remove(item); // מחיקת משימה
    await db.SaveChangesAsync();
    return Results.NoContent();
});



app.UseAuthorization();
app.MapControllers();
app.Run();

