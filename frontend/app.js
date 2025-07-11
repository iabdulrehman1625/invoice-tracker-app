let editingInvoiceId = null;

function getStatusBadge(status) {
  const base = "inline-block px-2 py-1 text-xs rounded-full font-semibold";
  if (status === "paid") return base + " bg-green-100 text-green-700";
  if (status === "unpaid") return base + " bg-red-100 text-red-700";
  if (status === "pending") return base + " bg-yellow-100 text-yellow-700";
  return base + " bg-gray-100 text-gray-700";
}

async function loadInvoices() {
  const res = await fetch("http://localhost:5000/api/invoices");
  const invoices = await res.json();
  const list = document.getElementById("invoice-list");
  list.innerHTML = "";

  invoices.forEach((inv) => {
    const div = document.createElement("div");
    div.className = "bg-white rounded-lg shadow p-4 flex justify-between items-start";

    div.innerHTML = `
      <div>
        <h2 class="text-xl font-semibold">${inv.client}</h2>
        <p class="text-gray-600">Amount: <span class="font-medium">$${inv.amount}</span></p>
        <p class="text-gray-600">Due: ${new Date(inv.dueDate).toLocaleDateString()}</p>
        <span class="${getStatusBadge(inv.status)}">${inv.status.toUpperCase()}</span>
      </div>
      <div class="space-x-2">
        <button onclick="editInvoice('${inv._id}')" class="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500">Edit</button>
        <button onclick="deleteInvoice('${inv._id}')" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
      </div>
    `;

    list.appendChild(div);
  });
}

async function deleteInvoice(id) {
  await fetch(`http://localhost:5000/api/invoices/${id}`, { method: "DELETE" });
  loadInvoices();
}

async function editInvoice(id) {
  const res = await fetch(`http://localhost:5000/api/invoices/${id}`);
  const data = await res.json();

  document.getElementById("client").value = data.client;
  document.getElementById("amount").value = data.amount;
  document.getElementById("dueDate").value = data.dueDate.split("T")[0];
  document.getElementById("status").value = data.status;

  editingInvoiceId = id;
  document.getElementById("submit-btn").textContent = "Update Invoice";
}

document.addEventListener("DOMContentLoaded", () => {
  loadInvoices();

  document.getElementById("invoice-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const invoice = {
      client: document.getElementById("client").value,
      amount: document.getElementById("amount").value,
      dueDate: document.getElementById("dueDate").value,
      status: document.getElementById("status").value,
    };

    const url = editingInvoiceId
      ? `http://localhost:5000/api/invoices/${editingInvoiceId}`
      : "http://localhost:5000/api/invoices";
    const method = editingInvoiceId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(invoice),
    });

    editingInvoiceId = null;
    document.getElementById("submit-btn").textContent = "Add Invoice";
    e.target.reset();
    loadInvoices();
  });
});
