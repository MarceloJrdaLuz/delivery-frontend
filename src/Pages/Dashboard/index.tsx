import { useContext } from "react"
import { iconeLogout } from "../../assets/images/icones"
import Menu from "../../components/Menu"
import { AuthContext } from "../../context/AuthContext"

export default function Dashboard() {
    document.title = 'Painel'

    const { logout } = useContext(AuthContext)

    return (
        <main>
            Painel do Usuario
            <li onClick={logout} className={`flex flex-col justify-center items-center w-10 h-full p-2 hover:p-2 cursor-pointer `}>
                <span>{iconeLogout()}</span>
                <span className={`text-xs font-medium`}>Logout</span>
            </li>
            <Menu />
        </main>
    )
}