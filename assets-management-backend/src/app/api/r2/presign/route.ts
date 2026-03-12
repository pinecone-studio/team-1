// src/app/api/r2/presign/route.ts
import { NextRequest } from "next/server";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
type PresignRequestBody = {
  key: string;
  contentType: string;
  bucketName: string;
};

export async function POST(req: NextRequest) {
  try {
    const body: PresignRequestBody = await req.json();

    const { key, contentType, bucketName } = body;

    const client = new S3Client({
      region: "us-east-1",
      endpoint: process.env.R2_S3_API,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
      },
    });

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      ContentType: contentType,
    });

    const signedUrl = await getSignedUrl(client, command, { expiresIn: 3600 });

    return new Response(JSON.stringify({ key, url: signedUrl }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
