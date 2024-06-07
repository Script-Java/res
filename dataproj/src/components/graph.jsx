import React, { useEffect, useRef, useState } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import { stylesheet } from "./style";

export const Graph = (props) => {
  const { graphData, setChartData } = props;
  const graph_full_json = props.graphData;
  console.log(graph_full_json);
  const staticBuses = graph_full_json?.buses_injection_timeseries || [];
  const generationProduction =
    graph_full_json?.generation_production_timeseries || [];
  const linesFromTimeseries = graph_full_json?.lines_from_timeseries || [];
  const linesToTimeseries = graph_full_json?.lines_to_timeseries || [];
  const loadsTimeseries = graph_full_json?.loads_timeseries || [];
  const postCtgFlow = graph_full_json?.post_ctg_flow || [];
  const transformersFromTimeseries =
    graph_full_json?.transformers_from_timeseries || [];
  const transformersToTimeseries =
    graph_full_json?.transformers_to_timeseries || [];

  const [busInjection, setBusInjection] = useState([]);
  const [generations, setGenerations] = useState([]);
  const [linesFrom, setLinesFrom] = useState([]);
  const [linesTo, setLinesTo] = useState([]);
  const [loadTimes, setLoadTimes] = useState([]);
  const [transFrom, setTransFrom] = useState([]);
  const [transTo, setTransTo] = useState([]);
  const [postCtg, setPostCtg] = useState([]);

  const cyRef = useRef(null);

  // Use useEffect to set busInjection once when staticBuses changes
  useEffect(() => {
    if (staticBuses.length > 0) {
      setBusInjection(staticBuses);
    }
    if (generationProduction.length > 0) {
      setGenerations(generationProduction);
    }
    if (linesFromTimeseries.length > 0) {
      setLinesFrom(linesFromTimeseries);
    }
    if (linesToTimeseries.length > 0) {
      setLinesTo(linesToTimeseries);
    }
    if (loadsTimeseries.length > 0) {
      setLoadTimes(loadsTimeseries);
    }
    if (postCtgFlow.length > 0) {
      setPostCtg(postCtgFlow);
    }
    if (transformersFromTimeseries.length > 0) {
      setTransFrom(transformersFromTimeseries);
    }
    if (transformersToTimeseries.length > 0) {
      setTransTo(transformersToTimeseries);
    }
  }, [
    staticBuses,
    generationProduction,
    linesFromTimeseries,
    linesToTimeseries,
    loadsTimeseries,
    postCtgFlow,
    transformersFromTimeseries,
    transformersToTimeseries,
  ]);

  const [elementData] = useState([
    {
      data: { id: "b1", label: "Bus" },
      position: { x: 0, y: 0 },
      classes: "bus",
    },
    {
      data: { id: "b2", label: "Bus" },
      position: { x: -200, y: 300 },
      classes: "bus",
    },
    {
      data: { id: "b3", label: "Bus" },
      position: { x: 200, y: 300 },
      classes: "bus",
    },
    {
      data: { id: "b4", label: "Bus" },
      position: { x: 0, y: 100 },
      classes: "bus",
    },
    {
      data: { id: "b5", label: "Bus" },
      position: { x: -100, y: 200 },
      classes: "bus",
    },
    {
      data: { id: "b6", label: "Bus" },
      position: { x: 100, y: 200 },
      classes: "bus",
    },
    {
      data: { id: "b7", label: "Bus" },
      position: { x: -100, y: 300 },
      classes: "bus",
    },
    {
      data: { id: "b8", label: "Bus" },
      position: { x: 0, y: 300 },
      classes: "bus",
    },
    {
      data: { id: "b9", label: "Bus" },
      position: { x: 100, y: 300 },
      classes: "bus",
    },
    {
      data: { id: "xf1-4", label: "xf1-4" },
      position: { x: 0, y: 50 },
      classes: "trans",
    },
    {
      data: { id: "xf2-7", label: "xf2-7" },
      position: { x: -150, y: 300 },
      classes: "trans",
    },
    {
      data: { id: "xf9-3", label: "xf9-3" },
      position: { x: 150, y: 300 },
      classes: "trans",
    },
    {
      data: {
        source: "b1",
        target: "xf1-4",
        label: "Edge from Node1 to Node2",
      },
    },
    {
      data: {
        source: "xf1-4",
        target: "b4",
        label: "Edge from Node1 to Node2",
      },
    },
    {
      data: {
        source: "b2",
        target: "xf2-7",
        label: "Edge from Node1 to Node2",
      },
    },
    {
      data: {
        source: "xf2-7",
        target: "b7",
        label: "Edge from Node1 to Node2",
      },
    },
    {
      data: {
        source: "b9",
        target: "xf9-3",
        label: "Edge from Node1 to Node2",
      },
    },
    {
      data: {
        source: "xf9-3",
        target: "b3",
        label: "Edge from Node1 to Node2",
      },
    },
    {
      data: { id: "Gn1", label: "Nuclear" },
      position: { x: 0, y: -100 },
      classes: "nuclear",
    },
    {
      data: { id: "Gn2", label: "Gas" },
      position: { x: -300, y: 300 },
      classes: "gas",
    },
    {
      data: { id: "Gn3", label: "Wind" },
      position: { x: 300, y: 300 },
      classes: "wind",
    },
    {
      data: { id: "l1", label: "Load" },
      position: { x: -200, y: 200 },
      classes: "loads",
    },
    {
      data: { id: "l2", label: "Load" },
      position: { x: 200, y: 200 },
      classes: "loads",
    },
    { data: { source: "l1", target: "b5", label: "Edge from Node1 to Node2" } },
    { data: { source: "l2", target: "b6", label: "Edge from Node1 to Node2" } },
    { data: { source: "b4", target: "b5", label: "Edge from Node1 to Node2" } },
    { data: { source: "b6", target: "b4", label: "Edge from Node1 to Node2" } },
    { data: { source: "b6", target: "b9", label: "Edge from Node1 to Node2" } },
    { data: { source: "b5", target: "b7", label: "Edge from Node1 to Node2" } },
    { data: { source: "b7", target: "b8", label: "Edge from Node1 to Node2" } },
    { data: { source: "b8", target: "b9", label: "Edge from Node1 to Node2" } },
    {
      data: { source: "Gn1", target: "b1", label: "Edge from Node1 to Node2" },
    },
    {
      data: { source: "Gn2", target: "b2", label: "Edge from Node1 to Node2" },
    },
    {
      data: { source: "Gn3", target: "b3", label: "Edge from Node1 to Node2" },
    },
  ]);

  useEffect(() => {
    const cy = cyRef.current;
    if (cy) {
      const handleNodeTap = (evt) => {
        const node = evt.target;
        const node_id = node.id();

        if (node_id.startsWith("b")) {
          const busses_y = [];
          const busses_x = [];
          const b_id = node_id.substring(1);

          busInjection.forEach((entry) => {
            console.log(entry);
            const busData = entry[b_id];
            if (busData !== undefined) {
              busses_y.push(busData);
            }
            const snapshot = entry["snapshot"];
            if (snapshot !== undefined) {
              busses_x.push(snapshot);
            }
          });
          setChartData({ x: busses_x, y: busses_y });
        } else if (node_id.startsWith("l")) {
          const load_y = [];
          const load_x = [];
          const l_id = node_id.substring(1);

          loadTimes.forEach((entry) => {
            const loadData = entry[l_id];
            if (loadData !== undefined) {
              load_y.push(loadData);
            }
            const snapshot = entry["snapshot"];
            if (snapshot !== undefined) {
              load_x.push(snapshot);
            }
          });
          setChartData({ x: load_x, y: load_y });
        } else if (node_id.startsWith("xf")) {
          const trans_y = [];
          const trans_x = [];
          const t_id = node_id;
          transFrom.forEach((entry) => {
            const transData = entry[t_id];
            if (transData !== undefined) {
              trans_y.push(transData);
            }
            const snapshot = entry["snapshot"];
            if (snapshot !== undefined) {
              trans_x.push(snapshot);
            }
          });
          setChartData({ x: trans_x, y: trans_y });
        } else {
          const gen_y = [];
          const gen_x = [];
          const g_id = node_id;
          generations.forEach((entry) => {
            const genData = entry[g_id];
            if (genData !== undefined) {
              gen_y.push(genData);
            }
            const snapshot = entry["snapshot"];
            if (genData !== undefined) {
              gen_x.push(snapshot);
            }
          });
          setChartData({ x: gen_x, y: gen_y });
        }
      };

      cy.on("tap", "node", handleNodeTap);

      // Cleanup event listener on component unmount
      return () => {
        cy.off("tap", "node", handleNodeTap);
      };
    }
  }, [busInjection, transFrom, generations, loadTimes, setChartData]); // Only re-run this effect if busInjection changes

  return (
    <div className="">
      <div className="">
        <CytoscapeComponent
          className=""
          elements={elementData}
          style={{ width: "1200px", height: "800px" }}
          minZoom={0.5}
          maxZoom={2.0}
          wheelSensitivity={0.2}
          autoungrabify={true}
          stylesheet={stylesheet} // Prevent nodes from being moved by user
          cy={(cy) => {
            cyRef.current = cy;
          }}
        />
      </div>
    </div>
  );
};
