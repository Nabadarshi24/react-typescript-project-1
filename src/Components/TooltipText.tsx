import React from 'react';
import Tooltip from '@mui/material/Tooltip';

type TypeTooltipTextProps = {
   TooltipTitle: string;
   TooltipIcon:  React.ReactElement;
}

const TooltipText = (props: TypeTooltipTextProps) => {
   const { TooltipTitle, TooltipIcon } = props;
   return (
      <Tooltip className='customize-icon-btn' title={TooltipTitle}>
         {TooltipIcon}
      </Tooltip>
   )
}

export default TooltipText;