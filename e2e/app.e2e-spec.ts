import { NgInitiativePage } from './app.po';

describe('ng-initiative App', () => {
  let page: NgInitiativePage;

  beforeEach(() => {
    page = new NgInitiativePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
