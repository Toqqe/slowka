import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import "../styles/rows.css"

const Rows = ({rowsCols, result, currentRow, jiggling}) =>{
    return(
        <div className="rows-cols-items">
            {rowsCols.map((rows,rowIndex) => (
                <Row key={rowIndex} className={`${currentRow == rowIndex && jiggling?"jiggling":""}`}>
                    {
                        rows.map((el, colIndex)=>{
                            const resultClass = result[rowIndex]?.[colIndex] || '';
                            return(
                            <Col key={colIndex} className={`text-center ${resultClass?`cell-${resultClass}`:""}`}>
                                {el}
                            </Col>
                            )
                        })
                    }
                </Row>
            ))
            }
        </div>
    )
}

export default Rows