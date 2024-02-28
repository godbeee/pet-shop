import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

function TabCustom() {
  return (
    <>
      <Tabs className={"mt-2"}>
        <TabList>
          <Tab>Detail</Tab>
          <Tab>Comment</Tab>
        </TabList>

        <TabPanel className={"px-3"}>
          <p style={{ fontSize: "1.2rem", lineHeight: "1.7" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </TabPanel>
        <TabPanel className={"px-3"}>
          <p>comment</p>
        </TabPanel>
      </Tabs>
    </>
  );
}

export default TabCustom;
