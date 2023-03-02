import { InputHTMLAttributes } from "react";
import Label from "./Label";

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    tipo?: string
    placeholder: string
    name?: string
    readonly?: boolean
    required?: boolean
    invalido?: string
    focus?: any
    registro?: any
    className?: string
}

export default function Input(props: InputProps) {
    
    return (
        <div className={` ${props.readonly ? 'focus-within:border-black' : 'outline' } relative flex items-center rounded-lg border-[1px] ${props.invalido === 'invalido' ? 'border-red-700 mb-1': 'border-blue-gray-200'} focus-within:border-principais-primary focus-within:border-2 focus:text-principais-primary outline-0 my-3 w-full h-full m-auto ${props.className}`}>
            <input
                type={props.tipo}
                name={props.name}
                placeholder={props.placeholder} 
                className={`block px-3 py-2.5 sm:p-4 w-full  text-sm
                text-black appearance-none placeholder-transparent focus:outline-none bg-transparent read-only:bg-white read-only:rounded-lg font-sans font-normal text-left`}
                readOnly={props.readonly}
                autoComplete="off"
                required = {props.required}
                ref={props.registro}
                {...props.registro}
            />
            <Label invalido={props.invalido === 'invalido' ? true : false} texto={props.placeholder} readonly={props.readonly} />
        </div>
    )
}   