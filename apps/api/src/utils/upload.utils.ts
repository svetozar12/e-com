import FormData from 'form-data';
import axios from 'axios';
import multer from 'multer';
import { envs } from '../main';
import fs from 'fs';

const storage = multer.memoryStorage(); // Use memory storage to avoid storing files on disk
export const upload = multer({ storage: storage });
export async function uploadFile(file: Express.Multer.File) {
  const { originalname, mimetype, buffer } = file;
  // Create the form data
  const form = new FormData();
  form.append('file', buffer, {
    filename: originalname,
    contentType: mimetype,
  });

  return axios.post(`${envs.UPLOAD_SERVICE_URL}/upload`, form, {
    headers: {
      ...form.getHeaders(), // Append form-data headers
    },
  });
}
