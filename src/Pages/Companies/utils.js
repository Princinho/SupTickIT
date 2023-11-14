export function sortAndFilterData(projects, searchTerm, sortOption) {
    if (!projects) return []
    let result = projects
    if (searchTerm)
        result = result.filter(a => a.title?.toLowerCase().includes(searchTerm.toLowerCase()))
    if (sortOption?.option == 'dateCreated') {
        result = result.sort((a, b) => {
            return new Date(b.dateCreated) - new Date(a.dateCreated)
        })
    } else if (sortOption?.option == 'id') {
        result = result.sort((a, b) => {
            return a.id - b.id
        })
    } else {
        let { option } = sortOption
        result = result.sort((a, b) => {
            return (('' + a[option]).toLowerCase()).localeCompare(('' + b[option]).toLowerCase());
        })
    }
    return result
}