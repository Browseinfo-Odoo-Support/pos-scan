odoo.define('bi_pos_scan_mobile_barcode.pos_models', function (require) {
"use strict";

var core = require('web.core');
var models = require('point_of_sale.models');

var core = require('web.core');
var _t = core._t;
var QWeb = core.qweb;
var counter = 0;

models.load_fields("product.product",['qr_code']);
models.load_fields("product.template",['qr_code']);
models.load_fields("pos.config", ['pos_scan_mobile_type','continue_scan','product_success','product_faild','product_success_sound','product_faild_sound']);

});