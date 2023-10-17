// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { YoutubeSubtitle } from './youtubeUpload'
import { Translate } from '@google-cloud/translate/build/src/v2'

interface RequestData {
	language: string
	captions: YoutubeSubtitle[]
}

interface ResponseData {
	captions: YoutubeSubtitle[]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
	const reqData = req.body as RequestData

	try {
		const translate = new Translate()

		const translatedSubtitles = (await Promise.all(
			reqData.captions.map(async (caption) => {
				const [translatedText] = await translate.translate(caption.text, reqData.language)

				return {
					...caption,
					text: translatedText,
				}
			}),
		)) as YoutubeSubtitle[]

		res.status(200).json({ captions: translatedSubtitles })
	} catch (e) {
		console.log('Translation error: ', e)
		res.status(500).send(e)
	}
}
