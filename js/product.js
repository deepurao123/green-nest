document.addEventListener('DOMContentLoaded', () => {
    const cartValue = document.getElementById('cart-value-header')

    setInterval(() => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartValue.innerHTML = cart.length
    }, 500)

    
    const productDetail = document.getElementById('product-detail');
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    const relatedProduct = document.getElementById('related-product');

    fetch('https://bestanimationschool.github.io/indoorplants/products.json')
    .then(response => response.json())
    .then(products => {
        products.forEach(product => {
            const productDiv = document.createElement('div');

            productDiv.classList.add('carousel-item');

            productDiv.innerHTML = `
                    <a href="product.html?id=${product.id}"><img class="img-size" src="${product.imageUrl}" alt="${product.name}"></a>
                    <h3>${product.name}</h3>
                    <p>₹ ${product.price}</p>
            `;
            relatedProduct.appendChild(productDiv);
        });
    });

    fetch('https://bestanimationschool.github.io/indoorplants/products.json')
        .then(response => response.json())
        .then(products => {
            const product = products.find(p => p.id == productId);
            if (product) {
                let wishStatus = false;

                let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
                console.log(wishlist);
            
                const find = wishlist.find(ws => ws === product.id);
                
                if (find) {
                    wishStatus = true
                }
                let imageurl = product.imageUrl[0];
                productDetail.innerHTML = `
                    <div class="product-container montserrat">
                        <div class="product-image-section">
                            <img src="${imageurl}" alt="${product.name}" class="product-image">
                        </div>
                        <div class="product-details-section">
                            <div class="like-handle">
                                <h1 class="product-title montserrat">ECOLEAF</h1>
                                <button onclick="addToWishlist(${product.id})"><i class="${wishStatus ? 'fa-solid' : 'fa-regular'} fa-heart fa-lg"></i></button>
                            </div>

                            <p class="product-subtitle montserrat">${product.name}</p>
                            <div class="product-price">
                                <span class="old-price montserrat">₹ ${product.price - 100}</span>
                                <span class="new-price montserrat">₹ ${product.price}</span>
                            </div>
                            <div class="reviews">
                                <span class="stars">&#9734;&#9734;&#9734;&#9734;&#9734;</span>
                            </div>
                            <div class="product-options montserrat">
                                <div class="color-option">
                                <div class="size-option">
                                    <div class="size-select montserrat">Select Size</div>
                                    <div class="size-selection size-text">
                                        <button class="size-select-m montserrat s-icon size-selection-button-active">Small</button>
                                        <button class="size-select-m montserrat m-icon">Medium</button>
                                        <button class="size-select-m montserrat l-icon">Large</button>
                                    </div>
                                </div>
                            </div>

                            <div class="payment-text">Payment Methods</div>
                            <div class="payment-methods">
                                <img class="payment-icons" src="https://static.vecteezy.com/system/resources/previews/020/975/570/non_2x/visa-logo-visa-icon-transparent-free-png.png" alt="Visa">
                                <img class="payment-icons" src="https://cdn4.iconfinder.com/data/icons/payment-method/160/payment_method_master_card-512.png" alt="MasterCard">
                                <img class="payment-icons" src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/250_Paypal_logo-512.png" alt="PayPal">
                                <img class="payment-icons" src="https://cdn-icons-png.flaticon.com/512/349/349228.png" alt="American Express">
                            </div>
                            <button onclick="addToCart(${product.id})" class="add-to-cart-btn montserrat">Add To Cart</button>

                            <div class="accordion-container">
                                <div class="accordion-item">
                                    <button class="accordion-header">Description</button>
                                    <div class="accordion-content">
                                        <p>${product.description}</p>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <button class="accordion-header">Beginner friendly</button>
                                    <div class="accordion-content">
                                        <p>If you are a new gardener this is a great choice for you. The plant will thrive in your journey to learn gardening with trials and errors.</p>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <button class="accordion-header">Water Twice a Month</button>
                                    <div class="accordion-content">
                                        <p>Use distilled or filtered water as tap water may contain chlorine or other chemicals that can harm the plant. Keep the water level just above the roots, ensuring they are always submerged. Change the water every 2-4 weeks to prevent the growth of algae and to provide fresh nutrients.</p>
                                    </div>
                                </div>
                            </div>

                            <div class="features">
                                <div class="feature-item">
                                    <img src="https://cdn-icons-png.flaticon.com/512/482/482169.png" class="feature-icon">
                                    <p class="feature-text">Free Shipping <br/> over 499</p>
                                </div>
                                <div class="feature-item">
                                    <img src="https://static.vecteezy.com/system/resources/previews/020/283/954/original/plant-icon-vector.jpg" class="feature-icon">
                                    <p class="feature-text">Guaranteed<br>Replacements</p>
                                </div>
                                <div class="feature-item">
                                    <img src="https://png.pngtree.com/png-clipart/20191120/original/pngtree-chat-icon-png-image_5065642.jpg" class="feature-icon">
                                    <p class="feature-text">Expert<br>Guidance</p>
                                </div>
                            </div>

                        </div>
                    </div>
                `;

                document.querySelectorAll('.accordion-header').forEach(header => {
                    header.addEventListener('click', () => {
                        const accordionContent = header.nextElementSibling;
                    
                        // Close other open accordions
                        document.querySelectorAll('.accordion-content').forEach(content => {
                            if (content !== accordionContent) {
                                content.style.display = 'none';
                            }
                        });
                    
                        // Toggle the clicked accordion
                        accordionContent.style.display = accordionContent.style.display === 'block' ? 'none' : 'block';
                    });
                });

                const small = productDetail.querySelector('.s-icon');
                const medium = productDetail.querySelector('.m-icon');
                const large = productDetail.querySelector('.l-icon');
                const image = productDetail.querySelector('.product-image');

                small.addEventListener('click', () => {
                    console.log("Small selected");
                    image.src = product.imageUrl[0];
                
                    // Add active class to the selected button
                    small.classList.add('size-selection-button-active');
                    
                    // Remove active class from other buttons
                    medium.classList.remove('size-selection-button-active');
                    large.classList.remove('size-selection-button-active');
                });
                
                medium.addEventListener('click', () => {
                    console.log("Medium selected");
                    image.src = product.imageUrl[1];
                
                    // Add active class to the selected button
                    medium.classList.add('size-selection-button-active');
                    
                    // Remove active class from other buttons
                    small.classList.remove('size-selection-button-active');
                    large.classList.remove('size-selection-button-active');
                });
                
                large.addEventListener('click', () => {
                    console.log("Large selected");
                    image.src = product.imageUrl[2];
                
                    // Add active class to the selected button
                    large.classList.add('size-selection-button-active');
                    
                    // Remove active class from other buttons
                    small.classList.remove('size-selection-button-active');
                    medium.classList.remove('size-selection-button-active');
                });

            } else {
                productDetail.innerHTML = '<p>Product not found.</p>';
            }
        });
});


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
            showToast('Maximum quantity reached!&nbsp;&nbsp;&nbsp;<a class="link-color" href="cart.html">View Cart</a>', 'error')
        }
    } else {
        cart.push({productId, quantity});
        localStorage.setItem('cart', JSON.stringify(cart));
        showToast('Product added to cart!&nbsp;&nbsp;&nbsp;<a class="link-color" href="cart.html">View Cart</a>')
    }
}

function addToWishlist(productId) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const find = wishlist.find(ws => ws === productId);

    const button = document.querySelector(`button[onclick="addToWishlist(${productId})"] i`);

    if (find) {
        wishlist = wishlist.filter(ws => ws !== productId);
        showToast('Product removed from wishlist!&nbsp;&nbsp;&nbsp;<a class="link-color" href="wishlist.html">View Wishlist</a>', 'warning')
        button.classList.remove('fa-solid');
        button.classList.add('fa-regular');
    } else {
        wishlist.push(productId);
        showToast('Product added to wishlist!&nbsp;&nbsp;&nbsp;<a class="link-color" href="wishlist.html">View Wishlist</a>')
        button.classList.remove('fa-regular');
        button.classList.add('fa-solid');
    }

    localStorage.setItem('wishlist', JSON.stringify(wishlist));
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
            toast.style.backgroundColor = '#8B0000'; /* Orange */
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

