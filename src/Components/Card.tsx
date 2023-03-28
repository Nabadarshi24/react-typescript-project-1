import React, { Fragment, useState } from 'react';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import ModeEditIcon from '@mui/icons-material/ModeEdit';
import SubjectIcon from '@mui/icons-material/Subject';
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CardDetails from './CardDetails';
import Button from '@mui/material/Button';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CircleIcon from '@mui/icons-material/Circle';
import { labelItems } from '../Config';
import TooltipText from './TooltipText';
import { TypeCard, TypeCardlist, TypeLabelItem } from './Common.Type';

type TypeCardProps = {
   cardlist: TypeCardlist;
   card: TypeCard;
   handleCardDeleteBtn: (id: number) => void;
   index: number;
}

const Card = (props: TypeCardProps) => {
   const { card, cardlist, handleCardDeleteBtn, index } = props;
   const [open, setOpen] = useState(false);
   const [fullWidth, setFullWidth] = useState(true);
   const [maxWidth, setMaxWidth] = useState<DialogProps['maxWidth']>('md');
   // const [descriptionValue, setDescriptionValue] = useState('');

   // const callBack = (descriptionValue) => {
   //    setDescriptionValue(descriptionValue);
   // };

   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   return (
      <Fragment>
         <div onClick={handleClickOpen} className="card">
            <div className="card-labels">
               {
                  card.labels.map((label, index) => {
                     // console.log({index: index}, {lbI: labelItems[index].label});
                     const selectedLabel = labelItems.find(labelItem => labelItem.value === labelItem.label)!;
                     return <span
                        className={`card-label-item ${selectedLabel.className}`}
                        key={index}
                     >
                        <CircleIcon className='icon-size' />
                        {selectedLabel.label}
                     </span>
                  })
               }
               <DeleteOutlinedIcon onClick={() => handleCardDeleteBtn(index)} className='card-delete-icon' fontSize='small' />
            </div>

            <div className="card-title">
               <span>{card.title}</span>
            </div>

            <div className="card-footer">
               <div className="due-date">
                  <span><AccessTimeIcon className='font-size' /></span>
                  <span>Feb 8, 2025</span>
               </div>
               <div className="description">
                  {
                     // descriptionValue !== '' &&
                     card.descriptionValue &&
                     // <SubjectIcon className='font-size' />
                     <TooltipText
                        TooltipTitle={card.descriptionValue}
                        TooltipIcon={<SubjectIcon className='font-size' />}
                     />
                  }
               </div>
               <div className="checklist-items">
                  {
                     card.checklistTitle !== '' &&
                     <>
                        {/* <span><LibraryAddCheckOutlinedIcon className='font-size' /></span>
                        <span>{card.checklists.filter(x => x.isChecked).length}/{card.checklists.length}</span> */}
                        <TooltipText
                           TooltipTitle='Checklist items'
                           TooltipIcon={
                              <span>
                                 <span className='custom-font-size'><LibraryAddCheckOutlinedIcon className='font-size' /></span>
                                 <span className='custom-font-size'>{card.checklists.filter(x => x.isChecked).length}/{card.checklists.length}</span>
                              </span>
                           }
                        />
                     </>
                  }
               </div>
            </div>
         </div>

         <Dialog
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            open={open}
            onClose={handleClose}
         >
            <DialogActions>
               <Button onClick={handleClose}>Close</Button>
            </DialogActions>
            <DialogContent>
               <CardDetails
                  // callBack={callBack}
                  card={card}
                  cardlist={cardlist}
               />
            </DialogContent>
         </Dialog>
      </Fragment>
   )
}

export default Card;

