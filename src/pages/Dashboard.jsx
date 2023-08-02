import { useState } from "react";

// Data
import mockData from "../assets/data.json";
import timestamps from "../assets/timeStamps.json";

// Components
import Dropdown from "../component/dropdown/Dropdown";
import HeaderTitle from "../component/header-title/HeaderTitle";
import Search from "../component/search/Search";
import List from "../component/list/List";

// Styles
import styles from "./Dashboard.module.css";
import Card from "../component/card/Card";

const Dashboard = () => {
  const [currency, setCurrency] = useState("EUR");
  const [searchText, setSearchText] = useState("");

  // Variables for card population
  const [selectedOrderDetails, setSelectedOrderDetails] = useState({
    "buySellIndicator": "",
    "orderStatus": "",
    "orderType": ""
  });

  const [selectedOrderTimeStamps, setSelectedOrderTimeStamps] = useState({
    "orderReceived": "",
    "orderStatusUpdated": "",
    "orderSubmitted": ""
  });

  // search functionality function
  const [visibility, setVisibility] = useState(Array(mockData.results.length).fill(true));

  function searchFunction(value) {
    const searchedIn = mockData.results;
    const temprayArray = visibility;
    searchedIn.map((data, index) => {
      temprayArray[index] = (data["&id"]).includes(value);
      return true;
    })
    setVisibility(temprayArray);
  }

  // card population function
  function outsideClickHandle(event) {
    if (isNaN(parseInt(event.target.id))) {
      setSelectedOrderDetails({
        "buySellIndicator": "",
        "orderStatus": "",
        "orderType": ""
      });

      setSelectedOrderTimeStamps({
        "orderReceived": "",
        "orderStatusUpdated": "",
        "orderSubmitted": ""
      });
    }
  }

  const handleStateUpdate = (data) => {
    setSelectedOrderDetails(
      {
        "buySellIndicator": mockData.results[data].executionDetails.buySellIndicator,
        "orderStatus": mockData.results[data].executionDetails.orderStatus,
        "orderType": mockData.results[data].executionDetails.orderType
      }
    );
    setSelectedOrderTimeStamps({
      "orderReceived": timestamps.results[data].timestamps.orderReceived,
      "orderStatusUpdated": timestamps.results[data].timestamps.orderStatusUpdated,
      "orderSubmitted": timestamps.results[data].timestamps.orderSubmitted
    });
  };

  return (
    <div onClick={outsideClickHandle}>
      <div className={styles.header}>
        <HeaderTitle primaryTitle="Orders" secondaryTitle={mockData.results.length + " orders"} />
        <div className={styles.actionBox}>
          <Search
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              searchFunction(e.target.value);
            }}
          />
          <Dropdown
            options={["GBP", "USD", "JPY", "EUR"]}
            onChange={(e) => setCurrency(e.target.value)}
            selectedItem={currency}
          />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.section}>
          <Card
            cardData={selectedOrderDetails}
            title="Selected Order Details"
          />
          <Card
            cardData={selectedOrderTimeStamps}
            title="Selected Order Timestamps"
          />
        </div>
        <List rows={mockData.results} currency={currency} handleStateUpdate={handleStateUpdate} visibility={visibility} />
      </div>
    </div>
  );
};

export default Dashboard;
