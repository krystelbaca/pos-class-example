(function () {
	'use strict';

	var sale = {};

	init();

	var productsCatalog = [
		new Product('111', 'Milk', 1.99),
		new Product('222', 'Beer', 2.99),
		new Product('444', 'Coke', 3.99),
	];

	function Product(sku, name, price) {
		this.sku = sku;
		this.name = name;
		this.price = price;
	}

	function Item(product, quantity) {
		this.product = product;
		this.quantity = quantity;
	}

	function Sale() {
		this.items = [];
		this.totals = 0;

		this.addProduct = function (product) {
			sale.items.push(product);
			this.updateTotals();
		}

		this.updateTotals = function () {
			this.totals = 0;
			for (var i = 0; i < this.items.length; i++) {
				this.totals += this.items[i].price;
			}
		}
	}

	function findProductBySKU(sku) {
		var product = false;
		for (var i = 0; i < productsCatalog.length; i++) {
			if (productsCatalog[i].sku == sku) {
				product = productsCatalog[i];
			}
		}
		return product;
	}

	function init() {
		var view = {};
		view.captureButton = document.getElementById('capture');
		view.skuInput = document.getElementById('sku');
		view.itemsList = document.getElementById('items-list');
		view.totals = document.getElementById('totals');

		sale = new Sale();

		view.captureButton.addEventListener('click', function(event) {
			var product = findProductBySKU(view.skuInput.value);
			if (product) {
				// add product to sale model:
				sale.addProduct(product);
				view.updateItemsListView(sale);

				// update totals in view:
				view.totals.innerText = sale.totals.toFixed(2);

			} else {
				alert('Producto no encontrado');
			}
		});

		view.updateItemsListView = function (sale) {
			// empty items list in view:
			view.itemsList.innerHTML = '';
			// reverse array:
			var reversedArr = sale.items;
			reversedArr.reverse();

			// update Items from current sale in view:
			for (var i = 0; i < reversedArr.length; i++) {
				var element = document.createElement('h5');
				element.innerHTML = sale.items[i].name;
				view.itemsList.appendChild(element);
			}
		}

	}

})();
