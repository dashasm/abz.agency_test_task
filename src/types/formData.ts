export interface IFromData {
  name: string;
  phone: string;
  email: string;
  position_id: number;
  photo: string | IPhoto;
}

export interface IPhoto {
  lastModified: number;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}
