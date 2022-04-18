import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-paygrow',
  templateUrl: './paygrow.component.html',
  styleUrls: ['./paygrow.component.scss']
})
export class PaygrowComponent implements OnInit {

  bibleSay:string="";
  constructor(public dialogRef: MatDialogRef<PaygrowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.bibleSay = data.bibleSay;
    }

  ngOnInit() {
  }
  onYesClick()
  {
    this.dialogRef.close(true); 
  }
  onNoClick()
  {
    this.dialogRef.close(false);    
  }
}
