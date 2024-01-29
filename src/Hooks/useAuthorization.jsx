import { UserContext } from '../Contexts'
import { matchPath, useLocation } from 'react-router-dom'
import { isApiUserInRole } from '../Api'
import { SYSTEM_ROLES } from '../utils'
import { useContext } from 'react'

export const useAuthorization = () => {
  let pathname = useLocation().pathname
  const { user } = useContext(UserContext)
  function isUserAuthorized() {
    return isPathAuthorizedForUser(pathname)
  }
  function isPathAuthorizedForUser(path) {
    if (matchPath('/systemsettings/*', path)) {
      return isApiUserInRole(SYSTEM_ROLES.ADMIN, user)
    }
    if (matchPath('/categories/*', path)) {
      return isApiUserInRole(SYSTEM_ROLES.ADMIN, user)
    }
    if (matchPath('/companies/*', path)) {
      return isApiUserInRole(SYSTEM_ROLES.ADMIN, user)
    }
    if (matchPath('/projects/*', path)) {
      return isApiUserInRole(SYSTEM_ROLES.ADMIN, user)
    }
    if (matchPath('/users/*', path)) {
      return isApiUserInRole(SYSTEM_ROLES.ADMIN, user)
    }
    if (matchPath('/partnerusers/*', path)) {
      return isApiUserInRole(SYSTEM_ROLES.CUSTOMER_ADMIN, user)
    }
    if (matchPath('/tickets/*', path)) {
      return isApiUserInRole(SYSTEM_ROLES.ADMIN, user)
        || isApiUserInRole(SYSTEM_ROLES.CUSTOMER, user)
        || isApiUserInRole(SYSTEM_ROLES.AGENT, user)
        || isApiUserInRole(SYSTEM_ROLES.MODERATOR, user)
    }
    return false
  }
  return { isUserAuthorized, isPathAuthorizedForUser }
}
