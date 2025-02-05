import { AppBar, Box, Button, Toolbar } from '@mui/material';
import { NavLink } from 'react-router-dom';

export const MenuBar = () => {

  return (
    <>
        <AppBar position={"static"}>
            <Toolbar>
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <Button sx={{ color: '#fff' }}
                        to ="/verify"
                        component={NavLink}
                        >
                        Verify
                    </Button>
                    <Button sx={{ color: '#fff' }} component={NavLink} to ="/analize">
                        Analize
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    </>
  )
}
