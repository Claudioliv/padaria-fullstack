import { useState, useEffect } from 'react';
import CardProduto from './components/CardProduto';

// icon
import {LuShoppingBag, LuTrash, LuPhone, LuInstagram, LuFacebook} from 'react-icons/lu'

export default function App() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  //Busca e filtro
  const [busca, setBusca] = useState('');
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos');

  // Estado do carrinho
  const [carrinho, setCarrinho] = useState([]);
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);




  useEffect(() => {
    //Função para buscar os dados da API
    async function buscarProdutos() {
      try {
        const resposta = await fetch('http://localhost:5000/api/produtos');
        const dados = await resposta.json();
        
        setProdutos(dados);
        
      } catch (error) {
        console.error("Erro ao buscar produtos do backend:", error)
      }finally{
        setCarregando(false);
      }

    }

    buscarProdutos();
  }, []);

  // Função para adicionar item ao carrinho 
  const adicionarAocarrinho = (produto) => {
    setCarrinho((itensAtuais) => {
      // verificar se o produto já está no carrinho
      const itemExiste = itensAtuais.find((item) => item.id === produto.id);

      if (itemExiste) {
        // se existe, aumenta a quantidade em +1
        return itensAtuais.map((item) => 
          item.id === produto.id ? {...item, quantidade: item.quantidade + 1 } : item
      );
      }
      // se não existe, adiciona o novo produto com quantidade 1
      return [...itensAtuais, {...produto, quantidade : 1 }];
    });
  };

  // Função para remover ou diminuir item no carrinho
  const removerDoCarrinho = (id) => {
    setCarrinho((itensAtuais) => {
      const item = itensAtuais.find((i) => i.id === id);
      if(item.quantidade === 1) {
        return itensAtuais.filter((i) => i.id !== id);
      }
      return itensAtuais.map((i) => 
      i.id === id ? { ...i, quantidade: i.quantidade - 1 } : i );
    });
  };


  //Função: Deletar item direto do carrinho
  const deletarDoCarrinho = (id) => {
    setCarrinho((itensAtuais) => itensAtuais.filter((item) => item.id !== id));
  }


  // Cálculos do Carrinho
  const  totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
  const valorTotal = carrinho.reduce((acc, item) => acc + Number(item.preco) * item.quantidade, 0);

  



  //Filtragem dinâmica 
  const produtosFiltrados = produtos.filter((produto) => {
    
    // Remove espaços e joga para minúsculo
    const termoBusca = busca.trim().toLowerCase();
    const nomeProduto = produto.nome.toLowerCase();

    const correspondeBusca = nomeProduto.includes(termoBusca);

    // Remove acentos ( Pães vira paes)
    const normalizar = (texto) => texto.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const categoriaProdutoNormalizada = normalizar(produto.categoria);
    const categoriaBotaoNormalizada = normalizar(categoriaAtiva);


    // logica dos botões 
    const correspondeCategoria = 
    categoriaAtiva == 'Todos' ||
    categoriaProdutoNormalizada === categoriaBotaoNormalizada;


    return correspondeBusca && correspondeCategoria;
  })



  

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex flex-col justify-between">
      {/* header */}
      <div className='w-full'>

        <header className="bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <h1 className="text-2xl font-black tracking-tight text-amber-600">
              <span className="texr-gray-800">Pães & Doces Cia</span>
            </h1>
            {/* Botão de Sacola de compras */}
            <button
             onClick={() => setCarrinhoAberto(true)}  className='bg-amber-600 hover:bg-amber-700 text-white font-bold pt-2 px-4 rounded-xl flex items-center gap-2 transition-colors cursor-pointer shadow-sm shadow-amber-200 group'
            >
              <LuShoppingBag className='text-lg group-hover:scale-110 transition-transform'/>
              <span className='text-sm tracking-wide hidden sm:inline'>
                 Minha Sacola</span>
                {totalItens > 0 && (
                  <span className='bg-white text-amber-700 text-xs font-black rounded-full w-5 h-5 flex item-center justify-center animate-pulse'>
                    {totalItens}
                  </span>
                )}
            </button>
          </div>
        </header>
      

        {/* Conteúdo Proncipal */}

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Sesão de busca e filtros */}
          <div className="mb-10 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">

            {/* Input de busca */}
            <div className="w-full md:w-96 ">
              <input type="text" 
              placeholder='Buscar por cardápio...'
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all text-sm"
              />
            </div>

            {/* Botão de categorias */}
            <div className="flex gap-2 self-start md:self-auto overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
              {['Todos', 'Pães', 'Doces', 'Bebidas'].map((cat) => (
                <button
                key={cat}
                onClick={() => setCategoriaAtiva(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  categoriaAtiva === cat 
                  ? 'bg-amber-500 text-white shadow-sm shadow-amber-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>


          {/* Listagem de produtos */}
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
              Nosso Cardápio
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Produtos frequinhos
            </p>
          </div>

        {/* Estado de carregando ( Skeleton loading simples)*/}
        {carregando ? (
          <div className="text-center py-12 text-gray-500 font-medium animate-pulse">
            Carregando produtos...
          </div>
        ) : produtosFiltrados.length === 0 ? (
          /* Grid de  produtos */
          <div className="text-center py-12 text-gray-400 font-medium bg-white rounded-2xl border border-dashed border-gray-200">
            Nenhum produto encontrado para essa busca. 😢
          </div>
        ) : ( 
          //Grid dos produtos
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center cursor-pointer">
            {produtosFiltrados.map((produto) => (
              <CardProduto key={produto.id} produto={produto} onAdicionar={adicionarAocarrinho}/>
            ))}
          </div>
        )}
        </main>
      </div>  
      {/* =========================== RODAPÉ profissional ======================= */}
      <footer className='bg-gray-900 text-gray-400 text-sm mt-16 border-t border-gray-800'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 gap-8'>

          {/* Coluna 1: sobre*/}
          <div className='space-y-3'>
            <h3 className='text-white font-bold text-lg tracking-tight'>Pães & Doces Cia</h3>
            <p className='text-gray-400 text-xs leading-relaxed max-w-sm'>Trazendo o melhor da panificação artesanal e confeitaria para o seu dia a dia. </p>
          </div>

          {/* Coluna 2: horários */}
          <div className='space-y-2'>
            <h4 className='text-white font-bold text-sm'>Horário de funcionamento</h4>
            <p className='text-gray-400 text-xs '>Segunda a Sábado: 06:00 às 20:00</p>
            <p className='text-gray-400 text-xs '>Segunda a Sábado: 07:00 às 13:00</p>
          </div>

          {/* Coluna 3: redes sociais e contato */}
          <div className='space-y-3'>
            <h4 className='text-white font-bold text-sm'>Contatos & Redes</h4>
            <div className='flex items-center gap-2 text-xs '>
                <LuPhone /> (11) 99999-8888
            </div>
            <div className='flex gap-4 pt-1'>
              <a href="#" className='hover:text-amber-500 transition-colors text-lg '   ><LuInstagram /></a>
              <a href="#" className='hover:text-amber-500 transition-colors text-lg '   ><LuFacebook /></a>
            </div>
          </div>
        </div>

        {/* Linha de Copyright */}
        <div className='border-t border-gray-800 text-center py-4 text-xs text-gray-500 bg-gray-950 '  >
          &copy; 2026 Pães & Doces Cia. Desenvolvido como portfólio Full-Stack.
        </div>
        
        
      </footer>



      {/* Sidebar so carrinho ( vai aparece ao clicar na sacola ) */}
      {carrinhoAberto && (
        <div className='fixed inset-0 bg-black/40 z-50 flex justify-end backdrop-blur-sm animate-fade-in'>
          <div className='w-full max-w-md bg-white h-full shadow-2xl flex flex-col p-6 animate-sline-left'>

            {/* Topo do carrinho */}
            <div className='flex items-center justify-between border-b border-gray-100 pb-4 mb-4'>
              <h2 className='text-xl font-bold text-gray-900'>
                <LuShoppingBag className='text-amber-600'/> Sua sacola</h2>
              <button
              onClick={() => setCarrinhoAberto(false)} className='text-gray-400 hover:text-gray-600 font-bold text-lg cursor-pointer p-1'
              >  ✕ </button>
            </div>


            {/* Lista de itens adicionados */}
            <div>
              {carrinho.length === 0 ? (
                <div>
                  Sua sacola está vazia. Que tal um pãozinho? 🥖
                </div>
              ) : (
                carrinho.map((item) => ( 
                  <div key={item.id} className='flex items-center gap-4 bg-gray-50 p-3 rounded-xl border border-gray-100 '>
                    <img src={item.imagem} alt={item.nome} className='w-12 h-12 object-cover rounded-lg' />
                    <div className='flex-1 min-w-0'>
                      <h4 className='text-sm font-bold text-gray-900 truncate'>{item.name}</h4>
                      <p className='text-xs text-gray-500'>R$ {Number(item.preco).toFixed(2) } x {item.quantidade}</p>
                    </div>

                    {/*Botões de controle de quantidade */}
                    <div className='flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-1'>
                      <button onClick={() => removerDoCarrinho(item.id)} className='px-1.5 text-gray-500 hover:text-red-500 font-bold cursor-pointer'>-</button>
                      <span className='text-xs font-bold px-1'>{item.quantidade}</span>
                      <button onClick={() => adicionarAocarrinho(item)} className='px-1.5 text-gray-500 hover:text-amber-600 font-bold cursor-pointer'>+</button>
                    </div>

                    {/* Botão de excluir pruduto inteiro */}
                    <button
                    onClick={() => deletarDoCarrinho(item.id)}
                    title='Remover produto'
                    className='p-1.5 text-gray-300 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors cursor-pointer ml-1 '>
                      <LuTrash />
                    </button>
                  </div>
                ))
              )}
            </div>
            {/* Rodapé com valor total */}
            {carrinho.length > 0 && (
              <div className='border-t border-gray-400 pt-4 mt-4 space-y-4'>
                <div className='flex item-center justify-between text-lg font-black text-gray-900'>
                  <span>Total:</span>
                  <span>R$ {valorTotal.toLocaleString('pt-br', { minimumFractionDigits: 2})} </span>
                </div>
                <button className='w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-xl transition-colors cursor-pointer text-center'>
                  Finalizar Pedido
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
     
  );
}
