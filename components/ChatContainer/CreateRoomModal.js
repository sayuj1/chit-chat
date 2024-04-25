import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom'
import styles from '/styles/CreateRoomModal.module.css'

export default function CreateRoomModal({onCloseCreateRoomModal, onCreateRoom}) {
  const [isBrowser, setIsBrowser] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [isMaxLengthErr, setIsMaxLengthErr] = useState(false);
  const [isMinLengthErr, setIsMinLengthErr] = useState(false);

  useEffect(()=>{
    setIsBrowser(true);
  },[]);

  const handleRoomNameChange = (e) => {
    const inputVal = e.target.value;

    setIsMaxLengthErr(false);
    setIsMinLengthErr(false);
    if (inputVal.length === 0) {
      setIsMaxLengthErr(false);
      setIsMinLengthErr(false);
    } else if (inputVal.length < 3) {
      setIsMinLengthErr(true);
    } else if (inputVal.length > 15) {
      setIsMaxLengthErr(true);
    }
    
    setRoomName(inputVal);
  }

  const onSubmitRoomName = ()=>{
    if(roomName && !isMinLengthErr && !isMaxLengthErr){
      onCreateRoom(roomName.trim());
      onCloseCreateRoomModal();
    }
  }

  let modalUI = isBrowser?ReactDOM.createPortal(<div className="modal d-block" >
  <div className={styles.Backdrop} onClick={onCloseCreateRoomModal}></div>
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Create Room</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onCloseCreateRoomModal}></button>
      </div>
      <div className="modal-body">
        <label htmlFor='room-name' className='col-form-label'></label>
        <input type="text" className='form-control' id='room-name' placeholder='Room Name' onChange={handleRoomNameChange} value={roomName} required/>
        {isMinLengthErr ? (
                    <p className="text-danger">
                      Min. length should be 3 characters
                    </p>
                  ) : isMaxLengthErr ? (
                    <p className="text-danger">
                      Max. length should be less than 15 characters
                    </p>
                  ) : null}
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary" disabled={!roomName || isMaxLengthErr || isMinLengthErr}>Create</button>
      </div>
    </div>
  </div>
</div>, document.getElementById('__next')):null;

  return modalUI;  
}
