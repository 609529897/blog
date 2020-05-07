const redis = require('redis');
const { REDIS_CONF } = require('../conf/db');

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF);

redisClient.on('error', (error) => {
	console.log(error);
})

function set(key, val) {
	if (typeof val === "object") {
		val = JSON.stringify(val);
	}
	redisClient.set(key, val, redis.print);
}
function get(key) {
	const promise = new Promise((resolve, reject) => {
		redisClient.get(key, (err, val) => {
			if (err) {
				reject(err)
				return
			}
			if (val == null) {
				resolve(null);
				return
			}
			try {
				resolve(JSON.parse(val))
			} catch (ex) {
				resolve(val)
			}
			resolve(val);
		})
	});

	return promise;
}

module.exports = {
	set,
	get
}
