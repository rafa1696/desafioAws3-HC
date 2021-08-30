import React, { useState } from 'react'
//import { useCssHandles } from 'vtex.css-handles'
//import { useQuery } from 'react-apollo'
import axios from 'axios'
import { Button, Input, Box } from 'vtex.styleguide'

interface LeadsProps {
 
}
const Leads: StorefrontFunctionComponent<LeadsProps> = ({}) => {
  
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  
  function handlePesquisa() {
    axios.get('https://0p3z4qvry6.execute-api.us-east-2.amazonaws.com/items').then(function(response:any){console.log(response)})
    axios.put('https://0p3z4qvry6.execute-api.us-east-2.amazonaws.com/items', 
      {
      id: `${telefone}`,
      email:`${email}`,
      name:`${nome}`
    }
  )
    .then(function (response:any) {
      console.log(response);
    })
    .catch(function (error:any) {
      console.log(error);
    });
    setNome('');
    setTelefone('');
    setEmail('');
    }
   
    return (
      <Box>
        <p>
        Agora só inserir seus dados e
  ficará por dentro de todas nossas
  promoções!
        </p>
        <p><Input type="text" placeholder="Seu nome completo" value={nome} onChange={ (e: any) => setNome((e.target as any).value)} /></p>
        <p><Input type="tel"  placeholder="telefone" value={telefone} onChange={(e: any) => setTelefone((e.target as any).value)} /></p>
        <p><Input type="email" placeholder="email" value={email} onChange={(e: any) => setEmail((e.target as any).value)} /></p>
        <Button type="button" onClick={handlePesquisa} >Cadastrar</Button>
        
      </Box>
    )

  }
export default Leads
