import { Component, OnInit} from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})

export class AboutComponent implements OnInit {

  mockFilter: any = { title: '' };
  mocks = [];
  constructor(private dataService: DataService) { 
  }

  ngOnInit() {
    this.test();
    //this.promise();
  }

  // promise() {
  //   this.dataService.GetMockPhotosPromise().then(value => {
  //     value = JSON.parse(value);
  //     for (let i = 0; i < value.length; i++) 
  //     {
  //       console.log(value[i]);
  //       this.mocks.push(value[i]);
  //     }
  //   });
  // }

  test() {
    this.dataService.GetMockPhotos().subscribe(
      (value) => {
        for (let i = 0; i < value.length; i++) 
        {
          //console.log(value[i]);
          this.mocks.push(value[i]);
        }
      },
      (error) => {console.log(error)},
      () => console.log("yay")
    );
  }

}
