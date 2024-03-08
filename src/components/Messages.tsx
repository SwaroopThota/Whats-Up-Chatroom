'use client'
import useCurrentUser, { User } from '@/hooks/useCurrentUser'
import { pusherClient } from '@/lib/Pusher'
import { FC, useEffect, useState } from 'react'

type Props = {
	roomID: string
}

export type Message = {
	message: string
	userName: string
}

const Messages: FC<Props> = ({ roomID }) => {
	const [messages, setMessages] = useState<Message[]>([])
	const { getCurrentUser } = useCurrentUser()
	const [user, setUser] = useState<User | null>(null)

	useEffect(() => {
		setUser(getCurrentUser())
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		pusherClient.subscribe(roomID)

		pusherClient.bind('incoming-message', (message: Message) => {
			setMessages((prev) => [...prev, message])
		})

		return () => {
			pusherClient.unsubscribe(roomID)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return (
		<div className='flex-auto flex flex-col gap-2 justify-end overflow-y-auto'>
			{messages.map((item, idx) => (
				<Message
					message={item}
					key={idx}
					isCurrentUser={user?.name === item.userName}
				/>
			))}
		</div>
	)
}

type MessageProps = {
	message: Message
	isCurrentUser: boolean
}

const Message: FC<MessageProps> = ({ message, isCurrentUser }) => {
	return (
		<div className={`${isCurrentUser ? 'ms-auto' : 'me-auto'}`}>
			<div className='p-2 bg-black text-white rounded-xl'>
				<p className={`m-1 ${!isCurrentUser ? 'mb-0' : ''}`}>
					{message.message}
				</p>
				{!isCurrentUser && (
					<div className='text-[0.60rem] text-gray-400 text-start'>
						{message.userName}
					</div>
				)}
			</div>
		</div>
	)
}

export default Messages
