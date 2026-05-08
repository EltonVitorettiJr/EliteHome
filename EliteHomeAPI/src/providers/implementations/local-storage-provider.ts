import { randomUUID } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { NotFoundError } from "../../errors/not-found-error";
import type { StorageProvider } from "../storage-provider";

export class LocalStorageProvider implements StorageProvider {
  async saveFile(originalName: string, fileBuffer: Buffer): Promise<string> {
    // extrai a extensão do arquivo e gera um nome único para evitar conflitos
    const fileExtension = path.extname(originalName);
    const uniqueFileName = `${randomUUID()}${fileExtension}`;

    // define o caminho da pasta de uploads
    const uploadFolder = path.resolve(__dirname, "..", "..", "..", "uploads");

    // cria a pasta de uploads se ela não existir
    await fs.mkdir(uploadFolder, { recursive: true });

    // define o caminho completo do arquivo a ser salvo
    const filePath = path.resolve(uploadFolder, uniqueFileName);

    // salva o arquivo na pasta de uploads
    await fs.writeFile(filePath, fileBuffer);

    return `/uploads/${uniqueFileName}`;
  }

  async deleteFile(fileName: string): Promise<void> {
    try {
      // extrai apenas o nome do arquivo para evitar problemas de path traversal
      const justFileName = path.basename(fileName);

      // define o caminho da pasta de uploads e do arquivo a ser deletado
      const uploadFolder = path.resolve(__dirname, "..", "..", "..", "uploads");
      const filePath = path.resolve(uploadFolder, justFileName);

      await fs.unlink(filePath);
    } catch (err) {
      throw new NotFoundError(`File not found: ${err}}`);
    }
  }
}
