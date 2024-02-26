import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

function TabCustom() {
  return (
    <>
      <Tabs style={{ borderBottom: "1px solid #B5C0D0" }} className={"mt-2"}>
        <TabList>
          <Tab>Detail</Tab>
          <Tab>Comment</Tab>
        </TabList>

        <TabPanel>
          <h2>detail</h2>
        </TabPanel>
        <TabPanel>
          <h2>comment</h2>
        </TabPanel>
      </Tabs>
    </>
  );
}

export default TabCustom;
