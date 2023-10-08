
import {useState,useCallback,useEffect,useRef} from "react";
import './App.css';

function App() {
 const [length,setLength]=useState(8);
 const[number,setNumber]=useState(false);
 const[character,setCharacter]=useState(false);
 const[password,setPassword]=useState("");

 const passwordRef=useRef(null)

const passwordGenerator=useCallback(()=>{
  let pass=""
  let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz "

if (number) str+="0123456789"
if (character) str+="/*-+.,?><()!@#$%"
for (let i = 1; i <=length; i++) {
  let char=Math.floor(Math.random()*str.length+1)
  pass+=str.charAt(char)
  
}
setPassword(pass)

},[length,number,character])

const copyPassword=useCallback(()=>{
  passwordRef.current?.select()
  window.navigator.clipboard.writeText(password)
},[password])

useEffect(()=>{passwordGenerator()},[length,number,character,passwordGenerator])
  return (
 <>
 <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700">
<h1 className="text-white text-center">password Generator</h1>

<div className="flex shadow-md rounded-lg overflow-hidden mb-4">
  <input type="text" value={password} className="outline-none w-full py-1 px-3 " placeholder="password" readOnly ref={passwordRef}/>
    <button onClick={copyPassword} className="outlinne-none bg-blue-700 text-white px-3 py-0.5">
      Copy</button>




</div>
<div className="flex text-sm gap-x-2">
  <div className="flex items-center gap-x-1">
    <input type="range" min={6} max={25} value={length} className="cursor-pointer"
    onChange={(e)=>{setLength(e.target.value)}}
    /><label>Length:{length}</label>
  </div>
  <div className="flex items-center gap-x-1">
     <input type="checkbox" defaultChecked={number} id="numberInput" onChange={()=>{setNumber((prev)=>!prev);}}
    
    />
<label htmlFor="numberInput">Numbers</label>
  </div>

   <div className="flex items-center gap-x-1">
     <input type="checkbox" defaultChecked={character}  onChange={()=>{setCharacter((prev)=>!prev);}}
    
    />
<label htmlFor="characterInput">Characters</label>
  </div>
  
</div>
 </div>
 
 
 </>
  );
}

export default App;
