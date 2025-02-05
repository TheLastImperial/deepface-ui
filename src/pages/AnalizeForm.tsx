import { useCallback, useState } from "react";
import { Grid2 } from "@mui/material";
import { useForm } from "react-hook-form";
import { DropEvent, FileRejection } from "react-dropzone";

import { ImageWrapper } from "../components";
import ButtonLoading from "../components/ButtonLoading";
import { AnalizeResponse, getBase64 } from "../utils";
import { getEnvVariables } from "../helpers";
import { AnalizeData } from "../components/AnalizeData";

type AnalizeFormProps = {
    img_path: String
}

export const AnalizeForm = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const [img, setImg] = useState<File>();

    const [data, setData] = useState<AnalizeResponse>();
    const { VITE_API_URL } = getEnvVariables();

    const { 
        handleSubmit, register, formState: { isValid }, setValue
    } = useForm<AnalizeFormProps>();

    const onDrop = useCallback(async ( acceptedFiles: File[],
        _fileRejections: FileRejection[], _event: DropEvent)=> {
            setImg(acceptedFiles[0]);
            const imgStr = await getBase64(acceptedFiles[0]);
            setValue("img_path", imgStr, {shouldValidate: true});
            setLoading(false);
            setSuccess(false);
            setData(undefined);
    },[]);

    const doSubmit = async (data: AnalizeFormProps) => {
        if(!data)
            return
        setLoading(true);
        const resp = await fetch(`${VITE_API_URL}/analyze`, {
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
        const analizeResponse = await resp.json();
        setData(analizeResponse);
    };

    return (
        <>
            <form onSubmit={ handleSubmit(doSubmit) }>
                <input type="text"
                    style={{display:"none"}}
                    {...register("img_path", {required: true})}
                />
                <Grid2 container spacing={ 2 } rowSpacing={ 2 }>
                    <Grid2 size={ 6 }>
                        <ImageWrapper onDrop={onDrop} img={img} />
                    </Grid2>
                    <Grid2 size = { 6 }>
                        <AnalizeData data={data}/>
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
        </>
    )
}
