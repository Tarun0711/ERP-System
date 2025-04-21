import React from "react";
import { GoHome } from "react-icons/go";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import DashboardTabPanel1 from "./DashboardTabPanel1";

function InventoryHome() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="">
      <header
        className=" flex p-4 gap-2 items-center "
        style={{
          background:
            "url(https://static.vecteezy.com/system/resources/previews/019/805/858/large_2x/white-stucco-texture-background-suitable-for-presentation-backdrop-and-web-templates-with-space-for-text-photo.JPG)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "130px",
        }}
      >
        <p className="bg-white p-4 rounded-xl">
          <GoHome fontSize={30} />
        </p>
        <div>
          <h1 className="text-xl font-semibold">Hello , User</h1>
          <p className="text-sm ">Organization Name</p>
        </div>
      </header>
      <TabContext value={value}>
        <Box
          style={{
            background:
              "url(https://static.vecteezy.com/system/resources/previews/019/805/858/large_2x/white-stucco-texture-background-suitable-for-presentation-backdrop-and-web-templates-with-space-for-text-photo.JPG)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="DashBoard" value="1" />
            <Tab label="Announcements" value="2" />
            <Tab label="Recent Updates" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
        <DashboardTabPanel1/>
        </TabPanel>
        <TabPanel value="2">
          ! No Announcement yet
        </TabPanel>
        <TabPanel value="3">
        ! No Updates yet
        </TabPanel>
      </TabContext>
    </div>
  );
}

export default InventoryHome;
