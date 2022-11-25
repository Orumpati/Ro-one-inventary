import { Component } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from "@ionic-native/barcode-scanner/ngx";
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  encodedData: any;
  scannedBarCode!: {};
  barcodeScannerOptions: BarcodeScannerOptions;
  
  constructor(private scanner: BarcodeScanner) {
  
    this.encodedData = "Programming isn't about what you know";
    
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };
    
  }
  scanBRcode() {
    this.scanner.scan().then((res: {}) => {
        this.scannedBarCode = res;
      }).catch((err: any) => {
        alert(err);
      });
  }
}
