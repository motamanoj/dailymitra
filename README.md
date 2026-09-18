# DailyMitra — Fresh Milk & Daily Essentials Platform

DailyMitra is a full-stack e-commerce web application for ordering and managing fresh milk and daily essentials delivery.

## Project Structure

```
dailymitra/
├── backend/
│   └── dailymitra/          # Django REST Framework backend application
│       ├── manage.py
│       ├── requirements.txt
│       ├── dailymitra/      # Django settings and URL routes
│       ├── accounts/        # User authentication and profile management
│       ├── products/        # Catalog, categories, and inventory
│       ├── orders/          # Subscriptions, cart, checkout & order tracking
│       ├── coupons/         # Promo codes & discounts
│       └── notifications/   # Alerts & user notifications
│
├── frontend/                # React (Vite) frontend application
│   ├── package.json
│   ├── vite.config.js
│   ├── src/                 # UI components, pages & state management
│   └── public/              # Static assets & PWA manifest
│
├── .gitignore
└── README.md
```

## Setup Instructions

### Backend (Django)

1. Navigate to the backend folder:
   ```bash
   cd backend/dailymitra
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run migrations and start dev server:
   ```bash
   python manage.py migrate
   python manage.py runserver
   ```

### Frontend (React + Vite)

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```
