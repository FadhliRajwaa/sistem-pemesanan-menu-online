const API_URL = 'https://sistem-gelora-online.vercel.app/api'; // Ganti sesuai server kamu

// JavaScript to switch between content sections
const links = document.querySelectorAll('a[href^="#"]');
links.forEach(link => {
  link.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default link behavior

    // Hide all content sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
      section.style.display = 'none';
    });

    // Show the content section linked to the clicked link
    const targetSection = document.querySelector(this.getAttribute('href'));
    targetSection.style.display = 'block';
  });
});

// Initialize Three.js scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('threejs-canvas') });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 1); // Set background color to black

// Create a clock for time-based animations
const clock = new THREE.Clock();

// Create a dense particle system with vibrant colors
const particleCount = 5000;
const particleGeometry = new THREE.BufferGeometry();
const particlePositions = [];
const particleColors = [];
const particleMaterial = new THREE.PointsMaterial({
  size: 2,
  blending: THREE.AdditiveBlending,
  transparent: true,
  opacity: 0.8,
});

for (let i = 0; i < particleCount; i++) {
  const x = (Math.random() - 0.5) * 2000;
  const y = (Math.random() - 0.5) * 2000;
  const z = (Math.random() - 0.5) * 2000;
  particlePositions.push(x, y, z);

  // Assign random color for each particle
  const color = new THREE.Color(Math.random(), Math.random(), Math.random());
  particleColors.push(color.r, color.g, color.b);
}

particleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(particlePositions, 3));
particleGeometry.setAttribute('color', new THREE.Float32BufferAttribute(particleColors, 3));
const particles = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particles);

// Create rotating, scaling, and bouncing cubes to add complexity
const cubes = [];
const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff88, emissive: 0x00ff88 });
for (let i = 0; i < 10; i++) {
  const cube = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 5), cubeMaterial);
  cube.position.set((Math.random() - 0.5) * 500, (Math.random() - 0.5) * 500, (Math.random() - 0.5) * 500);
  cubes.push(cube);
  scene.add(cube);
}

// Add dynamic lighting that follows a random path
const pointLight = new THREE.PointLight(0xffffff, 1, 100);
scene.add(pointLight);

// Create an ambient light for soft illumination
const ambientLight = new THREE.AmbientLight(0x404040); // soft light
scene.add(ambientLight);

// Camera setup
camera.position.z = 100;

// Animation loop to update the scene
function animate() {
  requestAnimationFrame(animate);

  // Get elapsed time for animation calculations
  const elapsedTime = clock.getElapsedTime();

  // Update particle positions for more chaotic movement
  const positions = particleGeometry.attributes.position.array;
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] += Math.sin(elapsedTime + i * 0.5) * 0.05;
    positions[i * 3 + 1] += Math.cos(elapsedTime + i * 0.5) * 0.05;
    positions[i * 3 + 2] += Math.sin(elapsedTime + i * 0.3) * 0.05;
  }
  particleGeometry.attributes.position.needsUpdate = true;

  // Create a color-changing effect for particles
  const colors = particleGeometry.attributes.color.array;
  for (let i = 0; i < particleCount; i++) {
    colors[i * 3] = Math.sin(elapsedTime + i * 0.3) * 0.5 + 0.5;
    colors[i * 3 + 1] = Math.cos(elapsedTime + i * 0.3) * 0.5 + 0.5;
    colors[i * 3 + 2] = Math.sin(elapsedTime + i * 0.5) * 0.5 + 0.5;
  }
  particleGeometry.attributes.color.needsUpdate = true;

  // Animate cubes: rotation, scaling, and bouncing
  cubes.forEach((cube, index) => {
    cube.rotation.x += (0.01 + Math.random() * 0.02);
    cube.rotation.y += (0.01 + Math.random() * 0.02);
    cube.position.x += Math.sin(elapsedTime * (index + 1) * 0.2) * 0.5;
    cube.position.y += Math.cos(elapsedTime * (index + 1) * 0.2) * 0.5;
    cube.scale.set(1 + Math.sin(elapsedTime * 2) * 0.5, 1 + Math.cos(elapsedTime * 2) * 0.5, 1);
  });

  // Dynamic light movement for more chaotic feel
  pointLight.position.x = Math.sin(elapsedTime) * 50;
  pointLight.position.y = Math.cos(elapsedTime) * 50;

  // Render the scene
  renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


// Fungsi untuk mengambil data dan menampilkan ke dalam tabel
async function fetchDataAndRender(collection, tableId) {
  
  const response = await fetch(`${API_URL}/${collection}`);
  const data = await response.json();

  const tableBody = document.getElementById(tableId);
  tableBody.innerHTML = ''; // Clear table content

  data.forEach((item) => {
    const row = document.createElement('tr');
    row.id = `row-${item._id}`;  // Tambahkan ID pada baris
    row.classList.add('text-white');  // Menambahkan kelas untuk warna teks putih pada baris

    const keys = Object.keys(item).filter((key) => key !== '_id' && key !== '__v' && key !== 'createdAt' && key !== 'updatedAt');
  
    keys.forEach((key) => {
      const cell = document.createElement('td');
      cell.textContent = item[key];
      cell.classList.add('px-6', 'py-4', 'text-white'); // Menambahkan warna teks putih pada sel
      row.appendChild(cell);
    });
  
    // Tombol Aksi: Edit dan Hapus
    const actionCell = document.createElement('td');
    actionCell.innerHTML = ` 
      <button onclick="editRow('${collection}', '${item._id}')" class="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
      <button onclick="deleteRow('${collection}', '${item._id}')" class="bg-red-500 text-white px-2 py-1 rounded">Hapus</button>
    `;
    actionCell.classList.add('px-6', 'py-4');
    row.appendChild(actionCell);
  
    tableBody.appendChild(row);
  });

  // Update the total count based on the collection
  updateTotalCount(collection);
}


// Fungsi untuk memperbarui total count
async function updateTotalCount(collection) {
  let count;
  
  // Ambil jumlah berdasarkan koleksi
  if (collection === 'products') {
    count = await getProductsCount();
  } else if (collection === 'orders') {
    count = await getOrdersCount();
  } else if (collection === 'users') {
    count = await getUsersCount();
  }
  
  // Update total count di halaman
  if (collection === 'products') {
    document.getElementById('total-products').innerText = count;
  } else if (collection === 'orders') {
    document.getElementById('total-orders').innerText = count;
  } else if (collection === 'users') {
    document.getElementById('total-users').innerText = count;
  }
}

// Fungsi untuk mendapatkan jumlah produk
async function getProductsCount() {
  const response = await fetch(`${API_URL}/products/count`);
  const data = await response.json();
  return data.count; // Pastikan response dari API mengandung "count"
}

// Fungsi untuk mendapatkan jumlah pesanan
async function getOrdersCount() {
  const response = await fetch(`${API_URL}/orders/count`);
  const data = await response.json();
  return data.count;
}

// Fungsi untuk mendapatkan jumlah pengguna
async function getUsersCount() {
  const response = await fetch(`${API_URL}/users/count`);
  const data = await response.json();
  return data.count;
}


// Fungsi untuk membuat baris baru
// Fungsi untuk membuat baris baru dengan input langsung di tabel
async function createRow(collection) {
  const tableBody = document.getElementById(`${collection}-data`);
  
  // Buat elemen baris dan input untuk kolom yang berbeda-beda sesuai collection
  const newRow = document.createElement('tr');
  
  let rowContent = '';

  switch (collection) {
    case 'users':
      rowContent = `
        <td class="px-6 py-4">
          <input type="text" class="input-field border rounded px-2 py-1" id="name-input" placeholder="Enter username">
        </td>
        <td class="px-6 py-4">
          <input type="email" class="input-field border rounded px-2 py-1" id="email-input" placeholder="Enter email">
        </td>
        <td class="px-6 py-4">
          <input type="text" class="input-field border rounded px-2 py-1" id="phone-input" placeholder="Enter phone number">
        </td>`;
      break;
    case 'products':
      rowContent = `
        <td class="px-6 py-4">
          <input type="text" class="input-field border rounded px-2 py-1" id="product-name-input" placeholder="Enter product name">
        </td>
        <td class="px-6 py-4">
          <input type="number" class="input-field border rounded px-2 py-1" id="quantity-input" placeholder="Enter quantity">
        </td>`;
      break;
    case 'orders':
      rowContent = `
        <td class="px-6 py-4">
          <input type="text" class="input-field border rounded px-2 py-1" id="requestPesanan-input" placeholder="Enter request">
        </td>
        <td class="px-6 py-4">
          <input type="text" class="input-field border rounded px-2 py-1" id="payment-method-input" placeholder="Enter payment method">
        </td>
        <td class="px-6 py-4">
          <input type="text" class="input-field border rounded px-2 py-1" id="delivery-address-input" placeholder="Enter delivery address">
        </td>`;
      break;
    case 'categories':
      rowContent = `
        <td class="px-6 py-4">
          <input type="text" class="input-field border rounded px-2 py-1" id="category-input" placeholder="Enter category name">
        </td>`;
      break;
    case 'reviews':
      rowContent = `
        <td class="px-6 py-4">
          <input type="number" class="input-field border rounded px-2 py-1" id="rating-input" placeholder="Enter rating">
        </td>
        <td class="px-6 py-4">
          <textarea class="input-field border rounded px-2 py-1" id="review-text-input" placeholder="Enter review text"></textarea>
        </td>`;
      break;
    default:
      console.error("Unknown collection");
      return;
  }
  
  // Menyimpan data asli dalam atribut data-original-data
  newRow.dataset.originalData = newRow.innerHTML;

 


  // Append the row content dynamically
  newRow.innerHTML = `
    ${rowContent}
    <td class="px-6 py-4">
      <button onclick="saveRow(event, '${collection}')" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">Save</button>
      <button onclick="cancelEdit(event)" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Cancel</button>
    </td>
  `;
  
  // Tambahkan baris baru ke tabel
  tableBody.appendChild(newRow);
}

// Fungsi untuk menyimpan data yang dimasukkan
async function saveRow(event, collection) {
  const row = event.target.closest('tr');
  
  let data = {};

  // Collecting data based on the collection
  switch (collection) {
    case 'users':
      data = {
        name: row.querySelector('#name-input').value,
        email: row.querySelector('#email-input').value,
        phone: row.querySelector('#phone-input').value
    };
      break;

    case 'products':
      data = {
        product_name: row.querySelector('#product-name-input').value,
        quantity: row.querySelector('#quantity-input').value
      };
      break;
    case 'orders':
      data = {
        requestPesanan: row.querySelector('#requestPesanan-input').value,
        payment_method: row.querySelector('#payment-method-input').value,
        delivery_address: row.querySelector('#delivery-address-input').value
      };
      break;
    case 'categories':
      data = {
        category: row.querySelector('#category-input').value
      };
      break;
    case 'reviews':
      data = {
        rating: row.querySelector('#rating-input').value,
        review_text: row.querySelector('#review-text-input').value
      };
      break;
    default:
      console.error("Unknown collection");
      return;
  }

  // Ensure all fields are filled
  if (Object.values(data).every(value => value !== "")) {
    try {
      const response = await fetch(`${API_URL}/${collection}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        fetchDataAndRender(collection, `${collection}-data`);
      } else {
        alert('Gagal menyimpan data. Coba lagi.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat menyimpan data.');
    }
  } else {
    alert('Semua kolom harus diisi.');
  }
}

// Fungsi untuk membatalkan edit

async function editRow(collection, id) {
  const tableBody = document.getElementById(`${collection}-data`);
  if (!tableBody) {
    console.error('Table body tidak ditemukan.');
    return; // Jika table body tidak ditemukan, hentikan eksekusi
  }

  const row = tableBody.querySelector(`#row-${id}`);  // Query by row-${id} format
  if (!row) {
    console.error(`Row dengan ID ${id} tidak ditemukan.`);
    return; // Jika row tidak ditemukan, hentikan eksekusi
  }

  // Ambil data yang ada di baris untuk diedit, sesuai dengan collection
  let fields = {};
  if (collection === 'users') {
    fields = { 
      name: row.querySelector('.name') ? row.querySelector('.name').innerText : '',
      email: row.querySelector('.email') ? row.querySelector('.email').innerText : '',
      phone: row.querySelector('.role') ? row.querySelector('.phone').innerText : ''
    };
  }

  else if (collection === 'products') {
    fields = {
      product_name: row.querySelector('.product_name') ? row.querySelector('.product_name').innerText : '',
      quantity: row.querySelector('.quantity') ? row.querySelector('.quantity').innerText : ''
    };
  } else if (collection === 'orders') {
    fields = {
      request: row.querySelector('.requestPesanan') ? row.querySelector('.request').innerText : '',
      payment_method: row.querySelector('.payment_method') ? row.querySelector('.payment_method').innerText : '',
      delivery_address: row.querySelector('.delivery_address') ? row.querySelector('.delivery_address').innerText : ''
    };
  } else if (collection === 'categories') {
    fields = {
      category_name: row.querySelector('.category_name') ? row.querySelector('.category_name').innerText : ''
    };
  } else if (collection === 'reviews') {
    fields = {
      rating: row.querySelector('.rating') ? row.querySelector('.rating').innerText : '',
      review_text: row.querySelector('.review_text') ? row.querySelector('.review_text').innerText : ''
    };
  }

  // Simpan data asli dalam data-original-data
  row.dataset.originalData = row.innerHTML;  // Menyimpan konten asli sebelum diubah

  // Ganti kolom dengan input untuk memungkinkan edit
  let inputsHTML = '';
  for (let field in fields) {
    inputsHTML += `
      <td class="px-6 py-4">
        <input type="text" class="input-field border rounded px-2 py-1" id="${field}-input" value="${fields[field]}" placeholder="Enter ${field}">
      </td>
    `;
  }

  // Tambahkan tombol Save dan Cancel
  row.innerHTML = `
    ${inputsHTML}
    <td class="px-6 py-4">
      <button onclick="saveEditRow(event, '${collection}', '${id}')" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">Save</button>
      <button onclick="cancelEdit(event)" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Cancel</button>
    </td>
  `;
}

// Fungsi untuk menyimpan data yang diedit
async function saveEditRow(event, collection, id) {
  const row = event.target.closest('tr');
  
  let data = {};

  // Ambil data dari input yang telah diedit sesuai dengan collection
  if (collection === 'users'){
    data = {
      name: row.querySelector('#name-input').value,
      email: row.querySelector('#email-input').value,
      phone: row.querySelector('#phone-input').value
    };
  }

  else if (collection === 'products') {
    data = {
      product_name: row.querySelector('#product_name-input').value,
      quantity: row.querySelector('#quantity-input').value
    };
  } else if (collection === 'orders') {
    data = {
      request: row.querySelector('#requestPesanan-input').value,
      payment_method: row.querySelector('#payment_method-input').value,
      delivery_address: row.querySelector('#delivery_address-input').value
    };
  } else if (collection === 'categories') {
    data = {
      category_name: row.querySelector('#category_name-input').value
    };
  } else if (collection === 'reviews') {
    data = {
      rating: row.querySelector('#rating-input').value,
      review_text: row.querySelector('#review_text-input').value
    };
  }

  // Validasi: pastikan semua kolom telah diisi
  if (Object.values(data).every(value => value.trim() !== '')) {
    try {
      const response = await fetch(`${API_URL}/${collection}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        fetchDataAndRender(collection, `${collection}-data`);
      } else {
        alert('Gagal memperbarui data. Coba lagi.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat memperbarui data.');
    }
  } else {
    alert('Semua kolom harus diisi.');
  }
}


// Helper function to generate row content for editing
function generateRowContent(collection, data) {
  let rowContent = '';
  switch (collection) {
    case 'users':
      rowContent = `
        <td class="px-6 py-4">
          <input type="text" class="input-field border rounded px-2 py-1" id="name-input" value="${data.name}" placeholder="Enter username">
        </td>
        <td class="px-6 py-4">
          <input type="email" class="input-field border rounded px-2 py-1" id="email-input" value="${data.email}" placeholder="Enter email">
        </td>
        <td class="px-6 py-4">
          <input type="text" class="input-field border rounded px-2 py-1" id="phone-input" value="${data.phone}" placeholder="Enter phone number">
        </td>`;
      break;

    case 'products':
      rowContent = `
        <td class="px-6 py-4">
          <input type="text" class="input-field border rounded px-2 py-1" id="product-name-input" value="${data.product_name}" placeholder="Enter product name">
        </td>
        <td class="px-6 py-4">
          <input type="number" class="input-field border rounded px-2 py-1" id="quantity-input" value="${data.quantity}" placeholder="Enter quantity">
        </td>`;
      break;
    case 'orders':
      rowContent = `
        <td class="px-6 py-4">
          <input type="text" class="input-field border rounded px-2 py-1" id="requestPesanan-input" value="${data.requestPesanan}" placeholder="Enter request">
        </td>
        <td class="px-6 py-4">
          <input type="text" class="input-field border rounded px-2 py-1" id="payment-method-input" value="${data.payment_method}" placeholder="Enter payment method">
        </td>
        <td class="px-6 py-4">
          <input type="text" class="input-field border rounded px-2 py-1" id="delivery-address-input" value="${data.delivery_address}" placeholder="Enter delivery address">
        </td>`;
      break;
    case 'categories':
      rowContent = `
        <td class="px-6 py-4">
          <input type="text" class="input-field border rounded px-2 py-1" id="category-input" value="${data.category}" placeholder="Enter category name">
        </td>`;
      break;
    case 'reviews':
      rowContent = `
        <td class="px-6 py-4">
          <input type="number" class="input-field border rounded px-2 py-1" id="rating-input" value="${data.rating}" placeholder="Enter rating">
        </td>
        <td class="px-6 py-4">
          <textarea class="input-field border rounded px-2 py-1" id="review-text-input" placeholder="Enter review text">${data.review_text}</textarea>
        </td>`;
      break;
    default:
      console.error("Unknown collection");
  }
  return rowContent;
}


// Fungsi untuk membatalkan edit
function cancelEdit(event) {
  const row = event.target.closest('tr'); // Get the row containing the clicked button
  const originalData = row.dataset.originalData; // Get the original data stored in data-original-data

  console.log("Row yang dibatalkan: ", row); // Debugging
  console.log("Original Data saat cancelEdit: ", originalData); // Debugging

  // Jika tidak ada data asli, anggap itu sebagai baris baru yang dibuat
  if (!originalData) {
    row.remove(); // Jika tidak ada original data, baris ini baru, maka hapus saja
    console.log('Baris baru dihapus');
    return; // Tidak perlu melanjutkan
  }

  // Set the row content back to the original data (this assumes data is saved as a string)
  row.innerHTML = originalData;

  // Anda juga bisa menambahkan pengaturan lainnya jika perlu, seperti reset status form
}






// Fungsi untuk menghapus baris
async function deleteRow(collection, id) {
  if (confirm('Apakah Anda yakin ingin menghapus item ini?')) {
    await fetch(`${API_URL}/${collection}/${id}`, {
      method: 'DELETE',
    });
    fetchDataAndRender(collection, `${collection}-data`);
  }
}

// Prompt untuk input data
function promptDataForUsers() {
  const name = prompt('Masukkan Nama');
  const email = prompt('Masukkan Email');
  const phone = prompt('Masukkan Nomor Telepon');
  
  if (name && email && phone) {
    return { name, email, phone };
  }
  return null;
}

function promptDataForProducts() {
  const name = prompt('Masukkan Nama Produk');
  const quantity = prompt('Masukkan Jumlah Produk');
  
  if (name && quantity) {
    return { product_name: name, quantity };
  }
  return null;
}

function promptDataForOrders() {
  const request = prompt('Masukkan Request Pesanan');
  const paymentMethod = prompt('Masukkan Metode Pembayaran');
  const deliveryAddress = prompt('Masukkan Alamat Pengiriman');
  
  if (request && paymentMethod && deliveryAddress) {
    return { requestPesanan: request, payment_method: paymentMethod, delivery_address: deliveryAddress }; 
  }
  return null;
}

function promptDataForCategories() {
  const name = prompt('Masukkan Nama Kategori');
  
  if (name) {
    return { category: name };
  }
  return null;
}

function promptDataForReviews() {
  const rating = prompt('Masukkan Rating');
  const comment = prompt('Masukkan Ulasan');
  
  if (rating && comment) {
    return { rating: Number(rating), review_text: comment };
  }
  return null;
}

// Inisialisasi data tabel
document.addEventListener('DOMContentLoaded', () => {
  fetchDataAndRender('users', 'users-data');
  fetchDataAndRender('products', 'products-data');
  fetchDataAndRender('orders', 'orders-data');
  fetchDataAndRender('categories', 'categories-data');
  fetchDataAndRender('reviews', 'reviews-data');
});
