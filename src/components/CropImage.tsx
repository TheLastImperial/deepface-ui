import { Grid2 } from "@mui/material";
import { useEffect, useRef } from "react";

export type Area = {
    width: number;
    height: number;
    x: number;
    y: number;
};
export type CropImageProps = {
    imgSrc: string;
    area: Area
};

const CropImage = ({imgSrc, area}: CropImageProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if(!canvas)
            return;
        const ctx = canvas.getContext('2d');
        const imageObj = new Image();
        imageObj.src = imgSrc;
        imageObj.onload = function() {
            canvas.width = area.width;
            canvas.height = area.height;

            ctx?.drawImage(imageObj,
                area.x, area.y,
                area.width, area.height,
                0, 0,
                area.width, area.height
            );
        };

    }, [imgSrc, area])

  return (
    <Grid2 container>
        <Grid2>
            <canvas ref={canvasRef}
                style={{
                    maxWidth: "60%",
                    paddingTop: "20%", 
                    paddingLeft: "20%"
                }}>
            </canvas>
        </Grid2>
    </Grid2>
  )
};

export default CropImage;
