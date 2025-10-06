import * as React from 'react';
import { Menu } from 'react-admin';
import { Box } from '@mui/material';

const CustomMenu = (props) => (
    <Box sx = {{ backgroundColor: '#bfbfbfff', rounded: 2, height: '100%', justifyContent: 'center', alignItems: 'center'  }}>
        <Box sx={{ textAlign: 'center', p: 2, justifyContent: 'center', alignItems: 'center' }}>
            <img src='../src/logo.jpg' alt="LogoCuaji"
                style={{ maxWidth: '100%', height: 'auto', borderRadius: '30px' }}
            />
        </Box>
        <Menu {...props} />
    </Box>
);

export default CustomMenu;