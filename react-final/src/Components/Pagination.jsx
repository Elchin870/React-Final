import "../css/MainPart.css"

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    const buttons = []
    for (let i = 1; i <= totalPages; i++) {
        buttons.push(
            <button
                key={i}
                className={`pageButton ${currentPage === i ? "active" : ""}`}
                onClick={() => onPageChange(i)}
            >
                {i}
            </button>
        )
    }

    return <div className="pagination">{buttons}</div>
}

export default Pagination
