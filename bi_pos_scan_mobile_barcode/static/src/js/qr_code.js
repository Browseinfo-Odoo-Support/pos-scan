odoo.define('bi_pos_scan_mobile_barcode.ScanQrCode', function (require) {
    'use strict';

    const AbstractAwaitablePopup = require('point_of_sale.AbstractAwaitablePopup');
    const Registries = require('point_of_sale.Registries');
    const {posbus} = require('point_of_sale.utils');
    const {useState} = owl.hooks;
    const { Gui } = require('point_of_sale.Gui');
//     // To use Html5QrcodeScanner (more info below)
// import {Html5QrcodeScanner} from "html5-qrcode"

// // To use Html5Qrcode (more info below)
// import {Html5Qrcode} from "html5-qrcode"

    class scanqrcode extends AbstractAwaitablePopup {
        constructor() {
            super(...arguments);
            this.state = useState({
                codeFound: '',
            });

        }

        mounted() {
            super.mounted()
            this._startCamera()
        }

        _startCamera() {
            var self = this
            var html5QrcodeScanner = false
             function onScanSuccess(decodedText, decodedResult) {
                // Handle on success condition with the decoded text or result.
                console.log(`Scan result: ${decodedText}`, decodedResult);
                if(self.env.pos.config.continue_scan){

                      if (decodedText) {
                          var product = ''
                          if(self.env.pos.config.pos_scan_mobile_type == 'barcode'){
                              product = self.env.pos.db.get_product_by_barcode(decodedText);
                          }
                          else if(self.env.pos.config.pos_scan_mobile_type == 'int_ref'){
                              product = self.env.pos.db.get_product_by_default_code(decodedText);
                          }
                          else if(self.env.pos.config.pos_scan_mobile_type == 'qr_code'){
                              product = self.env.pos.db.get_product_by_qr(decodedText);
                          }
                          else if(self.env.pos.config.pos_scan_mobile_type == 'all'){
                              if(self.env.pos.db.get_product_by_barcode(decodedText)){
                                  product = self.env.pos.db.get_product_by_barcode(decodedText);
                              }
                              else if(self.env.pos.db.get_product_by_default_code(decodedText)){
                                  product = self.env.pos.db.get_product_by_default_code(decodedText);
                              }
                              else if(self.env.pos.db.get_product_by_qr(decodedText)){
                                  product = self.env.pos.db.get_product_by_qr(decodedText);
                              }
                          }
                          if(product){
                              self.env.pos.get_order().add_product(product);
                              if(self.env.pos.config.product_success){
                                  $.iaoAlert({msg: "Product: "+product.display_name +" Added to cart successfully.",
                                      type: "notification",
                                      mode: "dark",
                                      autoHide:true,
                                      alertTime:"3000",
                                      closeButton: true,
                                      })
                              }
                              if(self.env.pos.config.product_success_sound){
                                  Gui.playSound('bell');
                              }

                          }else{
                              if(self.env.pos.config.product_faild){
                                  $.iaoAlert({msg: "Warning: Scanned Internal Reference/Barcode not exist in any product!",
                                   type: "error",
                                   autoHide:true,
                                   alertTime:"3000",
                                   closeButton: true,
                                   mode: "dark",})
                              }
                              if(self.env.pos.config.product_faild_sound){
                                  Gui.playSound('error');
                              }
                          
                        }                
                    }
                  }else{
                      if (decodedText) {
                          var product = ''
                          if(self.env.pos.config.pos_scan_mobile_type == 'barcode'){
                              product = self.env.pos.db.get_product_by_barcode(decodedText);
                          }
                          else if(self.env.pos.config.pos_scan_mobile_type == 'int_ref'){
                              product = self.env.pos.db.get_product_by_default_code(decodedText);
                          }
                          else if(self.env.pos.config.pos_scan_mobile_type == 'qr_code'){
                              product = self.env.pos.db.get_product_by_qr(decodedText);
                          }
                          else if(self.env.pos.config.pos_scan_mobile_type == 'all'){
                              if(self.env.pos.db.get_product_by_barcode(decodedText)){
                                  product = self.env.pos.db.get_product_by_barcode(decodedText);
                              }
                              else if(self.env.pos.db.get_product_by_default_code(decodedText)){
                                  product = self.env.pos.db.get_product_by_default_code(decodedText);
                              }
                              else if(self.env.pos.db.get_product_by_qr(decodedText)){
                                  product = self.env.pos.db.get_product_by_qr(decodedText);
                              }
                          }
                          if(product){
                              self.env.pos.get_order().add_product(product);
                              html5QrcodeScanner.pause();
                              if(self.env.pos.config.product_success){
                                  $.iaoAlert({msg: "Product: "+product.display_name +" Added to cart successfully.",
                                      type: "notification",
                                      mode: "dark",
                                      autoHide:true,
                                      alertTime:"3000",
                                      closeButton: true,
                                      })
                              }
                              if(self.env.pos.config.product_success_sound){
                                  Gui.playSound('bell');
                              }
                              
                          }else{
                              html5QrcodeScanner.pause();
                              if(self.env.pos.config.product_faild){
                                  $.iaoAlert({msg: "Warning: Scanned Internal Reference/Barcode/Qrcode not exist in any product!",
                                   type: "error",
                                   autoHide:true,
                                   alertTime:"3000",
                                   closeButton: true,
                                   mode: "dark",})
                              }
                              if(self.env.pos.config.product_faild_sound){
                                  Gui.playSound('error');
                              }
                              
                        }                  
                    }
                  }
                }
            
            function onScanFailure(error) {
              // handle scan failure, usually better to ignore and keep scanning.
              // for example:
              console.warn(`Code scan error = ${error}`);
            }
            html5QrcodeScanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 });
            html5QrcodeScanner.render(onScanSuccess,onScanFailure);

            $(".resume").click(function() {
              html5QrcodeScanner.resume();
            });


            $(".pause").click(function() {
                html5QrcodeScanner.pause();
              });

        }
    }

    scanqrcode.template = 'scanqrcode';

    Registries.Component.add(scanqrcode);

    scanqrcode.defaultProps = {
        confirmText: 'Ok',
        cancelText: 'Close',
        title: 'Scanning QrCode',
        ResumeText: 'Resume',
        PauseText : 'Pause'

    };

    return scanqrcode;
});
