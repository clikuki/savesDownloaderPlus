const fetch = require('node-fetch');
const fs = require('fs');

module.exports = async (url, path) => {
	const res = await fetch(url);
	const fileStream = fs.createWriteStream(path);

	await new Promise((resolve, reject) => {
		res.body.pipe(fileStream);
		res.body.on("error", reject);
		fileStream.on("finish", resolve);
	});
};