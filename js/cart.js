let cart = [];

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function updateCartModal() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    let total = 0;
    
    cartItems.innerHTML = '';
    
    cart.forEach(item => {
        total += item.price * item.quantity;
        cartItems.innerHTML += `
            <div class="cart-item mb-3">
                <div class="d-flex align-items-center">
                    <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover;">
                    <div class="ms-3">
                        <h6 class="mb-0">${item.name}</h6>
                        <p class="mb-0">$${item.price} x ${item.quantity}</p>
                    </div>
                    <div class="ms-auto">
                        <button class="btn btn-sm btn-danger" onclick="removeFromCart(${item.id})">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    cartTotal.textContent = total;
}

function addToCart(button) {
    const id = parseInt(button.dataset.id);
    const name = button.dataset.name;
    const price = parseFloat(button.dataset.price);
    const image = button.dataset.image;
    
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id,
            name,
            price,
            image,
            quantity: 1
        });
    }
    
    updateCartCount();
    updateCartModal();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartCount();
    updateCartModal();
}

document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => addToCart(button));
    });
    
    const checkoutButton = document.getElementById('checkout-button');
    checkoutButton.addEventListener('click', () => {
        if (cart.length === 0) {
            Swal.fire({
                title: 'Error',
                text: 'El carrito está vacío',
                icon: 'error',
                confirmButtonColor: '#036645'
            });
            return;
        }
        
        
        cart = [];
        updateCartCount();
        updateCartModal();
        
        
        const cartModal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
        cartModal.hide();
        
        
        cartModal._element.addEventListener('hidden.bs.modal', function handler() {
            document.body.classList.remove('modal-open');
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
            
            const modalBackdrop = document.querySelector('.modal-backdrop');
            if (modalBackdrop) {
                modalBackdrop.remove();
            }
            
          
            setTimeout(() => {
                Swal.fire({
                    title: '¡Gracias por tu compra!',
                    icon: 'success',
                    confirmButtonColor: '#036645'
                });
            }, 100);
            
            
            cartModal._element.removeEventListener('hidden.bs.modal', handler);
        }, { once: true });
    });
}); 
