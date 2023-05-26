import { app } from '@/pages/_app'
import {
	FirebaseStorage,
	StorageReference,
	getStorage,
	ref,
	getStream,
	uploadBytes,
	getDownloadURL,
} from 'firebase/storage'

export const getVideoStorage = (): FirebaseStorage => {
	return getStorage(app, 'gs://erik-dev-uploaded-videos')
}

export const getVideoRef = (filePath: string): StorageReference => {
	return ref(getVideoStorage(), filePath)
}

export const uploadVideoArray = async (filePath: string, videoBuffer: Uint8Array) => {
	const metadata = {
		contentType: 'video/mp4',
	}

	return uploadBytes(getVideoRef(filePath), videoBuffer, metadata).then((snapshot) => getDownloadURL(snapshot.ref))
}
