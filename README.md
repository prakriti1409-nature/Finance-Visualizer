# 💰 Personal Finance Visualizer

A full-stack personal finance dashboard built with **Next.js 15**, **TypeScript**, **MongoDB**, and **Tailwind CSS**.  
Visualize, track, filter, and manage your expenses with charts, filters, CSV export, budget tracking, and insights.

---

## 🚀 Features

- ✅ Add, edit, delete transactions
- 📊 Visual charts for:
  - Monthly expenses
  - Category-wise breakdown
  - Budget vs Actual spend
- 💸 Budget entry and comparison
- 🧠 Budget overspend insights
- 🔎 Filters: date range, amount, category, description
- 📥 CSV export of transactions
- 📱 Responsive UI (mobile-first)
- 🧼 Clean and simple UX

---

## 🛠 Tech Stack

| Frontend               | Backend         | Database      | Styling        |
|------------------------|-----------------|---------------|----------------|
| Next.js 15 (App Router)| API Routes (REST)| MongoDB Atlas | Tailwind CSS   |
| TypeScript             | Server Actions  | Mongoose      | Recharts       |

---


---

## 🧪 API Endpoints

| Method | Endpoint              | Description                        |
|--------|------------------------|------------------------------------|
| GET    | `/api/transactions`    | Get all transactions               |
| POST   | `/api/transactions`    | Add new transaction                |
| DELETE | `/api/transactions`    | Delete a transaction by `_id`      |
| PATCH  | `/api/transactions`    | Update a transaction by `_id`      |
| GET    | `/api/budgets`         | Get all budgets                    |
| POST   | `/api/budgets`         | Add a new budget                   |
| GET    | `/api/budget-summary`  | Summary of budget vs actual spend  |

---



## ✅ How to Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/prakriti1409-nature/Finance-Visualizer.git
cd Finance-Visualizer

# 2. Install dependencies
npm install

# 3. Add your environment variable
touch .env.local
# Then add:
MONGODB_URI=your_mongodb_connection_string

# 4. Run the app
npm run dev
```
## 🌍 Live Demo

Deployed via **Vercel**:  
👉 [finance-visualizer-8dim.vercel.app](https://finance-visualizer-8dim.vercel.app/)

---

## 📦 Deployment Notes

- Uses `next` as a dependency (not `devDependency`)
- Built with **App Router** (`/app` directory) – requires **Next.js 13+**
- **MongoDB Atlas** is used for persistent cloud storage
- Auto-deployment via **Vercel** GitHub integration

---

## ✨ Screenshots

![s1](https://github.com/user-attachments/assets/f340ad29-ec4f-4172-a584-1e0b267e815f)

![s2](https://github.com/user-attachments/assets/8db5f5c4-e806-44af-8409-bbe9bd013bc8)
![s3](https://github.com/user-attachments/assets/cfe297db-aca9-4393-80a2-a5352839ff26)
![image](https://github.com/user-attachments/assets/5bdd41dc-38a3-4229-a416-e31a26bebbb0)
![image](https://github.com/user-attachments/assets/df7f3755-f4d5-49ed-8580-4751bd1cd534)

![s6](https://github.com/user-attachments/assets/2451e8a9-20c5-4f31-a604-cbd678533287)





---

## 👩‍💻 Author

Built with 💙 by **Prakriti Yadav**  
📎 [GitHub Profile](https://github.com/prakriti1409-nature)

---



