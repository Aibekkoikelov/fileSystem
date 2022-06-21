const supertest = require('supertest');



describe('File endpoints Endpoints', () => {
	it('Get File by filename', async () => {
		const response = await supertest('http://localhost:3000').get('/file/aibek');
		expect(response.status).toEqual(200);
		expect(response.type).toEqual(expect.stringContaining('application/octet-stream'));
		expect(response.body).not.toBeNull();
	});
	it('not correct filename in params', async () => {
		const response = await supertest('http://localhost:3000').get('/file/aibe');
		expect(response.status).toEqual(400);
		expect(response.type).toEqual(expect.stringContaining('application/json'));
		expect(response.body).toBe('Нет такого файла');
	});



});