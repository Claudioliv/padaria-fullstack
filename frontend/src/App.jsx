import { useState, useEffect } from 'react';
import CardProduto from './components/CardProduto';


export default function App() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  //Busca e filtro
  const [busca, setBusca] = useState('');
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos');



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
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* header */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <h1 className="text-2xl font-black tracking-tight text-amber-600">
            Pães & Doces <span className="texr-gray-800">Cia</span>
          </h1>
            <span className=" bg-amber-50 text-amber-700 text-xs font-semibold px-3 py1 rounded-full border border-amber-200">
              Backend conectado
            </span>
        </div>
      </header>

      {/* Conteúdo Proncipal */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Sesão de busca e filtros */}
        <div className="mb-10 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">

          {/* Input de busca */}
          <div className="w-full md:w-96 relative">
            <input type="text" 
            placeholder='Buscar por cardápio...'
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full px-4 py-4.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all text-sm"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          {produtosFiltrados.map((produto) => (
            <CardProduto key={produto.id} produto={produto} />
          ))}
        </div>
      )
    }
      </main>
    </div>
     
  )
}
