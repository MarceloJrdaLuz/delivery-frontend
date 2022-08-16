import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { iconeCustomer, iconeHistory, iconeHome, iconeSacola } from '../../assets/images/icones'

export default function Menu() {
    const navigate = useNavigate()
    const { authenticated } = useContext(AuthContext)
    const corAtiva = "#f63e02"

    return (
        <nav className={`menu flex fixed justify-center items-center bottom-0 w-full h-12 bg-principais-secondary  `}>
            <ul className={`flex w-full h-full justify-between items-center px-2`}>
                <li onClick={() => navigate('/')} className={`flex flex-col justify-center items-center w-10 h-full p-2 hover:p-2 cursor-pointer  ${document.title === 'Início' &&'border-principais-primary border-t-4 text-principais-primary'}`}>
                    <span>{document.title === 'Início' ? iconeHome(corAtiva) : iconeHome()}</span>
                    <span className={`text-xs font-medium`}>Início</span>
                </li>
                <li onClick={() => navigate('/carrinho')} className={`flex flex-col justify-center items-center w-10 h-full p-2 hover:p-2 cursor-pointer ${document.title === 'Sacola' &&'border-principais-primary border-t-4 text-principais-primary'}`}>
                    <span>{document.title === 'Sacola' ? iconeSacola(corAtiva) : iconeSacola()}</span>
                    <span className={`text-xs font-medium`}>Sacola</span>
                </li>
                <li onClick={() => { !authenticated ? navigate('/login') : navigate('/dashboard') }} className={`flex flex-col justify-center items-center w-10 h-full p-2 hover:p-2 cursor-pointer ${document.title === 'Painel' && 'border-principais-primary border-t-4 text-principais-primary'}`}>
                    <span>{document.title === 'Painel' ? iconeCustomer(corAtiva) : iconeCustomer()}</span>
                    <span className={`text-xs font-medium`}>{authenticated ? 'Painel' : 'Login'}</span>
                </li>
                {authenticated && (
                    <>
                        <li onClick={()=> navigate('/historico')} className={`flex flex-col justify-center items-center w-10 h-full p-2 hover:p-2 cursor-pointer ${document.title === 'Histórico' &&'border-principais-primary border-t-4 text-principais-primary'}`}>
                            <span>{iconeHistory()}</span>
                            <span className={`text-xs font-medium ${document.title === 'Histórico' && 'text-principais-primary'}`}>Histórico</span>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}