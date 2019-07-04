import { flex } from './flex';

describe('styles', () => {
  describe('flex', () => {

    it('returns the correct styles', () => {
      expect(flex).to.eql({ display: 'flex' });
      expect(flex.full).to.eql({ display: 'flex', flex: 'auto' });
      expect(flex.content).to.eql({ display: 'flex', flex: 'none' });
      expect(flex.content.stack).to.eql({ display: 'flex', flex: 'none', flexDirection: 'column' });
      expect(flex.content.wrap).to.eql({ display: 'flex', flex: 'none', flexDirection: 'row' });
    });

    it('aligns correctly with respect to direction', () => {
      expect(flex.content.wrap.align({ horizontal: 'center', vertical: 'flex-end' })).to.eql({
        display: 'flex',
        flex: 'none',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
      });
      expect(flex.content.stack.align({ horizontal: 'center', vertical: 'flex-end' })).to.eql({
        display: 'flex',
        flex: 'none',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
      });
    });

  });
});
