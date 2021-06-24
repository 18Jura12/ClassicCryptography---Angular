import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CaesarService } from './caesar.service';

@Component({
  selector: 'app-caesar',
  templateUrl: './caesar.component.html',
  styleUrls: ['./caesar.component.css']
})
export class CaesarComponent implements OnInit {
  tab = 'info';
  result = false;
  textResult: string;
  cipherForm: FormGroup;

  constructor(
    private caesarService: CaesarService
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
    let values = this.cipherForm.getRawValue();
    if(this.tab == 'encript') {
      this.caesarService.getEncripted(
        values['text'], values['shift'], values['alphabet']
      ).subscribe(
        (resData) => {
          this.result = true;
          console.log(resData);
          this.textResult = resData.result;
        },
        (err) => {
          console.log(err);
        }
        );
    } else {
      this.caesarService.getDecripted(
        values['text'], values['shift'], values['alphabet']
      ).subscribe(
        (resData) => {
          this.result = true;
          console.log(resData);
          this.textResult = resData.result;
        },
        (err) => {
          console.log(err);
        }
        );
    }
  }

  switchTab(newTab: string) {
    this.tab = newTab;
    this.result = false;
  }

}
