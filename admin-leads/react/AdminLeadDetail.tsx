import React, { FC, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { Layout, PageBlock, PageHeader } from 'vtex.styleguide'
import http from './http/http'

import './styles.global.css'

const AdminLeadDetail: FC<Props> = ({ params }) => {

  const [lead, setLead] = useState<any>([])

  useEffect(() => {
    getLeads()
  }, [])

  async function getLeads() {
    try {
      const response = await http.get('leads')
      if (response.status === 200) {
        setLead(response.data.filter((item:any)=>{
          return item.leadId === params.id
        }))
      }
    } catch (err) {
      alert('Não foi possível carregar os leads')
    }
  }

  if (!lead[0]){ 

    return <div>Carregando</div>
  }
  console.warn(lead)

  return (
    <Layout
      pageHeader={
        <PageHeader title={<FormattedMessage id= "admin-example.details" />} />
      }
    >
      <PageBlock variation="full">
      <div>
        <p>{lead[0].name}</p>
        <p>Data de Prospect: <b>{lead[0].prospectAt}</b></p>
        <p>Data Cliente: <b>{lead[0].clientAt?lead[0].clientAt:"Não é cliente."}</b></p>
      </div>
      </PageBlock>
    </Layout>
  )
}

interface Props {
  params: any
}

export default AdminLeadDetail