const products = [
	{
		id: 1,
		src: './img/berger1.png',
		title: 'جاینت برگر',
		description: 'یه برگر بزرگ و خوشمزه، با پنیر زیاد',
		price: 89000
	},
	{
		id: 2,
		src: './img/berger1.png',
		title: 'برگر گیاهی',
		description: 'یه برگر مخصوص گیاهی',
		price: 97000
	},
	{
		id: 3,
		src: './img/berger1.png',
		title: 'چیزبرگر',
		description: 'یه برگر با پنیر ورقه‌ای چدار',
		price: 129000
	},
	{
		id: 4,
		src: './img/berger1.png',
		title: 'برگر مرغ',
		description: 'یه برگر که مرغ سوخاری درش استفاده شده',
		price: 140000
	},
	{
		id: 5,
		src: './img/berger1.png',
		title: 'چیکن برگر',
		description: 'یه برگر سالم و رژیمی با گوشت مرغ',
		price: 125000
	},
	{
		id: 6,
		src: './img/berger1.png',
		title: 'رویال برگر',
		description: 'یه برگر خوشمزه با گوشت چرخ کرده',
		price: 158000
	}
]

let cart = {
	bergers: [],
	total: 0
}

const renderProduct = ()=>{
	const bergersDiv = document.querySelector('.bergers');
	// const addDiv = document.querySelector('.num');
	bergersDiv.innerHTML = '';

	
	products.forEach((berger, index) =>{
		bergersDiv.innerHTML +=
		`<div class="berger" onclick="activProduct(${berger.id})">
			<img src="./img/berger${berger.id}.png" alt="">
			<h6>${berger.title}</h6>
			<p>${berger.description}</p>
			<div id="discount">
				<span>5%</span>
				<div>149.000</div>
			</div>
			<p>${berger.price}<span>IRT</span></p>
			<pre id="add"><span onclick="addCart(${index})">&#43  </span> <span id="num">0</span><span>عدد</span> <span onclick="removeCart(${index})">  &#150</span></pre>
		</div>`
	})

	// cart.bergers.forEach((berger)=>{
	// 	addDiv.innerHTML = 
	// 	`
	// 	${berger.count}
	// 	`
	// })
}

const discount = ()=>{
	const discount = document.querySelectorAll('#discount');
	discount[1].style.display = 'flex';
}

const activProduct = (id)=>{
	const active = document.querySelectorAll('.berger');
	active[id - 1].classList.add('active-berger');
	if(id===2){
		setTimeout(discount , 10);
	}
}

const renderCart = ()=>{
	let cartDiv = document.querySelector('.cart');
	let totalDiv = document.querySelector('.total-order');
	let priceDiv = document.querySelector('.total-price');
	let orderDiv = document.querySelector('.order');
	let totalOrderDiv = document.querySelector('.total');

	totalDiv.innerHTML = '';
	let totalPrice = 0;
	let totalCount = 0;

	if(cart.bergers.length === 0){
		cartDiv.innerHTML =
		`
		<div class="total">
				<span>0</span>
				<p>
				آیـــــــــــــتم 
				در سفارش 
				شمــــــــــــــا
				</P>
		</div>
		<div class="total-order">
		</div>
		<div class="total-price">
			<div class="price">
				<h3>0<span> IRT</span></h3>
				<p>مجموع سفارش شما</p>
			</div>
			<div id="next"><p>&#8250</p></div>
		</div>
		`
	}
	else
	cart.bergers.forEach((berger) =>{
		totalPrice += berger.price;
		totalCount += berger.total; 
		
		totalOrderDiv.innerHTML = 
		`
				<span>${totalCount}</span>
				<p>
				آیـــــــــــــتم 
				در سفارش 
				شمــــــــــــــا
				</P>
		`
		
		totalDiv.innerHTML +=
		`
		<div class="order">
			<img src="./img/berger${berger.id}.png" alt="">
			<p>${berger.count}</p>
		</div>
		`

		priceDiv.innerHTML = 
		`
		<div class="price">
			<h3>${totalPrice}<span> IRT</span></h3>
			<p>مجموع سفارش شما</p>
		</div>
		<div id="next"><p>&#8250</p></div>
		`
	})
}

const addCart = (index)=>{
	const product = products[index];
	let existProduct = false;

	const newCart = cart.bergers.reduce((state , item)=>{
		if(item.id === product.id){
			existProduct = true;
			const newItem = {
				...item,
				count: item.count + 1,
				total: (item.total + 1),
				price: (item.count + 1) * item.price 
			}
			return [...state , newItem]
		}
		return [...state , item]
	}, [])

	if(!existProduct){
		newCart.push({
			...product,
			count: 1,
			total: 1,
			price: product.price
		})
	}
	cart = {
		...cart,
		bergers: newCart,
	}
	
	renderCart()
	renderProduct()
}

const removeCart = (index)=>{
	const product = products[index];
	const newCartItem = cart.bergers.reduce((state , item)=>{
		if(item.id === product.id){
			const newItem = {
				...item,
				count: item.count - 1,
				total: (item.total - 1),
				price: (item.count - 1) * item.price 
			}
			if(newItem.count > 0){
				return [...state , newItem]
			}
			else{
				return state
			}
		}
		return [...state , item]
	}, [])

	cart = {
		...cart,
		bergers: newCartItem,
	}

	renderCart()
	renderProduct()
}


renderProduct()
renderCart()

 