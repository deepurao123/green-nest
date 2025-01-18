document.addEventListener('DOMContentLoaded', () => {
    const cartValue = document.getElementById('cart-value-header')

    setInterval(() => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartValue.innerHTML = cart.length
    }, 500)

    
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    let products = []

    // if (wishlist.length > 0) {
    fetch('https://bestanimationschool.github.io/indoorplants/products.json')
    .then(response => response.json())
    .then(product => {
        products = product;
        updateWish()
    });

    function updateWish() {
        const wishlistItems = document.getElementById('wishlist-items-javascript');
        wishlistItems.innerHTML = '';

        if (wishlist.length > 0) {
            wishlist.forEach(itemId => {
                const product = products.find(p => p.id == itemId);
                if (product) {
                    const wishlistItemDiv = document.createElement('div');
                    wishlistItemDiv.classList.add('wishlist-item');
                    wishlistItemDiv.innerHTML = `
                    <a  href="product.html?id=${product.id}" class="product-details product-anchor">
                        <img src="${product.imageUrl[0]}" alt="${product.name}" class="product-image">
                        <span class="product-name lora pro-name">${product.name}</span>
                    </a>
                    <div class="unit-price">
                        <span class="product-name lora pro-name-tab">${product.name}</span>
                        <div class="price-delete lora">₹ ${product.price}<button class="pro-name-tab stock-status icon-color remove ">&times;</button></div>
                    </div>
                    <div class="actions lora"><button onclick="addToCart(${product.id})" class="add-to-cart">ADD TO CART</button></div>
                    <button class="stock-status icon-color remove pro-name remove-desk">&times;</button>
                    `;
                    wishlistItems.appendChild(wishlistItemDiv);

                    const removeButton = wishlistItemDiv.querySelector('.remove');

                    removeButton.addEventListener('click', () => {
                        console.log("this is clickable");
                        
                        wishlist = wishlist.filter(ws => ws !== itemId);
                        localStorage.setItem('wishlist', JSON.stringify(wishlist));
                        wishlistItemDiv.remove();
                        updateWish()
                    });

                    const removeButtonDesk = wishlistItemDiv.querySelector('.remove-desk');

                    removeButtonDesk.addEventListener('click', () => {
                        console.log("this is clickable");
                        
                        wishlist = wishlist.filter(ws => ws !== itemId);
                        localStorage.setItem('wishlist', JSON.stringify(wishlist));
                        wishlistItemDiv.remove();
                        updateWish()
                    });
                }
            });
        }else {
            wishlistItems.innerHTML = '<p class="wishlist-empty">Your wishlist is empty.</p>';
        }
    }
});

function removeWish(productId) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    // let wishlistExist = cart.find(cr => cr.productId === productId);

    wishlist = wishlist.filter(item => item !== productId);

    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    window.location.reload()
}


function addToCart(productId) {
    let quantity = 1
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartExist = cart.find(cr => cr.productId === productId);
    // console.log(cartExist.quantity, cartExist.quantity += quantity);
    if (cartExist) {
        if (cartExist.quantity < 10) {
            cartExist.quantity = (cartExist.quantity + quantity);
            localStorage.setItem('cart', JSON.stringify(cart));
            showToast(`Product updated to cart value ${cartExist.quantity}!&nbsp;&nbsp;&nbsp;<a class="link-color" href="cart.html">View Cart</a>`)
        }else {
            showToast('Maximum quantity reached!&nbsp;&nbsp;&nbsp;<a class="link-color" href="cart.html">View Cart</a>', 'warning')
        }
    } else {
        cart.push({productId, quantity});
        localStorage.setItem('cart', JSON.stringify(cart));
        showToast('Product added to cart!&nbsp;&nbsp;&nbsp;<a class="link-color" href="cart.html">View Cart</a>')
    }
}



function showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toast-container');
    const toastMessage = document.getElementById('toast-message');
    const toast = document.getElementById('toast');
    
    // Set the message
    toastMessage.innerHTML = message;

    // Set the type (success, error, warning)
    switch(type) {
        case 'error':
            toast.style.backgroundColor = '#F44336'; /* Red */
            break;
        case 'warning':
            toast.style.backgroundColor = '#FF9800'; /* Orange */
            break;
        default:
            toast.style.backgroundColor = '#4CAF50'; /* Green */
    }

    // Show the toast
    toastContainer.style.display = 'block';

    // Hide the toast after 3.5 seconds
    setTimeout(() => {
        closeToast();
    }, 4000);
}

// Function to close the toast
function closeToast() {
    const toastContainer = document.getElementById('toast-container');
    toastContainer.style.display = 'none';
}
