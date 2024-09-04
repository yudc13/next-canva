import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';

const f = createUploadthing();

const auth = async (req: Request) => ({id: 'fakeId'}); // Fake auth function

export const ourFileRouter = {
	imageUploader: f({image: {maxFileSize: '4MB'}})
		.middleware(async ({req}) => {
			const user = await auth(req);

			if (!user) throw new UploadThingError('Unauthorized');

			return {userId: user.id};
		})
		.onUploadComplete(async ({metadata, file}) => {
			console.log('file url', file.url);
			return {url: file.url};
		}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;