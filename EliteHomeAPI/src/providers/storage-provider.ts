export interface StorageProvider {
  saveFile(fileName: string, fileBuffer: Buffer): Promise<string>;
  deleteFile(fileName: string): Promise<void>;
}
