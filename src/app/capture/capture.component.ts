import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { DataService } from '../data.service';

@Component({
  selector: 'app-capture',
  templateUrl: './capture.component.html',
  styleUrls: ['./capture.component.scss']
})
export class CaptureComponent implements OnInit {
  @ViewChild('video') _video : any;
  @ViewChild('canvas') _canvas : ElementRef;
  hideCamera = false;
  width: number =  this.documentWidth();
  height: number = this.documentHeight();  

  constructor(private http: HttpClient, private dataService: DataService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this._video = this._video.nativeElement;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
      {
        navigator.mediaDevices.getUserMedia({video: {width: this.width, height: this.height}}).then(stream => {
        this._video.src = window.URL.createObjectURL(stream);
        this._video.play();

      }).catch(function(err) {
        console.log(err.name + ": " + err.message);
      });
    }
  }

  takePicture() {
    console.log("taking picture....");
    this.hideCamera = true;
    let canvas = this._canvas.nativeElement;
    let context = canvas.getContext('2d');
    context.drawImage(this._video, 0, 0, this.width, this.height);
    let dataUrl = canvas.toDataURL();
   // console.log(dataUrl);
    let contentType = 'image/png';

    console.log(new Blob([dataUrl], {type: contentType}));
  this.CallAzureApi(new Blob([dataUrl], {type: contentType}));
    //var blob = this.b64toBlob(dataUrl, contentType);
    //var blobUrl = URL.createObjectURL(blob);
    // canvas.toBlob((blob) => {
    //   console.log(blob);
    //   this.CallAzureApi(blob);
    // }, 'image/png', 0.95)


  }



  CallAzureApi(blob){
    // Slutpunkt: https://westcentralus.api.cognitive.microsoft.com/face/v1.0

    // Nøgle 1: b7139100886a43d388bfc91281945b73

    // Nøgle 2: 14066fc78ed34fd78ce8def48ccbe8ac

    const subscriptionKey = "cfe8c60d7dc44eb68048bb6c41a230d1";

    const uriBase = "https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/analyze";

    const params = {
      "visualFeatures": "Categories,Description,Color",
      "details": "",
      "language": "en",
    };

    console.log(JSON.stringify(params));

        
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        "Ocp-Apim-Subscription-Key": subscriptionKey
      })
    };

    this.dataService.CallAzure(uriBase, params, blob, httpOptions).subscribe(
      (value) => {console.log(value);},
      (error) => {console.log(error);},
      () => {console.log("completed");}
    );
    // let headers = new HttpHeaders();
    // headers.append("Content-Type", "application/json");
    // headers.append("Ocp-Apim-Subscription-Key", subscriptionKey);

  
  }

  documentHeight() {
    return Math.max(
        document.documentElement.clientHeight,
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight
    );
  }

  documentWidth() {
    return Math.max(
      document.documentElement["clientWidth"],
      document.body["scrollWidth"],
      document.documentElement["scrollWidth"],
      document.body["offsetWidth"],
      document.documentElement["offsetWidth"]
    );
  }

  b64toBlob(b64Data, contentType = '', sliceSize = 512) {
    var byteCharacters = atob(b64Data);
    var byteArrays = [];
  
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);
  
      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
  
      var byteArray = new Uint8Array(byteNumbers);
  
      byteArrays.push(byteArray);
    }
      
    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }
  
}