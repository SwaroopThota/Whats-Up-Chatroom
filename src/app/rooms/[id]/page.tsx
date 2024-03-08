import MessageInput from '@/components/MessageInput'
import Messages from '@/components/Messages'
import { FC } from 'react'

type PageProps = {
	params: {
		id: string
	}
}

const Page: FC<PageProps> = ({ params: { id } }) => {
	return (
		<div className='h-[80%] w-full m-2 p-5 bg-white shadow-lg shadow-white rounded-lg flex flex-col gap-3'>
			<Messages roomID={id} />
			<MessageInput roomID={id} />
		</div>
	)
}

export default Page
