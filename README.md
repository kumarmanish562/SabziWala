# 🛒 SnapBasket - Online Grocery Store

<div align="center">
  <img src="frontend/src/assets/logo.png" alt="SnapBasket Logo" width="200" height="200">
  
  **A modern, responsive online grocery shopping platform built with React and Tailwind CSS**
  
  [![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/Vite-7.0.0-purple.svg)](https://vitejs.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.11-38B2AC.svg)](https://tailwindcss.com/)
  [![React Router](https://img.shields.io/badge/React_Router-7.6.3-CA4245.svg)](https://reactrouter.com/)
</div>

## 📸 Screenshots

<div align="center">
  <img src="frontend/src/assets/FoodBanner.png" alt="Food Banner" width="600">
  <p><em>Fresh groceries delivered to your doorstep</em></p>
</div>

## ✨ Features

- 🏠 **Modern Home Page** - Attractive landing page with product showcase
- 🛍️ **Product Catalog** - Browse through a wide variety of grocery items
- 🛒 **Shopping Cart** - Add, remove, and manage items in your cart
- 👤 **User Authentication** - Secure login and registration system
- 📱 **Responsive Design** - Optimized for all devices and screen sizes
- 🎨 **Beautiful UI** - Clean and modern interface with Tailwind CSS
- 📞 **Contact Page** - Easy way to get in touch with customer support

## 🏗️ Project Structure

```
frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/          # Images and static assets
│   │   ├── logo.png
│   │   ├── FoodBanner.png
│   │   └── [100+ product images]
│   ├── components/      # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Item.jsx
│   │   └── ...
│   ├── pages/          # Main page components
│   │   ├── Home.jsx
│   │   ├── Items.jsx
│   │   ├── Cart.jsx
│   │   └── Contact.jsx
│   ├── App.jsx         # Main application component
│   ├── CartContext.jsx # Shopping cart state management
│   ├── main.jsx        # Application entry point
│   └── index.css       # Global styles
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kumarmanish562/SnapBasket.git
   cd SnapBasket/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## 🛠️ Technologies Used

- **Frontend Framework:** React 19.1.0
- **Build Tool:** Vite 7.0.0
- **Styling:** Tailwind CSS 4.1.11
- **Routing:** React Router DOM 7.6.3
- **Icons:** React Icons 5.5.0
- **Linting:** ESLint
- **Development:** Hot Module Replacement (HMR)

## 🎯 Key Components

### Pages
- **Home** - Landing page with featured products and banner
- **Items** - Product catalog with filtering and search
- **Cart** - Shopping cart management (requires authentication)
- **Contact** - Contact form and support information

### Components
- **Navbar** - Navigation bar with authentication status
- **Footer** - Site footer with links and information
- **Login/Signup** - User authentication forms
- **Item** - Individual product display component
- **BannerHome** - Hero banner for the home page

## 🔐 Authentication

The application includes a complete authentication system:
- User registration and login
- Protected routes (Cart requires authentication)
- JWT token management in localStorage
- Automatic redirect to login for protected pages

## 🛒 Shopping Cart

- Add products to cart
- Update quantities
- Remove items
- Persistent cart state using React Context
- Protected access (login required)

## 🎨 Product Showcase

The application features over 100 high-quality product images including:

<div align="center">
  <img src="frontend/src/assets/Apples.png" alt="Apples" width="120">
  <img src="frontend/src/assets/Bananas.png" alt="Bananas" width="120">
  <img src="frontend/src/assets/Broccoli.png" alt="Broccoli" width="120">
  <img src="frontend/src/assets/CheddarCheese.png" alt="Cheddar Cheese" width="120">
  <img src="frontend/src/assets/Coffee.png" alt="Coffee" width="120">
</div>

- Fresh fruits and vegetables
- Dairy products and cheeses
- Meat and seafood
- Bakery items
- Beverages and snacks
- International specialty items

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:
- Desktop computers
- Tablets
- Mobile phones
- Various screen sizes and orientations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Kumar Manish**
- GitHub: [@kumarmanish562](https://github.com/kumarmanish562)

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Vite for the lightning-fast build tool
- All contributors and supporters of this project

---

<div align="center">
  <p>Made with ❤️ for grocery shopping enthusiasts</p>
  <img src="frontend/src/assets/Strawberries.png" alt="Strawberries" width="50">
</div>