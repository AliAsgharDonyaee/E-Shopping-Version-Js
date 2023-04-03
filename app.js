const shop = document.getElementById("shop");
const cartBtn = document.getElementById("cart_btn");
const cart = document.getElementById("cart");
const searchBtn = document.getElementById("searchBtn");
const input_search = document.getElementById("input_search");
// carts datas
const ImageProductBuy = document.getElementById("image_product_buy");
const NameProductBuy = document.getElementById("name_product_buy");
const colorProductBuy = document.getElementById("color_product_buy");
const priceProductBuy = document.getElementById("price_product_buy");

let allProducts = [];
let allProductsBuy = [];

addEventListener("DOMContentLoaded", () => {
	fetch("http://localhost:3000/products")
		.then((response) => response.json())
		.then((data) => getData(data))
		.then(() => {
			let addCart = document.querySelectorAll(".btn");
			addCartsBtns(addCart);
		})
		.then(() => {
			fetch("http://localhost:3000/buy_product")
				.then((response) => response.json())
				.then((data) => getDatasCart(data));
		})
		.catch((err) => alert(err));
});

cartBtn.addEventListener("click", (e) => {
	switch (e.target.classList[1]) {
		case "fa-cart-shopping":
			e.target.remove();
			cartBtn.innerHTML = "<i class='fa-solid fa-xmark text-3xl text-gray-700'></i>";
			cart.style.transition = "all 0.6s ease";
			cart.style.transform = "translateX(0px)";
			break;
		case "fa-xmark":
			e.target.remove();
			cartBtn.innerHTML = "<i class='fa-solid fa-cart-shopping text-2xl text-gray-700'></i>";
			cart.style.transition = "all 0.6s ease";
			cart.style.transform = "translateX(100%)";
			break;
	}
});

searchBtn.addEventListener("click", (e) => {
	e.preventDefault();
	const filters = {
		searchItems: input_search.value,
	};
	const filterProducts = allProducts.filter((e) => {
		return e.name_products.toLowerCase().includes(filters.searchItems.toLowerCase());
	});
	shop.innerHTML = "";
	[...filterProducts].forEach((e) => {
		const product = `
		    <div id="box_img_product" class="w-full h-3/4 flex justify-center items-center">
		        <img src=${e.img} alt="${e.name_products}" class="w-3/4">
		    </div>
		    <div id="box_inf_product" class="w-full h-1/4 flex flex-col justify-between items-center font-bold text-gray-800">
		        <p id="name_product">${e.name_products}</p>
		        <p id="price_product" class="text-sm text-gray-700">$ ${e.price}</p>
		        <button id="add_cart"
		        class="rounded-lg bg-purple-500 py-1 w-1/2 text-white font-bold transition hover:shadow-lg hover:shadow-purple-300 active:bg-purple-400">add cart</button>
		    </div>
		`;
		const createDiv = document.createElement("div");
		createDiv.setAttribute("id", "box_product");
		createDiv.className = "p-2 w-full h-96 border-2 rounded-2xl bg-white";
		shop.appendChild(createDiv);
		createDiv.innerHTML = product;
	});
});

const getData = (_data) => {
	allProducts = _data;
	allProducts.forEach((e) => {
		const product = `
                <div id="box_img_product" class="w-full h-3/4 flex justify-center items-center">
                    <img src=${e.img} alt="${e.name_products}" class="w-3/4">
                </div>
                <div id="box_inf_product" class="w-full h-1/4 flex flex-col justify-between items-center font-bold text-gray-800">
                    <p id="name_product">${e.name_products}</p>
                    <p id="price_product" class="text-sm text-gray-700">$ ${e.price}</p>
                    <button id="add_cart" 
                    class="btn rounded-lg bg-purple-500 py-1 w-1/2 text-white font-bold transition hover:shadow-lg hover:shadow-purple-300 active:bg-purple-400">add cart</button>
                </div>
            `;
		const createDiv = document.createElement("div");
		createDiv.setAttribute("id", "box_product");
		createDiv.className = `${e.id} p-2 w-full h-96 border-2 rounded-2xl bg-white`;
		shop.appendChild(createDiv);
		createDiv.innerHTML = product;
	});
};

const addCartsBtns = (_addCart) => {
	[..._addCart].forEach((btn) => {
		btn.addEventListener("click", (e) => {
			window.location.reload();
			const getID = e.target.parentNode.parentNode.classList[0];

			const c = allProducts.filter((e) => {
				return e.id == getID;
			});

			fetch("http://localhost:3000/buy_product", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					id: c[0].id,
					name: c[0].name_products,
					price: c[0].price,
					image: c[0].img,
					color: c[0].color,
					quantity: 1,
				}),
			});
		});
	});
};

const getDatasCart = (_data) => {
	const total = document.getElementById("total");
	total.innerHTML = _data.length;

	_data.forEach((e) => {
		const product = `
		<div>
			<img id="image_products_${e.id}" src=${e.image} alt="${e.name}" class="mx-auto w-[45%]">
		</div>
		<div class="text-gray-700">
			<h1 id="name_product_buy">${e.name}</h1>
			<p id="color_product_buy" class="text-sm text-gray-400">color : ${e.color}</p>
		</div>
		<div class="w-3/5 h-auto flex justify-around items-center">
			<button id="minus" class="rounded-lg w-8 h-8 bg-purple-200 text-white">
				<i class="fa-solid fa-minus"></i>
			</button>
			<p>${e.quantity}</p>
			<button id="plus" class="rounded-lg w-8 h-8 bg-purple-500 text-white">
				<i class="fa-solid fa-plus"></i>
			</button>
		</div>
		<div>
			<h2 id="price_product_buy">$ ${e.price}</h2>
		</div>
		<div>
			<button id="delete" class="group ">
				<i class="fa-solid fa-plus rotate-45 text-3xl text-gray-300 transition group-hover:text-red-500"></i>
			</button>
		</div>
		    `;
		const createDiv = document.createElement("div");
		createDiv.setAttribute(`id-${e.id}`, "box_product_buy");
		createDiv.className = `mb-4 w-full h-36 grid grid-cols-5 justify-items-center items-center text-gray-600 font-bold`;
		const productsShopBuy = document.getElementById("products_shop");
		productsShopBuy.appendChild(createDiv);
		createDiv.innerHTML = product;

		const plus = document.getElementById("plus");
		const minus = document.getElementById("minus");
		const delet = document.getElementById("delete");

		// ??????
		// plus.addEventListener("click", (e) => {
		// 	const getProduct = e.target.parentNode.parentNode.parentNode;
		// 	console.log(getProduct);
		// 	const c = allProducts.filter((e) => {
		// 		return e.id == getID;
		// 	});
		// });
	});
};
