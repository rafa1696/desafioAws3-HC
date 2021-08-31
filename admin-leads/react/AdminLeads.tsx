import { FC, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { Layout, PageBlock, PageHeader } from 'vtex.styleguide'

// import UsersTable from './UsersTable'

import './styles.global.css'
import LeadsTable from './LeadsTable/index'
import http from './http/http'

const AdminLeads: FC = () => {
  const [leads, setLeads] = useState([])

  useEffect(() => {
    getLeads()
  }, [])

  async function getLeads() {
    try {
      const response = await http.get('leads')
      if (response.status === 200) {
        setLeads(response.data)
      }
    } catch (err) {
      alert('Não foi possível carregar os leads')
    }
  }

  return (
    <Layout
      pageHeader={
        <PageHeader
          title={<FormattedMessage id="admin-example.hello-world" />}
        />
      }
    >
      <PageBlock variation="full">
        {leads && leads.length > 0 ? (
          <LeadsTable leads={leads} />
        ) : (
          'Carregando'
        )}
      </PageBlock>
    </Layout>
  )
}

export default AdminLeads
