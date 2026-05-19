var builder = DistributedApplication.CreateBuilder(args);

var myDb = builder.AddPostgres("postgres")
    .AddDatabase("db");

builder.AddViteApp("frontend", "../frontend")
    .WithNpmPackageInstallation()
    .WithReference(myDb);

builder.Build().Run(); 