import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HillService } from './hill.service';

@Component({
  selector: 'app-hill',
  templateUrl: './hill.component.html',
  styleUrls: ['./hill.component.css']
})
export class HillComponent implements OnInit {
  tab = 'info';
  result = false;
  textResult: string;
  cipherForm: FormGroup;

  constructor(
    private hillService: HillService
  ) { }

  ngOnInit(): void {
    this.initCipherForm();
  }

  initCipherForm() {
    this.cipherForm = new FormGroup({
      'text': new FormControl('', Validators.required),
      'shift': new FormControl(0, [
        Validators.required,
        Validators.pattern(/^{-}*[0-9]+[0-9]*$/)
      ]),
      'alphabet': new FormControl('ABCDEFGHIJKLMNOPQRSTUVWXYZ', Validators.required)
    });

  }

  onSubmitForm() {
    // let values = this.cipherForm.getRawValue();
    // if(this.tab == 'encript') {
    //   this.hillService.getEncripted(
    //     values['text'], values['key'], values['alphabet']
    //   ).subscribe(
    //     (resData) => {
    //       this.result = true;
    //       console.log(resData);
    //       this.textResult = resData.result;
    //     },
    //     (err) => {
    //       console.log(err);
    //     }
    //     );
    // } else {
    //   this.hillService.getDecripted(
    //     values['text'], values['key'], values['alphabet']
    //   ).subscribe(
    //     (resData) => {
    //       this.result = true;
    //       console.log(resData);
    //       this.textResult = resData.result;
    //     },
    //     (err) => {
    //       console.log(err);
    //     }
    //     );
    // }
  }

  switchTab(newTab: string) {
    this.tab = newTab;
    this.result = false;
  }

}
