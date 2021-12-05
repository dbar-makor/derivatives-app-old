import { configure, shallow, ShallowWrapper } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import HistoryTable from "./historyTable";

configure({ adapter: new Adapter() });

describe("<HistoryTable>", () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<HistoryTable></HistoryTable>);
  });

  it("mounts without crashing", () => {
    wrapper.unmount();
  });
});
