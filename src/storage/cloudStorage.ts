/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import path from 'path';
import fs from 'fs';
import os from 'os';
import { promisify } from 'util';
import { storage } from "../config/firebaseConfig";


export async function uploadToCloud(
  filePath: string,
  fileType: "png" | "jpeg" | "jpg" | "pdf",
  slug: string,
): Promise<string> {

  const fileExtension = path.extname(filePath);
  const fileName = slug;
  const destination = `passes/${fileType}/${fileName}`;

  const storageRef = ref(storage, destination);

  const fileBuffer = fs.readFileSync(filePath);

  await uploadBytes(storageRef, fileBuffer, {
    contentType: `image/${fileExtension.slice(1)}`,
  });

  const url = await getDownloadURL(storageRef);

  fs.unlinkSync(filePath);

  return url;
}


const unlinkAsync = promisify(fs.unlink);


export async function uploadToLocally(
  filePath: string,
  fileType: "png" | "jpeg" | "jpg" | "pdf",
  slug: string
): Promise<string> {
  const fileExtension = path.extname(filePath);
  const fileName = slug;
  const tempDir = path.join(os.tmpdir(), 'uploads');

  // Ensure the temp directory exists
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }

  const destination = path.join(tempDir, fileName);

  // Copy the file to the temporary directory
  fs.copyFileSync(filePath, destination);

  console.log(`File saved to: ${destination}`); // Log the file path

  // Set a timeout to delete the file after 2 hours
  setTimeout(async () => {
    try {
      await unlinkAsync(destination);
      console.log(`File ${destination} deleted after 2 hours`);
    } catch (error) {
      console.error(`Failed to delete file ${destination}:`, error);
    }
  }, 2 * 60 * 60 * 1000); // 2 hours in milliseconds

  return destination;
}