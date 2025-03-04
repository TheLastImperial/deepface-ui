import {
    Paper, Table, TableBody, TableCell, TableHead, TableRow
} from "@mui/material";
import { AnalizeResponse } from "../utils";

type AnalizeDataProps = {
    data?: AnalizeResponse
};

export const AnalizeData = ({ data } : AnalizeDataProps ) => {
  return (
    <>
        <Paper elevation={ 5 }>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell> Age </TableCell>
                        <TableCell> Emotion </TableCell>
                        <TableCell> Gender </TableCell>
                        <TableCell> Race </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {
                    data && data.results.map((row)=> {
                        return (
                            <TableRow 
                                key={
                                    `${row.age}${row.dominant_emotion}${row.dominant_gender}${row.dominant_race}`
                                }>
                                <TableCell> {row.age} </TableCell>
                                <TableCell> {row.dominant_emotion} </TableCell>
                                <TableCell> {row.dominant_gender} </TableCell>
                                <TableCell> {row.dominant_race} </TableCell>
                            </TableRow>
                         )
                    })
                }
                </TableBody>
            </Table>
        </Paper>
    </>
  )
}
