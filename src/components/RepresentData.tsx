import { Paper } from '@mui/material'
import { BarChart } from '@mui/x-charts'
import { RepresentResponse } from '../utils'

type RepresentDataProps = {
    data?: RepresentResponse
}

export const RepresentData = ({ data }: RepresentDataProps) => {
  return (
    <>
        <Paper elevation={ 5 }>
            {
                data && 
                <BarChart 
                    height={ 200 }
                    bottomAxis={ null }
                    series={[{data: data.results[0].embedding}]}
                    skipAnimation={true}
                    disableAxisListener
                    />
            }
        </Paper>
    </>
  )
}
