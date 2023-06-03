import React, { useEffect, useState, useRef } from "react"
import Styles from "./People.module.css"

const People = ({ searchQuery }) => {
  const [people, setPeople] = useState([])
  const [selectedPerson, setSelectedPerson] = useState(null)
  const containerRef = useRef(null)
  // fetches people from SWAPI
  useEffect(() => {
    fetch("https://swapi.dev/api/people/")
      .then((response) => response.json())
      .then((data) => {
        setPeople(data.results)
      })
      .catch((error) => {
        console.log("Failed to fetch data from SWAPI", error)
      })
  }, [])
  //

  // search function
  useEffect(() => {
    let apiUrl = "https://swapi.dev/api/people/"
    if (searchQuery) {
      apiUrl += `?search=${encodeURIComponent(searchQuery)}`
    }

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setPeople(data.results)
      })
      .catch((error) => {
        console.log("Failed to fetch data from SWAPI", error)
      })
  }, [searchQuery])
  //

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
  // sets the selected person after click
  const handlePersonClick = (person) => {
    setSelectedPerson(person)
  }
  //
  // closes selected persons container
  const handleClose = () => {
    setSelectedPerson(null)
  }
  //

  // closes popup when user clicks outside of its boundaries
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setSelectedPerson(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])
  //
  // hides unknown values
  const isUnknownValue = (value) => {
    return (
      !value ||
      value === "" ||
      value.toLowerCase() === "unknown" ||
      value.toLowerCase() === "none"
    )
  }
  //

  return (
    <div className={Styles.peopleContainer}>
      {/* container that shows people */}
      <h1 className={Styles.title}>People</h1>
      {people.length === 0 ? (
        <p className={Styles.notFound}>{searchQuery} cannot be found.</p>
      ) : (
        <div className={Styles.peopleList}>
          {people.map((person, index) => (
            <div
              key={index}
              className={Styles.person}
              onClick={() => handlePersonClick(person)}
            >
              <img
                src={getPersonImage(person)}
                alt={person.name}
                className={Styles.peopleImage}
              />
              <p className={Styles.peopleName}>{person.name}</p>
            </div>
          ))}
        </div>
      )}

      {/*  */}

      {/* popup container that shows selected persons details */}
      {selectedPerson && (
        <div className={Styles.modalContainer}>
          <div className={Styles.modal} ref={containerRef}>
            <div className={Styles.modalHeader}>
              <h2 className={Styles.selectedPersonTitle}>
                {selectedPerson.name}
              </h2>
              <span className={Styles.closeButton} onClick={handleClose}>
                &times;
              </span>
            </div>
            <div className={Styles.modalMiniContainer}>
              <img
                src={getPersonImage(selectedPerson)}
                alt={selectedPerson.name}
                className={Styles.selectedPersonImage}
              />
              <ul className={Styles.selectedPersonUlist}>
                {!isUnknownValue(selectedPerson.height) && (
                  <li className={Styles.selectedPersonList}>
                    Height: {selectedPerson.height + "cm"}
                  </li>
                )}
                {!isUnknownValue(selectedPerson.mass) && (
                  <li className={Styles.selectedPersonList}>
                    Mass: {selectedPerson.mass + "kg"}
                  </li>
                )}
                {!isUnknownValue(selectedPerson.gender) && (
                  <li className={Styles.selectedPersonList}>
                    Gender: {selectedPerson.gender}
                  </li>
                )}
                {!isUnknownValue(selectedPerson.birth_year) && (
                  <li className={Styles.selectedPersonList}>
                    Birth Year: {selectedPerson.birth_year}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
      {/*  */}
    </div>
  )
}

export default People
