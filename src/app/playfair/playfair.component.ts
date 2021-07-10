import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlayfairService } from './playfair.service';

@Component({
  selector: 'app-playfair',
  templateUrl: './playfair.component.html',
  styleUrls: ['./playfair.component.css']
})
export class PlayfairComponent implements OnInit {
  tab = 'info';
  result = false;
  isLoading = false;
  textResult: string;
  matrix: string[];
  cipherForm: FormGroup;

  constructor(
    private playfairService: PlayfairService
  ) { }

  ngOnInit(): void {
    this.initCipherForm();
  }

  initCipherForm() {
    this.cipherForm = new FormGroup({
      'text': new FormControl('', Validators.required),
      'key': new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Za-z]+$/)
      ]),
      'language': new FormControl('ENGLISH', Validators.required)
    });

  }

  onSubmitForm() {
    this.result = false;
    this.isLoading = true;
    let values = this.cipherForm.getRawValue();
    if(this.tab == 'encript') {
      this.playfairService.getEncripted(
        values['text'], values['key'], values['language']
      ).subscribe(
        (resData) => {
          this.isLoading = false;
          this.result = true;
          console.log(resData);
          this.textResult = resData.result;
          this.matrix = resData.matrix;
        },
        (err) => {
          this.isLoading = false;
          console.log(err);
        }
        );
    } else {
      this.playfairService.getDecripted(
        values['text'], values['key'], values['language']
      ).subscribe(
        (resData) => {
          this.isLoading = false;
          this.result = true;
          console.log(resData);
          this.textResult = resData.result;
          this.matrix = resData.matrix;
        },
        (err) => {
          this.isLoading = false;
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
