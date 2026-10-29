# Jawad Handlooms — Customer Website

Premium, responsive handloom catalogue website with React + Vite frontend and Python Flask API.

## Business information
- **Brand:** Jawad Handlooms
- **Address:** No. 49, Thoppe Mudaliar Street, OPH Road Cross, Shivajinagar, Bengaluru - 560051
- **Jawad:** 8892099423
- **Sanoj:** 6363210117
- **Asif:** 9844386675

Please verify these details and replace demo product names, prices, and photos with confirmed business information before publication.

## Features
- Responsive storefront
- Product gallery, category filters, search, and product-detail modal
- WhatsApp enquiry links
- Contact directory and store directions
- Python Flask API with health, product, and category endpoints
- Dockerfile for API deployment
- GitHub Actions frontend build workflow

## Project layout
```
jawad-handlooms/
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── styles.css
│       └── data.js
├── backend/
│   ├── app.py
│   ├── products.json
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .dockerignore
└── .github/workflows/frontend-ci.yml
```

## Requirements
- Node.js 20+ and npm
- Python 3.10+

## Run locally

### Python API (terminal 1)
```powershell
cd backend
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python app.py
```

API URLs:
- `http://127.0.0.1:5000/api/health`
- `http://127.0.0.1:5000/api/products`
- `http://127.0.0.1:5000/api/categories`

### React website (terminal 2)
```powershell
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`. The development proxy forwards `/api` requests to the Python service.

## WhatsApp configuration
The default primary WhatsApp number is Jawad's number, configured in `frontend/src/data.js` as `918892099423`. Use India country code 91 and no plus sign, spaces, or punctuation. WhatsApp enquiry links open a pre-filled message; customers still need to press Send themselves.

## Production deployment
### Frontend (Netlify or Vercel)
- Root/base directory: `frontend`
- Build command: `npm run build`
- Publish directory: `dist`
- Set `VITE_API_BASE_URL` only if you configure the frontend to call a separately deployed API.

The storefront includes a sample product catalogue fallback and can render without the API. The current sample frontend uses the built-in data file for its listings.

### Python API
Deploy `backend` on a Python-compatible host or use Docker. The production command is:
```bash
pip install -r requirements.txt
gunicorn --bind 0.0.0.0:${PORT:-5000} app:app
```
Configure `CORS_ORIGINS` to your exact frontend origin(s) when using the API from a separate domain.

## Before sharing with customers
1. Replace sample products, prices, availability, and generic images with real inventory and licensed/owned photos.
2. Verify contact numbers and address.
3. Test WhatsApp links and map directions on mobile.
4. Configure HTTPS and a custom domain.
5. If you later add order storage or online payments, implement secure storage and use a trusted payment provider. This starter does not persist orders or customer data.

*This is a catalogue/enquiry starter, not yet a full e-commerce system.*
