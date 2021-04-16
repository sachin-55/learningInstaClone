import React from 'react';
import { Box } from '@material-ui/core';

const ButtonCustom = (props) => {
  return (
    <Box
      onClick={!props.disabled ? props.onClick : undefined}
      style={{
        height: '32px',
        paddingY: '10px',
        width: '100%',
        backgroundColor: '#0195f6',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '14px',
        borderRadius: '4px',
        color: '#fff',
        fontWeight: 'bold',
        '&:disabled': {
          backgroundColor: '#c2dcfc',
        },
        ...props.sx,
        ...props.style,
      }}
      opacity={props.disabled ? 0.5 : 1}
      {...props.restProps}
    >
      {props.children}
    </Box>
  );
};

export default ButtonCustom;
