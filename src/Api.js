import { SYSTEM_ROLES, getSampleDataFromLocalStorage, saveDataToLocalStorage } from "./utils"
import { sampleData as initialData } from './SampleData.js'

function getAllEntries(type) {
    let data = getDataFromLocalStorage()

    return data[type] || []
}
function getAllProjects() {
    return getAllEntries('projects')
}
function getProject(id) {
    if (!id) return null
    return getAllEntries('projects').find(p => p.id == id)
}

function getOrInitData() {
    let storedData = getSampleDataFromLocalStorage()
    if (!storedData) {
        console.log('no stored data, using initialData', initialData)
        storedData = initialData
        saveDataToLocalStorage(initialData)

    }
    return storedData
}
function assignProject(project, companyId) {
    console.log(project, companyId)
    let company = getAllCompanies().find(c => c.id == companyId)
    editCompany({ ...company, projects: [...company.projects, project.id] })
}
function getDataFromLocalStorage() {
    return getOrInitData()
}
function createProject(newProject) {
    let allProjects = getAllProjects()
    let storedData = getOrInitData()
    let newProjectWithDbData = { ...newProject, id: allProjects.length + 1, dateCreated: new Date().toISOString(), createdBy: 3 }
    let updatedProjectsArray = [newProjectWithDbData, ...allProjects]
    saveDataToLocalStorage({ ...storedData, projects: updatedProjectsArray })
    assignProjectToCompanies(newProjectWithDbData)
}
function assignProjectToCompanies(project) {
    project.companies.forEach(companyId => {
        let company = getAllCompanies().find(c => c.id == companyId)
        editCompany({ ...company, projects: [...company.projects, project.id] })
    });
}
function editProject(updatedProject) {
    let allProjects = getAllProjects()
    let storedData = getOrInitData()
    let updatedProjectsArray = allProjects.map(project => project.id == updatedProject.id ? {
        ...project, ...updatedProject
    } : project)
    saveDataToLocalStorage({ ...storedData, projects: updatedProjectsArray })
}
function deleteProject(project) {
    let allProjects = getAllProjects()
    let storedData = getOrInitData()
    let updatedProjectsArray = allProjects.filter(p => p.id != project.id)
    saveDataToLocalStorage({ ...storedData, projects: updatedProjectsArray })
}
function editEntry(updatedEntry, type) {
    let allEntries = getAllEntries(type)
    let storedData = getOrInitData()
    let updatedEntriesArray = allEntries.map(entry => entry.id == updatedEntry.id ? {
        ...entry, ...updatedEntry
    } : entry)
    saveDataToLocalStorage({ ...storedData, [type]: updatedEntriesArray })
}
function deleteEntry(data, type) {
    let allEntries = getAllEntries(type)
    let storedData = getOrInitData()
    let updatedEntriesArray = allEntries.filter(p => p.id != data.id)
    saveDataToLocalStorage({ ...storedData, [type]: updatedEntriesArray })
}
function getAllCompanies() {
    return getAllEntries('companies') || []
}
function createCompany(data) {
    create(data, 'companies')
}

function editCompany(company) {
    editEntry(company, 'companies')
}

function deleteCompany(data) {
    deleteEntry(data, 'companies')
}
function getAllTickets() {
    return getAllEntries('tickets') || []

}
function getCustomerTickets(customerId) {
    // console.log(customerId)
    if (!customerId) return []
    let allTickets = getAllTickets()
    // console.log(allTickets)
    let customerTickets = allTickets.filter(ticket => ticket.createdBy == customerId)
    // console.log(customerTickets)
    return customerTickets
}
function getModeratorTickets(moderatorId) {
    // console.log(customerId)
    if (!moderatorId) return []
    let moderator = getAllUsers().find(u => u.id == moderatorId)
    if (moderator) {

        let allTickets = getAllTickets()
        console.log('all tickets', allTickets)
        let companyUsers = getAllUsers().filter(u => u.companyId == moderator.companyId)
        console.log('company users', companyUsers)
        let moderatorTickets = allTickets.filter(ticket => companyUsers.some(u => u.id == ticket.createdBy))
        return moderatorTickets
    }

}
function getTicket(id) {
    return getAllTickets().find(ticket => ticket.id == id) || null
}

function getTicketMessages(ticketId) {
    let ticketMessages = getAllMessages().filter(m => m.ticketId == ticketId)
    console.log(ticketMessages)
    return ticketMessages
}
function getAllMessages() {
    let messages = getAllEntries('messages')
    console.log(messages)
    return messages
}
function createMessage(entry) {
    create(entry, 'messages')
}

function editMessage(entry) {
    editEntry(entry, 'messages')
}

function deleteMessage(entry) {
    deleteEntry(entry, 'messages')
}

function getAgentTickets(agentId) {
    // console.log(customerId)
    if (!agentId) return []
    let allTickets = getAllTickets()
    // console.log(allTickets)
    let agentTickets = allTickets.filter(ticket => ticket.agentId == agentId)
    // console.log(customerTickets)
    return agentTickets
}
function getCompanyProjects(companyId) {
    if (!companyId) return [
    ]
    let projects = getAllProjects()
    let company = getAllCompanies().find(c => c.id == companyId)
    let companyProjects = projects.filter(project => company.projects.includes(project.id))
    return companyProjects
}
function createTicket(data) {
    create(data, 'tickets')
}

function editTicket(ticket) {
    console.log(ticket)
    editEntry(ticket, 'tickets')
}

function deleteTicket(data) {
    deleteEntry(data, 'tickets')
}
function getAllCategories() {
    return getAllEntries('categories')
}
function getCategory(id) {
    if (!id) return null
    let allCategories = getAllEntries('categories')
    let category = allCategories.find(p => p.id == id)
    console.log(category)
    return category
}
function createCategory(data) {
    create(data, 'categories')
}

function editCategory(data) {
    editEntry(data, 'categories')
}

function deleteCategory(data) {
    deleteEntry(data, 'categories')
}
function getProjectCategories(projectId) {
    let allCategories = getAllCategories()
    return allCategories.filter(cat => cat.projectId == projectId)
}
function getAllUsers() {
    return getAllEntries('users')
}

function createUser(data) {
    create(data, 'users')
}
function createCustomer(data) {
    let result = create(data, 'users')
    addRoleToUser({ roleId: SYSTEM_ROLES.CUSTOMER, startDate: new Date().toISOString(), userId: result.id })
}

function editUser(data) {
    editEntry(data, 'users')
}

function deleteUser(data) {
    deleteEntry(data, 'users')
}
function getAvailableAgents(companyId) {
    let companyAgents = getCompanyUsers(companyId).filter(user => isUserInRole(SYSTEM_ROLES.AGENT, user.id))
    return companyAgents
}
function getCompanyUsers(companyId) {
    let allUsers = getAllUsers()
    let companyUsers = allUsers.filter(user => user.companyId == companyId)

    return companyUsers
}
function isRoleAssignmentActive(roleAssignment) {
    let startDate = new Date(roleAssignment.startDate)
    let roleIsActive = true
    if (startDate > new Date()) roleIsActive = false
    if (roleAssignment.endDate) {
        let endDate = new Date(roleAssignment.endDate)
        if (endDate < new Date()) roleIsActive = false
    }
    return roleIsActive
}
function getActiveRolesForUser(userId) {
    let allRoles = getAllRoles()
    let activeRoles = getActiveRoleAssignmentsForUser(userId).map(roleAssignment => allRoles.find(role => role.id == roleAssignment.roleId))
    return activeRoles
}
function getActiveRoleAssignmentsForUser(userId) {
    if (!userId) return []
    let allRoleAssignments = getAllRoleAssignments()
    let roleAssignments = allRoleAssignments.filter(roleAssignment => roleAssignment.userId == userId && isRoleAssignmentActive(roleAssignment))
    return roleAssignments
}
function isUserInRole(roleId, userId) {
    if (!userId || !roleId) return false
    let userActiveRoles = getActiveRolesForUser(userId)
    return userActiveRoles.some(role => role.id == roleId)
}
function getAllRoleAssignments() {
    return getAllEntries('roleAssignments')
}
function getAllRoles() {
    return getAllEntries('roles')
}
function addRoleToUser(roleAssignment) {
    create(roleAssignment, 'roleAssignments')
}
function removeRoleFromUser(roleAssignment) {
    let allEntries = getAllEntries('roleAssignments')
    let storedData = getOrInitData()
    let updatedEntriesArray = allEntries.filter(p =>
        !(p.roleId == roleAssignment.roleId && p.userId == roleAssignment.userId)
    )
    saveDataToLocalStorage({ ...storedData, roleAssignments: updatedEntriesArray })
}
function create(newEntry, type) {
    console.log(type, newEntry)
    let allEntries = getAllEntries(type)
    let storedData = getOrInitData()
    let createdEntry = { ...newEntry, id: allEntries.length + 1, dateCreated: new Date().toISOString() }
    let updatedEntriesArray = [createdEntry, ...allEntries]
    const result = { ...storedData, [type]: updatedEntriesArray }
    // console.log(result)
    saveDataToLocalStorage(result)
    return createdEntry
}

export {
    getOrInitData,
    getDataFromLocalStorage,
    createMessage, editMessage, deleteMessage,
    getAllProjects, getProject, createProject, editProject, deleteProject, assignProject, getCompanyProjects,
    getAllCompanies, createCompany, editCompany, deleteCompany,
    getAllTickets, createTicket, editTicket, deleteTicket,
    getCustomerTickets, getTicket, getTicketMessages, getModeratorTickets,
    getAllCategories, createCategory, editCategory, deleteCategory, getProjectCategories, getCategory,
    getAllUsers, getCompanyUsers, createUser, editUser, deleteUser, createCustomer,
    getAllRoleAssignments, getAllRoles, addRoleToUser,
    getActiveRolesForUser, getActiveRoleAssignmentsForUser, isUserInRole,
    removeRoleFromUser, getAvailableAgents, getAgentTickets
}

