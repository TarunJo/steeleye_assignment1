import ListRow from "./ListRow";
import ListRowCell from "./ListRowCell";

import ListHeader from "./ListHeader";
import ListHeaderCell from "./ListHeaderCell";

import styles from "./List.module.css";
import time from "../../assets/timeStamps.json"
import data from "../../assets/data.json"

const List = ({ rows, currency, handleStateUpdate, visibility }) => {

  function handleClickevent(event) {
    handleStateUpdate(parseInt(event.target.id));
  }
  
  return (
    <table className={styles.container}>
      <thead>
        <ListHeader>
          <ListHeaderCell>Order ID</ListHeaderCell>
          <ListHeaderCell>Buy/Sell</ListHeaderCell>
          <ListHeaderCell>Country</ListHeaderCell>
          <ListHeaderCell>Order Submitted</ListHeaderCell>
          <ListHeaderCell>Order Volume / {currency}</ListHeaderCell>
        </ListHeader>
      </thead>
      <tbody onClick={handleClickevent}>
        {rows.map((row, ind) => (
          visibility[ind] && <ListRow key={ind}>
            <ListRowCell setKey={ind + ".1"}>{row["&id"]}</ListRowCell>
            <ListRowCell setKey={ind + ".2"}>{row.executionDetails.buySellIndicator}</ListRowCell>
            <ListRowCell setKey={ind + ".3"}>{row.executionDetails.orderStatus}</ListRowCell>
            <ListRowCell setKey={ind + ".4"}>
              {
                time.results[time.results.findIndex(item1 => {
                  return data.results.some(item2 => item2["&id"] === item1["&id"]);
                })].timestamps.orderSubmitted
              }
            </ListRowCell>
            <ListRowCell setKey={ind + ".5"}>{row.bestExecutionData.orderVolume[currency]}</ListRowCell>
          </ListRow>
        ))}
      </tbody>
    </table>
  );
};

export default List;
