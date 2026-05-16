// biome-ignore assist/source/organizeImports: <Falso positivo do Biome>
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { randomUUID } from "node:crypto";
import path from "node:path";
import { envs } from "../../config/envs";
import { AppError } from "../../errors/app-error";
import type { StorageProvider } from "../storage-provider";

export class S3StorageProvider implements StorageProvider {
  private s3Client: S3Client;
  private bucketName = "elitehome-images";

  constructor() {
    this.s3Client = new S3Client({
      region: envs.AWS_REGION, // A AWS exige uma região, mesmo sendo um clone local
      credentials: {
        accessKeyId: envs.AWS_ACCESS_KEY_ID, // Seu MINIO_ROOT_USER
        secretAccessKey: envs.AWS_SECRET_ACCESS_KEY, // Seu MINIO_ROOT_PASSWORD
      },
      // Necessário configurar o endpoint para apontar para o MinIO local
      endpoint: envs.AWS_ENDPOINT_URL,
      forcePathStyle: true, // Obrigatório para o MinIO aceitar a estrutura local
    });
  }

  private getContentType(extension: string): string {
    const mimeTypes: Record<string, string> = {
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".webp": "image/webp",
    };

    return mimeTypes[extension.toLowerCase()] || "application/octet-stream";
  }

  async saveFile(originalName: string, fileBuffer: Buffer): Promise<string> {
    const fileExtension = path.extname(originalName);
    const uniqueFileName = `${randomUUID()}${fileExtension}`;

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: uniqueFileName,
      Body: fileBuffer,
      ContentType: this.getContentType(fileExtension),
    });

    await this.s3Client.send(command);
    return uniqueFileName;
  }

  async deleteFile(fileName: string): Promise<void> {
    const justFileName = path.basename(fileName);

    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: justFileName,
    });

    try {
      await this.s3Client.send(command);
    } catch (err) {
      throw new AppError(`Error deleting file: ${err}`, 500);
    }
  }
}
