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

