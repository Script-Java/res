import React, { useState, useEffect, useCallback } from "react";
import { Drawer, List, ListItem, CssBaseline, Toolbar, AppBar, Typography, Select, MenuItem, FormControl, InputLabel, IconButton, ThemeProvider, createTheme } from '@mui/material';
import { MdOutlineContrast } from "react-icons/md";
import { FaQuestion } from "react-icons/fa";
import axios from "axios";
import { Graph } from "./graph";
import SimpleLineChart from "./line";

const drawerWidth = 240;

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export const SidebarComp = () => {
  const [optimization, setoptimization] = useState("");
  const [contengency, setcontengency] = useState("");
  const [graphData, setGraphData] = useState([]);
  const [chartData, setChartData] = useState({ x: [], y: [] });

  const securityHangleChange = useCallback(
    (event) => {
      const value = event.target.value;
      setoptimization(value);
      sendData({ optimization: value, contengency });
    },
    [contengency]
  );

  const contengencyHangleChange = useCallback(
    (event) => {
      const value = event.target.value;
      setcontengency(value);
      sendData({ optimization, contengency: value });
    },
    [optimization]
  );

  const sendData = useCallback(async (data) => {
    try {
      const res = await axios.post("http://localhost:5000/data", data, {
        headers: { "Content-Type": "application/json" },
      });
      setGraphData(res.data);
      console.log(graphData);
    } catch (error) {
      console.error("There was an error", error);
    }
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <div style={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
          }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              Resilient Entanglement
            </Typography>
            <IconButton color="inherit">
              <MdOutlineContrast />
            </IconButton>
            <IconButton color="inherit">
              <FaQuestion />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar />
          <div style={{ overflow: 'auto' }}>
            <List>
              <ListItem>
                <Typography variant="h6" noWrap component="div" sx={{ padding: '16px' }}>
                  Settings
                </Typography>
              </ListItem>
              <ListItem>
                <FormControl fullWidth>
                  <InputLabel>Optimization</InputLabel>
                  <Select
                    value={optimization}
                    onChange={securityHangleChange}
                    label="Optimization"
                  >
                    <MenuItem value="w-security">W-Security</MenuItem>
                    <MenuItem value="wo-security">WO-Security</MenuItem>
                  </Select>
                </FormControl>
              </ListItem>
              <ListItem>
                <FormControl fullWidth>
                  <InputLabel>Contengency</InputLabel>
                  <Select
                    value={contengency}
                    onChange={contengencyHangleChange}
                    label="Contengency"
                  >
                    <MenuItem value="ln7-8">ln7-8</MenuItem>
                    <MenuItem value="none">None</MenuItem>
                  </Select>
                </FormControl>
              </ListItem>
            </List>
          </div>
        </Drawer>
        <main style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', padding: '24px', marginLeft: `${drawerWidth}px` }}>
          <Toolbar />
          <div style={{ flex: 1 }}>
            <Graph graphData={graphData} setChartData={setChartData} />
          </div>
          <div style={{ padding: '24px', backgroundColor: '#303030', borderRadius: '8px', marginTop: '24px' }}>
            <Typography variant="h6" gutterBottom>
              Line Chart
            </Typography>
            <SimpleLineChart lineData={chartData} />
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default SidebarComp;
