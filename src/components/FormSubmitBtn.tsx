import { FC } from 'react'
import { useFormStatus } from 'react-dom'

type Props = {
	defaultBtnTxt: string
	loadingBtnTxt: string
	className: string
}

const FromSubmitBtn: FC<Props> = ({
	defaultBtnTxt,
	loadingBtnTxt,
	className,
}) => {
	const { pending } = useFormStatus()

	return (
		<button
			type='submit'
			disabled={pending}
			className={className}
		>
			{pending ? loadingBtnTxt : defaultBtnTxt}
		</button>
	)
}

export default FromSubmitBtn
