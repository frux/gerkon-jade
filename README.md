# gerkon-jade

```js
const jade = require('gerkon-jade');

app.use(jade);

// Render from string
app.get('/test1', function(req, res){
	res.render('jade string', {
		pageTitle: 'My page title'
	});
});

// Render from file
app.get('/test2', function(req, res){
	res.renderTemplate(__dirname + '/templates/index.jade', {
		pageTitle: 'My page title'
	})
		.then(() => {
			//Page rendered
		})
		.catch(err => {
			//Error happened
		});
});
```
