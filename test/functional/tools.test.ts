import { Tool } from '@src/models/tool';

describe('Tools functional test', () => {
  beforeEach(async () => {
    await Tool.deleteMany({});
  });
  it('Should create a tool with success', async () => {
    const newTool = {
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

    const response = await global.testRequest.post('/tools').send(newTool);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(expect.objectContaining(newTool));
  });

  it('Should return 422 when there is a validation error', async () => {
    const newTool = {
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

    const response = await global.testRequest.post('/tools').send(newTool);
    expect(response.status).toBe(422);
    expect(response.body).toEqual({
      code: 422,
      error: 'Tool validation failed: title: Path `title` is required.',
    });
  });

  it('Should return 409 when the title already exists', async () => {
    const newTool = {
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

    await global.testRequest.post('/tools').send(newTool);
    const response = await global.testRequest.post('/tools').send(newTool);
    expect(response.status).toBe(409);
    expect(response.body).toEqual({
      code: 409,
      error: 'Tool validation failed: title: already exists in the database.',
    });
  });

  it('Should list all tools', async () => {
    const newTool = {
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

    await global.testRequest.post('/tools').send(newTool);
    const response = await global.testRequest.get('/tools');
    expect(response.status).toBe(200);
    const id = response.body[0].id;
    expect(response.body).toEqual([
      {
        id: id,
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
      },
    ]);
  });
});
