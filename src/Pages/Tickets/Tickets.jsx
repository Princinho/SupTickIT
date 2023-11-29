
import { useContext } from 'react'
import { CustomerTickets } from './CustomerTickets/CustomerTickets'
import { TicketsDashboard as ModeratorDashBoard } from './ModeratorTickets/TicketsDashboard'
import { TicketsDashboard as AgentDashboard } from './AgentTickets/TicketsDashboard'
import { UserContext } from '../../Contexts'
import { useQuery } from '@tanstack/react-query'
import {  getActiveRolesForUser } from '../../Api'
import { SYSTEM_ROLES } from '../../utils'
export const Tickets = () => {
    const {user} = useContext(UserContext)
    const { data: userRoles } = useQuery({
        queryKey: ['roles', user?.id],
        queryFn: () => getActiveRolesForUser(user?.id)
    })
    if (!userRoles) return <h1>Vous n&apos;etes pas autorisé</h1>
    let dashboard = null
    if (userRoles.some(r => r.id == SYSTEM_ROLES.ADMIN || r.id == SYSTEM_ROLES.MODERATOR))
        dashboard = <ModeratorDashBoard />
    else if (userRoles.some(r => r.id == SYSTEM_ROLES.AGENT))
        dashboard = <AgentDashboard />
    else if (userRoles.some(r => r.id == SYSTEM_ROLES.CUSTOMER))
        dashboard = <CustomerTickets />
    else
        return <h1>Vous n&apos;etes pas autorisé</h1>
    return <>{dashboard}</>
}
