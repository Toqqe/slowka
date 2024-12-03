import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import { useState, useEffect } from "react"
import {CHANCES, LETTERS}  from "../chances.js"
import { wordsList } from "../WordsList.js"

import Guess from "./Guess.jsx"
import Rows from "./Rows.jsx"
import {Keyboard} from "./Keyboard.jsx"
import { StopGameModal } from "./Modal.jsx"
import {AlertToast} from "./AlertToast.jsx"

import {charStatuses} from "../charStatuses"


const Board = () =>{
    
    const [userStats, setUserStats] = useState({ wins: 0, attempts: 0 })

    useEffect( () => {
        const savedStats = JSON.parse(localStorage.getItem('userStats')) || {wins:0, attempts:0};
        setUserStats(savedStats);
    },[])


    const [rowsCols, setRowsCols] = useState(Array(CHANCES).fill().map(()=>Array(LETTERS).fill('')))
    const [result, setResult] = useState(Array(CHANCES).fill().map(()=>Array(LETTERS).fill('')));
    const [guessess, setGuessess] = useState(charStatuses);
    const [modalView, setModalView] = useState(false);

    const [toastInfo, setToastInfo] = useState(null);
    const [showToast, setShowToast] = useState(false);

    const [jiggling, setJiggling] = useState(false)
    const [winner, setWinner] = useState(null)
    const [currentRow, setCurrentRow] = useState(0);

    const [PASS, setPASS] = useState(()=>{
        let length = wordsList.length;
        let index = Math.floor(Math.random() * length);
        return wordsList[index]
    });

    const handleClickKeyboard = (letter) =>{
        handleInputLetter(letter)
    }

    const handleInputLetter = (letter) =>{
        if(winner === null){
            setJiggling(false);
            const newRowsCols = [...rowsCols];
            const row = newRowsCols[currentRow];
            const col = row.findIndex(el => el === '');
            if(col === -1){
                return
            }
            row[col] = letter;
            setRowsCols(newRowsCols);
        }
    }
    
    const handleDeleteLetter = () => {
        setJiggling(false);
        const newRowsCols = [...rowsCols];
        const row = newRowsCols[currentRow];
        const col = row.findLastIndex(el => el != '');
        if(col === -1){
            return
        }
        row[col] = '';
        setRowsCols(newRowsCols);
    }

    const handleEnterGuess = ()=>{

        if(winner === null){
            setJiggling(false)
            const newRowsCols = [...rowsCols];
            const row = newRowsCols[currentRow];
            const enteredWord = row.join("");
            if(checkWord(enteredWord)){
                checkWordCompare(enteredWord);
            }
        }
    }

    const checkWordCompare = (word) =>{
        const result = Array(LETTERS).fill('');
        const passArray = PASS.toUpperCase().split('');
        const userWord = word.toUpperCase().split('')

        // Green
        userWord.forEach((el, ind) => {
            if(userWord[ind] === passArray[ind]){
                result[ind] = 'green';
                passArray[ind] = null;
                userWord[ind] = null;
                setGuessess((prev) => ({
                    ...prev,
                    [el]: 'green'
                }))
            }else{
                setGuessess((prev) => ({
                    ...prev,
                    [el]: 'absent'
                }))
            }
        })
        // Yellow
        userWord.forEach((el,ind)=>{
            if(passArray.includes(userWord[ind]) && result[ind] != 'green'){
                result[ind] = 'yellow';
                passArray[passArray.indexOf(userWord[ind])] = null;
                setGuessess((prev) => ({
                    ...prev,
                    [el] : 'yellow'
                }))

            }
        })

        setResult((prevResult) =>{
            const newResult = [...prevResult];
            newResult[currentRow] = result;
            return newResult;
        })

        if(checkWin(result)){
            const isWinner = true;
            setWinner(isWinner);
            setCurrentRow((prev) => prev + 1)
            stopGame(isWinner);
        }else{
            setCurrentRow(
                (prev)=> {
                    const nPrev = prev + 1
                    if(nPrev === CHANCES && winner != true){
                        setWinner(false);
                        stopGame();
                        return prev + 1
                    }
                    return nPrev
                }
            );
        }
    }

    const checkWin = (resultList) =>{
        return resultList.every((color) => color === "green");
    }
    const checkWord = (word) =>{
        if(word.length < CHANCES){
            setToastInfo("Za malo liter!")
            setShowToast(true)
            setJiggling(true)
            return false 
        }
        if(!wordsList.includes(word)){
            setToastInfo("Brak takiego słowa");
            setShowToast(true)
            setJiggling(true)
            return false 
        }

        return true
    }

    const stopGame = (isWinner) =>{
        setModalView(true);

        if(isWinner){
            userStats.wins += 1;
        }
        userStats.attempts += currentRow +1;

        localStorage.setItem('userStats', JSON.stringify(userStats));

        
    }
    const handleRestartGame = () =>{
        let length = wordsList.length;
        let index = Math.floor(Math.random() * length);
        setPASS(wordsList[index])


        setModalView(false);
        setRowsCols(Array(CHANCES).fill().map(()=>Array(LETTERS).fill('')));
        setResult(Array(CHANCES).fill().map(()=>Array(LETTERS).fill('')));
        setGuessess(charStatuses);
        setCurrentRow(0);
        setWinner(null);
    }

    const resetStats = () => {
        const defaultStats = { wins: 0, attempts: 0 };
        localStorage.setItem('userStats', JSON.stringify(defaultStats));
        setUserStats(defaultStats);
    };

    return(
        <Container>
            <Rows 
                rowsCols={rowsCols}
                result={result}
                jiggling={jiggling}
                currentRow={currentRow}
            />
            <AlertToast
                message={toastInfo}
                showToast={showToast}
                setShowToast={setShowToast}
            />
            {PASS}
            <Guess 
                currentRow={currentRow}
                handleInputLetter={handleInputLetter}
                handleDeleteLetter={handleDeleteLetter}
                handleEnterGuess={handleEnterGuess}
            />
            <Keyboard 
                handleClickKeyboard={handleClickKeyboard}
                handleEnterGuess={handleEnterGuess}
                handleDeleteLetter={handleDeleteLetter}
                guessess={guessess}
            />
            <StopGameModal
                showModal={modalView}
                setShowModal={setModalView}
                winner={winner}
                attempts={currentRow}
                pass={PASS}
                restartFun={handleRestartGame}
                userStats={userStats}
                resetStats={resetStats}
            />
            {!modalView && winner != null ? (
                <div className="text-center">
                <Button variant="warning" onClick={handleRestartGame}>
                    Restart
                </Button>
                </div>
            ):(
                ""
            )}
        </Container>
    )
}

export default Board