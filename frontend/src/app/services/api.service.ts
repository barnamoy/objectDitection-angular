import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators/map";

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}
  upload(file): any {
    var payload = new FormData();
    payload.append("image", file, "image.png");
    return this.http.post("http://localhost:5000/api/detect", payload, {
      responseType: "blob"
    });
  }
  uploadtoNodeServer(file): any {
    var payload = new FormData();
    payload.append("image", file, "image.png");
    return this.http.post("http://localhost:3000/fileUpload", payload);
  }
  getList(): any {
    return this.http.get("http://localhost:3000/list");
  }
}
