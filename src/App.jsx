import { useState, useEffect } from 'react'
import {Routes, Route, Link, useParams} from 'react-router-dom'
import './App.css'

function PageIntrouvable () {

  return (
   <> 
    <h1>404- ERROR</h1>
    <p>Oups! Ce que vous avez tapé n'existe pas!</p>
   </>

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

  if(chargement) return <p>chargement...</p>
  if (erreur) return <p>Erreur : {erreur}</p>
  if (!article) return null

   return (
    <div>

     <h1>{article.title}</h1>
     <p>{article.body}</p>

    </div>
  )

  
}

function PageListe() {

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

  if(chargement) return <p>Chargement...</p>
  if (erreur) return <p>Erreur : {erreur}</p>

  return (
    <>
     <ul>
        {articles.map((article) =>(

          <li key={article.id}>
            <Link to ={`/articles/${article.id}`}>{article.title}</Link>
          </li>

        ))}
      </ul>
    </>
  )

 

}

function App() {

   return (

    <div>

      <nav>
        <Link to="/">PageListe</Link>
      </nav>

      <Routes>
        <Route path="/" element={<PageListe />} />
        <Route path="/articles/:id" element={<PageDetail />} />
        <Route path="*" element={<PageIntrouvable />} />
      </Routes>
    
    </div>
  )
  
}


export default App
