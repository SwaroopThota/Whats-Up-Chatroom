'use client'
import { z } from 'zod'

export const UserSchema = z.object({
	name: z.string().min(3),
})

export type User = z.infer<typeof UserSchema>

const useCurrentUser = () => {
	const setCurrentUser = (user: User) => {
		if (user && window && localStorage) {
			console.log(window, localStorage)
			localStorage.setItem('Whatsup-Name', JSON.stringify(user))
			return user
		}
		return null
	}

	const getCurrentUser = () => {
		if (window && localStorage) {
			console.log(window, localStorage)
			const userJson = localStorage.getItem('Whatsup-Name') ?? ''
			if (userJson) {
				const parsedObj = UserSchema.safeParse(JSON.parse(userJson))
				if (parsedObj.success) {
					return parsedObj.data
				}
			}
		}
		return null
	}
	return { setCurrentUser, getCurrentUser }
}

export default useCurrentUser
