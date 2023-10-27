export function sortAndFilterData(applications, searchTerm, sortOption) {
    let result = applications
    if (searchTerm)
        result = result.filter(a => a.title?.toLowerCase().includes(searchTerm.toLowerCase()))
    if (sortOption?.option == 'dateCreated') {
        result = result.sort((a, b) => {
            return new Date(b.dateCreated) - new Date(a.dateCreated)
        })
    }
    if (sortOption?.option == 'title' || sortOption?.option == 'id') {
        let { option } = sortOption
        result = result.sort((a, b) => {
            return (('' + a[option]).toLowerCase()).localeCompare(('' + b[option]).toLowerCase());
        })
    }
    if (sortOption?.option == 'id') {
        result = result.sort((a, b) => {
            return a.id - b.id
        })
    }
    return result
}