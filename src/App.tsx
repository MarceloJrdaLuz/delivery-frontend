import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import AppRoutes from "./Pages/AppRoutes";

function App() {
  return (
    <CartProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </CartProvider>

  )
}
export default App;
