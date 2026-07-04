import { useState } from "react";

export default function CardProduto({ produto, onAdicionar }) {
    const [modalAberto, setModalAberto] = useState(false);


    //Formata o preço para moeda brasileira (R$)
    const precoFormatado = new Intl.NumberFormat('pt-br', {
        style: 'currency',
        currency: 'BRL'
    }).format(produto.preco);

    return (
    <>
    {/* Card do produto (com efeito)*/}    
        <div onClick={() => setModalAberto(true)} // abre os detalhes ao clicar 
        className="bg-white rounded-2xl shadow-sm  border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 w-full max-w-[280px] cursor-pointer group">
           
            {/* Imagem do produto ( imagem vai dar um leve zoon quando o mause passa por cima do card*/}
            <div className="w-full h-48 bg-amber-50 flex items-center justify-center relative ovenflow-hidden">
                {produto.imagem ? (
                    <img 
                    src={produto.imagem}
                    alt={produto.nome}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform dutation-300"
                    />
                ) : (
                    <span text-4xl font-bold text-amber-600 uppercase>
                        {produto.nome.charAt(0)}
                    </span>
                )}
            </div>



            {/* Detalhes */}
            <div className="p-5 flex flex-col flex-grow">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 tracking-wider block mb-1">
                    {produto.categoria}
                </span>
                <h3 className="text-lg font=bold text-gray-900  mb-2 truncate group-hover:text-amber-600 transition-colors">
                    {produto.name}
                </h3>

                <div className="flex items-cebter justify-between mt-4">
                    <span className="text-xl font-extrabold text-gray-950">
                        {precoFormatado}
                    </span>

                    {/* Botão onAdicionar */}
                    <button 
                    onClick={(e) => {
                        e.stopPropagation(); // Evita que o clique do botão abra o modal junto
                        onAdicionar(produto);
                    }}
                    className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-xl transition-colors text-sm shadow-sm cursor-pointer active:scale-95 duration-100  ">
                        Adicionar
                    </button>
                </div>
            </div>

        </div>

        {/* MiniPágina / modal de detalhes */}
        {modalAberto && (
            <div
            onClick={() => setModalAberto(false)} // fecha o model se clicar no fundo
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in "
            >
                {/* caixa do modal */}
                <div
                onClick={(e) => e.stopPropagation()} // impede o model de fecha ao clicar detro dele
                className=" bg-white rounded-3xl overflow-hidden max-w-md w-full shadow-2xl border border-gray-100 transform transition-all animate-scape-up "
                >
                    {/* Imagem grande */}
                    <div className="w-full h-64 bg-amber-50 relative">
                    <img src={produto.imagem} alt={produto.nome}  className="w-full h-full object-cover"/>
                    <button
                        onClick={() => setModalAberto(false)}
                        className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 text-white font-bold w-8 h8 rounded-full flex items-center justify-center cursor-pointer transition-colors"
                    >
                        X
                    </button>
                    </div>
                    {/* Detalhes do Produto */}
                    <div className="p-6">
                        <span className="text-xs font-bold text-amber-600 uppercase tracking-wider bg-amber-100 px-2.5 py-1 rounded-md">
                            {produto.categoria}</span>

                        <h2 className="text-2xl font-black text-gray-900 mt-3 mb-2">
                            {produto.nome}
                        </h2>

                        <p className="text-gray-600 text-sm leading-relaxed mb-6">
                            Receita artesanal preparada com ingredientes selecionados!</p>

                        <div className="border-t border-gray-100 pt-4 flex flex-col gap-4">
                            {/*pergunta e preço */}
                            <div className="flex items-center justify-between ">
                                <span className="text-sm font-bold text-gray-500 ">Deseja adicionar ao carrinho?</span>
                                <span className="text-2xl font-black text-gray-900 "  >{precoFormatado}</span>
                            </div>
                            
                            {/* Botões de ação */}
                            <div className="flex gap-3">
                                <button
                                onClick={() => setModalAberto(false)}
                                className="flex-1 bg-gray-100 hover:bg-gray-300 text-gray-700 font-bold py-3 rounded-xl transition-colors cursor-pointer text-sm "
                                >
                                    Voltar ao cardápio
                                </button>
                                <button
                                onClick={() => {
                                    onAdicionar(produto);
                                    setModalAberto(false); // fecha automático após adicionar
                                }}
                                className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-xl transition-colors cursor-pointer text-sm shadow-amber-200"
                                >
                                    Sim, adicionar! 
                                </button>
                            </div>
                        </div>

                    </div>

                </div>
            </div>



        )}


    </>
    );

};
