import { withRuntimeContext } from 'vtex.render-runtime'
import React, { Component } from 'react'
import { Table, Input } from 'vtex.styleguide'

export interface Lead {
  id: string
  name: string
  email: string
  type: string
}

interface Props {
  runtime: any
  leads: Lead[]
}

class LeadsTable extends Component<Props> {
  constructor(props: any) {
    super(props)
    this.state = {
      items: this.props.leads,
      tableDensity: 'low',
      searchValue: null,
      filterStatements: [],
    }
  }

  private getSchema() {
    const { tableDensity }: any = this.state

    let fontSize = 'f5'

    switch (tableDensity) {
      case 'low': {
        fontSize = 'f5'
        break
      }
      case 'medium': {
        fontSize = 'f6'
        break
      }
      case 'high': {
        fontSize = 'f7'
        break
      }
      default: {
        fontSize = 'f5'
        break
      }
    }
    return {
      properties: {
        name: {
          title: 'Nome',
        },
        email: {
          title: 'Tipo',
          cellRenderer: ({ cellData }: any) => {
            return <span className={`ws-normal ${fontSize}`}>{cellData}</span>
          },
        },
        type: {
          title: 'Email',
          cellRenderer: ({ cellData }: any) => {
            return <span className={`ws-normal ${fontSize}`}>{cellData}</span>
          },
        },
      },
    }
  }

  private simpleInputObject({ values, onChangeObjectCallback }: any) {
    return (
      <Input
        value={values || ''}
        onChange={(e: any) => onChangeObjectCallback(e.target.value)}
      />
    )
  }

  private simpleInputVerbsAndLabel() {
    return {
      renderFilterLabel: (st: any) => {
        if (!st || !st.object) {
          // you should treat empty object cases only for alwaysVisibleFilters
          return 'Any'
        }
        return `${st.verb === '=' ? 'is' : st.verb === '!=' ? 'is not' : 'contains'
          } ${st.object}`
      },
      verbs: [
        {
          label: 'is',
          value: '=',
          object: {
            renderFn: this.simpleInputObject,
            extraParams: {},
          },
        },
        {
          label: 'is not',
          value: '!=',
          object: {
            renderFn: this.simpleInputObject,
            extraParams: {},
          },
        },
        {
          label: 'contains',
          value: 'contains',
          object: {
            renderFn: this.simpleInputObject,
            extraParams: {},
          },
        },
      ],
    }
  }

  public render() {
    const { items, tableDensity }: any = this.state
    const {
      runtime: { navigate },
    } = this.props

    console.log(items)

    return (
      <>
        <Table
          fullWidth
          updateTableKey={tableDensity}
          items={items}
          schema={this.getSchema()}
          density="low"
          onRowClick={({ rowData }: any) =>
            navigate({
              page: 'admin.app.example-detail',
              params: { id: rowData.id },
            })
          }
        />
      </>
    )
  }
}

export default withRuntimeContext(LeadsTable)
