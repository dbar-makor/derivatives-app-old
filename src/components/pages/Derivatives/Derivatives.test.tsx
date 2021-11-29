import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Derivatives from './Derivatives';

configure({ adapter: new Adapter() });

describe('<Derivatives>', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Derivatives></Derivatives>
    );
  });

  it('mounts without crashing', () => {
    wrapper.unmount();
  });
});
