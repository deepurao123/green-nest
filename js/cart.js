document.addEventListener('DOMContentLoaded', async () => {


    //checkout start

    const dialog = document.getElementById('addressDialog');
    const openDialogBtn = document.getElementById('openDialogBtn');
    const closeDialogBtn = document.getElementById('closeDialogBtn');
    const form = document.getElementById('addressForm');

    // Open dialog

    // Close dialog
    closeDialogBtn.addEventListener('click', () => {
        dialog.style.display = 'none';
    });

    // Close dialog when clicking outside the dialog content
    window.addEventListener('click', (event) => {
        if (event.target === dialog) {
            dialog.style.display = 'none';
        }
    });

    // Handle form submission
    // form.addEventListener('submit', (event) => {
    //     event.preventDefault();
    //     // Process form data here
    //     alert('Address submitted!');
    //     dialog.style.display = 'none';
    // });


    //checkout end

    const cartValue = document.getElementById('cart-value-header')

    setInterval(() => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartValue.innerHTML = cart.length
    }, 500)

    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let products = [];

    fetch('https://bestanimationschool.github.io/indoorplants/products.json')
        .then(response => response.json())
        .then(productData => {
            products = productData;
            updateCart();
        })
        .catch(error => console.error('Error fetching products:', error));

    
    function updateCart() {
        const cartItems = document.getElementById('cart-items-id');
        cartItems.innerHTML = '';

        if (cart.length > 0) {
            cart.forEach(cartItem => {
                const product = products.find(p => p.id == cartItem.productId);
                if (product) {
                    const cartItemDiv = document.createElement('div');
                    cartItemDiv.classList.add('cart-item');
                    cartItemDiv.innerHTML = `
                        <a href="product.html?id=${product.id}" class="product-details product-anchor">
                            <img src="${product.imageUrl[0]}" alt="${product.name}">
                            <div>
                                <p class="product-name">${product.name}</p>
                            </div>
                        </a>
                        <div class="quantity">
                            <button class="quantity-btn decrease">-</button>
                            <input type="text" value="${cartItem.quantity}" readonly>
                            <button class="quantity-btn increase">+</button>
                        </div>
                        <div class="price">₹ ${product.price * cartItem.quantity}</div>
                        <div class="price remove-icon"><button class="remove"><i class="fa-solid fa-xmark"></i></button></div>
                    `;

                    cartItems.appendChild(cartItemDiv);
                    // cartItems.appendChild(cartItemDiv);

                    const increaseButton = cartItemDiv.querySelector('.increase');
                    const decreaseButton = cartItemDiv.querySelector('.decrease');
                    const quantityInput = cartItemDiv.querySelector('input');
                    const removeButton = cartItemDiv.querySelector('.remove');

                    // Increase quantity
                    increaseButton.addEventListener('click', () => {
                        if (cartItem.quantity < 10) {
                            cartItem.quantity += 1;
                            quantityInput.value = cartItem.quantity;
                            localStorage.setItem('cart', JSON.stringify(cart));
                            updatePrice(cartItemDiv, product.price, cartItem.quantity);
                            totalPrice()
                        }
                    });

                    // Decrease quantity
                    decreaseButton.addEventListener('click', () => {
                        if (cartItem.quantity > 1) {
                            cartItem.quantity -= 1;
                            quantityInput.value = cartItem.quantity;
                            localStorage.setItem('cart', JSON.stringify(cart));
                            updatePrice(cartItemDiv, product.price, cartItem.quantity);
                            totalPrice()
                        } else {
                            cart = cart.filter(ct => ct.productId !== cartItem.productId);
                            localStorage.setItem('cart', JSON.stringify(cart));
                            cartItemDiv.remove();
                            totalPrice()
                            updateCart()
                        }
                    });

                    // Remove item
                    removeButton.addEventListener('click', () => {
                        cart = cart.filter(ct => ct.productId !== cartItem.productId);
                        localStorage.setItem('cart', JSON.stringify(cart));
                        cartItemDiv.remove();
                        totalPrice()
                        updateCart()
                    });
                }
            });
        } else {
            cartItems.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
        }
    }

    function totalPrice() {
        setTimeout(() => {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
            let total = cart.map((ct) => {
                const pro = products.find((pro) => pro.id === ct.productId );
                return pro.price * ct.quantity;
            })
    
            const maintotal = total.reduce((acc, cur) => acc + cur, 0);
            document.getElementById('total').innerText = `₹ ${maintotal}`
            document.getElementById('total-sgst').innerText = `₹ ${(maintotal/100) * 18}`
            document.getElementById('total-price').innerText = `₹ ${((maintotal/100) * 18) + maintotal}`

            let totalCgst = ((maintotal/100) * 9)
        }, 200);
    }

    function updatePrice(cartItemDiv, price, quantity) {

        const priceDiv = cartItemDiv.querySelector('.price');
        priceDiv.innerText = `₹ ${price * quantity}`;
    }

    document.getElementById('checkout-button').addEventListener('click', () => {
        if (cart.length > 0) {
            dialog.style.display = 'block';
            form.addEventListener('submit', (event) => {
                event.preventDefault();
                dialog.style.display = 'none';

                alert('Order placed successfully!');
                localStorage.setItem('orders', JSON.stringify(cart));
                localStorage.removeItem('cart');
                window.location.href = 'orders.html';
            });
            
        } else {
            alert('Your cart is empty!');
        }
    });

    totalPrice()
});

// Get elements


