import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Outfit', 'Inter', 'sans-serif'],
            },
            spacing: {
                '18': '4.5rem',
                '72': '18rem',
                '84': '21rem',
                '96': '24rem',
            },
            borderRadius: {
                'xl': '1rem',
                '2xl': '1.5rem',
            },
            boxShadow: {
                'premium': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                'premium-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
            }
        },
    },
    plugins: [
        daisyui,
    ],
    daisyui: {
        themes: [
            {
                light: {
                    "primary": "#6366f1",
                    "secondary": "#10b981",
                    "accent": "#f59e0b",
                    "neutral": "#374151",
                    "base-100": "#ffffff",
                    "base-200": "#f3f4f6",
                    "base-300": "#e5e7eb",
                    "--rounded-box": "1rem",
                    "--rounded-btn": "0.5rem",
                    "--rounded-badge": "1.9rem",
                },
                dark: {
                    "primary": "#818cf8",
                    "secondary": "#34d399",
                    "accent": "#fbbf24",
                    "neutral": "#1f2937",
                    "base-100": "#111827",
                    "base-200": "#1f2937",
                    "base-300": "#374151",
                    "--rounded-box": "1rem",
                    "--rounded-btn": "0.5rem",
                    "--rounded-badge": "1.9rem",
                },
            },
        ],
    },
}
