import { getSampleDataFromLocalStorage, saveDataToLocalStorage } from "./utils"
import { sampleData as initialData } from './SampleData.js'

function getAllEntries(type) {
    let data = getDataFromLocalStorage()

    return data[type] || []
}
function getAllProjects() {
    return getAllEntries('projects')
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

function editUser(data) {
    editEntry(data, 'users')
}

function deleteUser(data) {
    deleteEntry(data, 'users')
}
function getAvailableAgents(companyId) {
    let allUsers = getAllUsers()
    let companyUsers = allUsers.filter(user => user.companyId == companyId)
    let companyAgents = companyUsers.filter(user => isUserInRole(1, user.id))
    return companyAgents
}
function isUserInRole(roleId, userId) {
    return true
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
    let allEntries = getAllEntries(type)
    let storedData = getOrInitData()
    let updatedEntriesArray = [{ ...newEntry, id: allEntries.length + 1, dateCreated: new Date().toISOString(), createdBy: 3 }, ...allEntries]
    const result = { ...storedData, [type]: updatedEntriesArray }
    // console.log(result)
    saveDataToLocalStorage(result)
}

export {
    getOrInitData,
    getDataFromLocalStorage,
    getAllProjects, createProject, editProject, deleteProject, assignProject, getCompanyProjects,
    getAllCompanies, createCompany, editCompany, deleteCompany,
    getAllTickets, createTicket, editTicket, deleteTicket, getCustomerTickets,
    getAllCategories, createCategory, editCategory, deleteCategory, getProjectCategories,
    getAllUsers, createUser, editUser, deleteUser,
    getAllRoleAssignments, getAllRoles, addRoleToUser, removeRoleFromUser, getAvailableAgents
}

