import { useContext } from 'react'
import { UserContext } from '../../Contexts'
import { CustomerTickets } from './CustomerTickets'
export const Tickets = () => {
    const { user } = useContext(UserContext)
    return (
        <CustomerTickets />
    )
}
