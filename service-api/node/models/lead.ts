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
  }

  public static mapperToLeads(responseAws: IResponseAws): Lead[] {
    return responseAws.data.map((item: Lead) => {
      return new Lead(
        item.name,
        item.email,
        item.phone,
        item.prospectAt,
        item.clientAt,
        'prospect',
        item.leadId
      )
    })
  }

  public static getLeadeByEmail(email: string, leads: Lead[]): Lead | null {
    const lead = leads.find((l) => l.email === email)

    if (lead === undefined) {
      return null
    }

    return lead
  }
}

export interface IResponseAws {
  data: Lead[]
  Items?: Lead[]
}
