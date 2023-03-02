import { ReactNode, useContext, useEffect, useState } from "react";
import * as yup from 'yup'
import { toast } from "react-toastify";
import { CartContext } from "../../context/CartContext";
import { Endereco } from "../../entities/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Input from "../Input";
import InputError from "../InputError";
import Botao from "../Botao/Botao";
import { useNavigate } from "react-router-dom";
import { Select, Option } from "@material-tailwind/react"
import { useSetAtom } from "jotai";
import { valorFrete } from "../../atoms/atoms";
import { useFetch } from "../../hooks/useFetch";
import { ValoresEntregaProps } from "./types";


export default function FormEndereco() {
    const [bairros, setBairros] = useState([])
    const [bairroSelecionado, setBairroSelecionado] = useState<String | undefined>()

    const { data: getValuesDelivery } = useFetch<ValoresEntregaProps>(bairroSelecionado ? `/value-delivery/${bairroSelecionado}` : "")
    const { data } = useFetch(`/bairros`)

    useEffect(() => {
        setBairros(data)
    }, [data])


    const { opcaoDeEntrega } = useContext(CartContext)
    const navigate = useNavigate()
    const atomSetValorFrete = useSetAtom(valorFrete)

    useEffect(() => {
        const valor = getValuesDelivery?.valueDelivery
        if (typeof valor === "number") {
            atomSetValorFrete(getValuesDelivery?.valueDelivery!)
        }
    }, [getValuesDelivery, atomSetValorFrete])

    const handleSelect = (e: ReactNode) => {
        const value = e?.toString()
        setBairroSelecionado(value)
    }

    const esquemaValidacao = yup.object({
        billingStreet: yup.string().required(),
        billingNumber: yup.string().required(),
        billingComplement: yup.string(),
        billingReference: yup.string()
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            billingStreet: '',
            billingNumber: '',
            billingComplement: '',
            billingReference: ''
        }, resolver: yupResolver(esquemaValidacao)
    })


    function onSubmit(data: Endereco) {
        opcaoDeEntrega(false, data)
        navigate('/finalizar-compra')
    }

    function onError(error: any) {
        toast.error('Algo está errado! Confira todos os campos.', {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }


    return (
        <form className="flex flex-col justify-center items-center w-11/12 m-auto mt-5" onSubmit={handleSubmit(onSubmit, onError)}>
            <div className="flex flex-col w-full">
                <Input tipo="text" placeholder="Rua" registro={{
                    ...register('billingStreet',
                        { required: "Campo obrigatório" })
                }}
                    invalido={errors?.billingStreet?.message ? 'invalido' : ''} />
                {errors?.billingStreet?.type && <InputError type={errors.billingStreet.type} field='billingStreet' />}
cd
                <Input tipo="text" placeholder="Número" registro={{
                    ...register('billingNumber',
                        { required: "Campo obrigatório" })
                }}
                    invalido={errors?.billingNumber?.message ? 'invalido' : ''} />
                {errors?.billingNumber?.type && <InputError type={errors.billingNumber.type} field='billingNumber' />}

                <div className="my-2">
                    {bairros && <Select onChange={handleSelect} color="deep-orange" variant="outlined" label="Bairro">
                        {bairros?.map((bairro) => <Option key={bairro} value={bairro}>{bairro}</Option>)}
                    </Select>}
                </div>

                <Input tipo="text" placeholder="Complemento" registro={{
                    ...register('billingComplement',
                        { required: "Campo obrigatório" })
                }}
                    invalido={errors?.billingComplement?.message ? 'invalido' : ''} />
                {errors?.billingComplement?.type && <InputError type={errors.billingComplement.type} field='billingComplement' />}

                <Input tipo="text" placeholder="Referência" registro={{
                    ...register('billingReference',
                        { required: "Campo obrigatório" })
                }}
                    invalido={errors?.billingReference?.message ? 'invalido' : ''} />
                {errors?.billingReference?.type && <InputError type={errors.billingReference.type} field='billingReference' />}
            </div>
            <Botao color="bg-button-primary" hoverColor="bg-button-hover" title="Entregar nesse endereço" type="submit" />
        </form>
    )
}