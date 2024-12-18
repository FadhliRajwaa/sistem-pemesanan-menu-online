/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"], // Path untuk file yang menggunakan Tailwind CSS
  darkMode: 'class',
  theme: {
    extend: {
      perspective: {
        '1000': '1000px',
      },

      // Menambahkan warna kustom (jika diperlukan)
      colors: {
        primaryColor: '#00B8FF',
        secondaryColor: '#001F2B',
        shadesOfBlue: '#00719c',
        mainGray: '#e5e5e5',
      },

      // Menambahkan animasi kustom
      animation: {
        fadeIn: 'fadeIn 1s ease-out',
        fadeInUp: 'fadeInUp 1s ease-out',
        fadeInDown: 'fadeInDown 1s ease-out',
        fadeInLeft: 'fadeInLeft 1s ease-out',
        fadeInRight: 'fadeInRight 1s ease-out',
        zoomIn: 'zoomIn 1s ease-out',
        zoomOut: 'zoomOut 1s ease-out',
        slideInUp: 'slideInUp 1s ease-out',
        slideInDown: 'slideInDown 1s ease-out',
        slideInLeft: 'slideInLeft 1s ease-out',
        slideInRight: 'slideInRight 1s ease-out',
        rotateIn: 'rotateIn 1s ease-out',
        'background-moving': 'backgroundMoving 10s linear infinite',
      },

      // Menambahkan keyframes untuk setiap animasi
      keyframes: {
        gradientMove: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },

        backgroundMoving: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },

        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        zoomIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        zoomOut: {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.9)' },
        },
        slideInUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideInDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        rotateIn: {
          '0%': { opacity: '0', transform: 'rotate(-120deg)' },
          '100%': { opacity: '1', transform: 'rotate(0)' },
        },
      },

      animation: {
        gradient: 'gradientMove 4s ease infinite',
      },

      // Menambahkan background image kustom untuk latar belakang yang bergerak
      backgroundImage: {
        'gradient-moving': 'linear-gradient(45deg, #00B8FF, #00719c)',
      },
    },
  },
  plugins: [],
};
