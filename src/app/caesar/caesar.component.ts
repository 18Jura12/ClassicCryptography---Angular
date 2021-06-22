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
  cipherForm: FormGroup;
  decipherForm: FormGroup;

  constructor(
    private caesarService: CaesarService
  ) { }

  ngOnInit(): void {
    this.initForms();
  }

  initForms() {
    this.cipherForm = new FormGroup({
      'openText': new FormControl('', Validators.required),
      'shift': new FormControl(0, [
        Validators.required,
        Validators.pattern(/^{-}*[0-9]+[0-9]*$/)
      ]),
      'alphabet': new FormControl('ABCDEFGHIJKLMNOPQRSTUVWXYZ', Validators.required)
    });

    this.decipherForm = new FormGroup({
      'cipher': new FormControl('', Validators.required),
      'shift': new FormControl(0, [
        Validators.required,
        Validators.pattern(/^{-}*[0-9]+[0-9]*$/)
      ]),
      'alphabet': new FormControl('ABCDEFGHIJKLMNOPQRSTUVWXYZ', Validators.required)
    });
  }

  onSubmitCipher() {
    let values = this.cipherForm.getRawValue();
    this.caesarService.getEncripted(
      values['openText'], values['shift'], values['alphabet']
    ).subscribe(
      (resData) => {
        console.log()
        console.log(resData);
      },
      (err) => {
        console.log(err);
      }
      );
  }

  onSubmitDecipher() {
    let values = this.decipherForm.getRawValue();
    this.caesarService.getEncripted(
      values['cipher'], values['shift'], values['alphabet']
    ).subscribe(
      (resData) => {
        console.log()
        console.log(resData);
      },
      (err) => {
        console.log(err);
      }
      );
  }

  switchTab(newTab: string) {
    this.tab = newTab;
  }

}
