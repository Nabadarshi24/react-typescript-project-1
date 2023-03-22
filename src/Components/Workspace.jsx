import React, { useState } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import Cardlist from './Cardlist';

const CardlistAdd = () => {
   const [updateAddList, setUpdateAddList] = useState(false);
   const [cardlists, setCardlists] = useState([]);
   const [inputValue, setInputValue] = useState('');

   const handleAddBtnClick = () => {
      if (inputValue === "" || inputValue == null) {
         return;
      }

      const newCardlist = {
         title: inputValue,
         cards: []
      }

      const newCardlists = [...cardlists, newCardlist];

      setCardlists(newCardlists);
      setInputValue('');
   };

   const handleCopyBtnClick = (copyIndex) => {
      const newCardlist = structuredClone(cardlists[copyIndex]);
      const newCardlists = [...cardlists];
      newCardlists.splice((copyIndex + 1), 0, newCardlist);
      setCardlists(newCardlists);
   };
   const handleMovelistBtn = (arr, from, to) => {
      let newArr = [...arr];
      newArr.splice(to, 0, newArr.splice(from, 1)[0]);

      setCardlists(newArr);
   };

   const handleDeleteCardlistBtn = (index) => {
      const newCardlists = [...cardlists];

      newCardlists.splice(index, 1);
      setCardlists(newCardlists);
      // cardlists = newCardlists;
   };

   const handleAddListBtn = () => {
      setUpdateAddList(true);
   };

   const handleClose = () => {
      setUpdateAddList(false);
   };

   return (
      console.log({ cardlists }) ||
      <div className='custom-container'>
         {
            cardlists.map((cardlist, index) => (
               <Cardlist
                  handleDeleteCardlistBtn={handleDeleteCardlistBtn}
                  cardlist={cardlist}
                  cardlists={cardlists}
                  handleCopyBtnClick={handleCopyBtnClick}
                  index={index}
                  key={index}
                  handleMovelistBtn={handleMovelistBtn}
               />
            ))
         }

         <div className="cardlist-add-section">
            {
               updateAddList === false
                  ?
                  <Button variant="contained" size='large' className='cardlist-add-btn' startIcon={<AddIcon />} onClick={() => handleAddListBtn()}>
                     Add another list
                  </Button>
                  : <div className='list-add-controls'>
                     <TextField
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        fullWidth
                        id="outlined-basic"
                        variant="outlined"
                        placeholder='Enter list title...'
                     />
                     <div className="common-add-close-btn">
                        <Button variant='contained' size='small' onClick={handleAddBtnClick}>Add list</Button>
                        <CloseIcon onClick={handleClose} />
                     </div>
                  </div>
            }
         </div>
      </div>
   )
}

export default CardlistAdd;
