'use strict';

/* globals describe, it */
const jade = require('../index'),
	path = require('path'),
	assert = require('assert');

function runRender(source, data, send){
	let req = {},
		res = {send};

	jade(req, res);

	res.render(source, data);
}

function runRenderTemplate(sourcePath, data, send){
	let req = {},
		res = {send};

	jade(req, res);

	return res.renderTemplate(sourcePath, data);
}

describe('Render', () => {
	it('should compile Jade string', () => {
		runRender('#foo.bar #{data}', {data: 'Hello world!'}, text => {
			assert.equal(text, '<div id="foo" class="bar">Hello world!</div>');
		});
	});

	it('should throws if compilation fails', () => {
		assert.throws(() => {
			runRender('#foo.bar #{foo.bar}', {}, () => {});
		});
	});

	it('should compile Jade template', done => {
		runRenderTemplate(path.resolve(__dirname, 'test1.jade'), {data: 'Hello world!'}, text => {
			assert.equal(text, '<div id="foo" class="bar">Hello world!</div>');
			done();
		});
	});

	it('should catch error if template not found', done => {
		runRenderTemplate(path.resolve(__dirname, 'untitled.jade'), {data: 'Hello world!'}, () => {})
			.then(() => {
				assert.fail();
			})
			.catch(() => {
				done();
			});
	});
});
