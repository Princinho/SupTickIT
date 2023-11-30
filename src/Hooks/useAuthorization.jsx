import { UserContext } from '../Contexts'
import { matchPath, useLocation } from 'react-router-dom'
import { isUserInRole } from '../Api'
import { SYSTEM_ROLES } from '../utils'
import { useContext } from 'react'

export const useAuthorization = () => {
  let pathname = useLocation().pathname
  const { user } = useContext(UserContext)
  function isUserAuthorized() {
    console.log(pathname)
    if (matchPath('/categories/*', pathname)) {
      return isUserInRole(SYSTEM_ROLES.ADMIN, user?.id)
    }
    if (matchPath('/projects/*', pathname)) {
      return isUserInRole(SYSTEM_ROLES.ADMIN, user?.id)
    }
    return true
  }
  return { isUserAuthorized }
}
