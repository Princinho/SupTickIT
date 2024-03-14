export function sortAndFilterData(entries, searchTerm, sortOption) {
  if (!entries) return []
  let result = Array.from(entries)
  if (searchTerm)
    result = result.filter(a => a.title?.toLowerCase().includes(searchTerm.toLowerCase()) || a.name?.toLowerCase().includes(searchTerm.toLowerCase()))
  if (sortOption?.option == 'dateCreated') {
    result = result.sort((a, b) => {
      return new Date(b.dateCreated) - new Date(a.dateCreated)
    })
  }
  else if (sortOption?.option == 'id') {
    result = result.sort((a, b) => {
      return a.id - b.id
    })
  }
  else {
    let { option } = sortOption
    result = result.sort((a, b) => {
      return (('' + a[option]).toLowerCase()).localeCompare(('' + b[option]).toLowerCase());
    })
  }
  return result
}
export function timeSince(date) {

  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " ans";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " mois";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " jours";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " heures";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " secondes";
}
var aDay = 24 * 60 * 60 * 1000;
console.log(timeSince(new Date(Date.now() - aDay)));
console.log(timeSince(new Date(Date.now() - aDay * 2)));