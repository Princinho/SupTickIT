const DATA_LOCALSTORAGE_KEY = 'com.cognitive-factory.SupTickIt'
function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name) {
    if (!name) return
    const subNames = name.split(' ')
    const firstName = subNames[0]
    let lastName = null
    if (subNames.length > 1)
        lastName = subNames[1]
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${firstName[0]}${lastName ? lastName[0] : firstName[1]}`,
    };
}
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1))
}
function getSampleDataFromLocalStorage() {

    let rawData = localStorage.getItem(DATA_LOCALSTORAGE_KEY)
    let parsedData = null
    try {
        parsedData = JSON.parse(rawData)
    } catch (error) {
        console.log(error)
    }
    return parsedData
}
function saveDataToLocalStorage(data) {

    localStorage.setItem(DATA_LOCALSTORAGE_KEY, JSON.stringify(data))
}
function addOnemonth(date) {
    var d = date.getDate();
    date.setMonth(date.getMonth() + +1);
    if (date.getDate() != d) {
        date.setDate(0);
    }
    return date;
}
function sortAndFilterData(array, searchTerm, sortOption) {
    let result = array
    if (searchTerm)
        result = result.filter(a => a.title?.toLowerCase().includes(searchTerm.toLowerCase()) || a.name?.toLowerCase().includes(searchTerm.toLowerCase())
            || a.firstName?.toLowerCase().includes(searchTerm.toLowerCase())
            || a.lastName?.toLowerCase().includes(searchTerm.toLowerCase()))
    if (sortOption == 'dateCreated') {
        result = result.sort((a, b) => {
            return new Date(b.dateCreated) - new Date(a.dateCreated)
        })
    } else if (sortOption == 'id') {
        result = result.sort((a, b) => {
            return a.id - b.id
        })
    } else {

        result = result.sort((a, b) => {
            return (('' + a[sortOption]).toLowerCase()).localeCompare(('' + b[sortOption]).toLowerCase());
        })
    }
    // console.log(result)
    return result
}
export { stringAvatar, stringToColor, getSampleDataFromLocalStorage, saveDataToLocalStorage, getRandomNumber, addOnemonth, sortAndFilterData }