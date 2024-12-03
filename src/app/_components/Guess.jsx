
const Guess = ({currentRow, handleInputLetter, handleDeleteLetter, handleEnterGuess}) =>{
    
    useEffect(()=>{
        const handleKeyDown = (e) =>{
            const key = e.key;

            if (/^[a-zA-ZÀ-ž]$/.test(key)) {
                handleInputLetter(key);
            }else if(key === 'Backspace'){
                handleDeleteLetter();
            }else if(key === 'Enter'){
                handleEnterGuess();
            }
        }
        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    },[currentRow])
}

export default Guess