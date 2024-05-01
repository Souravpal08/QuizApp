import Link from 'next/link'
export default function Home() {
  return (
    <main>
       <div className="container" >
        <h1>Quizz App</h1>
        <Link href='/quiz'>
          <button> Click  here to start Quiz</button>
          
        </Link>
        
       </div>
       <div><p className="mypara">A quiz app created by @Sourav Pal</p></div>
       
       

    </main>
  );
}
