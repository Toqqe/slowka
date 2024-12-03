import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import classNames from 'classnames';
import "../styles/keyboard.css"

const Keyboard = ({handleClickKeyboard, handleEnterGuess,handleDeleteLetter, guessess}) => {
    const keyboardFirst = ['Q', 'W', 'E', 'Ę', 'R', 'T', 'Y', 'U', 'I', 'O', 'Ó', 'P']
    const keyboardSecond = ['A', 'Ą','S', 'Ś','D', 'F', 'G', 'H', 'J', 'K', 'L']
    const keyboardThird = ['Z', 'Ś','X', 'C', 'Ć', 'V', 'B', 'N', 'M']

    return(
        <Container className="keyboard-container" fluid>
            <Row>
                {keyboardFirst.map((el, i)=>(
                    <Key key={i} value={el} onClick={handleClickKeyboard} status={guessess[el]}/>
                ))}
            </Row>  
            <Row>
                {keyboardSecond.map((el, i)=>(
                    <Key key={i} value={el} onClick={handleClickKeyboard} name={`ee ${el}`} status={guessess[el]}/>
                ))}
            </Row>  
            <Row>
                <div className="enter-keyboard" onClick={handleEnterGuess} style={{width:'auto', padding:"10px"}}>ENTER</div>
                {keyboardThird.map((el, i)=>(
                    <Key key={i} value={el} onClick={handleClickKeyboard} status={guessess[el]}/>
                ))}
                <div onClick={handleDeleteLetter} >
                    <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" class="bi bi-backspace" viewBox="0 0 16 15">
                        <path d="M5.83 5.146a.5.5 0 0 0 0 .708L7.975 8l-2.147 2.146a.5.5 0 0 0 .707.708l2.147-2.147 2.146 2.147a.5.5 0 0 0 .707-.708L9.39 8l2.146-2.146a.5.5 0 0 0-.707-.708L8.683 7.293 6.536 5.146a.5.5 0 0 0-.707 0z"/>
                        <path d="M13.683 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7.08a2 2 0 0 1-1.519-.698L.241 8.65a1 1 0 0 1 0-1.302L5.084 1.7A2 2 0 0 1 6.603 1zm-7.08 1a1 1 0 0 0-.76.35L1 8l4.844 5.65a1 1 0 0 0 .759.35h7.08a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z"/>
                    </svg>
                </div>
            </Row>  

        </Container>
    )
}

const Key = ({value, status, onClick, name}) =>{
    const classes = classNames({
        'absent' : status === 'absent',
        'correct' : status === 'green',
        'present' : status === 'yellow'
    })

    
    return(
        <div key={value} className={`${value} ${classes}`} onClick={() => onClick(value)}>
            <span>
                {value}
            </span>
        </div>
    )
}

export {Keyboard}