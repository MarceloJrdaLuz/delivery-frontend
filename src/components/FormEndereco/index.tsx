import { useContext } from "react";
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

export default function FormEndereco() {

    const { opcaoDeEntrega } = useContext(CartContext)
    const navigate = useNavigate()

    const esquemaValidacao = yup.object({
        billingStreet: yup.string().required(),
        billingNumber: yup.string().required(),
        billingNeighborhood: yup.string().required(),
        billingComplement: yup.string(),
        billingReference: yup.string()
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            billingStreet: '',
            billingNumber: '',
            billingNeighborhood: '',
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

                <Input tipo="text" placeholder="Número" registro={{
                    ...register('billingNumber',
                        { required: "Campo obrigatório" })
                }}
                    invalido={errors?.billingNumber?.message ? 'invalido' : ''} />
                {errors?.billingNumber?.type && <InputError type={errors.billingNumber.type} field='billingNumber' />}

                <Input tipo="text" placeholder="Bairro" registro={{
                    ...register('billingNeighborhood',
                        { required: "Campo obrigatório" })
                }}
                    invalido={errors?.billingNeighborhood?.message ? 'invalido' : ''} />
                {errors?.billingNeighborhood?.type && <InputError type={errors.billingNeighborhood.type} field='billingNeighborhood' />}

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
                {/* <Input tipo="text" placeholder="Email" registro={{
                    ...register('email',
                        { required: "Campo obrigatório" })
                }}
                    invalido={errors?.email?.message ? 'invalido' : ''} />
                {errors?.email?.type && <InputError type={errors.email.type} field='email' />}
                <Input tipo="password" placeholder="Senha" registro={{
                    ...register('senha',
                        { required: "Campo obrigatório" })
                }}
                    invalido={errors?.senha?.message ? 'invalido' : ''} />
                {errors?.senha?.type && <InputError type={errors.senha.type} field='senha' />}
                <Input tipo="password" placeholder="Repetir Senha" registro={{
                    ...register('repetirSenha',
                        { required: "Campo obrigatório" })
                }}
                    invalido={errors?.repetirSenha?.message ? 'invalido' : ''} />
                {errors?.repetirSenha?.type && <InputError type={errors.repetirSenha.type}
                    field='repetirSenha' />} */}
            </div>
            <Botao color="bg-button-primary" hoverColor="bg-button-hover" title="Entregar nesse endereço" type="submit" />
        </form>
    )
}