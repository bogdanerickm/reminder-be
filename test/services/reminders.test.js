const app = require('../../src/app');

describe('\'reminders\' service', () => {
  it('registered the service', () => {
    const service = app.service('reminders');
    expect(service).toBeTruthy();
  });
});
