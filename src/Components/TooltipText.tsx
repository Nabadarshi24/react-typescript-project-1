import React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

type TypeTooltipTextProps = {
   TooltipTitle: string;
   TooltipIcon: OverridableComponent<SvgIconTypeMap<{}, "svg">>
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