import { Grid2 } from "@mui/material"
import CropImage, { Area } from "./CropImage"
import DropZone, { DropZoneProps } from "./DropZone"

export type ImageWrapperProps = {
    area?: Area
} & DropZoneProps

export const ImageWrapper = ({onDrop, img, area}: ImageWrapperProps) => {
  return (
    <Grid2 container >
        <Grid2 size={6}>
            <DropZone
                onDrop={onDrop}
                img={img}/>
        </Grid2>
        <Grid2 size={ 6}>
            {
                img &&
                area &&
                <CropImage
                    imgSrc={URL.createObjectURL(img)}
                    area={area}
                />
            }
        </Grid2>
        
    </Grid2>
  )
}
