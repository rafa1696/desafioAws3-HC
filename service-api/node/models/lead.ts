export class Lead {
  // eslint-disable-next-line max-params
  constructor(
    public name: string,
    public email: string,
    public phone: string,
    public prospectAt: string,
    public clientAt: string,
    public type: 'prospect' | 'client',
    public leadId?: string
  ) {}

  public convertToClient(): void {
    this.type = 'client'
    this.clientAt = new Date().toISOString()
  }

  public static mapperToLeads(responseAws: IResponseAws): Lead[] {
    const leads = responseAws.data as Lead[]

    return leads.map((item: Lead) => {
      return new Lead(
        item.name,
        item.email,
        item.phone,
        item.prospectAt,
        item.clientAt,
        item.type,
        item.leadId
      )
    })
  }

  public static mapperToLead(responseAws: IResponseAws): Lead {
    const item = responseAws.data as Lead

    return new Lead(
      item.name,
      item.email,
      item.phone,
      item.prospectAt,
      item.clientAt,
      item.type,
      item.leadId
    )
  }

  public static getLeadeByEmail(email: string, leads: Lead[]): Lead | null {
    const lead = leads.find((l) => l.email === email)

    if (lead === undefined) {
      return null
    }

    return lead
  }

  public static getLeadeByPhone(phone: string, leads: Lead[]): Lead | null {
    let newPhone = phone

    if (phone.startsWith('+55')) {
      newPhone = phone.replace('+55', '')
    }

    const lead = leads.find((l) => l.phone === newPhone)

    if (lead === undefined) {
      return null
    }

    return lead
  }
}

export interface IResponseAws {
  data: Lead[] | Lead
  Items?: Lead[]
}
