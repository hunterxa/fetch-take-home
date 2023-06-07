import PropTypes from 'prop-types'
import Option from './Option'
import './filterbox.css'

function FilterBox({ options, selectedOptions, setSelectedOptions }) {
  const optionsList = options.map((option, index) => {
    //Create a handleCheck function for the current option
    function handleCheck() {
      if (selectedOptions.includes(option)) {
        setSelectedOptions(prevOptions => prevOptions.filter(prevOption => prevOption !== option))
      } else {
        setSelectedOptions(prevOptions => [...prevOptions, option])
      }
    }
    return (
      <div className="filter-option" key={index}>
        <Option value={option} handleCheck={handleCheck} checked={selectedOptions.includes(option)} />
      </div>
    )
  })

  return (
    <div className="filter-box">
      {optionsList}
    </div>
  )
}

FilterBox.propTypes = {
  options: PropTypes.array.isRequired,
  selectedOptions: PropTypes.array.isRequired,
  setSelectedOptions: PropTypes.func.isRequired
}

export default FilterBox