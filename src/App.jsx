import QRCode from 'qrcode'

import './App.css'
import { useState } from 'react'

function App() {

  const [textDigited, setTextDigited] = useState("");
  const [downloadPermitted, setDonwloadPermitted] = useState(false);

  /*useEffect(() => {

    QRCode.toCanvas(document.getElementById('canvas'), 'sample text', function (error) {
      if (error) console.error(error)
      console.log('success!');
    })

  }, [])*/

  const clean = () => {

    setDonwloadPermitted(false);
    setTextDigited("");

    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

  }

  const donwloadQRCode = () => {

    if(downloadPermitted){

      const link = document.createElement('a');
      link.download = 'qrcode.png';
      link.href = document.getElementById('canvas').toDataURL();
      link.click();

    }else{

      alert("Não foi possível fazer o download do QR Code.");
    }
  }

  const generateQRCode = () => {

    if(textDigited.length === 0){

      alert("O texto não pode ser vazio!");
    }else{

      QRCode.toCanvas(document.getElementById('canvas'), textDigited, function (error) {

        if (error){

          alert(error);
          setDonwloadPermitted(false);
        }else{

          setDonwloadPermitted(true);
        }
      })
    }
  }

  const handleValue = (e) => {

    setTextDigited(e.target.value);
  }
  
  return (
    <div className='container'>

      <h1>Gerador de QR Code</h1>

      <canvas id="canvas"></canvas>
      
      <input type="text" value={textDigited} className='text-input' onChange={handleValue} placeholder='Digite aqui um texto ou a URL de um site...'/>

      <div className='container-buttons'>

        <button onClick={generateQRCode}>Gerar</button>
        <button onClick={clean}>Limpar</button>
        <button onClick={donwloadQRCode}>Download</button>
      </div>
    </div>
  )
}

export default App
