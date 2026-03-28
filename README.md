# Tomiris Collection — Minimalist Jewelry Store

Premium minimalist e-commerce website for jewelry, inspired by Scandinavian design.

## Features
- **Minimalist Light Theme**: High-contrast black-on-white aesthetic.
- **Product Catalog**: Filterable products by category.
- **Product Details**: Full specifications and dynamic pricing.
- **Cart System**: Local-storage based shopping cart.
- **WhatsApp Checkout**: Direct order processing via WhatsApp.
- **JSON Backend**: Lightweight persistence using `db.json`.

## Technologies
- Next.js (App Router)
- Tailwind CSS
- Lucide React (Icons)
- Framer Motion (Animations)

## Setup for Mac

### 1. Prerequisites
Ensure you have **Node.js** (v18 or higher) installed. You can check by running:
```bash
node -v
```

### 2. Installation
Clone the repository (or copy the folder) and run:
```bash
npm install
```

### 3. Running Development Server
```bash
npm run dev
```
The site will be available at [http://localhost:3000](http://localhost:3000).

### 4. Project Structure
- `/app`: Pages and API routes.
- `/components`: Reusable UI components.
- `/public`: Static assets (images).
- `db.json`: Product database.

## GitHub Push Instructions
1. Create a new repository on [GitHub](https://github.com/new).
2. Run the following commands:
```bash
git add .
git commit -m "feat: complete MVP for Tomiris Collection"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```
