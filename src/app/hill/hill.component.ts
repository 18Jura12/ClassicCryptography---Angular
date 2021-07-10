import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { HillService } from './hill.service';

@Component({
  selector: 'app-hill',
  templateUrl: './hill.component.html',
  styleUrls: ['./hill.component.css']
})
export class HillComponent implements OnInit {
  tab = 'info';
  result = false;
  matrixInput = false;
  textResult: string;
  cipherForm: FormGroup;
  isLoading = false;

  constructor(
    private hillService: HillService
  ) { }

  ngOnInit(): void {
    this.initCipherForm();
    this.addSize();
  }

  initCipherForm() {
    this.cipherForm = new FormGroup({
      'text': new FormControl('', Validators.required),
      'withMatrix': new FormControl('yes'),
      'alphabet': new FormControl('ABCČĆDĐEFGHIJKLMNOPRSŠTUVZŽ', Validators.required)
    });

  }

  onSubmitForm() {
    this.result = false;
    this.isLoading = true;
    let values = this.cipherForm.getRawValue();
    let key = '';
    console.log(values);
    if(values['withMatrix'] == 'yes') {
      key = this.matrixToString(values['matrix']);
    }
    if(this.tab == 'encript') {
      this.hillService.getEncripted(
        values['text'], key, values['alphabet']
      ).subscribe(
        (resData) => {
          this.isLoading = false;
          this.result = true;
          console.log(resData);
          this.textResult = resData.result;
        },
        (err) => {
          this.isLoading = false;
          console.log(err);
        }
        );
    } else if(key != '') {
      this.hillService.getDecripted(
        values['text'], key, values['alphabet']
      ).subscribe(
        (resData) => {
          this.isLoading = false;
          this.result = true;
          console.log(resData);
          this.textResult = resData.result;
        },
        (err) => {
          this.isLoading = false;
          console.log(err);
        }
        );
    } else {
      this.hillService.getDecriptedWithoutKey(
        values['text']
      ).subscribe(
        (resData) => {
          this.isLoading = false;
          this.result = true;
          console.log(resData);
          this.textResult = '';
          for(let result of resData) {
            this.textResult += result.result + ', ';
          }
          this.textResult = this.textResult.slice(0, this.textResult.length-2) + '.';
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
    if(this.tab == 'encript' && this.cipherForm.get('size') == null) {
      this.cipherForm.patchValue({
        'withMatrix': 'yes'
      });
      this.addSize();
    }
  }

  matrixToString(matrix: number[][]): string {
    let alphabet = "ABCČĆDĐEFGHIJKLMNOPRSŠTUVZŽ";
    let result = "";
    for(let row of matrix) {
      for(let value of row) {
        result += alphabet.charAt(value % 27);
      }
    }
    return result;
  }

  addSize() {
    this.matrixInput = false;
    this.cipherForm.addControl('size', new FormControl('2'));
    this.addMatrix(2);
  }

  removeSize() {
    this.matrixInput = false;
    this.cipherForm.removeControl('size');
    if(this.cipherForm.get('matrix') != null) {
      this.cipherForm.removeControl('matrix');
    }
  }

  addMatrix(size: number) {
    if(this.cipherForm.get('matrix') != null) {
      this.cipherForm.removeControl('matrix');
    }

    let matrix = new FormArray([]);
    for(let i = 0; i < size; i++) {
      let row = new FormArray([]);
      for(let j = 0; j < size; j++) {
        if(i == j) {
          row.push(new FormControl(1));
        } else {
          row.push(new FormControl(0));
        }
      }
      matrix.push(row);
    }
    this.cipherForm.addControl('matrix', matrix);
    this.matrixInput = true;
  }

  get matrixRows() {
    return (this.cipherForm.get('matrix') as FormArray).controls;
  }

  getRowElements(i: number) {
    return (this.matrixRows[i] as FormArray).controls;
  }

  convertToFormControl(control: AbstractControl) {
    return control as FormControl;
  }

}
