import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
	darkMode: ["class"],
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: "hsl(220 13% 91%)",
				input: "hsl(220 13% 95%)",
				ring: "hsl(250 100% 70%)",
				background: "hsl(0 0% 100%)",
				foreground: "hsl(220 25% 15%)",
				primary: {
					DEFAULT: "hsl(230 100% 25%)",
					foreground: "hsl(0 0% 100%)",
					light: "hsl(230 100% 35%)",
					dark: "hsl(230 100% 15%)",
				},
				secondary: {
					DEFAULT: "hsl(220 91% 95%)",
					foreground: "hsl(220 91% 56%)",
				},
				destructive: {
					DEFAULT: "hsl(0 84.2% 60.2%)",
					foreground: "hsl(0 0% 100%)",
				},
				muted: {
					DEFAULT: "hsl(220 14% 96%)",
					foreground: "hsl(220 15% 50%)",
				},
				accent: {
					DEFAULT: "hsl(280 100% 60%)",
					foreground: "hsl(0 0% 100%)",
				},
				popover: {
					DEFAULT: "hsl(0 0% 100%)",
					foreground: "hsl(220 25% 15%)",
				},
				card: {
					DEFAULT: "hsl(0 0% 100%)",
					foreground: "hsl(220 25% 15%)",
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				university: {
					blue: 'hsl(var(--university-blue))',
					'light-blue': 'hsl(var(--university-light-blue))'
				},
				tech: {
					blue: 'hsl(var(--tech-blue))',
					indigo: 'hsl(var(--tech-indigo))',
					'deep-blue': 'hsl(var(--tech-deep-blue))',
					'bright-accent': 'hsl(var(--tech-bright-accent))'
				},
				academic: {
					gray: 'hsl(var(--academic-gray))'
				},
				text: {
					primary: 'hsl(var(--text-primary))',
					secondary: 'hsl(var(--text-secondary))'
				}
			},
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-tech-primary': 'var(--gradient-tech-primary)',
				'gradient-tech-secondary': 'var(--gradient-tech-secondary)',
				'gradient-hero': 'var(--gradient-hero)',
				'gradient-tech-hero': 'var(--gradient-tech-hero)',
				'gradient-card': 'var(--gradient-card)',
				'gradient-tech-card': 'var(--gradient-tech-card)'
			},
			boxShadow: {
				'card': 'var(--shadow-card)',
				'elevated': 'var(--shadow-elevated)',
				'header': 'var(--shadow-header)',
				'tech': 'var(--shadow-tech)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'slide-in': {
					'0%': {
						transform: 'translateX(-100%)'
					},
					'100%': {
						transform: 'translateX(0)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'slide-in': 'slide-in 0.3s ease-out'
			}
		}
	},
	plugins: [tailwindcssAnimate],
} satisfies Config;