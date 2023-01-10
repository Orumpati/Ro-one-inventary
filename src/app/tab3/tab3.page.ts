import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

 // encodedData: any;
  //scannedBarCode!: {};
  //barcodeScannerOptions: BarcodeScannerOptions;
  
  constructor( private barcodeScanner: BarcodeScanner) {}
  
    //this.encodedData = "Programming isn't about what you know";
    
    /*this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };*/
    ngOnInit(): void {
        
  this.barcodeScanner.scan().then((barcodeData: any) => {
    console.log('Barcode data', barcodeData);
   }).catch((err: any) => {
       console.log('Error', err);
   });
      
    }


  }


