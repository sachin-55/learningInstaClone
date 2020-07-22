import React from 'react';
import { Box } from 'theme-ui';

const ButtonCustom = (props) => {
  return (
    <Box
      onClick={!props.disabled ? props.onClick : undefined}
      sx={{
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
      }}
      opacity={props.disabled ? 0.5 : 1}
      {...props.restProps}
    >
      {props.children}
    </Box>
  );
};

export default ButtonCustom;
