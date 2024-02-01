import { SYSTEM_ROLES, TICKET_STATUS, getSampleDataFromLocalStorage, saveDataToLocalStorage } from "./utils"
import { sampleData as initialData } from './SampleData.js'
import axios from "axios"
const API_BASE = 'https://localhost:7223/api/'
const PROJECTS_ENDPOINT = 'projects'
function getAllEntries(type) {
    let data = getDataFromLocalStorage()

    return data[type] || []
}
function getSingleton(type) {
    let data = getDataFromLocalStorage()
    console.log(data[type])
    console.log(type)
    return data[type] || null
}
async function getSingle(endpoint, id) {
    let url = `${endpoint}/${id}`
    return (await axios.get(url)).data
}

async function loginToApi({ username, password }) {
    console.log(username, password)
    let response = await axios.post(API_BASE + "Authentication/Login", {
        Username: username,
        Password: password
    })
    // console.log(response.data)
    return response.data
}

async function getAllProjects() {
    let response = await (await axios.get(`${API_BASE}${PROJECTS_ENDPOINT}`)).data
    return response
}
async function create(data, endpoint) {
    await axios.post(API_BASE + endpoint, data)
}
async function remove(id, endpoint) {
    console.log('deleting....')
    return await axios.delete(`${API_BASE}${endpoint}/${id}`)
}
async function getAll(endpoint) {
    let response = (await axios.get(`${API_BASE}${endpoint}`)).data
    // console.log(endpoint, response)
    return response
}
function getProject(id) {
    if (!id) return null
    return getAllEntries(PROJECTS_ENDPOINT).find(p => p.id == id)
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
function getSystemSettings() {
    console.log('getting settings')
    return getSingleton('settings')
}
function saveSystemSettings(settings) {
    saveSingleton('settings', settings)
}
function saveSingleton(type, settings) {
    console.log(type, settings)
    let storedData = getOrInitData()
    let createdEntry = { ...settings, dateCreated: new Date().toISOString() }
    const result = { ...storedData, [type]: createdEntry }
    saveDataToLocalStorage(result)
    return createdEntry
}
async function assignProject({ projectId, companyId }) {
    await axios.post(`${API_BASE}${PROJECTS_ENDPOINT}/${projectId}/assign/${companyId}`)
}
async function unAssignProject({ projectId, companyId }) {
    await axios.delete(`${API_BASE}${PROJECTS_ENDPOINT}/${projectId}/remove/${companyId}`)
}
function getDataFromLocalStorage() {
    return getOrInitData()
}
async function createProject(newProject) {
    await create(newProject, PROJECTS_ENDPOINT)
}
async function editProject(updatedProject) {
    console.log(updatedProject)
    await edit(updatedProject, PROJECTS_ENDPOINT)
}
async function deleteProject(id) {
    await remove(id, PROJECTS_ENDPOINT)
}
function editEntry(updatedEntry, type) {
    console.log('editing entry')
    let allEntries = getAllEntries(type)
    let storedData = getOrInitData()
    let updatedEntriesArray = allEntries.map(entry => entry.id == updatedEntry.id ? {
        ...entry, ...updatedEntry
    } : entry)
    console.log(updatedEntriesArray)
    saveDataToLocalStorage({ ...storedData, [type]: updatedEntriesArray })
}
async function edit(updatedEntry, endpoint) {
    let updateUrl = `${API_BASE}${endpoint}/${updatedEntry.id}`
    console.log(updateUrl,endpoint)
    let response = (await axios.put(updateUrl, updatedEntry)).data
    return response
}

function deleteEntry(data, type) {
    let allEntries = getAllEntries(type)
    let storedData = getOrInitData()
    let updatedEntriesArray = allEntries.filter(p => p.id != data.id)
    saveDataToLocalStorage({ ...storedData, [type]: updatedEntriesArray })
}
async function getAllCompanies() {
    return await getAll('companies') || []
}
async function createCompany(data) {
    await create(data, 'companies')
}

async function editCompany(company) {
    await edit(company, 'companies')
}

async function deleteCompany(data) {
    await remove(data.id, 'companies')
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
    let message = create(entry, 'messages')
    createTicketLog(generateTicketLogForTicketMessage(message))
}

function editMessage(entry) {
    editEntry(entry, 'messages')
}

function deleteMessage(entry) {
    deleteEntry(entry, 'messages')
}
function getAllTicketLogs() {
    let ticketLogs = getAllEntries('ticketLogs')
    console.log(ticketLogs)
    return ticketLogs
}
function getTicketLogsByTicketId(id) {
    let ticketLogs = getAllEntries('ticketLogs').filter(log => log.ticketId == id)
    console.log(ticketLogs)
    return ticketLogs
}
function createTicketLog(entry) {
    create(entry, 'ticketLogs')
}

function editTicketLog(entry) {
    editEntry(entry, 'ticketLogs')
}

function deleteTicketLog(entry) {
    deleteEntry(entry, 'ticketLogs')
}

function getAgentTickets(agentId) {
    // console.log(customerId)
    if (!agentId) return []
    let allTickets = getAllTickets()
    // console.log(allTickets)
    let agentTickets = allTickets.filter(ticket => ticket.agentId == agentId || isInFreePick(ticket))
        .filter(t => t.status != TICKET_STATUS.CLOSED)
    console.log(agentTickets)
    return agentTickets
}
function isInFreePick(ticket) {
    if (ticket.agentId) {
        console.log(ticket.id + "is already assigned")
        return false;
    }
    let ticketCreationDate = new Date(ticket.dateCreated)
    const oneDayInMs = (24 * 60 * 60 * 1000)
    let today = new Date()
    let gapInDays = Math.floor((today - ticketCreationDate) / oneDayInMs)
    console.log(gapInDays) //5 days
    return gapInDays > 7
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
    let newTicket = create(data, 'tickets')
    createTicketLog({
        date: new Date().toISOString(), ticketId: newTicket.id,
        content: "Creation du ticket",
        ...data
    })
}

function editTicket(ticket) {
    console.log(ticket)
    createTicketLog(generateTicketLogForTicketEdit(ticket))
    editEntry(ticket, 'tickets')
}
function generateTicketLogForTicketEdit(newTicket) {
    if (!newTicket.id) {
        throw (new Error("Cannot log changes for ticket with undefined id"))
    }
    let oldTicket = getTicket(newTicket.id)
    let differences = []
    for (const key in newTicket) {
        if (newTicket[key] != oldTicket[key]) {
            differences.push(key)
        }
    }
    console.log(newTicket)
    let ticketLog = null
    if (differences.length > 0) {
        ticketLog = {
            date: new Date().toISOString(), ticketId: newTicket.id,
            content: "Modification du ticket"
        }
        differences.forEach(difference => {
            ticketLog[difference] = newTicket[difference]
            ticketLog[difference + "_old"] = oldTicket[difference]
        });
    }
    console.log(ticketLog)
    return ticketLog
}
function generateTicketLogForTicketMessage(message) {
    if (!message.id) {
        throw (new Error("Cannot log changes for ticket with undefined id"))
    }

    console.log(message)
    let ticketLog = null

    ticketLog = {
        date: new Date().toISOString(), ticketId: message.id,
        content: "Nouveau message pour le ticket",
        ...message
    }
    console.log(ticketLog)
    return ticketLog
}
function deleteTicket(data) {
    deleteEntry(data, 'tickets')
}
async function getAllCategories() {
    return await getAll('ticketcategories')
}
async function getCategory(id) {
    return await getSingle('ticketcategories', id)
}
async function createCategory(data) {
    await create('ticketCategories', data)
}

function editCategory(data) {
    edit(data, 'ticketCategories')
}

async function deleteCategory(id) {
    await remove(id, 'ticketCategories')
}
function getProjectCategories(projectId) {
    let allCategories = getAllCategories()
    return allCategories.filter(cat => cat.projectId == projectId)
}
function getAllUsers() {
    return getAll('users')
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
function getAllAgents() {
    let companyAgents = getAllUsers().filter(user => isUserInRole(SYSTEM_ROLES.AGENT, user.id))
    console.log(companyAgents)
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
function isApiUserInRole(roleId, user) {
    if (!user) return false
    if (!user.RoleAssignments) return false
    let roleAssignments = JSON.parse(user.RoleAssignments);
    // console.log(roleId)
    let today = new Date()
    for (let roleAssignment of roleAssignments) {
        if (roleAssignment.RoleId == roleId) {
            let startDate = new Date(roleAssignment.StartDate)
            let endDate = new Date(roleAssignment.ExpiryDate)
            if (startDate.getTime() < today.getTime() && endDate.getTime() > today.getTime()) return true
        }
    }
    return false
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
// function create(newEntry, type) {
//     console.log(type, newEntry)
//     let allEntries = getAllEntries(type)
//     let storedData = getOrInitData()
//     let createdEntry = { ...newEntry, id: allEntries.length + 1, dateCreated: new Date().toISOString() }
//     let updatedEntriesArray = [createdEntry, ...allEntries]
//     const result = { ...storedData, [type]: updatedEntriesArray }
//     // console.log(result)
//     saveDataToLocalStorage(result)
//     return createdEntry
// }

export {
    getOrInitData, loginToApi,
    getDataFromLocalStorage,
    createMessage, editMessage, deleteMessage,
    getAllProjects, getProject, createProject, editProject, deleteProject, assignProject, unAssignProject, getCompanyProjects,
    getAllCompanies, createCompany, editCompany, deleteCompany,
    getAllTickets, createTicket, editTicket, deleteTicket,
    getCustomerTickets, getTicket, getTicketMessages, getModeratorTickets,
    getAllCategories, createCategory, editCategory, deleteCategory, getProjectCategories, getCategory,
    getAllUsers, getCompanyUsers, createUser, editUser, deleteUser, createCustomer,
    getAllRoleAssignments, getAllRoles, addRoleToUser,
    getActiveRolesForUser, getActiveRoleAssignmentsForUser, isUserInRole, isApiUserInRole,
    removeRoleFromUser, getAvailableAgents, getAgentTickets, getAllAgents,
    getAllTicketLogs, createTicketLog, editTicketLog, deleteTicketLog, getTicketLogsByTicketId,
    getSystemSettings, saveSystemSettings
}

