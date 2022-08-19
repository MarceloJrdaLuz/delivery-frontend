import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import PaginaTelaCadastro from "../Cadastro";
import PaginaCarrinho from "../Carrinho";
import PaginaDetalhesProduto from "../DetalhesProduto";
import PaginaEsqueciSenha from "../EsqueciSenha";
import PaginaHome from "../Home";
import Dashboard from "../Dashboard";
import PaginaLogin from "../Login";
import PaginaNovaSenha from "../NovaSenha";
import PaginaHistorico from "../Historico";
import PaginaAddProdutos from "../AddProdutos";
import PaginaFinalizarCompra from "../FinalizarCompra";
import PaginaOpcoesEntrega from "../OpcoesEntrega";

export default function AppRoutes() {
    const { authenticated, loading, admin } = useContext(AuthContext)

    function PrivateRoute({ children }: { children: JSX.Element }) {
        if (loading) {
            return <div>Carregando...</div>
        }

        if (!authenticated) {
            return <Navigate to={'/login'} />
        }
        return children
    }

    function PrivateRouteAdmin({ children }: { children: JSX.Element }) {
        if (!admin) {
            return <Navigate to={'/'}/>
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
                <Route path='/cadastrar-produtos'
                    element={
                        <PrivateRouteAdmin>
                            <PaginaAddProdutos />
                        </PrivateRouteAdmin>
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