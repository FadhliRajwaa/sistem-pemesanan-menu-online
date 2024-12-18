// JavaScript untuk toggle menu mobile
const menuToggle = document.getElementById("menu-toggle");
const navbarUser = document.getElementById("navbar-user");

menuToggle.addEventListener("click", () => {
  // Mengubah state dari menu dropdown
  navbarUser.classList.toggle("scale-0"); // Hide the dropdown
  navbarUser.classList.toggle("opacity-0"); // Hide the dropdown
  navbarUser.classList.toggle("scale-100"); // Show the dropdown
  navbarUser.classList.toggle("opacity-100"); // Show the dropdown
});


// JavaScript untuk memicu animasi saat elemen terlihat di viewport
document.addEventListener("DOMContentLoaded", function () {
  // Pilih semua elemen yang ingin dianimasikan
  const elements = document.querySelectorAll(
    ".animate-fadeInUp, .animate-fadeInLeft"
  );

  // Intersection Observer callback function
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Jika elemen terlihat, tambahkan kelas animasi
          entry.target.classList.add("animate-fadeInUp");
          entry.target.classList.remove(
            "opacity-0",
            "transform",
            "translate-y-20"
          );
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  ); // 50% elemen harus terlihat di viewport

  // Observe semua elemen yang dipilih
  elements.forEach((element) => {
    observer.observe(element);
  });
});
