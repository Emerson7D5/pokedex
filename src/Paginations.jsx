import React from 'react'

 const Paginations = ({pagNumber}) => {
    return (
        <nav>
            <ul className="pagination">
                <li key="1" className="page-item">
                    <a href="!#" onClick={() => pagNumber(1)} className="page-link">
                        1
                    </a>
                </li>
                <li key="2" className="page-item">
                    <a href="!#" onClick={() => pagNumber(2)}className="page-link">
                        2
                    </a>
                </li>
                <li key="3" className="page-item">
                    <a href="!#" onClick={() => pagNumber(3)}className="page-link">
                        3
                    </a>
                </li>
                <li key="4" className="page-item">
                    <a href="!#" onClick={() => pagNumber(4)} className="page-link">
                        4
                    </a>
                </li>
                <li key="5" className="page-item">
                    <a href="!#" onClick={() => pagNumber(5)} className="page-link">
                        5
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default Paginations