document.addEventListener('DOMContentLoaded', () => {
    // document.getElementById('searchButton').addEventListener('click', function() {
    //     const searchQuery = document.getElementById('searchInput').value.trim();
        
    //     if (searchQuery) {
    //         // Redirect to the shop page with the search query as a URL parameter
    //         window.location.href = `/shop.html?search=${encodeURIComponent(searchQuery)}`;
    //     } else {
    //         // If the search is empty, show all items
    //         window.location.href = '/shop.html';
    //     }
    // });
    
    // document.getElementById('shopButton').addEventListener('click', function() {
    //     // Redirect to the shop page to show all items
    //     window.location.href = '/shop.html';
    // });

    
    
    // const cartValue = document.getElementById('cart-value-header')

    // setInterval(() => {
    //     let cart = JSON.parse(localStorage.getItem('cart')) || [];
    //     cartValue.innerHTML = cart.length
    // }, 500)

    //creosoul start

    let index = 0;
    const items = document.querySelectorAll('.carousel-item');
    const totalItems = items.length;

    function showSlide(n) {
        index = (n + totalItems) % totalItems;
        const offset = -index * 100;
        document.querySelector('.carousel-images').style.transform = `translateX(${offset}%)`;
    }

    document.querySelector('.carousel-prev').addEventListener('click', () => {
        showSlide(index - 1);
    });

    document.querySelector('.carousel-next').addEventListener('click', () => {
        showSlide(index + 1);
    });

    // Auto-slide
    setInterval(() => {
        showSlide(index + 1);
    }, 5000); 

    //creousoul end
    
    const productList = document.getElementById('categories-container');
    const productsContainer = document.getElementById('products-container');
    const productArrivals = document.getElementById('new-arrivals');
    
    fetch('https://bestanimationschool.github.io/indoorplants/products.json')
        .then(response => response.json())
        .then(products => {  
            products.slice(0,4).forEach(product => {
                const productDiv = document.createElement('div');
                let wishStatus = false;
                let intervalId;

                let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
                console.log(wishlist);
            
                const find = wishlist.find(ws => ws === product.id);
                
                if (find) {
                    wishStatus = true
                }

                console.log(wishStatus);

                // <div class="product-card">
                //     <div class="product-image">
                //         <img src="https://www.ugaoo.com/cdn/shop/products/GroPot.jpg.jpg" alt="Plant 1">
                //     </div>
                //     <div class="product-info">
                //         <h3>Snake Plant</h3>
                //         <p><em>Sansevieria trifasciata</em></p>
                //         <div class="price-rating">
                //             <span class="price">$25.00</span>
                //             <div class="rating">
                //                 ★★★★☆ (25)
                //             </div>
                //         </div>
                //     </div>
                //     <div class="product-actions">
                //         <button class="add-to-cart">Add to Cart</button>
                //         <button class="wishlist">&#9825;</button>
                //     </div>
                // </div>

                // <a href="product.html?id=${product.id}"><img id="main-image" src="${imageurl}" alt="${product.name}"></a>
                //     <div class="product-info">
                //         <div class="rating">
                //             <!-- Add star icons here -->
                //             &#9734;&#9734;&#9734;&#9734;&#9734;
                //         </div>
                //         <h3 class="product-name montserrat">${product.name}</h3>
                //         <div class="product-pricing">
                //             <button onclick="addToWishlist(${product.id})"><i class="${wishStatus ? 'fa-solid' : 'fa-regular'} fa-heart fa-lg"></i></button>
                //             <span class="price lora">₹ ${product.price}</span>
                //             <button onclick="addToCart(${product.id})"><i class="fa-solid fa-cart-shopping fa-lg"></i></button>
                //         </div>
                //     </div>

                // <button onclick="window.location.href='product.html?id=${product.id}';" href="product.html?id=${product.id}">
                //         <div class="product-image">
                //             <img id="main-image" src="${imageurl}" alt="${product.name}">
                //         </div>
                //         <div class="product-info ">
                //             <h3>${product.name}</h3>
                //             <div class="price-rating">
                //                 <span class="price">₹ ${product.price}</span>
                //                 <div class="rating">
                //                     ★★★★☆ (25)
                //                 </div>
                //             </div>
                //         </div>
                //             <button onclick="addToCart(${product.id})" class="add-to-cart border">Add to Cart</button>
                //             <button onclick="addToWishlist(${product.id})" class="wishlist "><i class="${wishStatus ? 'fa-solid' : 'fa-regular'} fa-heart fa-lg"></i></button>
                //     </button>

                productDiv.classList.add('category-card');
                let imageurl = product.imageUrl[0];
                productDiv.innerHTML = `
                    <img src="${imageurl}" alt="${product.name}" onclick="window.location.href='product.html?id=${product.id}';">
                    <h3 onclick="window.location.href='product.html?id=${product.id}';">${product.name}</h3>
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


            products.slice(4,8).forEach(product => {
                const productDiv = document.createElement('div');
                let wishStatus = false;
                let intervalId;

                let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
                console.log(wishlist);
            
                const find = wishlist.find(ws => ws === product.id);
                
                if (find) {
                    wishStatus = true
                }

                productDiv.classList.add('category-card');
                let imageurl = product.imageUrl[0];
                productDiv.innerHTML = `
                    <img src="${imageurl}" alt="${product.name}"  onclick="window.location.href='product.html?id=${product.id}';">
                    <h3  onclick="window.location.href='product.html?id=${product.id}';">${product.name}</h3>
                    <p class="product-desc">${product.description}</p>
                    <p class="product-price" class="price">₹ ${product.price}</p>
                    <button onclick="addToCart(${product.id})" class="btn btn-secondary btn-outline-rm">Add to Cart</button>
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
                
                productsContainer.appendChild(productDiv);
            });

            products.slice(8,12).forEach(product => {
                const productDiv = document.createElement('div');
                let wishStatus = false;
                let intervalId;

                let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
                console.log(wishlist);
            
                const find = wishlist.find(ws => ws === product.id);
                
                if (find) {
                    wishStatus = true
                }

                productDiv.classList.add('product-card');
                let imageurl = product.imageUrl[0];
                productDiv.innerHTML = `
                    <img src="${imageurl}" alt="${product.name}"  onclick="window.location.href='product.html?id=${product.id}';">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p class="price">₹ ${product.price}</p>
                    <a  href="product.html?id=${product.id}" class="btn btn-secondary">Explore Now</a>
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
                
                productArrivals.appendChild(productDiv);
            });
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


// Mobile Navigation Toggle
// const hamburger = document.querySelector('.hamburger');
// const navLinks = document.querySelector('.nav-links');

// // hamburger.addEventListener('click', () => {
// //     navLinks.classList.toggle('active');
// //     hamburger.classList.toggle('active');
// // });
// // // Dropdown functionality for mobile
// // dropdown.addEventListener('click', (event) => {
// //     if (window.innerWidth <= 992) {
// //         dropdown.classList.toggle('active');
// //     }
// //     if (window.innerWidth <= 992) {
// //         dropdown.classList.toggle('active');
// //     }
// // });

// // Toggle the mobile/tablet menu
// hamburger.addEventListener('click', () => {
//     navLinks.classList.toggle('active');
// });

// // Function to toggle dropdown on tablet/mobile
// function handleDropdownClick(event) {
//     // Prevent link from navigating
//     event.preventDefault();

//     // Toggle the 'active' class on the dropdown for mobile/tablet
//     if (window.innerWidth <= 992) {
//         dropdownMenu.classList.toggle('active');
//     }
// }

// // Add event listener for dropdown menu
// dropdown.addEventListener('click', handleDropdownClick);

// // Handle window resize to close dropdown if window is resized
// window.addEventListener('resize', () => {
//     // Remove 'active' class if window is resized above 992px (desktop)
//     if (window.innerWidth > 992) {
//         dropdownMenu.classList.remove('active');
//         navLinks.classList.remove('active');
//     }
// });
