odoo.define('bi_pos_scan_mobile_barcode.pos_quagga', function (require) {
"use strict";

const { useState } = owl;
const PosComponent = require('point_of_sale.PosComponent');
const ProductScreen = require('point_of_sale.ProductScreen');
const { useListener } = require('web.custom_hooks');
const Registries = require('point_of_sale.Registries');
const confirmPopup = require('point_of_sale.ConfirmPopup');
const Chrome = require('point_of_sale.Chrome');
const { Gui } = require('point_of_sale.Gui');
var core = require('web.core');
var _t = core._t;
var QWeb = core.qweb;

class QRButton extends PosComponent {
        constructor() {
            super(...arguments);
            useListener('click', this.onClick);
        }

          async onClick(){
            await this.showPopup('scanqrcode')

          }
        }


    QRButton.template = 'QRButton';

    ProductScreen.addControlButton({
        component: QRButton,
        condition: function() {
            return this.env.pos;
        },
    });

    Registries.Component.add(QRButton);

    return QRButton;


});