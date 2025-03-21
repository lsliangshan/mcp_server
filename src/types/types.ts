export enum XF_URL {
  recognizeImage = "https://api.xf-yun.com/v1/private/sf8e6aca1",
}

export interface XF_COORD {
  x: number;
  y: number;
}

export interface XF_RECOGNIZE_IMAGE_RESPONSE {
  coord: XF_COORD[];
  conf: number;
  content: string;
}

export interface GetResumeDetailOptions {
  at: string;
  rt: string;
  resumeNumber: string;
  lang?: "1";
}
