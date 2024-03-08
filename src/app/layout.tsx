import { Metadata } from 'next'
import { FC, PropsWithChildren } from 'react'
import { Poppins } from 'next/font/google'
import './globals.css'

type Props = PropsWithChildren & {}

const poppins = Poppins({
	weight: ['100', '200', '500', '600', '800', '900'],
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'WhatsUp?',
	description: 'A login-free chatrooms app.',
}

const Layout: FC<Props> = ({ children }) => {
	return (
		<html lang='en'>
			<body
				className={`${poppins.className} h-screen min-h-screen dark:bg-black container md:container mx-auto flex justify-center items-center`}
			>
				{children}
			</body>
		</html>
	)
}

export default Layout
