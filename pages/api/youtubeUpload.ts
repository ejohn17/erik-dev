// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import youtubeDl from 'youtube-dl-exec'
import fs from 'fs'
import stream from 'stream'

interface RequestData {
	youtubeURL: string
}

type Data = {
	youtubeDoc: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	console.log('YOUTUBE UPLOAD!', req.body)
	const reqData = req.body as RequestData

	youtubeDl(reqData.youtubeURL, {
		dumpSingleJson: true,
		noCheckCertificates: true,
		noWarnings: true,
		preferFreeFormats: true,
		addHeader: ['referer:youtube.com', 'user-agent:googlebot'],
	}).then((output) => {
		// console.log('OUTPUT!', output)
		console.log('DURATION', output.duration)
		console.log('THUMBNAIL', output.thumbnail)
		console.log('TITLE', output.title)
	})

	const child = youtubeDl.exec(reqData.youtubeURL)
	const outputVideo = new stream.Transform()

	child.stdout?.on('data', (data) => {
		outputVideo.push(data)
	})

	res.status(200).json({ youtubeDoc: 'John Doe' })
}
