const jade = require('jade'),
	fs = require('fs');

module.exports = function(req, res){
	res.render = function(source, data){
		res.end(jade.compile(source)(data));
	};
	res.renderTemplate = function(sourcePath, data){
		return new Promise((resolve, reject) => {
			fs.readFile(sourcePath, (err, source) => {
				if(err){
					return reject(err);
				}
				res.render(source, data);
				resolve();
			});
		});
	};
};
