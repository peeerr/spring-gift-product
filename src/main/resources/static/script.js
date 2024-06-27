document.addEventListener('DOMContentLoaded', function () {
    const productFormModal = document.getElementById('product-form-modal');
    const productForm = document.getElementById('product-form');
    const productList = document.getElementById('product-list');
    const addProductBtn = document.getElementById('add-product-btn');
    const closeModalBtn = document.querySelector('.close');

    const apiEndpoint = 'http://localhost:8080/api/products';

    // 상품 목록 조회
    function fetchProducts() {
        axios.get(apiEndpoint)
        .then(response => {
            const products = response.data;
            productList.innerHTML = '';
            products.forEach(product => {
                const productItem = document.createElement('div');
                productItem.className = 'product-item';
                productItem.innerHTML = `
                        <img src="${product.imageUrl}" alt="${product.name}">
                        <span>${product.id}</span>
                        <span>${product.name}</span>
                        <span>${product.price}원</span>
                        <button onclick="editProduct(${product.id})">수정</button>
                        <button onclick="deleteProduct(${product.id})">삭제</button>
                    `;
                productList.appendChild(productItem);
            });
        })
        .catch(error => console.error('상품 목록 조회 에러: ', error));
    }

    // 상품 추가 폼 열기
    function openFormModal(product = null) {
        document.getElementById('form-title').textContent = '상품 추가';
        productForm.reset();
        productFormModal.style.display = 'block';
    }

    // 상품 폼 닫기
    function closeFormModal() {
        productFormModal.style.display = 'none';
    }

    // 상품 추가 및 수정 처리
    productForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const price = document.getElementById('price').value;
        const imageUrl = document.getElementById('imageUrl').value;

        const product = { name, price, imageUrl };

        axios.post(apiEndpoint, product)
        .then(response => {
            fetchProducts();
            closeFormModal();
        })
        .catch(error => console.error('상품 추가 에러: ', error));
    });

    addProductBtn.addEventListener('click', () => openFormModal());
    closeModalBtn.addEventListener('click', closeFormModal);
    window.addEventListener('click', function (event) {
        if (event.target === productFormModal) {
            closeFormModal();
        }
    });

    // 초기 상품 목록 조회
    fetchProducts();
});
