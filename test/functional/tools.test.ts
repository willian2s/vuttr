import { Tool } from '@src/models/tool';

describe('Tools functional test', () => {
  const defaultTool = {
    title: 'hotel',
    link: 'https://github.com/typicode/hotel',
    description:
      'Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.',
    tags: [
      'node',
      'organizing',
      'webapps',
      'domain',
      'developer',
      'https',
      'proxy',
    ],
  };

  beforeEach(async () => {
    await Tool.deleteMany({});
  });

  describe('When creating a new tool', () => {
    it('Should create a tool with success', async () => {
      const response = await global.testRequest
        .post('/tools')
        .send(defaultTool);
      expect(response.status).toBe(201);
      expect(response.body).toEqual(expect.objectContaining(defaultTool));
    });

    it('Should return 422 when there is a validation error', async () => {
      const wrongTool = {
        link: 'https://github.com/typicode/hotel',
        description:
          'Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.',
        tags: [
          'node',
          'organizing',
          'webapps',
          'domain',
          'developer',
          'https',
          'proxy',
        ],
      };

      const response = await global.testRequest.post('/tools').send(wrongTool);
      expect(response.status).toBe(422);
      expect(response.body).toEqual({
        code: 422,
        error: 'Tool validation failed: title: Path `title` is required.',
      });
    });

    it('Should return 409 when the title already exists', async () => {
      await global.testRequest.post('/tools').send(defaultTool);
      const response = await global.testRequest
        .post('/tools')
        .send(defaultTool);
      expect(response.status).toBe(409);
      expect(response.body).toEqual({
        code: 409,
        error: 'Tool validation failed: title: already exists in the database.',
      });
    });
  });

  describe('When listing tools', () => {
    beforeEach(async () => {
      await new Tool(defaultTool).save();
    });

    it('Should list all tools', async () => {
      const response = await global.testRequest.get('/tools');
      expect(response.status).toBe(200);
    });

    it('Should list all tools with the same tag', async () => {
      const response = await global.testRequest.get('/tools?tag=node');
      expect(response.status).toBe(200);
    });
  });

  describe('When deleting tools', () => {
    it('Should delete a tool with success', async () => {
      const createTool = await global.testRequest
        .post('/tools')
        .send(defaultTool);
      const id = createTool.body.id;
      const response = await global.testRequest.delete(`/tools/${id}`);
      expect(response.status).toBe(204);
    });
  });
});
