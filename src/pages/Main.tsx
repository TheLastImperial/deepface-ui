import { Container, Stack } from '@mui/material'
import { MenuBar } from '../components'
import { Outlet } from 'react-router-dom'

export const Main = () => {
  return (
    <>
        <Container>
            <Stack spacing={ 2 }>
                <MenuBar/>
                <Outlet/>
            </Stack>
        </Container>
    </>
  )
}
