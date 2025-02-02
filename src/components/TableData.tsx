import {
    Paper, Table, TableBody, TableCell, TableRow, useTheme
} from "@mui/material";

import { VerifyResponse } from "../utils";

type TableDataProps= {
    data?: VerifyResponse
};

export const TableData = ({data}: TableDataProps ) => {
    const theme = useTheme()
  return (
    <Paper elevation={5}>
        <Table >
            <TableBody>
                <TableRow>
                    <TableCell>
                        Varified:
                    </TableCell>
                    <TableCell sx={{
                        backgroundColor: data?.verified ? 
                            theme.palette.success.main :
                            theme.palette.error.main
                    }}>
                        { data?.verified ? "True" : "False" }
                    </TableCell>
                    <TableCell>
                        Distance
                    </TableCell>
                    <TableCell>
                        { data?.distance }
                    </TableCell>
                    <TableCell>
                        Threshold
                    </TableCell>
                    <TableCell>
                        { data?.threshold }
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        Detector Backend
                    </TableCell>
                    <TableCell>
                        { data?.detector_backend }
                    </TableCell>
                    <TableCell>
                        Model
                    </TableCell>
                    <TableCell>
                        { data?.model }
                    </TableCell>
                    <TableCell>
                        Similarity Metric
                    </TableCell>
                    <TableCell>
                        { data?.similarity_metric }
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </Paper>
  )
}
