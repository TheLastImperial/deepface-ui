import { useMemo } from 'react';

import { DropEvent, FileRejection, useDropzone } from 'react-dropzone';
import { Grid2 } from '@mui/material';

export type DropZoneProps = {
    onDrop: <T extends File>(
        acceptedFiles: T[],
        fileRejections: FileRejection[],
        event: DropEvent
      ) => void;
    img?: File
};

const baseStyle = {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const focusedStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

const DropZone = ({onDrop, img}:DropZoneProps) => {

    const {
        getRootProps, getInputProps, isDragActive, isFocused, isDragAccept,
        isDragReject
    } = useDropzone({
        accept: {
        'image/*': []
        },onDrop
    });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
      }), [
        isFocused,
        isDragAccept,
        isDragReject
      ]);

    return (
        <Grid2 container
            spacing={ 1 } size={ 12 }>
            <Grid2 size ={ 12 } { ...getRootProps({style}) }>
                <input { ...getInputProps() }/>                  
                {
                    isDragActive ?
                    <p>Drop the file here ...</p> :
                    <p>Drag a image file here, or click to select file.</p>
                }
            </Grid2>
            <Grid2 size={ 12 }>
                {
                    img &&
                    <img
                        src={URL.createObjectURL(img)}
                        style={{maxWidth: "306px"}}
                    />
                }
            </Grid2>
        </Grid2>
    );
};

 export default DropZone;
