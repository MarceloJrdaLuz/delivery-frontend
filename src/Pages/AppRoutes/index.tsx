import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import PaginaTelaCadastro from "../PaginaCadastro";
import PaginaCarrinho from "../PaginaCarrinho";
import PaginaDetalhesProduto from "../PaginaDetalhesProduto";
import PaginaEsqueciSenha from "../PaginaEsqueciSenha";
import PaginaHome from "../PaginaHome";
import Dashboard from "../PaginaDashboard";
import PaginaLogin from "../PaginaLogin";
import PaginaNovaSenha from "../PaginaNovaSenha";
import PaginaHistorico from "../PaginaHistorico";
import PaginaFinalizarCompra from "../PaginaFinalizarCompra";
import PaginaOpcoesEntrega from "../PaginaOpcoesEntrega";

export default function AppRoutes() {
    const { authenticated, loading,} = useContext(AuthContext)

    function PrivateRoute({ children }: { children: JSX.Element }) {
        if (loading) {
            return <div>Carregando...</div>
        }

        if (!authenticated) {
            return <Navigate to={'/login'} />
        }
        return children
    }

    return (
        <div className="App">
            <Routes>
                <Route path='/' element={<PaginaHome />} />
                <Route path='/login' element={<PaginaLogin />} />
                <Route path='/produto/:nomeProduto' element={<PaginaDetalhesProduto />} />
                <Route path='/cadastro' element={<PaginaTelaCadastro />} />
                <Route path='/dashboard'
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    } />
                <Route path='/historico'
                    element={
                        <PrivateRoute>
                            <PaginaHistorico />
                        </PrivateRoute>
                    } />
                <Route path='/nova-senha/:token/:email' element={<PaginaNovaSenha />} />
                <Route path='/esqueci-minha-senha' element={<PaginaEsqueciSenha />} />
                <Route path='/carrinho' element={<PaginaCarrinho />} />
                <Route path='/opcoes-entrega' element={<PaginaOpcoesEntrega />} />
                <Route path='/finalizar-compra' element={<PaginaFinalizarCompra />} />
            </Routes>
        </div>
    );
}