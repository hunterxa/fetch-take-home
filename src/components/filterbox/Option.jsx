import PropTypes from 'prop-types'
import './option.css'

function Option({ value, handleCheck, checked }) {
  return (
    <div className="option">
      <input
        type="checkbox"
        name={value}
        checked={checked}
        onChange={handleCheck}
      />
      <label htmlFor={value}>{value}</label>
    </div>
  )
}

Option.propTypes = {
  value: PropTypes.string.isRequired,
  handleCheck: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired
}

export default Option