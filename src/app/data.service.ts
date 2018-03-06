import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { promise } from 'selenium-webdriver';
import * as req from 'request';
import { resolve } from 'url';
import { reject } from 'q';

@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }

  GetMockPhotos() {
    return this.http.get("https://jsonplaceholder.typicode.com/photos");
  }

  GetMockPhotosPromise() {
    return new Promise((resolve, reject) => {
      req.get("https://jsonplaceholder.typicode.com/posts", (error, response, body) => {
        if (error)
          reject(error);
        else
          resolve(body);
      })
    });
  }

  CallAzure(uriBase, params, blob, httpOptions)
  {
    let s  = "https://imgur.com/r/Faces/SqaOjMh"
    return this.http.post(
      uriBase + "?" + this.serialize(params),
      {
        url: '"' + s +'"'
      }, 
      httpOptions
    );
  }

  serialize = function(obj) {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }
}
