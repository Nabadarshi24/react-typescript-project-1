import React, { useState } from 'react';
import { Link as RouterLink } from "react-router-dom";
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import TextField from '@mui/material/TextField';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SubjectIcon from '@mui/icons-material/Subject';
import SellIcon from '@mui/icons-material/Sell';
import CloseIcon from '@mui/icons-material/Close';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import LabelDetails from './LabelDetails';
import CircleIcon from '@mui/icons-material/Circle';
import { labelItems } from '../Config';
import { TypeCardlist, TypeCard } from './Common.Type';

type TypeCardDetailsProps = {
   cardlist: TypeCardlist;
   card: TypeCard;
}

const CardDetails = (props: TypeCardDetailsProps) => {
   const { card, cardlist } = props;
   const [open, setOpen] = useState(false);
   const [fullWidth, setFullWidth] = useState(true);
   const [maxWidth, setMaxWidth] = useState<DialogProps['maxWidth']>('xs');
   const [title, setTitle] = useState(card.title);
   const [editCardTitle, setEditCardTitle] = useState(false);
   const [openLabel, setOpenLabel] = useState(card.labelTitle.length > 0);
   const [labelTitle, setLabelTitle] = useState(card.labelTitle);
   const [openDate, setOpenDate] = useState(card.dateTitle.length > 0);
   const [dateTitle, setDateTitle] = useState(card.dateTitle);
   const [openChecklist, setOpenChecklist] = useState(card.checklistTitle.length > 0);
   const [checklistTitle, setChecklistTitle] = useState(card.checklistTitle);
   const [isEditChecklistTitle, setIsEditChecklistTitle] = useState(false);
   const [checklists, setChecklists] = useState(card.checklists);
   const [checklistValue, setChecklistValue] = useState('');
   const [showAddChecklistButton, setAddChecklistButton] = useState<boolean>();
   const [description, setDescription] = useState<boolean | null>(null);
   const [descriptionValue, setDescriptionValue] = useState(card.descriptionValue);


   const handleChecklistTitle = () => {
      setIsEditChecklistTitle(false);

      card.checklistTitle = checklistTitle;
   };

   const handleCloseChecklistTitleButtton = () => {
      setIsEditChecklistTitle(false);
   };

   const handleCloseAddChecklistButtton = () => {
      setAddChecklistButton(true);
   };

   const handleShowAddChecklistButton = () => {
      setAddChecklistButton(false);
   };

   const handleChecklistTitleEdit = () => {
      setIsEditChecklistTitle(true);
   };

   const handleChecklistAddBtn = () => {
      if (checklistValue === "" || checklistValue == null) {
         return;
      }

      const newChecklist = {
         isChecked: false,
         name: checklistValue
      }

      const newChecklists = [...checklists, newChecklist];

      setChecklists(newChecklists);
      setChecklistValue('');
      card.checklists = newChecklists;
   };

   const handleChecklistItemDelete = (index: number, e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
      e.preventDefault();
      const newChecklists = [...checklists];
      newChecklists.splice(index, 1);

      setChecklists(newChecklists);
      card.checklists = newChecklists;
   };

   const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
      const newChecklists = [...checklists];
      newChecklists[index].isChecked = e.target.checked;

      setChecklists(newChecklists);
      // card.checklists = newChecklists;
      console.log({ index, ch: e.target.checked, val: checklists[index].isChecked });
   };

   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   const handleEditCardTitle = () => {
      setEditCardTitle(true);
   };

   const handleEditCardTitleClose = () => {
      setEditCardTitle(false);
      card.title = title;
   };

   const handleLabelOpen = () => {
      setOpenLabel(true);
      setLabelTitle('Label');
      card.labelTitle = 'Label';
   };

   const handleDateOpen = () => {
      setOpenDate(true);
      setDateTitle('Dates');
      card.dateTitle = 'Dates';
   };

   const handleChecklistOpen = () => {
      setChecklistTitle('Checklist');
      setOpenChecklist(true);

      card.checklistTitle = 'Checklist';
   };

   const handleChecklistDelete = () => {
      setOpenChecklist(false);
      setChecklists([]);
      setChecklistTitle("");

      card.checklists = [];
      card.checklistTitle = "";
   };

   const handleDescriptionEdit = () => {
      setDescription(true);
   };

   const handleDescriptionSave = () => {
      setDescription(null);
      // callBack(card.descriptionValue);

      card.descriptionValue = descriptionValue;
   };

   const handleDescriptionCancel = () => {
      setDescription(null);
   };

   return (
      <div className='card-details clearfix'>
         <div className="dialogue-details-header">
            <div className="dialogue-title">
               <span><LaptopMacIcon className='dialogue-icon-size' /></span>
               <div className="window-title">
                  {
                     editCardTitle === false
                        ? <h2 onClick={handleEditCardTitle}>{card.title}</h2>
                        : <TextField
                           focused={editCardTitle}
                           InputProps={{
                              autoFocus: true
                           }}
                           value={title}
                           fullWidth
                           onChange={(e) => setTitle(e.target.value)}
                           variant="outlined"
                           onBlur={handleEditCardTitleClose}
                        />
                  }
               </div>
            </div>
            <div className="window-header-inline-content">
               <span>in list</span> <a href="#">{cardlist.title}</a>
            </div>
         </div>

         <div className="dialogue-main-col">
            <div className="label-date-container">
               {
                  openLabel === false
                     ? null
                     : <><h3>{labelTitle}</h3>
                        <div className="label-container">
                           {
                              card.labels.map((label, index) => {
                                 // console.log({index: index}, {lbI: labelItems[index].label});
                                 const selectedLabel = labelItems.find(labelItem => labelItem.value === labelItem.label);
                                 return <span
                                    className={`label-item ${selectedLabel!.className}`}
                                    key={index}
                                 >
                                    <CircleIcon className='icon-size' />
                                    {selectedLabel!.label}
                                 </span>
                              })
                           }
                           <Button
                              variant="outlined"
                              className='label-btn'
                              size="small"
                              onClick={handleClickOpen}>
                              +
                           </Button>
                        </div>
                     </>
               }

               {
                  openDate === false
                     ? null
                     : <><h3>{dateTitle}</h3>
                        <div className="date-container">
                           <div className="date-container-btn">
                              <span className='margin-right'>Feb 14, 2024</span>
                              <span><EditIcon fontSize='small' /></span>
                           </div>
                        </div>
                     </>
               }
            </div>
            <div className="description">
               {
                  description === null
                     ? <>
                        <div className="desc-title">
                           <span><SubjectIcon /></span>
                           <h3>Description</h3>
                           <Button size='small' variant='outlined' className='edit-desc' onClick={handleDescriptionEdit} >Edit</Button>
                        </div>
                        <div className="desc-field">
                           {
                              descriptionValue === ''
                                 ? <TextField
                                    onClick={handleDescriptionEdit}
                                    fullWidth
                                    placeholder='Add a more detailed description...'
                                 />
                                 : <span className='desc-content' onClick={handleDescriptionEdit} >{descriptionValue}</span>
                           }
                        </div>
                     </>
                     : <div className="hidden-desc">
                        <div className="desc-title">
                           <span><SubjectIcon /></span>
                           <h3>Description</h3>
                           <Button size='small' variant='outlined' className='edit-desc' onClick={handleDescriptionEdit}>Edit</Button>
                        </div>
                        <TextField
                           fullWidth
                           id="outlined-multiline-static"
                           value={descriptionValue}
                           onChange={(e) => setDescriptionValue(e.target.value)}
                           multiline
                           // rows={4}
                           minRows={8}
                           maxRows={10}
                           InputProps={{
                              autoFocus: true
                           }}
                        />
                        <div className="hidden-desc-btn">
                           <span className='margin-right'>
                              <Button
                                 variant='contained'
                                 size='small'
                                 onClick={handleDescriptionSave}>
                                 Save
                              </Button>
                           </span>
                           <Button
                              variant='outlined'
                              size='small'
                              onClick={handleDescriptionCancel}>
                              Cancel
                           </Button>
                        </div>
                     </div>
               }

            </div>
            <div className="checklist">
               {
                  openChecklist !== false &&
                  <>
                     <>
                        {
                           isEditChecklistTitle === false
                              ? <div className='checklist-title'>
                                 <span><LibraryAddCheckOutlinedIcon /></span>
                                 <h3 onClick={handleChecklistTitleEdit}>{checklistTitle}</h3>
                                 <div className="edit-delete-btn">
                                    <EditIcon onClick={handleChecklistTitleEdit} />
                                    <DeleteForeverIcon onClick={handleChecklistDelete} />
                                 </div>
                              </div>
                              : <div className='edit-checklist-title'>
                                 <span><LibraryAddCheckOutlinedIcon /></span>
                                 <TextField
                                    className='checklist-title-edit'
                                    value={checklistTitle}
                                    InputProps={{
                                       autoFocus: true
                                    }}
                                    onChange={(e) => setChecklistTitle(e.target.value)}
                                    id="outlined-basic"
                                    variant="outlined"
                                 />
                                 <div className="add-close-btn">
                                    <Button onClick={handleChecklistTitle} variant='contained' size='small'>Save</Button>
                                    <CloseIcon onClick={handleCloseChecklistTitleButtton} />
                                 </div>
                              </div>
                        }
                     </>

                     <div className="checklist-add-container">
                        <FormGroup>
                           {
                              checklists.map((checklist, index) => {
                                 console.log({ checklist });
                                 return (
                                    checklist.isChecked === false
                                       ? <FormControlLabel
                                          className='checkllist-item-customize'
                                          key={index}
                                          control={<Checkbox key={index} checked={checklist.isChecked} onChange={(e) => handleChange(index, e)} />}
                                          label={<>{checklist.name}<DeleteForeverIcon onClick={(e) => handleChecklistItemDelete(index, e)} /></>}
                                       />
                                       : <FormControlLabel
                                          key={index}
                                          className='completed checkllist-item-customize'
                                          control={<Checkbox key={index} checked={checklist.isChecked} onChange={(e) => handleChange(index, e)} />}
                                          label={<>{checklist.name}<DeleteForeverIcon onClick={(e) => handleChecklistItemDelete(index, e)} /></>}
                                       />
                                 )
                              })
                           }
                        </FormGroup>
                     </div>

                     {
                        showAddChecklistButton === true
                           ? <Button onClick={handleShowAddChecklistButton} className='add-item-btn' variant='outlined' >Add an item</Button>
                           : <div className='checklist-title-edit'>
                              <TextField
                                 value={checklistValue}
                                 onChange={(e) => setChecklistValue(e.target.value)}
                                 fullWidth id="outlined-basic"
                                 variant="outlined"
                                 placeholder='Add an item'
                              />
                              <div className="common-add-close-btn">
                                 <Button onClick={handleChecklistAddBtn} variant='contained' size='small'>Add</Button>
                                 <CloseIcon onClick={handleCloseAddChecklistButtton} />
                              </div>
                           </div>
                     }
                  </>
               }
            </div>
         </div>

         <div className="dialogue-sidebar">
            <h2>Add to card</h2>

            <div className="sidebar-lists">
               <a href="#" onClick={handleLabelOpen}>
                  <span><SellIcon className='icon-size' /></span>
                  <span>Labels</span>
               </a>
               <a href="#" onClick={handleChecklistOpen}>
                  <span><LibraryAddCheckOutlinedIcon className='icon-size' /></span>
                  <span>Checklist</span>
               </a>
               <a href="#" onClick={handleDateOpen}>
                  <span><AccessTimeOutlinedIcon className='icon-size' /></span>
                  <span>Dates</span>
               </a>
            </div>
         </div>

         <Dialog
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            open={open}
            onClose={handleClose}
         >
            <DialogActions>
               <CloseIcon onClick={handleClose} />
            </DialogActions>
            <DialogContent className='edit-dialog'>
               <LabelDetails card={card} onSave={handleClose} />
            </DialogContent>
         </Dialog>
      </div>
   )
}

export default CardDetails;
