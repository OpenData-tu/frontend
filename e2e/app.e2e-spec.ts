import { CloudDemoPage } from './app.po';

describe('cloud-demo App', () => {
  let page: CloudDemoPage;

  beforeEach(() => {
    page = new CloudDemoPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
