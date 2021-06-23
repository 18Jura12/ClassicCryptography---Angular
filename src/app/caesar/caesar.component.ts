import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { CaesarService } from './caesar.service';

@Component({
  selector: 'app-caesar',
  templateUrl: './caesar.component.html',
  styleUrls: ['./caesar.component.css']
})
export class CaesarComponent implements OnInit, OnDestroy {
  tab = 'info';
  cipherForm: FormGroup;
  decipherForm: FormGroup;
  tabChanged: Subject<string> = new Subject();
  sub: Subscription;

  constructor(
    private caesarService: CaesarService
  ) { }

  ngOnInit(): void {
    this.sub = this.tabChanged.subscribe(
      (tab: string) => {
        if(tab == 'encript') {
          this.initCipherForm();
        } else if(tab == 'decript') {
          this.initDecipherForm();
        }
      }
    );
  }

  initCipherForm() {
    this.cipherForm = new FormGroup({
      'openText': new FormControl('', Validators.required),
      'shift': new FormControl(0, [
        Validators.required,
        Validators.pattern(/^{-}*[0-9]+[0-9]*$/)
      ]),
      'alphabet': new FormControl('ABCDEFGHIJKLMNOPQRSTUVWXYZ', Validators.required)
    });

  }

  initDecipherForm() {
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
    console.log("ovdje");
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
    this.caesarService.getDecripted(
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
    this.tabChanged.next(newTab);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
