import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import classNames from 'classnames';
import "../styles/keyboard.css"

const Keyboard = ({handleClickKeyboard, handleEnterGuess,handleDeleteLetter, guessess}) => {
    const keyboardFirst = ['Q', 'W', 'E', 'Ę', 'R', 'T', 'Y', 'U', 'I', 'O', 'Ó', 'P']
    const keyboardSecond = ['A', 'Ą','S', 'Ś','D', 'F', 'G', 'H', 'J', 'K', 'L']
    const keyboardThird = ['Z', 'Ś','X', 'C', 'Ć', 'V', 'B', 'N', 'M']

    return(
        <Container className="keyboard-container">
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
                <div onClick={handleEnterGuess} style={{width:'auto', padding:"10px"}}>ENTER</div>
                {keyboardThird.map((el, i)=>(
                    <Key key={i} value={el} onClick={handleClickKeyboard} status={guessess[el]}/>
                ))}
                <div onClick={handleDeleteLetter}>-</div>
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
        <div key={value} name={name} className={classes} onClick={() => onClick(value)}>
            {value}
        </div>
    )
}

export {Keyboard}