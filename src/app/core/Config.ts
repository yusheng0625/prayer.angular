import { HttpHeaders} from '@angular/common/http';
export class Config{
    static _baseUrl:string = "//tree.viaom.com/backend/";
    //static _baseUrl:string = "//localhost/prayer/";
    static createRequestOptions() {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return headers;
      }
}

