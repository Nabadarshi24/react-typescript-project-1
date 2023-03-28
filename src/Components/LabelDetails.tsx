import React, { useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CircleIcon from '@mui/icons-material/Circle';
import Button from '@mui/material/Button';
import { labelItems } from '../Config';
import {TypeCard, TypeLabels} from './Common.Type'

type TypeLabelDetailsProps = {
   card: TypeCard;
   onSave: () => void;
}

const LabelDetails = (props: TypeLabelDetailsProps) => {
   const { card, onSave } = props;
   const [labels, setLabels] = useState<TypeLabels[]>([]);

   console.log(labels);

   const getLabelValue = (e:  React.ChangeEvent<HTMLInputElement>) => {
      const { value, checked } = e.target;
      // const index = labels.indexOf(value);

      // console.log(value, checked)

      let newLabels: TypeLabels[] = [];
      if (checked) {
         newLabels = [...labels, JSON.parse(value)];
      }
      else {
         newLabels = labels.filter((label) => label.label !== label.value)
      }

      setLabels(newLabels);
      card.labels = newLabels;
   };

   return (
      <div className='label-details'>
         <div className="label-title">
            <span>Labels</span>
         </div>

         <div className="label-body">
            <FormGroup className='user-form'>
               {
                  labelItems.map((labelItem, index) => (
                     <FormControlLabel
                        key={index}
                        control={<Checkbox checked={labels.includes(JSON.parse(labelItem.value))} onChange={(e) => getLabelValue(e)} />}
                        value={labelItem.value}
                        label={<><CircleIcon />{labelItem.label}</>}
                        className={labelItem.className}
                     />
                  ))
               }
            </FormGroup>
            <Button className='save-btn' variant='contained' size='small' onClick={onSave}>Save</Button>
         </div>
      </div>
   )
}

export default LabelDetails
