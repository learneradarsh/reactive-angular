import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  constructor(protected readonly loaderService: LoaderService) {

  }

  ngOnInit() {

  }


}
