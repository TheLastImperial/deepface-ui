import {
    Paper, Stack, Table, TableBody, TableCell, TableRow, Typography
} from "@mui/material";

import { DoDisturb, DoneAll } from "@mui/icons-material";
import { green, red } from "@mui/material/colors";
import { VerifyResponse } from "../utils";

type VerifyDataProps= {
    data?: VerifyResponse
};

export const VerifyData = ({data}: VerifyDataProps ) => {
  return (
    <Paper elevation={5}>
        <Table >
            <TableBody>
                <TableRow>
                    <TableCell>
                        Varified:
                    </TableCell>
                    <TableCell >
                        <Stack spacing={2} direction={"row"}>
                            <Typography>
                                { data?.verified ? "True" : "False" }
                            </Typography>
                            {
                                data?.verified ?
                                <DoneAll sx={{color: green[700]}}/> :
                                <DoDisturb sx={{color: red[700]}}/>
                            }
                        </Stack>
                    </TableCell>
                    <TableCell>
                        Distance:
                    </TableCell>
                    <TableCell>
                        { data?.distance }
                    </TableCell>
                    <TableCell>
                        Threshold:
                    </TableCell>
                    <TableCell>
                        { data?.threshold }
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        Detector Backend:
                    </TableCell>
                    <TableCell>
                        { data?.detector_backend }
                    </TableCell>
                    <TableCell>
                        Model:
                    </TableCell>
                    <TableCell>
                        { data?.model }
                    </TableCell>
                    <TableCell>
                        Similarity Metric:
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
