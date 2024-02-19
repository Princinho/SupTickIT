import { SYSTEM_ROLES, getSampleDataFromLocalStorage, saveDataToLocalStorage } from "./utils"
import { sampleData as initialData } from './SampleData.js'
import axios from "axios"
export const API_BASE = 'https://localhost:7223/api/'
export const SERVER_BASE = 'https://localhost:7223/'
const PROJECTS_ENDPOINT = 'projects'
function getAllEntries(type) {
    let data = getDataFromLocalStorage()

    return data[type] || []
}
function getSingleton(type) {
    let data = getDataFromLocalStorage()
    return data[type] || null
}
async function getSingleAsync(endpoint, id) {

    return (await getAsync(endpoint + "/" + id))
}
async function loginToApi({ username, password }) {
    let response = await axios.post(API_BASE + "Authentication/Login", {
        Username: username,
        Password: password
    })
    return response.data
}

async function getAllProjectsAsync() {
    let response = await (await axios.get(`${API_BASE}${PROJECTS_ENDPOINT}`)).data
    return response
}
async function create(data, endpoint) {
    await axios.post(API_BASE + endpoint, data)
}
async function remove(id, endpoint) {
    return await axios.delete(`${API_BASE}${endpoint}/${id}`)
}
async function getAsync(endpoint) {
    let response = (await axios.get(`${API_BASE}${endpoint}`)).data
    return response
}
function getProject(id) {
    if (!id) return null
    return getAllEntries(PROJECTS_ENDPOINT).find(p => p.id == id)
}

function getOrInitData() {
    let storedData = getSampleDataFromLocalStorage()
    if (!storedData) {
        storedData = initialData
        saveDataToLocalStorage(initialData)

    }
    return storedData
}
function getSystemSettings() {
    return getSingleton('settings')
}
function saveSystemSettings(settings) {
    saveSingleton('settings', settings)
}
function saveSingleton(type, settings) {
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
    await edit(updatedProject, PROJECTS_ENDPOINT)
}

async function assignAgent(agentId, ticketId) {
    let url = `${API_BASE}Tickets/${ticketId}/assignTo/${agentId}`
    await axios.put(url)
}
async function deleteProject(id) {
    await remove(id, PROJECTS_ENDPOINT)
}
function editEntry(updatedEntry, type) {
    let allEntries = getAllEntries(type)
    let storedData = getOrInitData()
    let updatedEntriesArray = allEntries.map(entry => entry.id == updatedEntry.id ? {
        ...entry, ...updatedEntry
    } : entry)
    saveDataToLocalStorage({ ...storedData, [type]: updatedEntriesArray })
}
async function edit(updatedEntry, endpoint) {
    let updateUrl = `${API_BASE}${endpoint}/${updatedEntry.id}`
    console.log(updateUrl, endpoint)
    let response = (await axios.put(updateUrl, updatedEntry)).data
    return response
}

function deleteEntry(data, type) {
    let allEntries = getAllEntries(type)
    let storedData = getOrInitData()
    let updatedEntriesArray = allEntries.filter(p => p.id != data.id)
    saveDataToLocalStorage({ ...storedData, [type]: updatedEntriesArray })
}
async function getAllCompaniesAsync() {
    return await getAsync('companies') || []
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
async function getAllTicketsAsync() {
    return await getAsync('tickets') || []

}
async function getCustomerTicketsAsync(customerId) {
    if (!customerId) return []
    let customerTickets = await getAsync(`Tickets/customer/${customerId}`)
    return customerTickets
}
async function getTicketsAssignedByMod(moderatorId) {
    if (!moderatorId) return []
    let customerTickets = await getAsync(`Tickets/moderator/${moderatorId}`)
    return customerTickets
}

async function getTicket(id) {
    return await getAsync(`tickets/${id}`)
}

async function getTicketMessagesAsync(ticketId) {
    let messages = await getAsync(`tickets/${ticketId}/messages`)
    console.log(messages)
    return messages
}
async function getTicketAttachmentsAsync(ticketId) {
    let messages = await getAsync(`attachments/byticket/${ticketId}`)
    console.log(messages)
    return messages
}

async function createMessageAsync(entry) {
    let message = await create(entry, 'messages')
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
    return ticketLogs
}
function getTicketLogsByTicketId(id) {
    let ticketLogs = getAllEntries('ticketLogs').filter(log => log.ticketId == id)
    return ticketLogs
}
function createTicketLog(entry) {
    // create(entry, 'ticketLogs')
}

function editTicketLog(entry) {
    editEntry(entry, 'ticketLogs')
}

function deleteTicketLog(entry) {
    deleteEntry(entry, 'ticketLogs')
}

async function getAgentTickets(id) {
    return await getAsync(`tickets/agent/${id}`)
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
async function getCompanyProjects(companyId) {
    if (!companyId) return [
    ]
    let projects = await getAllProjectsAsync()
    let company = (await getAllCompaniesAsync()).find(c => c.id == companyId)
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
async function changePassword(payload) {
    const passwordChangeEndpoint = API_BASE + "authentication/changepassword"
    var response = await axios.post(passwordChangeEndpoint, payload)
    if (response.data) return true
}
async function resetPassword(user) {
    const passwordChangeEndpoint = API_BASE + "authentication/ResetUserPassword/" + user.username
    await axios.post(passwordChangeEndpoint, user)
}
async function editTicket(ticket) {
    console.log(ticket)
    await edit(ticket, 'tickets')
    if (ticket.agentId) {
        await assignAgent(ticket.agentId, ticket.id)
    }
}
async function deleteAttachmentAsync(attachment) {
    console.log(attachment)
    await remove(attachment.id, 'attachments')

}

function generateTicketLogForTicketMessage(message) {
    if (!message.id) {
        throw (new Error("Cannot log changes for ticket with undefined id"))
    }

    let ticketLog = null

    ticketLog = {
        date: new Date().toISOString(), ticketId: message.id,
        content: "Nouveau message pour le ticket",
        ...message
    }
    return ticketLog
}
function deleteTicket(data) {
    deleteEntry(data, 'tickets')
}
async function getAllCategories() {
    return await getAsync('ticketcategories')
}
async function getCategoryAsync(id) {
    let response = (await axios.get(`${API_BASE}ticketcategories/${id}`)).data
    return response

}
async function createCategoryAsync(data) {
    await create(data, 'ticketCategories')
}

function editCategory(data) {
    edit(data, 'ticketCategories')
}

async function deleteCategory(id) {
    await remove(id, 'ticketCategories')
}
async function getProjectCategoriesAsync(projectId) {
    let allCategories = await getAllCategories()
    return allCategories.filter(cat => cat.projectId == projectId)
}
async function getAllUsersAsync() {
    return await getAsync('users')

}

async function createUser(data) {
    await create(data, 'authentication/register')
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
async function getAvailableAgents(companyId) {
    let companyAgents = (await getCompanyUsers(companyId)).filter(user => isUserInRole(SYSTEM_ROLES.AGENT, user.id))
    return companyAgents
}
async function getAllAgents() {
    let allAgents = await getAllUsersAsync()
    let companyAgents = allAgents.filter(user => isUserInRole(SYSTEM_ROLES.AGENT, user.id))
    return companyAgents
}

async function getCompanyUsers(companyId) {
    let users = await getAllUsersAsync()

    return users.filter(u => u.companyId == companyId && !u.roles.some(r => r == SYSTEM_ROLES.ADMIN || r == SYSTEM_ROLES.AGENT || r == SYSTEM_ROLES.MODERATOR))
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
async function getActiveRolesForUser(userId) {
    let activeRoleAssignments = await getAllActiveRoleAssignments()
    let userRoleAssignments = activeRoleAssignments.filter(r => r.userId == userId)
    let activeRoles = userRoleAssignments//.map(roleAssignment => allRoles.find(role => role.id == roleAssignment.roleId))
    return activeRoles
}
async function getActiveRoleAssignmentsForUser(userId) {
    if (!userId) return []
    let allRoleAssignments = getAllRoleAssignments()
    let roleAssignments = allRoleAssignments.filter(roleAssignment => roleAssignment.userId == userId && isRoleAssignmentActive(roleAssignment))
    return roleAssignments
}
async function isUserInRole(roleId, userId) {
    if (!userId || !roleId) return false
    let userActiveRoles = await getActiveRolesForUser(userId)
    return userActiveRoles.some(role => role.id == roleId)
}
function isApiUserInRole(roleId, user) {
    if (!user) return false
    if (!user.RoleAssignments) return false
    let roleAssignments = user.RoleAssignments
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
async function getAllRoleAssignments() {
    return await getAsync('authentication/roles')
}
function getAllRoles() {
    return getAllEntries('roles')
}
async function getAllActiveRoleAssignments() {
    return await getAsync('authentication/activeroles')
}
async function addRoleToUser(roleAssignment) {
    await create(roleAssignment, 'users/assignrole')
}
async function removeRoleFromUser(id) {
    // let allEntries = getAllEntries('roleAssignments')
    // let storedData = getOrInitData()
    // let updatedEntriesArray = allEntries.filter(p =>
    //     !(p.roleId == roleAssignment.roleId && p.userId == roleAssignment.userId)
    // )
    // saveDataToLocalStorage({ ...storedData, roleAssignments: updatedEntriesArray })
    await axios.delete(`${API_BASE}users/unassignrole/${id}`)
}


export {
    getOrInitData, loginToApi,
    getDataFromLocalStorage, getSingleAsync,
    createMessageAsync, editMessage, deleteMessage,
    getAllProjectsAsync, getProject, createProject, editProject, deleteProject, assignProject, unAssignProject, getCompanyProjects,
    getAllCompaniesAsync, createCompany, editCompany, deleteCompany,
    getAllTicketsAsync, createTicket, editTicket, deleteTicket,
    getCustomerTicketsAsync, getTicket, getTicketMessagesAsync, getTicketsAssignedByMod,
    getAllCategories, createCategoryAsync, editCategory, deleteCategory, getProjectCategoriesAsync, getCategoryAsync,
    getAllUsersAsync, getCompanyUsers, createUser, editUser, deleteUser, createCustomer,
    getAllRoleAssignments, getAllRoles, addRoleToUser, changePassword, resetPassword,
    getActiveRolesForUser, getActiveRoleAssignmentsForUser, isUserInRole, isApiUserInRole,
    removeRoleFromUser, getAvailableAgents, getAgentTickets, getAllAgents,
    getAllTicketLogs, createTicketLog, editTicketLog, deleteTicketLog, getTicketLogsByTicketId, getTicketAttachmentsAsync, deleteAttachmentAsync,
    getSystemSettings, saveSystemSettings
}

