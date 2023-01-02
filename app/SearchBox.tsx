// 'rfce'

'use client';   // - to use useState() hook here to keep track of input text to search - can't use hooks in server components - also to use any kind of js event handling like onClick,onChange,onSubmit - use client components - can't take search box input at server(avoid server component here) - common sense
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react"

function SearchBox() {
    const [input,setInput] = useState("");
    const router = useRouter();
    const handleSearch = (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();     // to prevent page from reload when form submit - since single page app(spa)

        if(!input)return;

        router.push(`/search?term=${input}`)
    }
  return (
    <form onSubmit={handleSearch} className="max-w-6xl mx-auto flex justify-between items-center px-5" >
       <input type="text" value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Search Keywords..." className="w-full h-14 rounded-sm placeholder-gray-500 text-gray-500 outline-none bg-transparent dark:text-orange-400 flex-1" /> 
       <button type='submit' disabled={!input} className="text-orange-400 disabled:text-gray-400" >Search</button>
    </form>
  )
}

export default SearchBox