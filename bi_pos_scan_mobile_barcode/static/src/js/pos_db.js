odoo.define('bi_pos_scan_mobile_barcode.pos_db', function (require) {
"use strict";

var core = require('web.core');
var DB = require('point_of_sale.DB');

var core = require('web.core');
var _t = core._t;
var QWeb = core.qweb;
var counter = 0;

DB.include({
    init: function(options) {
        this._super.apply(this, arguments);
        this.product_by_default_code = {};
        this.product_by_qr = {};
        
    },
    add_products: function(products) {
        var self = this;
        this._super(products);
        var defined_product = false;
        for(var i = 0, len = products.length; i < len; i++){
        	var product = products[i];
            if(product.default_code){
                this.product_by_default_code[product.default_code] = product;
            }
            if(product.qr_code){
                this.product_by_qr[product.qr_code] = product;
            }
        }
    },
    get_product_by_default_code: function(default_code){
        if(this.product_by_default_code[default_code]){
            return this.product_by_default_code[default_code];
        } else {
            return undefined;
        }
    },
    get_product_by_qr: function(qr_code){
        if(this.product_by_qr[qr_code]){
            return this.product_by_qr[qr_code];
        } else {
            return undefined;
        }
    },
    
});
});