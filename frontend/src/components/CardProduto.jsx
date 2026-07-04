import React from 'react';

export default function CardProduto({ produto, onAdicionar }) {
    //Formata o preço para moeda brasileira (R$)
    const precoFormatado = new Intl.NumberFormat('pt-br', {
        style: 'currency',
        currency: 'BRL'
    }).format(produto.preco);

    return (
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duratiom-300 ovenflow-hidden border border-gray-100 flex flex-col">
           
            {/* Imagem do produto */}
            <div className="w-full h-48 bg-amber-50 flex items-center justify-center relative ovenflow-hidden">
                {produto.imagem ? (
                    <img 
                    src={produto.imagem}
                    alt={produto.nome}
                    className="w-full h-full object-cover"
                    />
                ) : (
                    <span text-4xl font-bold text-amber-600 uppercase>
                        {produto.nome.charAt(0)}
                    </span>
                )}
            </div>



            {/* Detalhes */}
            <div className="p-5 flex flex-col flex-grow">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600  block mb-1">
                    {produto.categoria}
                </span>
                <h3 className="text-lg font=bold text-gray-900  mb-2 truncate">
                    {produto.name}
                </h3>

                <div className="flex items-cebter justify-between mt-auto pt-4">
                    <span className="text-xl font-extrabold text-gray-950">
                        {precoFormatado}
                    </span>

                    {/* Botão onAdicionar */}
                    <button 
                    onClick={() => onAdicionar(produto)}
                    className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-xl transition-colors text-sm shadow-sm cursor-pointer active:scale-95 duration-100  ">
                        Adicionar
                    </button>
                </div>
            </div>

        </div>

    );

};