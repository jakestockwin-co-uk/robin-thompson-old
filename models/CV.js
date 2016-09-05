var keystone = require('keystone');
var Types = keystone.Field.Types;

var CV = new keystone.List('CV', {
	track: true,
});

var storage = new keystone.Storage({
	adapter: require('keystone-storage-adapter-s3'),
	s3: {
		path: process.env.S3_BUCKET,
		region: process.env.S3_REGION,
		headers: {
			'x-amz-acl': 'public-read',
		},
	},
	schema: {
		bucket: true, // optional; store the bucket the file was uploaded to in your db
		etag: true, // optional; store the etag for the resource
		path: true, // optional; store the path of the file in your db
		url: true, // optional; generate & store a public URL
	},
});

CV.add({
	name: { type: Types.Text, required: true, initial: true },
	CV: { type: Types.File, storage: storage },
});


CV.defaultColumns = 'name, updatedAt';
CV.defaultSort = '-updatedAt';
CV.register();
