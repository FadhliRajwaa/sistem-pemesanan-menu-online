document.getElementById('form-all').addEventListener('submit', async function (event) {
  event.preventDefault(); // Mencegah form submit default

  // Ambil data dari form
  const formData = new FormData(this);

  // Konversi form data menjadi objek JSON
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    product_name: formData.get('product_name'),
    quantity: formData.get('quantity'),
    requestPesanan: formData.get('requestPesanan'),
    payment_method: formData.get('payment_method'),
    delivery_address: formData.get('delivery_address'),
    category: formData.get('category'),
    rating: formData.get('rating'),
    review_text: formData.get('review_text'),
  };

  // Daftar endpoint API
  const endpoints = [
    'https://sistem-gelora-online.vercel.app/api/orders',
    'http://localhost:5000/api/products',
    'http://localhost:5000/api/reviews',
    'http://localhost:5000/api/users',
    'http://localhost:5000/api/categories',
  ];

  try {
    // Kirim data ke semua endpoint API menggunakan Promise.all
    const responses = await Promise.all(
      endpoints.map((endpoint) =>
        fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
      )
    );

    // Cek jika semua respons sukses
    const allResponses = await Promise.all(responses.map((res) => res.json()));
    allResponses.forEach(response => {
      console.log('API Response:', response);  // Menampilkan respons dari setiap endpoint
    });
    

    console.log('Semua respons:', allResponses); // Debugging respons server

    // Menampilkan notifikasi jika semua data berhasil dikirim
    alert('Semua data berhasil dikirim!');

    // Reset form setelah semua fetch selesai
    document.getElementById('form-all').reset();
  } catch (error) {
    // Tangani error jika salah satu fetch gagal
    console.error('Terjadi kesalahan saat mengirim data:', error);
    alert('Terjadi kesalahan, coba lagi nanti!');
  }
});
