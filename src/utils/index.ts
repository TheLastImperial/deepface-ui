type VerifyResponse = {
    "detector_backend": string;
    "distance": number;
    "facial_areas": {
        "img1": FacialArea;
        "img2": FacialArea
    },
    "model": string;
    "similarity_metric": string;
    "threshold": number;
    "time": number;
    "verified": boolean
}

type FacialArea = {
    "h": number;
    "left_eye": number[];
    "right_eye": number[];
    "w": number;
    "x": number;
    "y": number;
}

const getBase64 = (file:File):Promise<String> => {
    return new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
        let baseURL = reader.result as String
        baseURL = baseURL?.replace(/^.+,/, "").replace("\n", "");
        resolve(`data:${file.type};base64,${baseURL}`);
        };
    });
};

export type {
    VerifyResponse,
    FacialArea
};

export {
    getBase64
};