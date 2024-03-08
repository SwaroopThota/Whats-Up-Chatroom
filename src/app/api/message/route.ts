import { pusherServer } from '@/lib/Pusher'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const sendMessageBody = z.object({
	message: z.string(),
	roomID: z.string(),
	userName: z.string(),
})

export async function POST(req: NextRequest) {
	const result = sendMessageBody.safeParse(await req.json())
	if (!result.success) {
		return NextResponse.json({ success: false })
	}
	const { roomID, message, userName } = result.data
	console.log(`Sending message (${message}) from ${userName} in ${roomID}.`)
	pusherServer.trigger(roomID, 'incoming-message', { message, userName })
	return NextResponse.json({ success: true })
}
