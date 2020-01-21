import MuteToggle from '.';

test('it renders', () => {
  const component = new MuteToggle();

  expect(component.el.innerHTML).toContain('Find me in');
});
