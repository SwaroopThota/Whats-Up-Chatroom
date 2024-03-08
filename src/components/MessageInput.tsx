'use client'
import { FC, useRef } from 'react'
import FromSubmitBtn from './FormSubmitBtn'
import useCurrentUser from '@/hooks/useCurrentUser'

type Props = {
	roomID: string
}

const MessageInput: FC<Props> = ({ roomID }) => {
	const formRef = useRef<HTMLFormElement>(null)
	const currentUser = useCurrentUser().getCurrentUser()
	const sendMessage = async (formData: FormData) => {
		const message = formData.get('message')
		if (!message) return
		await fetch('/api/message', {
			method: 'POST',
			body: JSON.stringify({
				roomID,
				message,
				userName: currentUser?.name,
			}),
		})
		formRef?.current?.reset()
	}
	return (
		<form
			action={sendMessage}
			className='justify-self-end flex shadow-2xl'
			ref={formRef}
		>
			<input
				type='text'
				name='message'
				placeholder='Type your message...'
				title='Message type box'
				className='flex-grow p-2 rounded-s-lg'
			/>
			<FromSubmitBtn
				className='p-2 bg-black text-white rounded-e-lg'
				defaultBtnTxt='Send'
				loadingBtnTxt='Sending...'
			/>
		</form>
	)
}

export default MessageInput
