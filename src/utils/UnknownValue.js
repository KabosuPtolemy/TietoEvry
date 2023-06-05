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
export { isUnknownValue }
