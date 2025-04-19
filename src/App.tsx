import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

// Layouts
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

// Pages
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Admin Pages
import AdminLogin from './pages/admin/Login';
import AdminProducts from './pages/admin/Products';
import AdminProductForm from './pages/admin/ProductForm';
import Settings from './pages/admin/Settings';
import CategoriesAdmin from './pages/admin/Categories';
import WhatsAppButton from './components/WhatsAppButton';
import FAQ from './pages/FAQ';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Components
import LoadingSpinner from './components/ui/LoadingSpinner';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Suspense fallback={<LoadingSpinner />}>
          <WhatsAppButton />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="catalogue" element={<Catalog />} />
              <Route path="contact" element={<Contact />} />
              <Route path="faq" element={<FAQ />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminProducts />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="products/new" element={<AdminProductForm />} />
              <Route path="products/:id" element={<AdminProductForm />} />
              <Route path="settings" element={<Settings />} />
              <Route path="categories" element={<CategoriesAdmin />} />
            </Route>

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;