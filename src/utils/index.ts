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
};

type FacialArea = {
    "h": number;
    "left_eye": number[];
    "right_eye": number[];
    "w": number;
    "x": number;
    "y": number;
};

type AnalizeResponse = {
    results: AnalizeResponseResults[]
};

type AnalizeResponseResults = {
    "age": number;
    "dominant_emotion": string
    "dominant_gender": string
    "dominant_race": string
};

type RepresentResponse = {
    results: RepresentResult[]
}

type RepresentResult = {
    "embedding": number[];
    "face_confidence": number;
    "facial_area": FacialArea
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
    FacialArea,
    AnalizeResponse,
    AnalizeResponseResults,
    RepresentResponse,
    RepresentResult,
};

export {
    getBase64
};