import Container from "react-bootstrap/Container"
import Board from "./_components/Board"


const Main = () =>{

    return(
        <Container fluid>
            <h1 className="text-center m-5">Słówka</h1>

            <Board/>
        </Container>
    )
}

export default Main