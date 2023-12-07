import { UserContext } from '../Contexts'
import { matchPath, useLocation } from 'react-router-dom'
import { isUserInRole } from '../Api'
import { SYSTEM_ROLES } from '../utils'
import { useContext } from 'react'

export const useAuthorization = () => {
  let pathname = useLocation().pathname
  const { user } = useContext(UserContext)
  function isUserAuthorized() {
    return isPathAuthorizedForUser(pathname)
  }
  function isPathAuthorizedForUser(path) {
    if (matchPath('/categories/*', path)) {
      return isUserInRole(SYSTEM_ROLES.ADMIN, user?.id)
    }
    if (matchPath('/companies/*', path)) {
      return isUserInRole(SYSTEM_ROLES.ADMIN, user?.id)
    }
    if (matchPath('/projects/*', path)) {
      return isUserInRole(SYSTEM_ROLES.ADMIN, user?.id)
    }
    if (matchPath('/users/*', path)) {
      return isUserInRole(SYSTEM_ROLES.ADMIN, user?.id)
    }
    if (matchPath('/partnerusers/*', path)) {
      return isUserInRole(SYSTEM_ROLES.CUSTOMER_ADMIN, user?.id)
    }
    if (matchPath('/tickets/*', path)) {
      return isUserInRole(SYSTEM_ROLES.ADMIN, user?.id)
        || isUserInRole(SYSTEM_ROLES.CUSTOMER, user?.id)
        || isUserInRole(SYSTEM_ROLES.AGENT, user?.id)
        || isUserInRole(SYSTEM_ROLES.MODERATOR, user?.id)
    }
    return false
  }
  return { isUserAuthorized, isPathAuthorizedForUser }
}
