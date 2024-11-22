import { Rajdhani, PT_Sans, Bitter } from 'next/font/google';

export const ptSans = PT_Sans({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-ptsans',
});
export const rajdhani = Rajdhani({
  weight: ['300', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-rajdhani',
});
export const bitter = Bitter({
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-bitter',
});
