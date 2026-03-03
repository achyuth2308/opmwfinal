import PropTypes from 'prop-types'

const FilterBar = ({ filters, activeFilter, onFilterChange }) => {
    return (
        <div
            style={{
                display: 'flex',
                gap: 8,
                flexWrap: 'wrap',
            }}
            role="tablist"
            aria-label="Filter projects"
        >
            {filters.map((filter) => (
                <button
                    key={filter}
                    role="tab"
                    aria-selected={activeFilter === filter}
                    onClick={() => onFilterChange(filter)}
                    className={`filter-tab${activeFilter === filter ? ' active' : ''}`}
                >
                    {filter}
                </button>
            ))}
        </div>
    )
}

FilterBar.propTypes = {
    filters: PropTypes.arrayOf(PropTypes.string).isRequired,
    activeFilter: PropTypes.string.isRequired,
    onFilterChange: PropTypes.func.isRequired,
}

export default FilterBar
