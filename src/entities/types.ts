export interface Produto {
    _id: string,
    code: string,
    price: number,
    category: string,
    productName: string,
    description?: string
}

export interface Carrinho {
    code: string | undefined,
    nome: string | undefined,
    valor: number | undefined,
    quantidade: number | undefined,
    total: number | undefined  
}

export interface ResponseAuth {
    user: {
        _id: string,
        name: string,
        email: string
        permissions: string
        token: string
    },
    token: string
}

export interface Endereco {
    billingStreet: string,
	billingNumber: string,
	billingNeighborhood: string,
	billingComplement: string,
	billingReference: string
}
