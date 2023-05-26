// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import youtubeDl from 'youtube-dl-exec'
import { uploadVideoArray } from '@/firebaseUtils/storage'

interface RequestData {
	youtubeURL: string
}

interface ResponseData {
	downloadURL: string
	title: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
	const reqData = req.body as RequestData

	let title = ''
	await new Promise((res, rej) => {
		youtubeDl(reqData.youtubeURL, {
			dumpSingleJson: true,
			noCheckCertificates: true,
			noWarnings: true,
			preferFreeFormats: true,
			skipDownload: true,
			addHeader: ['referer:youtube.com', 'user-agent:googlebot'],
		})
			.then((output) => {
				title = output.title
				res(null)
			})
			.catch(rej)
	})

	const bufs = [] as Buffer[]
	await new Promise((res, rej) => {
		const child = (youtubeDl as any).exec([`${reqData.youtubeURL}`, `-o`, `-`])
		child.stdout.on('data', (data: Buffer) => {
			bufs.push(data)
		})
		child.on('exit', res)
	})
		.then(async () => {
			const videoBuffer = Buffer.concat(bufs)
			const videoArray = new Uint8Array(videoBuffer)

			const downloadURL = await uploadVideoArray(`${title.replace(/[/\\?%*:|"<>]/g, '')}.mp4`, videoArray)
			res.status(200).json({ downloadURL, title })
		})
		.catch(() => {
			console.log('REJ')
		})
}
