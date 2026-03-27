# E-Commerce Platform

A full-stack e-commerce application built with React, Node.js, Express, MongoDB, and Stripe for payment processing.

## Features

- **Product Browsing**: Browse products by category
- **Shopping Cart**: Add/remove items and manage quantities
- **Secure Checkout**: Stripe payment integration
- **Order History**: View past purchases with details and discounts
- **Coupon System**: Apply discount coupons at checkout
- **User Authentication**: Secure JWT-based authentication
- **Admin Dashboard**: Manage products, orders, and view analytics
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS

## Tech Stack

**Frontend**: React 18, Vite, React Router, Zustand, Tailwind CSS, Axios, Stripe.js

**Backend**: Node.js, Express.js, MongoDB, Mongoose, Redis, Stripe API, Cloudinary, JWT, bcryptjs

## Installation

### 1. Clone Repository

```bash
git clone <repository-url>
cd E-Commerce_Platform
```

### 2. Install Dependencies

```bash
npm install
npm install --prefix frontend
```

### 3. Setup Environment Variables

Create `.env` in root directory:

```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
MONGO_URI=<your-mongodb-uri>
UPSTASH_REDIS_URL=<your-redis-url>
ACCESS_TOKEN_SECRET=<random-secret>
REFRESH_TOKEN_SECRET=<random-secret>
CLOUDINARY_CLOUD_NAME=<your-cloud-name>
CLOUDINARY_API_KEY=<your-api-key>
CLOUDINARY_API_SECRET=<your-api-secret>
STRIPE_SECRET_KEY=<your-stripe-secret-key>
```

Create `frontend/.env`:

```env
VITE_STRIPE_PUBLIC_KEY=<your-stripe-public-key>
```

## Running the Application

```bash
npm run dev
```

- **Backend**: http://localhost:5000
- **Frontend**: http://localhost:5173

## Project Structure

```
E-Commerce_Platform/
├── backend/
│   ├── controllers/    # Request handlers
│   ├── models/         # MongoDB schemas
│   ├── routes/         # API endpoints
│   ├── middleware/     # Authentication middleware
│   ├── lib/            # Database and service configs
│   └── server.js       # Express server
│
├── frontend/
│   └── src/
│       ├── components/ # React components
│       ├── pages/      # Page components
│       ├── stores/     # Zustand state management
│       └── lib/        # Utilities
│
└── package.json
```

### Payments

- `POST /api/payments/create-checkout-session` - Create Stripe checkout
- `POST /api/payments/checkout-success` - Confirm successful payment
- `GET /api/payments/orders` - Get user's order history
- `GET /api/payments/orders/:orderId` - Get order details

### Coupons

- `POST /api/coupons` - Create coupon (admin)
- `GET /api/coupons` - Get available coupons
- `GET /api/coupons/validate/:code` - Validate coupon code

### Analytics

- `GET /api/analytics` - Get sales analytics (admin)

## Security

### Best Practices Implemented ✅

- **Environment Variables**: All sensitive data in `.env` files (ignored by git)
- **JWT Tokens**: Secure token-based authentication
- **Password Hashing**: bcryptjs for password security
- **Protected Routes**: Authentication middleware on sensitive endpoints
- **CORS**: Configured for development and production
- **HTTPS Ready**: Supports both HTTP and HTTPS
- **.gitignore**: Prevents sensitive files from being committed
- **.env.example**: Template showing required variables

### Important ⚠️

- **Never** commit `.env` files
- **Never** share your API keys
- **Never** use the same password for multiple services
- **Always** use test keys for development
- **Always** regenerate keys when switching to production

## Database Schema

### User Model

- Email, password (hashed)
- Name, role (user/admin)
- Timestamps

### Product Model

- Name, description, price
- Category, image
- Featured flag, timestamps

### Order Model

- User reference
- Products array with quantities and prices
- Total amount, original amount
- Discount percentage and amount
- Coupon code used
- Stripe session ID, timestamps

### Cart (Redis/Zustand)

- User ID
- Product IDs and quantities
- Real-time updates

### Coupon Model

- Code, discount percentage
- Expiration date
- Active status
- User ID (buyer-specific)

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the LICENSE file for details.

---

**Made with by Sushil Verma**

For more information or issues, please open an issue on the GitHub repository.
