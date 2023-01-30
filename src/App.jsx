import { useState } from 'react'
import { Configuration, OpenAIApi } from "openai";
import Loading from './Loading';
import './App.css'



function App() {

  const [val, setVal] = useState("");
  const [result, setResult] = useState("");
  const [loader, setLoader] = useState(false);
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_Open_AI_Key,
  });
  const openai = new OpenAIApi(configuration);

  const generateImage = async() =>{
    setLoader(true);
    const res = await openai.createImage({
      prompt: val,
      n:1,
      size:"256x256",
    });
    setLoader(false);
    setResult(res.data.data[0].url);
  }
  return (
  <div>
    <h2>Image generator</h2>
    <div>
    <input className="input-box" value={val} onChange={(e)=>setVal(e.target.value)} placeholder="Enter anything"/>
    </div>
    
    <button onClick={generateImage} >Generate an image</button>
    <div>
      {loader ? <Loading/>
      : <></>}
      {result.length > 0 ?  <img src={result} alt="" style={{width:"250px",height:"250px",marginTop:"30px"}}/> : <></>}
    </div>
  </div>
  );
}

export default App
