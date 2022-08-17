# -*- coding: utf-8 -*-
# Part of BrowseInfo. See LICENSE file for full copyright and licensing details.

{
    "name" : "POS Mobile Barcode Scanner | POS Mobile QRCode Scanner",
    "version" : "15.0.0.0",
    "category" : "",
    'summary': 'POS Mobile Barcode Scanner | POS Mobile QRCode Scanner',
    "description": """
    
   Description of the module. 
    
    """,
    "author": "BrowseInfo",
    "website" : "www.browseinfo.in",
    "price": 000,
    "currency": 'EUR',
    "depends" : ['point_of_sale','bi_qr_generator'],
    "data": [
        # 'views/pos_assets.xml',
        'views/pos_config_view.xml',
    ],
    # 'qweb': ['static/src/xml/pos.xml'
    # ],
    'assets': {
        'point_of_sale.assets': [
            'bi_pos_scan_mobile_barcode/static/src/js/iao-alert.jquery.js',
            'bi_pos_scan_mobile_barcode/static/src/js/pos_quagga.js',
            'bi_pos_scan_mobile_barcode/static/src/js/qr_code.js',
            'bi_pos_scan_mobile_barcode/static/src/js/pos_db.js',
            'bi_pos_scan_mobile_barcode/static/src/js/models.js',
            'bi_pos_scan_mobile_barcode/static/src/js/html5qr.js',
            'bi_pos_scan_mobile_barcode/static/src/css/iao-alert.css'
        ],
        'web.assets_qweb': [
            'bi_pos_scan_mobile_barcode/static/src/xml/**/*',
        ],
    },
    'license': 'OPL-1',
    "auto_install": False,
    "installable": True,
    "live_test_url":'youtube link',
    "images":["static/description/Banner.png"],
}
# vim:expandtab:smartindent:tabstop=4:softtabstop=4:shiftwidth=4:
