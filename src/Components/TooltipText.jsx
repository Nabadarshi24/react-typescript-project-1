import React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

const TooltipText = (props) => {
   const { TooltipTitle, TooltipIcon } = props;
   return (
      <Tooltip className='customize-icon-btn' title={TooltipTitle}>
         {TooltipIcon}
      </Tooltip>
   )
}

export default TooltipText;