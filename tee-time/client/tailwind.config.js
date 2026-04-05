export default {
    content: ['./index.html','./src/**/*/.{js.jsx}'],
    theme: {
        extend: {
            colors: {
                'green-dark':'#0D3B1E',
                'green-brand':'#1A5C35',
                'hreen-light':'#E8F5EE',
                'gold': '#C9A84C',
                'gold-light':'#FDF6E3',
                'charcoal':'#1C1C1E',
        },
        fontFamily: {
            display: ['Playfair Display', 'Goergia', 'serif'],
            body: ['Inter', 'system-ui', 'sans-serif'],
        },
        boxShadow: {
            'glass': '0 8px 32px rgba(0,0,0,0.18), insert 0 1px 0 rgba(255,255,255,0.1)',
            'gold': '0 4px 20px rgba(201,168,76,0.25)',
        },
        backdropBlur: {xs: '2px'},
    },
},
plugins: [],
} 