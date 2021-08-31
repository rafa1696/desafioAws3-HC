import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

import { IResponseAws, Lead } from '../models/lead'

export default class Status extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(
      'https://puch0ptw3b.execute-api.us-east-2.amazonaws.com/dev',
      context,
      options
    )
  }

  public async getLeads(): Promise<IResponseAws> {
    return this.http.get('leads')
  }

  public async getLeadById(id: string) {
    return this.http.get(`leads/${id}`)
  }

  public async updateLead(lead: Lead) {
    const id = lead.leadId

    delete lead.leadId

    return this.http.put(`leads/${id}`, lead)
  }

  public async createLead(lead: Lead) {
    delete lead.leadId

    return this.http.post('leads', lead)
  }
}
