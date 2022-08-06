import historySvg from '../../assets/images/history.svg'
import sacola from '../../assets/images/bag.svg'
import userPng from '../../assets/images/customer.svg'
import logoutPng from '../../assets/images/logout2.svg'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Menu() {
    const navigate = useNavigate()
    const { logout, authenticated } = useContext(AuthContext)

    return (
        <nav className={`flex fixed justify-center items-center bottom-0 w-full h-12 bg-principais-primary`}>
            <ul className={`flex w-10/12 justify-between items-center`}>
                <li className={`w-10 h-10 rounded-full p-2 hover:p-2 cursor-pointer`}>
                    <img title='Sacola' className={`w-full`} src={sacola} alt="Icone de uma sacola de compras" />
                </li>
                <li onClick={()=>{!authenticated ? navigate('/login') : navigate('/dashboard') }} className={`flex-col justify-center items-center w-10 h-10 rounded-full p-2 hover:p-2 cursor-pointer`}>
                    <img className={`w-full`}  src={userPng} alt="Icone de um Avatar" />
                </li>
                {authenticated && (
                    <>
                        <li onClick={logout} className={`w-10 h-10 rounded-full p-2 hover:p-2 cursor-pointer`}>
                            <img className={`w-full`} src={logoutPng} alt="Icone de Logout" />
                        </li>
                        <li className='w-10 h-10 rounded-full p-2 hover:p-2 cursor-pointer'>
                            <img className={`w-full`} src={historySvg} alt="Icone de uma lista" />
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}