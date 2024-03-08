'use client'
import { FC, useEffect, useState } from 'react'
import { z } from 'zod'
import useCurrentUser, { User } from '@/hooks/useCurrentUser'
import Link from 'next/link'
import FromSubmitBtn from '@/components/FormSubmitBtn'
import { useRouter } from 'next/navigation'

type Props = {}

const Page: FC<Props> = ({}) => {
	const { push } = useRouter()
	const { setCurrentUser, getCurrentUser } = useCurrentUser()
	const [user, setUser] = useState<User | null>(null)

	useEffect(() => {
		setUser(getCurrentUser())
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const setName = (formData: FormData) => {
		const name = formData.get('userName')
		const data = z.string().min(1).safeParse(name)
		if (data.success) {
			const newUser = {
				name: data.data,
			}
			setCurrentUser(newUser)
			setUser(newUser)
		}
	}

	const redirectToChatRoom = (formData: FormData) => {
		const roomID = formData.get('roomID')
		const data = z.string().min(5).safeParse(roomID)
		if (data.success) {
			push(`/rooms/${data.data}`)
		}
	}

	const CompToBeRendered = user ? (
		<JoinRoomComp redirectToChatRoom={redirectToChatRoom} />
	) : (
		<EnterNameComp setName={setName} />
	)
	return (
		<div className='flex h-full w-full justify-center items-center'>
			<div className='rounded shadow-white shadow-xl bg-white p-5'>
				<h1 className='font-bold text-xl m-2'>
					{user ? `Hi ${user.name}, ` : ''}Welcome to WhatsUp!
				</h1>
				{CompToBeRendered}
			</div>
		</div>
	)
}

type JoinRoomCompProps = {
	redirectToChatRoom: (formData: FormData) => void
}

const JoinRoomComp: FC<JoinRoomCompProps> = ({ redirectToChatRoom }) => {
	return (
		<div className='flex flex-col gap-4 items-center'>
			<Link
				href='/rooms'
				className='rounded p-3 block m-2 bg-black text-white'
			>
				Create a new room
			</Link>
			or
			<form
				className='flex shadow-md w-full'
				action={redirectToChatRoom}
			>
				<input
					name='roomID'
					type='text'
					placeholder='Enter roomID...'
					className='p-2 rounded-s flex-auto'
					required
					minLength={5}
				/>
				<FromSubmitBtn
					className='rounded-e p-2 bg-black text-white'
					defaultBtnTxt='Join room'
					loadingBtnTxt='Joining room...'
				/>
			</form>
		</div>
	)
}

type EnterNameCompProps = {
	setName: (formData: FormData) => void
}

const EnterNameComp: FC<EnterNameCompProps> = ({ setName }) => {
	return (
		<form
			action={setName}
			className='flex flex-col gap-4 items-center'
		>
			<label
				htmlFor='userNameInput'
				className='text-gray-500'
			>
				Please enter your name, so that other members on the chatroom
				can recognize you.
			</label>
			<div className='flex shadow-md w-full'>
				<input
					id='userNameInput'
					name='userName'
					type='text'
					placeholder='Enter your name...'
					className='p-2 rounded-s flex-auto'
					required
					minLength={3}
				/>
				<FromSubmitBtn
					className='p-2 bg-black text-white rounded-e'
					defaultBtnTxt='Set my name'
					loadingBtnTxt='Setting your name...'
				/>
			</div>
		</form>
	)
}

export default Page
