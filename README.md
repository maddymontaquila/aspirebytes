# Aspire Bytes

Small sample apps that show how Aspire AppHosts can coordinate local development resources.

## Samples

| Sample | What it shows |
| --- | --- |
| `container-lifetimes` | A C# Aspire AppHost that starts PostgreSQL and a Vite TypeScript frontend, demonstrating AppHost-managed resource lifetimes. |
| `what-is-an-apphost` | A TypeScript Aspire AppHost that wires a Python HTTP API to a Vite TypeScript frontend. |

## Prerequisites

- Docker or another container runtime for the PostgreSQL sample.
- .NET 10 SDK for `container-lifetimes`.
- Node.js 20.19+, 22.13+, or 24+ for `what-is-an-apphost`.
- Python 3.12+ for the Python API sample.
- Aspire CLI for the TypeScript AppHost sample.

## Run the samples

From the repository root:

```powershell
dotnet run --project .\container-lifetimes\apphost\AppHost.csproj
```

For the TypeScript AppHost sample:

```powershell
cd .\what-is-an-apphost
npm install
cd .\src\frontend
npm install
cd ..\..
npm run dev
```

Both samples launch through an Aspire AppHost, which provides the dashboard and coordinates the app resources.
