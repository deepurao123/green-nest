document.addEventListener('DOMContentLoaded', () => {

    let minvalue = 75;
    let maxvalue = 400;
    $( function() {
        $( "#slider-range" ).slider({
            range: true,
            min: 0,
            max: 1500,
            values: [ 75, 400 ],
            slide: function( event, ui ) {
            $( "#amount" ).val( "" + ui.values[ 0 ] + " - " + ui.values[ 1 ] );
            
                console.log("Min value: " + ui.values[ 0 ]);
                console.log("Max value: " + ui.values[ 1 ]);
                minvalue = ui.values[ 0 ]
                maxvalue = ui.values[ 1 ]
            }
        });
        $( "#amount" ).val( "" + $( "#slider-range" ).slider( "values", 0 ) +
            " - " + $( "#slider-range" ).slider( "values", 1 ) );
            console.log("Min value: " + $( "#slider-range" ).slider( "values", 0 ));
            console.log("Max value: " + $( "#slider-range" ).slider( "values", 1 ));

    } );
    

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const searchQuery = urlParams.get('search');
    console.log(searchQuery);

    const productList = document.getElementById('product-list');
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');
    const minPriceValue = document.getElementById('min-price-value');
    const maxPriceValue = document.getElementById('max-price-value');
    const applyFiltersButton = document.getElementById('apply-filters');
    const categoryCheckboxes = document.querySelectorAll('.category-filter');

    // Update displayed min/max price values
    // minPriceInput.addEventListener('input', () => {
    //     minPriceValue.textContent = minPriceInput.value;
    // });

    // maxPriceInput.addEventListener('input', () => {
    //     maxPriceValue.textContent = maxPriceInput.value;
    // });

    function fetchProducts() {
        fetch('https://bestanimationschool.github.io/indoorplants/products.json')
        .then(response => response.json())
        .then(products => {
            let filteredProducts = products;

            // Apply category filter if any categories are selected
            const selectedCategories = Array.from(categoryCheckboxes)
                .filter(checkbox => checkbox.checked)
                .map(checkbox => checkbox.value);

            if (selectedCategories.length > 0) {
                // Filter products only by selected categories, ignoring the search query
                filteredProducts = filteredProducts.filter(product =>
                    product.category.split(', ').some(cat => selectedCategories.includes(cat))
                );
            } else if (searchQuery) {
                // If no categories are selected, apply search query filter
                filteredProducts = products.filter(product => 
                    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    product.category.toLowerCase().includes(searchQuery.toLowerCase())
                );
                
            }

            // Apply price range filter
            // const minPrice = parseInt(minPriceInput.value);
            // const maxPrice = parseInt(maxPriceInput.value);

            filteredProducts = filteredProducts.filter(product => 
                product.price >= minvalue && product.price <= maxvalue
            );//&& product.price <= maxPrice

            // Clear current products
            productList.innerHTML = '';

            document.getElementById('result-quantity').innerHTML = filteredProducts.length
            // Render filtered products
            if (filteredProducts.length > 0) {
                filteredProducts.forEach(product => {
                    const productDiv = document.createElement('div');
                    let wishStatus = false;
                    let intervalId;
    
                    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
                    console.log(wishlist);
                
                    const find = wishlist.find(ws => ws === product.id);
                    
                    if (find) {
                        wishStatus = true;
                    }
    
                    console.log(wishStatus);

                    // <div class="product-card">
                        // <div class="discount-tag">-8%</div>
                        // <img src="https://www.ugaoo.com/cdn/shop/files/7_29b47203-99b4-43c5-b38e-fed4df2ea554.jpg?v=1710232846" alt="Plant 2">
                        // <h3>Adipiscing Cursus</h3>
                        // <div class="stars">
                        //     <i class="far fa-star"></i>
                        //     <i class="far fa-star"></i>
                        //     <i class="far fa-star"></i>
                        //     <i class="far fa-star"></i>
                        //     <i class="far fa-star"></i>
                        // </div>
                        // <p class="price"><span>₹74.00</span> ₹69.00</p>
                    // </div>

                    // <a href="product.html?id=${product.id}"><img id="main-image" src="${imageurl}" alt="${product.name}"></a>
                    //     <div class="product-info">
                    //         <div class="rating">
                    //             &#9734;&#9734;&#9734;&#9734;&#9734;
                    //         </div>
                    //         <h3 class="product-name montserrat">${product.name}</h3>
                    //         <div class="product-pricing">
                    //             <button onclick="addToWishlist(${product.id})"><i class="${wishStatus ? 'fa-solid' : 'fa-regular'} fa-heart fa-lg"></i></button>
                    //             <span class="price lora">₹ ${product.price}</span>
                    //             <button onclick="addToCart(${product.id})"><i class="fa-solid fa-cart-shopping fa-lg"></i></button>
                    //         </div>
                    //     </div>
    
                    productDiv.classList.add('product-card');
                    let imageurl = product.imageUrl[0];
                    productDiv.innerHTML = `
                        <img src="${imageurl}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <div class="stars">
                            <i class="far fa-star"></i>
                            <i class="far fa-star"></i>
                            <i class="far fa-star"></i>
                            <i class="far fa-star"></i>
                            <i class="far fa-star"></i>
                        </div>
                        <p class="price"><span>₹ ${product.price -100} </span>₹ ${product.price}</p>
                    `;
    
                    productDiv.addEventListener('mouseover', () => {
                        if (intervalId) clearInterval(intervalId);
                        intervalId = setInterval(() => {
                            const imageElement = productDiv.querySelector('#main-image');
    
                            imageurl = imageurl === product.imageUrl[0] ? 
                                        product.imageUrl[1] : 
                                        imageurl === product.imageUrl[1] ? 
                                        product.imageUrl[2] :
                                        product.imageUrl[0];
                            imageElement.src = imageurl;
                        }, 1000);
                    });
                    
                    productDiv.addEventListener('mouseout', () => {
                        if (intervalId) clearInterval(intervalId);
                        const imageElement = productDiv.querySelector('#main-image');
                        imageurl = product.imageUrl[0];
                        imageElement.src = imageurl;
                    });
                    
                    productList.appendChild(productDiv);
                });
            } else {
                productList.innerHTML = "<h2>No result Found </h2>"
            }
        });
    }

    // Initial fetch and render
    fetchProducts();

    // Re-fetch and re-render products when filters are applied
    applyFiltersButton.addEventListener('click', fetchProducts);
    categoryCheckboxes.forEach(checkbox => checkbox.addEventListener('change', fetchProducts));
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
            // alert('Maximum quantity reached!');
            showToast('Maximum quantity reached!&nbsp;&nbsp;<a class="link-color" href="cart.html">View Cart</a>', 'error')
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

    // Find the button element related to the clicked product
    const button = document.querySelector(`button[onclick="addToWishlist(${productId})"] i`);

    if (find) {
        wishlist = wishlist.filter(ws => ws !== productId);
        showToast('Product removed from wishlist!&nbsp;&nbsp;&nbsp;<a class="link-color" href="wishlist.html">View Wishlist</a>', 'error')
        button.classList.remove('fa-solid');
        button.classList.add('fa-regular');
    } else {
        wishlist.push(productId); // Add the item to the wishlist
        showToast('Product added to wishlist!&nbsp;&nbsp;&nbsp;<a class="link-color" href="wishlist.html">View Wishlist</a>')
        button.classList.remove('fa-regular');
        button.classList.add('fa-solid');
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}





// Function to show the toast
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


document.getElementById('show-hide').addEventListener('click', () => {
    document.getElementById('filter-slider').classList.toggle('hide-show');
})


document.getElementById('slider-button').addEventListener('click', () => {
    document.getElementById('filter-slider').classList.toggle('hide-show');
})
