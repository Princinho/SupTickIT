import { getSampleDataFromLocalStorage, saveDataToLocalStorage } from "./utils"
import { sampleData as initialData } from './SampleData.js'

function getAllEntries(type) {
    let data = getDataFromLocalStorage()
    return data[type]
}
function getAllProjects() {
    return getAllEntries('projects')
}
function getAllCompanies() {
    let data = getDataFromLocalStorage()
    return data.companies
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
function getDataFromLocalStorage() {
    return getOrInitData()
}
function createProject(newProject) {
    let allProjects = getAllProjects()
    let storedData = getOrInitData()
    let updatedProjectsArray = [{ ...newProject, id: allProjects.length + 1, dateCreated: new Date().toISOString(), createdBy: 3 }, ...allProjects]
    saveDataToLocalStorage({ ...storedData, projects: updatedProjectsArray })

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
function createCompany(data) {
    create(data, 'companies')
}
function editEntry(updatedEntry, type) {
    let allEntries = getAllEntries(type)
    let storedData = getOrInitData()
    let updatedEntriesArray = allEntries.map(entry => entry.id == updatedEntry.id ? {
        ...entry, ...updatedEntry
    } : entry)
    saveDataToLocalStorage({ ...storedData, [type]: updatedEntriesArray })
}
function editCompany(company) {
    editEntry(company, 'companies')
}
function deleteEntry(data, type) {
    let allEntries = getAllEntries(type)
    let storedData = getOrInitData()
    let updatedEntriesArray = allEntries.filter(p => p.id != data.id)
    saveDataToLocalStorage({ ...storedData, projects: updatedEntriesArray })
}

function deleteCompany(data) {
    deleteEntry(data, 'companies')
}
function create(newEntry, type) {
    let allEntries = getAllEntries(type)
    let storedData = getOrInitData()
    let updatedEntriesArray = [{ ...newEntry, id: allEntries.length + 1, dateCreated: new Date().toISOString(), createdBy: 3 }, ...allEntries]
    saveDataToLocalStorage({ ...storedData, [type]: updatedEntriesArray })
}

export {
    getOrInitData,
    getDataFromLocalStorage,
    getAllProjects, createProject, editProject, deleteProject,
    getAllCompanies, createCompany, editCompany, deleteCompany
}
