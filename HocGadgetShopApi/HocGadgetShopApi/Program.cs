var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .AddJsonOptions(options =>         // ← ADD THIS
    {
      options.JsonSerializerOptions.PropertyNamingPolicy
          = System.Text.Json.JsonNamingPolicy.CamelCase;
    });



builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
  options.AddPolicy(name: MyAllowSpecificOrigins,
    builder =>
    {
      builder.WithOrigins("http://localhost", "http://localhost:4200")
      .AllowAnyHeader().
      AllowAnyMethod().
      SetIsOriginAllowedToAllowWildcardSubdomains();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseCors(MyAllowSpecificOrigins);

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
