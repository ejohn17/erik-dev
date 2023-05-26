import '@/styles/globals.scss'
import type { AppProps } from 'next/app'

import Layout from 'components/layout/Layout'

import { initializeApp } from 'firebase/app'
import { getStorage, ref } from 'firebase/storage'

export const firebaseConfig = {
	apiKey: 'AIzaSyBUZFWYoir25URbq33MF3s0HcYo0D1xHzY',
	authDomain: 'erik-dev-896d1.firebaseapp.com',
	projectId: 'erik-dev-896d1',
	storageBucket: 'erik-dev-896d1.appspot.com',
	messagingSenderId: '111276512417',
	appId: '1:111276512417:web:ff5b756ceace245fd2cce0',
}

export const app = initializeApp(firebaseConfig)

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	)
}
