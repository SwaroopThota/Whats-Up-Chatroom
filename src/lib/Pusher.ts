import PusherServer from 'pusher'
import PusherClient from 'pusher-js'

export const pusherServer = new PusherServer({
	appId: process.env.PUSHER_APP_ID!,
	key: process.env.PUSHER_API_KEY!,
	secret: process.env.PUSHER_API_SECRET!,
	cluster: process.env.PUSHER_API_CLUSTER!,
	useTLS: true,
})

export const pusherClient = new PusherClient('cb03ea097f7bf6024f87', {
	cluster: 'ap2',
	authTransport: 'ajax',
})
