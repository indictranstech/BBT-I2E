frappe.ui.form.on("Stock Entry", {
	refresh: function(frm){

		if (frm.doc.sales_order_ref){
			
			frm.set_value("stock_entry_type", "Stock Reservation")
			frm.trigger("hide_add_delete_option")
			frm.trigger("to_warehouse")
		}

		if (frm.doc.quotation_ref) {
			
			frm.set_value("stock_entry_type", "Stock Reservation")
			frm.trigger("hide_add_delete_option")
			frm.trigger("to_warehouse")
		}
	},

	hide_add_delete_option: function(frm) {
		$('[data-fieldname="items"]').find('.grid-buttons').hide()
		$('[data-fieldname="items"]').find('.grid-download').hide()
		$('[data-fieldname="items"]').find('.grid-upload').hide()
		$('[data-fieldname="items"]').find('.octicon-triangle-down').hide()
		$('[data-fieldname="items"]').find('.grid-add-row').hide()
		$('[data-fieldname="items"]').find('.grid-row-check').hide()
		$('[data-fieldname="items"]').find('.grid-remove-rows').hide()
		$('[data-fieldname="items"]').find('.grid-delete-row').hide()
		$('[data-fieldname="items"]').find('.grid-insert-row-below').hide()
		$('[data-fieldname="items"]').find('.grid-insert-row').hide()
		$('[data-fieldname="items"]').find('.grid-add-multiple-rows').hide()
	},

	items_on_form_rendered:function(frm,cdt,cdn) {
		$('[data-fieldname="items"]').find('.close').hide()
		$('[data-fieldname="items"]').find('.grid-add-row').hide()
		$('[data-fieldname="items"]').find('.grid-row-check').hide()
		$('[data-fieldname="items"]').find('.grid-remove-rows').hide()
		$('[data-fieldname="items"]').find('.grid-delete-row').hide()
		$('[data-fieldname="items"]').find('.grid-insert-row-below').hide()
		$('[data-fieldname="items"]').find('.grid-insert-row').hide()
		$('[data-fieldname="items"]').find('.grid-append-row').hide()
		$('[data-fieldname="items"]').find('.grid-move-row').hide()
		$('[data-fieldname="items"]').find('.grid-duplicate-row').hide()
		$('[data-fieldname="items"]').find('.pull-right').hide()
		$('[data-fieldname="items"]').find('.text-muted').hide()
	},

	to_warehouse: function(frm)	{
		// var wh = frm.doc.from_warehouse.split("-");
		// var whstr = wh[0]+"-"+wh[1]+"-"+" Reserved"
		// frm.set_query("to_warehouse", function() {
		// 	return {
		// 		filters: [
		// 			["Warehouse", 'company', '=', frm.doc.company],
		// 			["Warehouse", "is_group", "=",0],
		// 			["Warehouse", "warehouse_name", "like", whstr + "%"]
		// 		]
		// 		// filters: {"warehouse_name": whstr }
		// 	};
		// });
		
		frm.doc.from_warehouse = frm.doc.from_warehouse
			frappe.call({
				"method": "frappe.client.get_value",
				"args": {
					doctype: "Warehouse",
					fieldname: "name",
					filters: { main_warehouse: frm.doc.from_warehouse, is_reserved : 1 }
				},
				callback: function (r) {
					if(	frm.doc.to_warehouse != r.message.name )
					// { frm.set_value("to_warehouse", r.message.name) }
					{ frm.doc.to_warehouse =  r.message.name }
			}});
	}
})