document.addEventListener('DOMContentLoaded', () => {

    const cartValue = document.getElementById('cart-value-header')

    setInterval(() => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartValue.innerHTML = cart.length
    }, 500)

    
    const ordersList = document.getElementById('order-items-javascript');
    let orders = JSON.parse(localStorage.getItem('orders')) || [];

    let total = 0;    

    if (orders.length > 0) {
        fetch('https://bestanimationschool.github.io/indoorplants/products.json')
            .then(response => response.json())
            .then(products => {
                orders.forEach(itemId => {
                    const product = products.find(p => p.id == itemId.productId);
                    console.log("this is product", product);
                    
                    if (product) {
                        // total += (product.price * productId.quantity)
                        const cartItemDiv = document.createElement('div');
                        cartItemDiv.classList.add('wishlist-item');
                        cartItemDiv.innerHTML = `
                        <a  href="product.html?id=${product.id}" class="product-details product-anchor">
                            <img src="${product.imageUrl[0]}" alt="${product.name}" class="product-image">
                            <span class="product-name lora pro-name">${product.name}</span>
                        </a>
                        <div class="unit-price">
                            <span class="product-name lora pro-name-tab">${product.name}</span>
                            <div class="price-delete lora mar-stock"><span class="pro-name-tab">${itemId.quantity} pcs</span></div>
                        </div>
                        <div class="actions lora">₹ ${product.price * itemId.quantity}</div>
                        <button class="stock-status icon-color remove pro-name">${itemId.quantity} pcs</button>
                        `;
                        // cartItemDiv.innerHTML = `
                        // <a href="product.html?id=${product.id}" class="product-details product-anchor">
                        //     <img src="${product.imageUrl[0]}" alt="${product.name}">
                        //     <div>
                        //         <p class="product-name ">${product.name}</p>
                        //     </div>
                        // </a>
                        // <div class="quantity">
                        //     <div >${itemId.quantity} pcs</div>
                        // </div>
                        // <div class="price">₹ ${product.price * itemId.quantity}</div>
                        // `;
                        ordersList.appendChild(cartItemDiv);
                    }

                    // const wishlistItemDiv = document.createElement('div');
                    // wishlistItemDiv.classList.add('wishlist-item');
                    // wishlistItemDiv.innerHTML = `
                    // <a  href="product.html?id=${product.id}" class="product-details product-anchor">
                    //     <img src="${product.imageUrl[0]}" alt="${product.name}" class="product-image">
                    //     <span class="product-name lora pro-name">${product.name}</span>
                    // </a>
                    // <div class="unit-price">
                    //     <span class="product-name lora pro-name-tab">${product.name}</span>
                    //     <div class="price-delete lora">₹ ${product.price}<button class="pro-name-tab stock-status icon-color remove ">&times;</button></div>
                    // </div>
                    // <div class="actions lora"><button onclick="addToCart(${product.id})" class="add-to-cart">ADD TO CART</button></div>
                    // <button class="stock-status icon-color remove pro-name">&times;</button>
                    // `;
                    // wishlistItems.appendChild(wishlistItemDiv);
                });
            });
    } else {
        ordersList.innerHTML = '<p>You have no orders.</p>';
    }
});
