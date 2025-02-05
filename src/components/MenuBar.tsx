import { AppBar, Box, Button, Toolbar } from '@mui/material'
import { Link as RouterLink} from 'react-router-dom'

export const MenuBar = () => {
  return (
    <>
        <AppBar position={"static"}>
            <Toolbar>
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <Button sx={{ color: '#fff' }} component={RouterLink} to ="/verify">
                        Verify
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    </>
  )
}
