interface CategoriasProps {
    categoria: string
    categoriaAtiva?: boolean
    onClick: () => void
}

export default function Categorias(props: CategoriasProps) {

    return (
            <div onClick={props.onClick} className={`flex cursor-pointer justify-center items-center min-w-[100px] w-full p-2 ${props.categoriaAtiva && 'border-t-4 border-principais-primary text-principais-primary'} text-center m-1`}>
                {props.categoria}
            </div>
    )
}