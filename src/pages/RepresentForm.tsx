import { useCallback, useState } from "react";
import { Grid2 } from "@mui/material";
import { useForm } from "react-hook-form";
import { DropEvent, FileRejection } from "react-dropzone";

import { Area, ImageWrapper } from "../components";
import ButtonLoading from "../components/ButtonLoading";
import { AnalizeResponse, getBase64 } from "../utils";
import { getEnvVariables } from "../helpers";
import { AnalizeData } from "../components/AnalizeData";

type RepresentFormProps = {
    img: String
}

export const RepresentForm = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const [img, setImg] = useState<File>();

    const [area, setArea] = useState<Area>();

    const [data, setData] = useState<AnalizeResponse>();
    const { VITE_API_URL } = getEnvVariables();

    const { 
        handleSubmit, register, formState: { isValid }, setValue
    } = useForm<RepresentFormProps>();

    const onDrop = useCallback(async ( acceptedFiles: File[],
        _fileRejections: FileRejection[], _event: DropEvent)=> {
            setImg(acceptedFiles[0]);
            const imgStr = await getBase64(acceptedFiles[0]);
            setValue("img", imgStr, {shouldValidate: true});
            setLoading(false);
            setSuccess(false);
            setData(undefined);
    },[]);

    const doSubmit = async (data: RepresentFormProps) => {
        if(!data)
            return
        setLoading(true);
        const resp = await fetch(`${VITE_API_URL}/represent`, {
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
        const representResponse = await resp.json();
        console.log(representResponse)
        const { facial_area } = representResponse.results[0];
        setArea({
            x: facial_area.x,
            y: facial_area.y,
            height: facial_area.h,
            width: facial_area.w
        });
    };

    return (
        <>
            <form onSubmit={ handleSubmit(doSubmit) }>
                <input type="text"
                    style={{display:"none"}}
                    {...register("img", {required: true})}
                />
                <Grid2 container spacing={ 2 } rowSpacing={ 2 }>
                    <Grid2 size={ 6 }>
                        <ImageWrapper onDrop={onDrop} img={img}area={area} />
                    </Grid2>
                    <Grid2 size = { 6 }>
                        <AnalizeData data={data} />
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
