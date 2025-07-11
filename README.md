# 🧾 Invoice Tracker App

A full-stack invoice management app built with:
- 🧠 Node.js + Express
- 🗃️ MongoDB (via MongoDB Atlas)
- 🎨 HTML + Tailwind CSS (via CDN)
- ⚙️ JavaScript (vanilla)

## 🌐 Live Demo (Optional)

- **Frontend:** _You can deploy it via Netlify or Vercel_
- **Backend:** _Deploy using Render.com_
- **Database:** MongoDB Atlas (Free Cloud DB)

---

## 📁 Folder Structure

```
InvoiceTrackerApp/
├── frontend/
│   ├── index.html        ← Tailwind CDN + invoice UI
│   └── app.js            ← JS for fetching, adding, editing, deleting
│
└── backend/
    ├── index.js          ← Express + MongoDB API
    └── package.json      ← Server dependencies
```

---

## 🚀 How to Run Locally

### ✅ Prerequisites

- Node.js & npm installed
- MongoDB installed or MongoDB Atlas cloud URI

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/invoice-tracker.git
cd invoice-tracker/backend
```

### 2. Setup Backend

```bash
npm install
```

Create a `.env` file (optional) or directly replace your Mongo URI:

```
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/invoicetracker
```

Start server:

```bash
node index.js
```

Server will run at: `http://localhost:5000`

### 3. Open Frontend

Open `frontend/index.html` in your browser  
(you can double-click or serve it with VSCode Live Server)

---

## 🛠️ Features

- Add new invoice (client, amount, due date, status)
- Edit existing invoice
- Delete invoice
- Badge UI for status (Paid, Unpaid, Pending)
- Clean Tailwind CSS design (via CDN)
- Works offline after loading once

---

## 📦 Deployment

- **Backend:** [Render](https://render.com)
- **Frontend:** [Netlify](https://netlify.com) or [Vercel](https://vercel.com)
- **Database:** [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

## 📜 License

MIT — use freely for learning or commercial use.
