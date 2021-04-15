import IStorageProvider from "../model/IStorageProvider";

export default class S3StorageProvider implements IStorageProvider {

  public async saveFile(file: string): Promise<string> {
    throw new Error("Method not implemented.");
  }
  public async deleteFile(file: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

}
