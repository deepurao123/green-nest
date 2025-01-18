document.addEventListener('DOMContentLoaded', async () => {
    document.getElementById('search-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting the default way
    
        const searchInput = document.getElementById('search-input').value.trim();
    
        if (searchInput) {
            // Construct the URL for the shop page with the search query
            const searchUrl = `shop.html?search=${encodeURIComponent(searchInput)}`;
    
            // Redirect to the shop page with the search query
            window.location.href = searchUrl;
        }
    
        console.log("working javscript");
        



        // const cartValue = document.getElementById('cart-value-header')

        // setInterval(() => {
        //     let cart = JSON.parse(localStorage.getItem('cart')) || [];
        //     cartValue.innerHTML = cart.length
        // }, 500)
    });


    // Get elements
    const openDialog = document.getElementById('openDialog');
    const searchDialog = document.getElementById('searchDialog');
    const closeDialog = document.getElementById('closeDialog');
    const searchInput = document.getElementById('ssearch-input');
    
    // Function to open the dialog
    openDialog.addEventListener('click', () => {
        searchDialog.style.display = 'flex';
        searchInput.focus(); // Automatically focus the input
    });
    
    // Function to close the dialog
    closeDialog.addEventListener('click', () => {
        searchDialog.style.display = 'none';
    });
    
    // Close the dialog when clicking outside the dialog box
    window.addEventListener('click', (e) => {
        if (e.target === searchDialog) {
            searchDialog.style.display = 'none';
        }
    });




    // Get elements
        const openLoginDialog = document.getElementById('openLoginDialog');
        const loginDialog = document.getElementById('loginDialog');
        const closeLoginDialog = document.getElementById('closeLoginDialog');
        const loginTab = document.getElementById('loginTab');
        const signupTab = document.getElementById('signupTab');
        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');
        
        // Function to open the dialog
        openLoginDialog.addEventListener('click', () => {
            loginDialog.style.display = 'flex';
        });
        
        // Function to close the dialog
        closeLoginDialog.addEventListener('click', () => {
            loginDialog.style.display = 'none';
        });
        
        // Close dialog when clicking outside the box
        window.addEventListener('click', (e) => {
            if (e.target === loginDialog) {
                loginDialog.style.display = 'none';
            }
        });
        
        // Toggle between login and signup forms
        loginTab.addEventListener('click', () => {
            loginTab.classList.add('active');
            signupTab.classList.remove('active');
            loginForm.classList.add('active');
            signupForm.classList.remove('active');
        });
        
        signupTab.addEventListener('click', () => {
            signupTab.classList.add('active');
            loginTab.classList.remove('active');
            signupForm.classList.add('active');
            loginForm.classList.remove('active');
        });
        

})


