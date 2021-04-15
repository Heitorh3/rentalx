import * as fs from 'fs';
import path from 'path';

import uploadConfig from '@config/upload';

import IStorageProvider from '../model/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {

    await fs.renameSync(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.uploadsFolder, file),
    );

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, file);

    try {

      await fs.statSync(filePath);
    } catch {
      return;
    }

    await fs.unlinkSync(filePath);
  }
}

export default DiskStorageProvider;
