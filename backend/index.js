const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/invoicetracker", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const InvoiceSchema = new mongoose.Schema({
  client: String,
  amount: Number,
  dueDate: Date,
  status: String,
});

const Invoice = mongoose.model("Invoice", InvoiceSchema);

app.get("/api/invoices", async (req, res) => {
  const invoices = await Invoice.find();
  res.json(invoices);
});

app.get("/api/invoices/:id", async (req, res) => {
  const invoice = await Invoice.findById(req.params.id);
  res.json(invoice);
});

app.post("/api/invoices", async (req, res) => {
  const invoice = new Invoice(req.body);
  await invoice.save();
  res.json(invoice);
});

app.put("/api/invoices/:id", async (req, res) => {
  const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(invoice);
});

app.delete("/api/invoices/:id", async (req, res) => {
  await Invoice.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
