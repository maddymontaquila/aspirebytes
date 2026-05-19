import "./style.css";

type Sale = {
  product: string;
  unitsSold: number;
  revenue: number;
};

type SalesResponse = {
  sales: Sale[];
};

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";
const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("App root element was not found.");
}

app.innerHTML = `
  <section class="card">
    <p class="eyebrow">Tiny TypeScript + Python Demo</p>
    <h1>Sales Dashboard</h1>
    <p class="subtitle">Live data loaded from the Python API.</p>
    <div id="content" class="loading">Loading sales data...</div>
  </section>
`;

const content = document.querySelector<HTMLDivElement>("#content");

if (!content) {
  throw new Error("Content element was not found.");
}

const contentElement = content;

async function loadSales() {
  const response = await fetch(`${apiBaseUrl}/api/sales`);

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  const data = (await response.json()) as SalesResponse;
  const totalRevenue = data.sales.reduce((total, sale) => total + sale.revenue, 0);

  contentElement.className = "";
  contentElement.innerHTML = `
    <div class="summary">
      <span>Total revenue</span>
      <strong>$${totalRevenue.toLocaleString()}</strong>
    </div>
    <div class="grid">
      ${data.sales
        .map(
          (sale) => `
            <article class="sale">
              <h2>${sale.product}</h2>
              <p>${sale.unitsSold} units sold</p>
              <strong>$${sale.revenue.toLocaleString()}</strong>
            </article>
          `,
        )
        .join("")}
    </div>
  `;
}

loadSales().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : "Unknown error";
  contentElement.className = "error";
  contentElement.textContent = `Could not load sales data: ${message}`;
});
