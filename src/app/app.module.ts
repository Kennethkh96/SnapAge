import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';


import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { CaptureComponent } from './capture/capture.component';
import { DataService } from './data.service';
import { HttpClientModule } from '@angular/common/http';
import { FilterPipeModule } from 'ngx-filter-pipe';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    CaptureComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    FilterPipeModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
