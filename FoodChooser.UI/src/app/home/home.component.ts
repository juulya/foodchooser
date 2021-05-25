import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { $ } from 'protractor';
import { PageScrollService } from "ngx-page-scroll-core";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [PageScrollService]
})
export class HomeComponent implements OnInit {

  constructor(private scrollService: PageScrollService, @Inject(DOCUMENT) private document: any) { }

  ngOnInit() {

  }

  private browse() {

    this.scrollService.scroll({
      document: this.document,
      scrollTarget: '.album'
    });

  }
}
