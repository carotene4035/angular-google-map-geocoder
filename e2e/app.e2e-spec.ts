import { MapsPage } from './app.po';

describe('maps App', () => {
  let page: MapsPage;

  beforeEach(() => {
    page = new MapsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
