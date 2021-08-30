//import { useOrder } from 'vtex.order-placed/OrderContext'
 
import axios from 'axios';
import React, { useEffect } from 'react'
import { useOrderGroup } from 'vtex.order-placed/OrderGroupContext'
interface FormPlacedProps {

}
const FormPlaced: StorefrontFunctionComponent<FormPlacedProps> = ({ }) => {

  const { orders } = useOrderGroup();

  async function convertToLeadToClient() {
    const {email}  = orders[0]?.clientProfileData;
    if (!email) {
      return;
    }
    const { data, status } = await axios.post('https://marcosdesafio--hiringcoders202108.myvtex.com/_v/update-lead', {
      email
    })

    if (status === 200) {
        console.log(data)
    }
  }

  useEffect(() => {
    convertToLeadToClient()
  }, [orders])

  return (<div></div>)

}


export default FormPlaced;