import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL;

const s3Client = new S3Client({
  region: "auto",
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID || "",
    secretAccessKey: R2_SECRET_ACCESS_KEY || "",
  },
});

export const uploadFile = async (file: Buffer, fileName: string, contentType: string) => {
  if (!R2_BUCKET_NAME) {
    throw new Error("R2_BUCKET_NAME environment variable is not set");
  }

  const command = new PutObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: fileName,
    Body: file,
    ContentType: contentType,
  });

  try {
    await s3Client.send(command);

    if (R2_PUBLIC_URL) {
      return `${R2_PUBLIC_URL}/${fileName}`;
    }
    // Fallback if public URL is not set, though typical R2 setup uses a custom domain or worker.
    // We can return the R2 standard URL if needed, but it's usually not public.
    return `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${R2_BUCKET_NAME}/${fileName}`;

  } catch (error) {
    console.error("Error uploading file to R2:", error);
    throw error;
  }
};