import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Container, Grid2 } from "@mui/material";
import { DropEvent, FileRejection } from "react-dropzone";

import { getEnvVariables } from "./helpers";

import { getBase64, VerifyResponse } from "./utils";
import { Area, ImageWrapper, TableData } from "./components";
import ButtonLoading from "./components/ButtonLoading";

type FormProps = {
    img1_path: String;
    img2_path: String;
};

const App = () => {
    const [img1, setImg1] = useState<File>();
    const [img2, setImg2] = useState<File>();
    const [area1, setArea1] = useState<Area>();
    const [area2, setArea2] = useState<Area>();

    const [data, setData] = useState<VerifyResponse>();

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const { VITE_API_URL } = getEnvVariables();
    const {
        handleSubmit, register, setValue, formState: {isValid}
    } = useForm<FormProps>();

    const onDrop1 = useCallback(async ( acceptedFiles: File[],
        _fileRejections: FileRejection[], _event: DropEvent)=> {
            setImg1(acceptedFiles[0]);
            const imgStr = await getBase64(acceptedFiles[0]);
            setValue("img1_path", imgStr, {shouldValidate: true});
    },[]);

    const onDrop2 = useCallback(async ( acceptedFiles: File[],
        _fileRejections: FileRejection[], _event: DropEvent)=> {
            setImg2(acceptedFiles[0]);
            const imgStr = await getBase64(acceptedFiles[0]);
            setValue("img2_path", imgStr, {shouldValidate: true});
    },[]);
    const doSubmit = async (data: FormProps) => {
        if(!data)
            return
        setLoading(true);
        const resp = await fetch(`${VITE_API_URL}/verify`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data)
        });
        setLoading(false);
        if(resp.status != 200){
            return;
        };
        setSuccess(true);
        const verifyResponse = await resp.json();
        setData(verifyResponse);
        const { facial_areas } = verifyResponse;

        const {img1: img1_resp, img2: img2_resp} = facial_areas;
        setArea1({
            x: img1_resp.x,
            y: img1_resp.y,
            height: img1_resp.h,
            width: img1_resp.w
        });

        setArea2({
            x: img2_resp.x,
            y: img2_resp.y,
            height: img2_resp.h,
            width: img2_resp.w
        });
    };

    return (
        <Container>
            <form onSubmit={ handleSubmit(doSubmit) }>
                <input type="text"
                    style={{display:"none"}}
                    {...register("img1_path", {required: true})}
                />
                <input type="text" 
                    style={{display:"none"}}
                    {...register("img2_path", {required: true})}
                />
                <Grid2 container spacing={ 2 } rowSpacing={ 2 }>
                    <Grid2 size={ 6 }>
                        <ImageWrapper onDrop={onDrop1} img={img1} area={area1}/>
                    </Grid2>
                    <Grid2 size={ 6 }>
                        <ImageWrapper onDrop={onDrop2} img={img2} area={area2}/>
                    </Grid2>
                    <Grid2 size={ 12 }>
                        <TableData data={ data } />
                    </Grid2>
                    <Grid2 container size={12} sx={{justifyContent: "flex-end"}} >
                        <Grid2 size={12} justifyContent={"flex-end"}>
                            <ButtonLoading
                                loading={loading} 
                                success={success} 
                                isValid={isValid}
                            />
                        </Grid2>
                    </Grid2>
                </Grid2>
            </form>
        </Container>
    );
};

export default App;
