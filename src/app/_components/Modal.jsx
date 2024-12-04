import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import "../styles/modal.css"

const StopGameModal = ({showModal, setShowModal, winner, attempts, pass, restartFun, userStats, resetStats}) =>{

    return (
        <Modal className='game-modal' show={showModal} onHide={() => setShowModal(!showModal)} >
            <Modal.Header closeButton>
                <Modal.Title>Statystyki</Modal.Title>
            </Modal.Header>
            <Modal.Body className='text-center'>
                <div>
                    {winner?"Gratulację!":"Przegrana ;("}
                </div>
                <div>
                    Podejść: {attempts }!
                </div>
                <div>
                    Hasło: {pass}
                </div>
                <hr/>
                <div>Wygrane: {userStats.wins}</div>
                <div>Ilość zgadnięć: {userStats.attempts}</div>
                <Button variant="dark" onClick={resetStats}>
                    Restart statystyk
                </Button>
            </Modal.Body>
            <Modal.Footer className='mx-auto'>
                <Button variant="warning" onClick={restartFun}>
                    Restart gry
                </Button>

            </Modal.Footer>
        </Modal>
      );
}

export {StopGameModal}