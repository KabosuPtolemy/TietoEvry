// gets images for people from SWAPI
const getPersonImage = (person) => {
  const personId = extractIdFromUrl(person.url)
  return `https://starwars-visualguide.com/assets/img/characters/${personId}.jpg`
}
//

// extracts the ID from the URL
const extractIdFromUrl = (url) => {
  const regex = /\/(\d+)\/$/
  const match = url.match(regex)
  if (match && match[1]) {
    return match[1]
  }
  return null
}
//

export { getPersonImage }
