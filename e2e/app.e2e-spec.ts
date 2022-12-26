import { FccVotingAppPage } from './app.po';

describe('fcc-voting-app App', () => {
  let page: FccVotingAppPage;

  beforeEach(() => {
    page = new FccVotingAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
