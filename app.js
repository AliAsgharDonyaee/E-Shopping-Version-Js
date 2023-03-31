fetch("http://localhost:3000/products")
	.then((response) => response.json())
	.then((data) => console.log(data))
	.catch((err) => console.log(err));
