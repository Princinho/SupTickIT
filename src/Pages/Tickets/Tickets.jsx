
import { useContext } from 'react'
import { CustomerTickets } from './CustomerTickets/CustomerTickets'
import { TicketsDashboard as ModeratorDashBoard } from './ModeratorTickets/TicketsDashboard'
import { TicketsDashboard as AgentDashboard } from './AgentTickets/TicketsDashboard'
import { UserContext } from '../../Contexts'
import { SYSTEM_ROLES, extractActiveRolesFromUser } from '../../utils'
export const Tickets = () => {
    const {user} = useContext(UserContext)
    if (!user?.RoleAssignments) return <h1>Vous n&apos;etes pas autorisés</h1>
    let userRoles=extractActiveRolesFromUser(user)
    let dashboard = null
    if (userRoles.some(r => r.RoleId == SYSTEM_ROLES.ADMIN || r == SYSTEM_ROLES.MODERATOR))
        dashboard = <ModeratorDashBoard />
    else if (userRoles.some(r => r.RoleId == SYSTEM_ROLES.AGENT))
        dashboard = <AgentDashboard />
    else if (userRoles.some(r => r.RoleId == SYSTEM_ROLES.CUSTOMER))
        dashboard = <CustomerTickets />
    else
        return <h1>Vous n&apos;etes pas autorisés</h1>
    return <>{dashboard}</>
}
