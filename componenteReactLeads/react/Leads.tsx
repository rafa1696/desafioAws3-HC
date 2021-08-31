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
  
  async function handleCreateLead() {
    const { data, status } = await axios.post('https://marcosdesafio--hiringcoders202108.myvtex.com/_v/leads',  {
      name: nome,
      phone: telefone,
      email
    });

    if (status === 201) {
      console.log(data);
      // alert('Cadastro realizado com sucesso');
      setNome('');
      setTelefone('');
      setEmail('');
    }
  }
   
    return (
      <div>
        <h1 style={{textAlign:"center", fontWeight:"bold"} }> Inscreva-se Já!</h1>
      
        <Box style={{paddingBottom:16}}>
          <p style={{textAlign:"center"}}>
          Agora só inserir seus dados e ficará por dentro de todas nossas promoções!
          </p>
          <p style={{textAlign:"center"}}><Input type="text" placeholder="Seu nome completo" value={nome} onChange={ (e: any) => setNome((e.target as any).value)} /></p>
          <p style={{textAlign:"center"}}><Input type="tel"  placeholder="Seu telefone" value={telefone} onChange={(e: any) => setTelefone((e.target as any).value)} /></p>
          <p style={{textAlign:"center"}}><Input type="email" placeholder="Seu e-mail" value={email} onChange={(e: any) => setEmail((e.target as any).value)} /></p>
          <Button type="button" onClick={handleCreateLead} block>Cadastrar</Button>
        
        </Box>
      </div>
    )

  }
export default Leads
