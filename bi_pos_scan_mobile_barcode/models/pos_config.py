# -*- coding: utf-8 -*-
from odoo import fields, models

class PosConfigInherit(models.Model):
	_inherit = 'pos.config'

	pos_scan_mobile_type = fields.Selection([
        ('int_ref','Internal Reference'),
        ('barcode','Barcode'),
        ('qr_code','QR code'),        
        ('all','All')
        ], string='POS Product Scan Options In Mobile', translate=True,readonly = False, default='barcode')


	continue_scan = fields.Boolean(string='Continue scan product', default=False)
	product_success = fields.Boolean(string='Product success Notification', default=False)
	product_faild = fields.Boolean(string='Product Faild Notification', default=False)   
	product_success_sound = fields.Boolean(string='Product success play Sound', default=False)
	product_faild_sound = fields.Boolean(string='Product faild play sound', default=False)


