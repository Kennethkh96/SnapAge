import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-capture',
  templateUrl: './capture.component.html',
  styleUrls: ['./capture.component.scss']
})
export class CaptureComponent implements OnInit {
  @ViewChild('video') _video : any;
  @ViewChild('canvas') _canvas : ElementRef;
  hideCamera = false;
  width = -1;
  height = -1;

  constructor() { }
  ngOnInit() {
   
  }
  ngAfterViewInit() {
    this.width = this.documentWidth();
    this.height = this.documentHeight();
    this._video = this._video.nativeElement;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
    {
      navigator.mediaDevices.getUserMedia({video: true}).then(stream => {
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
    //console.log(dataUrl)
  }

  Processimage(callback){
 
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
}