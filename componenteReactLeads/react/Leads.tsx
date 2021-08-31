import React, { useState } from 'react'
import axios from 'axios'
import { Button, Input, Box, Alert } from 'vtex.styleguide'

interface LeadsProps {

}
const Leads: StorefrontFunctionComponent<LeadsProps> = ({ }) => {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOk, setIsOk] = useState(false)
  const alertRef = React.createRef()

  async function handleCreateLead() {
    setLoading(true)
    try {
      const { status } = await axios.post('https://marcosdesafio--hiringcoders202108.myvtex.com/_v/leads', {
        name: nome,
        phone: telefone,
        email
      });

      if (status === 201) {
        setIsOk(true)
        setNome('');
        setTelefone('');
        setEmail('');
        setLoading(false)
      }
    } catch (err) {
      setLoading(false)
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

  return (
    <Box>
      {isOk &&
        <Alert ref={alertRef} type="success" autoClose={500} >
          Obrigado por se cadastrar!
        </Alert>
      }
      <p>
        Agora só inserir seus dados e
        ficará por dentro de todas nossas
        promoções!
      </p>
      <p><Input type="text" placeholder="Seu nome completo" value={nome} onChange={(e: any) => setNome((e.target as any).value)} /></p>
      <p><Input type="tel" placeholder="telefone" value={telefone} onChange={(e: any) => setTelefone((e.target as any).value)} /></p>
      <p><Input type="email" placeholder="email" value={email} onChange={(e: any) => setEmail((e.target as any).value)} /></p>
      <Button isLoading={loading} type="button" onClick={handleCreateLead} >Cadastrar</Button>

    </Box>
  )

}
export default Leads
