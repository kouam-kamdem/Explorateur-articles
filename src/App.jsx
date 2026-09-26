import { useState, useEffect } from 'react'
import {Routes, Route, Link, useParams} from 'react-router-dom'


function PageIntrouvable () {

  return (
   <div className="text-center py-8"> 
    <Link to ="/" className="text-sky-600 hover:underline mb-6 inline-block">
      Retour à la liste
    </Link>
    <h1 className="text-4xl font-bold">404- ERROR</h1>
    <p>Oups! Ce que vous avez tapé n'existe pas!</p>
   </div>

  )
 
}

function PageDetail() {

  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [erreur,setErreur] = useState(null);
  const [chargement,setChargement] = useState(true);

  useEffect(() => {
    async function recupereId() { 
      try{
        const laReponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        if (!laReponse.ok) {
          throw new Error ("Article introuvable!");
        }
        const laDonnee = await laReponse.json()
        setArticle(laDonnee)
        setChargement(false)
      }catch(err){
        setErreur(err.message)
        setChargement(false)
      }
      
    }recupereId()
  }, [id])

  if(chargement) return <p className="text-center text-gray-500 py-10">Chargement...</p>
  if (erreur) return <p className="text-center text-gray-500 py-10">Erreur : {erreur}</p>
  if (!article) return null

   return (
    <div>

      <Link to ="/" className="text-sky-600 hover:underline mb-6 inline-block">
        Retour à la liste
      </Link>

     <h1 className="text-3xl font-bold text-gray-900 mb-4">{article.title}</h1>
     <p className="text-gray-700 leading-relaxed">{article.body}</p>

    </div>
  )

  
}

function Accueil() {

  const [articles, setArticles] = useState([]);
  const [erreur,setErreur] = useState(null);
  const [chargement,setChargement] = useState(true);

  useEffect(() => {
    async function recupereArticle() {
      try{
        const reponse = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!reponse.ok) {
          throw new Error("Article introuvable");
        }
        const data = await reponse.json();
        setArticles(data)
        setChargement(false)
      }catch(err){
        setErreur(err.message)
        setChargement(false)
      }
   }recupereArticle()
  }, [])

  if(chargement) return <p className="text-center text-gray-500 py-10">Chargement...</p>
  if (erreur) return <p className="text-center text-gray-500 py-10">Erreur : {erreur}</p>

  return (
    <>
     <ul className="list-none p-0 space-y-4">
        {articles.map((article) =>(

          <li key={article.id}>
            <Link to ={`/articles/${article.id}`} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm transition-shadow hover:shadow-md block text-gray-800 font-medium hover:text-sky-600">{article.title}</Link>
          </li>

        ))}
      </ul>
    </>
  )

 

}

function App() {

   return (

    <div className="max-w-2xl mx-auto px-4 py-8">

      <nav className="mb-5 border-b border-gray-200 pb-4">
        <Link to="/" className="text-sky-600 font-semibold hover:text-sky-800 hover:underline transition-colors">Accueil</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/articles/:id" element={<PageDetail />} />
        <Route path="*" element={<PageIntrouvable />} />
      </Routes>
    
    </div>
  )
  
}


export default App
