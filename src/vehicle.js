import { useEffect, useState, useRef } from "react"
import Styles from "./vehicle.module.css"

const Vehicle = ({ searchQuery }) => {
  const [vehicle, setVehicle] = useState([])
  const [selectedVehicleDetails, setSelectedVehicleDetails] = useState(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const vehicleContainerRef = useRef(null)

  // fetches people from SWAPI
  useEffect(() => {
    fetch("https://swapi.dev/api/vehicles/")
      .then((response) => response.json())
      .then((data) => {
        setVehicle(data.results)
      })
      .catch((error) => {
        console.log("Failed to fetch data from SWAPI", error)
      })
  }, [])
  //
  // search function
  useEffect(() => {
    let apiUrl = "https://swapi.dev/api/vehicles/"
    if (searchQuery) {
      apiUrl += `?search=${encodeURIComponent(searchQuery)}`
    }

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setVehicle(data.results)
      })
      .catch((error) => {
        console.log("Failed to fetch data from SWAPI", error)
      })
  }, [searchQuery])
  //

  //   fetches details about a vehicle from SWAPI
  const handleVehicleClick = (vehicle) => {
    fetch(vehicle.url)
      .then((response) => response.json())
      .then((data) => {
        setSelectedVehicleDetails(data)
        setIsExpanded(true)
      })
      .catch((error) => {
        console.log("Failed to fetch vehicle details", error)
      })
  }
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
  //closes selected vehicles details container
  const handleClose = () => {
    setIsExpanded(null)
  }
  // closes the expansion when user clicks outside of its boundaries
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        vehicleContainerRef.current &&
        !vehicleContainerRef.current.contains(event.target)
      ) {
        setIsExpanded(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])
  //

  return (
    // container that shows a list of vehicles
    <div
      ref={vehicleContainerRef}
      className={`${Styles.vehicleContainer} ${
        isExpanded ? Styles.vehicleContainerExpanded : ""
      }`}
    >
      <div className={Styles.VehicleListContainer}>
        <h1 className={Styles.title}>Vehicles</h1>

        {vehicle.length === 0 ? (
          <p className={Styles.notFound}>{searchQuery} cannot be found.</p>
        ) : (
          <div className={Styles.vehicleList}>
            {vehicle.map((vehicle, index) => (
              <div
                key={index}
                className={Styles.vehicle}
                onClick={() => handleVehicleClick(vehicle)}
              >
                <p className={Styles.vehicleName}>{vehicle.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      {/*  */}

      {/* expands the container showing detailed information about the vehicle */}
      {selectedVehicleDetails && (
        <div
          className={`${Styles.selectedVehiclesContainer} ${
            isExpanded ? Styles.selectedVehiclesContainerExpanded : ""
          }`}
        >
          <div className={Styles.selectedVehiclesHeader}>
            <h2 className={Styles.selectedTitle}>
              {selectedVehicleDetails.name}
            </h2>
            <span className={Styles.closeButton} onClick={handleClose}>
              &times;
            </span>
          </div>

          <div className={Styles.selectedVehiclesTable}>
            {!isUnknownValue(selectedVehicleDetails.model) && (
              <div className={Styles.vehiclesDetailsContainer}>
                <p className={Styles.vehicleDetailsTitle}>Model:</p>
                <p className={Styles.vehicleDetail}>
                  {selectedVehicleDetails.model}
                </p>
              </div>
            )}
            {!isUnknownValue(selectedVehicleDetails.manufacturer) && (
              <div className={Styles.vehiclesDetailsContainer}>
                <p className={Styles.vehicleDetailsTitle}>Manufacturer:</p>
                <p className={Styles.vehicleDetail}>
                  {selectedVehicleDetails.manufacturer}
                </p>
              </div>
            )}
            {!isUnknownValue(selectedVehicleDetails.cost_in_credits) && (
              <div className={Styles.vehiclesDetailsContainer}>
                <p className={Styles.vehicleDetailsTitle}>Cost in Credits: </p>
                <p className={Styles.vehicleDetail}>
                  {selectedVehicleDetails.cost_in_credits}
                </p>
              </div>
            )}
            {!isUnknownValue(selectedVehicleDetails.length) && (
              <div className={Styles.vehiclesDetailsContainer}>
                <p className={Styles.vehicleDetailsTitle}>Length:</p>
                <p className={Styles.vehicleDetail}>
                  {selectedVehicleDetails.length}
                </p>
              </div>
            )}
            {!isUnknownValue(selectedVehicleDetails.max_atmosphering_speed) && (
              <div className={Styles.vehiclesDetailsContainer}>
                <p className={Styles.vehicleDetailsTitle}>
                  Max Atmosphering Speed:
                </p>
                <p className={Styles.vehicleDetail}>
                  {selectedVehicleDetails.max_atmosphering_speed}
                </p>
              </div>
            )}
            {!isUnknownValue(selectedVehicleDetails.passangers) && (
              <div className={Styles.vehiclesDetailsContainer}>
                <p className={Styles.vehicleDetailsTitle}>Passangers:</p>
                <p className={Styles.vehicleDetail}>
                  {selectedVehicleDetails.passangers}
                </p>
              </div>
            )}
            {!isUnknownValue(selectedVehicleDetails.cargo_capacity) && (
              <div className={Styles.vehiclesDetailsContainer}>
                <p className={Styles.vehicleDetailsTitle}>Cargo Capacity:</p>
                <p className={Styles.vehicleDetail}>
                  {selectedVehicleDetails.cargo_capacity}
                </p>
              </div>
            )}
            {!isUnknownValue(selectedVehicleDetails.consumables) && (
              <div className={Styles.vehiclesDetailsContainer}>
                <p className={Styles.vehicleDetailsTitle}>Consumables:</p>
                <p className={Styles.vehicleDetail}>
                  {selectedVehicleDetails.consumables}
                </p>
              </div>
            )}
            {!isUnknownValue(selectedVehicleDetails.vehicle_class) && (
              <div className={Styles.vehiclesDetailsContainer}>
                <p className={Styles.vehicleDetailsTitle}>Vehicle Class:</p>
                <p className={Styles.vehicleDetail}>
                  {selectedVehicleDetails.vehicle_class}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
      {/*  */}
    </div>
  )
}

export default Vehicle
