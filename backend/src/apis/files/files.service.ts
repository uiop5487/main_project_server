import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import sharp from 'sharp';
import fetch from 'node-fetch';
import { Readable, Writable } from 'stream';
import { createReadStream } from 'fs';

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

    // const aaa = new Storage().bucket(bucket);

    // const file = aaa.file('다운로드.jpeg');

    // const url =
    //   'https://storage.googleapis.com/codecamp-backend-storage/asdasdasd.001.jpeg';

    // const image = await fetch(url);
    // const imageBuffer = await image.buffer();
    // const imageSharp = await sharp(imageBuffer)
    //   .jpeg()
    //   .resize(1200, 1200)
    //   .toFile(file.name);

    // const asd = JSON.stringify(imageSharp);

    // const readable = Readable.from([asd]);

    // const writable = Writable.call(asd);

    // // console.log(writable);

    // const qwe = { ...readable, ...writable };

    // qwe
    //   .pipe(storage.file('새로운 거11.jpeg').createWriteStream())
    //   .on('finish', () => console.log('성공'))
    //   .on('error', () => console.log('실패'));

    // // console.log(readable);

    // // readable.on('data', (asd) => {
    // //   console.log(asd);
    // // });

    // // console.log(waitedFiles[0].createReadStream());
    // // console.log(readable);

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
