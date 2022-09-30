import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {
  async upload({ files }) {
    console.log(files);

    const waitedFiles = await Promise.all(files);

    const bucket = 'codecamp-backend-storage';

    const storage = new Storage({
      projectId: 'norse-avatar-358105',
      keyFilename: 'gcp-file-storage.json',
    }).bucket('codecamp-backend-storage');

    const results = await Promise.all(
      waitedFiles.map(
        (el) =>
          new Promise((resolve, reject) => {
            el.createReadStream()
              .pipe(storage.file(el.filename).createWriteStream())
              .on('finish', () => resolve(`${bucket}/${el.filename}`))
              .on('error', () => reject('실패'));
          }),
      ),
    );

    return results;
  }

  async delete({ file }) {
    const storage = new Storage();

    const bucket = 'codecamp-backend-storage';

    const result = await Promise.all(
      file.map(
        (el) =>
          new Promise((resolve) => {
            const result = storage.bucket(bucket).file(el).delete();
            resolve(result);
          }),
      ),
    );
    console.log(result);
    return result;
  }
}
