const shop = document.getElementById("shop");
const cartBtn = document.getElementById("cart_btn");
const cart = document.getElementById("cart");
const searchBtn = document.getElementById("searchBtn");
const input_search = document.getElementById("input_search");

let allProducts = [];

addEventListener("DOMContentLoaded", () => {
	fetch("http://localhost:3000/products")
		.then((response) => response.json())
		.then((data) => {
			allProducts = data;
			allProducts.forEach((e) => {
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

// ! error
// const addCart = document.getElementById("add_cart");
// if (addCart) {
// 	addCart.addEventListener("click", addCarts);
// }

// function addCarts(e) {
// 	console.log(e);
// }
