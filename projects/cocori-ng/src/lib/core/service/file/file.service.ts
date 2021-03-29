import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor() { }

  downloadFile(response: Response, fileName: string) {
    const a = document.createElement('a');

    a.href = URL.createObjectURL(response);
    a.download = fileName;

    document.body.appendChild(a);

    a.click();
  }
}
