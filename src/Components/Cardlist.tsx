import React, { useState } from 'react';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import TextField from '@mui/material/TextField';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import Card from './Card';
import DoneIcon from '@mui/icons-material/Done';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { Box, Modal } from '@mui/material';
import { TypeCardlist, TypeCard } from '../Components/Common.Type';

type TypeCardlistProps = {
   cardlists: TypeCardlist[];
   cardlist: TypeCardlist;
   index: number;
   handleDeleteCardlistBtn: (id: number) => void;
   handleCopyBtnClick: (id: number) => void;
   handleMovelistBtn: (array: TypeCardlist[], from: number, to: number) => void;
}

const style = {
   position: 'absolute' as 'absolute',
   top: '6%',
   left: '15%',
   transform: 'translate(-6%, -15%)',
   width: 330,
   bgcolor: 'background.paper',
   border: '2px solid #000',
   boxShadow: 24,
   p: 1,
};

const Cardlist = (props: TypeCardlistProps) => {
   const { cardlists, cardlist, handleDeleteCardlistBtn, index, handleCopyBtnClick, handleMovelistBtn } = props;
   const [cardListTitle, setCardListTitle] = useState<boolean | ''>('');
   const [editCardlistTitleSave, setEditCardlistTitleSave] = useState(cardlist.title);
   const [updateCard, setUpdateCard] = useState<boolean | null>(null);
   // const [cardlist.cards, setCards] = useState(cardlist.cards ?? []);
   const [inputValue, setInputValue] = useState('');
   const [anchorEl, setAnchorEl] = useState<HTMLElement | null>();
   const open = Boolean(anchorEl);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [currentValue, setCurrentValue] = useState(index);

   const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
   };

   const handleMenuClose = () => {
      setAnchorEl(null);
   };

   const handleModalOpen = () => {
      setIsModalOpen(true);
      handleMenuClose();
   };

   const handleModalClose = () => {
      handleMovelistBtn(cardlists, index, currentValue);
      setIsModalOpen(false);
   };

   const handleCardlistDelete = () => {
      setAnchorEl(null);
      handleDeleteCardlistBtn(index);
   };

   const handleCopyCardBtnClick = () => {
      setAnchorEl(null);
      handleCopyBtnClick(index);
   }

   const handleAddCardBtn = () => {
      if (inputValue === "" || inputValue === null) {
         return;
      }

      const newCard: TypeCard = {
         title: inputValue,
         labelTitle: '',
         dateTitle: '',
         labels: [],
         descriptionValue: '',
         date: new Date(),
         checklistTitle: '',
         checklists: []
      };
      const newCards = [...cardlist.cards, newCard];
      cardlist.cards = newCards;

      // setCards(newCards);
      setInputValue('');
   };

   const handleCardDeleteBtn = (index: number) => {
      const newCards = [...cardlist.cards];
      newCards.splice(index, 1);

      cardlist.cards = newCards;
      // setCards(newCards);

      console.log(cardlist.cards);
   };

   const handleTitle = (e: React.SyntheticEvent) => {
      setCardListTitle(true);
   };

   const handleClose = () => {
      setCardListTitle(false);

      cardlist.title = editCardlistTitleSave;
   };

   const handleUpdateCard = () => {
      setAnchorEl(null);
      setUpdateCard(true);
   };

   const closeUpdateCard = () => {
      setUpdateCard(null);
   };

   // const handleMovelistBtn = (arr, from, to) => {
   //    newArr = [...arr];
   //    newArr.splice(to, 0, newArr.splice(from, 0)[0]);

   //    setCardlists(newArr);
   // }

   return (
      <div className="card-list">
         <div className="card-list-card">
            {
               cardListTitle === ''
                  ? <div className="card-title">
                     <span>{cardlist.title}</span>
                     <ModeEditIcon fontSize='small' onClick={handleTitle} />
                     <IconButton
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleMenuClick}
                     >
                        <MoreHorizIcon className='menu-icon' />
                     </IconButton>
                     <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleMenuClose}
                        MenuListProps={{
                           'aria-labelledby': 'basic-button',
                        }}
                     >
                        <MenuItem onClick={handleUpdateCard}>Add card...</MenuItem>
                        <MenuItem onClick={handleCopyCardBtnClick}>Copy list...</MenuItem>
                        <MenuItem onClick={handleModalOpen}>Move list...</MenuItem>
                        <MenuItem onClick={handleCardlistDelete}>Archive this list</MenuItem>
                     </Menu>

                     <Modal
                        keepMounted
                        open={isModalOpen}
                        onClose={handleModalClose}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                     >
                        <Box sx={style}>
                           <div id="keep-mounted-modal-title" >
                              Move list
                              <CloseIcon onClick={handleModalClose} className='modal-close-btn' />
                           </div>
                           <div
                           // component="form"
                           // sx={{
                           //    '& .MuiTextField-root': { m: 1, width: '25ch' },
                           // }}
                           // noValidate
                           // autoComplete="off"
                           >
                              <div>
                                 <TextField
                                    id="filled-select-currency"
                                    select
                                    label="Position"
                                    value={currentValue}
                                    onChange={(e) => setCurrentValue(parseInt(e.target.value))}
                                    // defaultValue={index}
                                    variant="filled"
                                    fullWidth
                                 >
                                    {cardlists.map((cardlist, index) => (
                                       <MenuItem key={index} value={index}>
                                          <span>{index + 1}</span>
                                       </MenuItem>
                                    ))}
                                 </TextField>
                              </div>
                              <Button
                                 className='move-btn'
                                 variant='contained'
                                 size='small'
                                 onClick={handleModalClose}
                              >
                                 Move
                              </Button>
                           </div>
                        </Box>
                     </Modal>
                  </div>
                  : <div className="editable-card-title clearfix">
                     <TextField
                        className='title-edit-field'
                        variant="outlined"
                        value={editCardlistTitleSave}
                        InputProps={{
                           autoFocus: true
                        }}
                        onChange={(e) => setEditCardlistTitleSave(e.target.value)}
                     />
                     <DoneIcon className='common-font-size' onClick={handleClose} />
                     <CloseIcon className='common-font-size' onClick={handleClose} />
                  </div>
            }

            {
               cardlist.cards.map((card, index) => (
                  <Card card={card} handleCardDeleteBtn={handleCardDeleteBtn} cardlist={cardlist} index={index} key={index} />
               ))
            }

            <div className="cardlist-footer">
               {
                  updateCard === null
                     ? <Button variant="contained" size='large' className='bg-none' startIcon={<AddIcon />} onClick={handleUpdateCard}>
                        Add a card
                     </Button>
                     : <div>
                        <TextField
                           fullWidth
                           value={inputValue}
                           onChange={(e) => setInputValue(e.target.value)}
                           variant="outlined"
                           placeholder='Enter a title for this card...'
                        />
                        <div className="common-add-close-btn">
                           <Button variant='contained' size='small' onClick={handleAddCardBtn}>Add card</Button>
                           <CloseIcon onClick={closeUpdateCard} />
                        </div>
                     </div>
               }
            </div>
         </div>
      </div>
   )
}

export default Cardlist;
