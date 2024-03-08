import { RedirectType, redirect } from 'next/navigation'
import { FC } from 'react'

type PageProps = {}

const Page: FC<PageProps> = ({}) => {
	const newChatRoomID = generateChatRoomID()
	redirect(`/rooms/${newChatRoomID}`, RedirectType.replace)
}

const generateChatRoomID = () => {
	return Math.random().toString(36).slice(2, 7)
}

export default Page
