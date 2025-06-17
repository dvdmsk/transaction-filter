import React, { useEffect, useState } from "react";
import { Transaction } from "../../types/Transaction";
import styles from "./TransactionTable.module.scss";
// import { Button } from 'react-bootstrap';
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faAngleDown,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from "react-router-dom";

type Props = {
  transactions: Transaction[];
};

const TransactionTable: React.FC<Props> = ({ transactions }) => {
  const [isMobile, setIsMobile] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const [amountSort, setAmountSort] = useState<"asc" | "desc" | null>(null);
  const [dateSort, setDateSort] = useState<"asc" | "desc" | null>(null);

  useEffect(() => {
    //if there is already something in the url, it is filled with the values ​​in the address
    const sortAmountParam = searchParams.get("sortAmount");
    const sortDateParam = searchParams.get("sortDate");

    if (sortAmountParam === "asc" || sortAmountParam === "desc") {
      setAmountSort(sortAmountParam);
    }

    if (sortDateParam === "asc" || sortDateParam === "desc") {
      setDateSort(sortDateParam);
    }

    //I determine what screen size
    const handleResize = () => setIsMobile(window.innerWidth < 480);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Changing the date and amount sort options causes the table to redraw
  const handleSortChange = (
    key: "amount" | "date",
    direction: "asc" | "desc",
  ) => {
    const newParams = new URLSearchParams(searchParams);

    if (key === "amount") {
      setAmountSort(direction);
      newParams.set("sortAmount", direction);
    } else if (key === "date") {
      setDateSort(direction);
      newParams.set("sortDate", direction);
    }

    setSearchParams(newParams);
  };

  //TransactionMobile - separate rendering for mobile, table for tablet and desktop
  return isMobile ? (
    <div className={styles.TransactionMobile}>
      <table>
        <thead>
          <tr>
            <th className={styles.Transaction__head}>
              Amount
              <div className={styles.Transaction__sort}>
                <FontAwesomeIcon
                  icon={faAngleUp}
                  onClick={() => handleSortChange("amount", "asc")}
                  className={classNames({
                    [styles.Transaction__sort_open]: amountSort === "asc",
                  })}
                />
                <FontAwesomeIcon
                  icon={faAngleDown}
                  onClick={() => handleSortChange("amount", "desc")}
                  className={classNames({
                    [styles.Transaction__sort_open]: amountSort === "desc",
                  })}
                />
              </div>
            </th>

            <th className={styles.Transaction__head}>
              Date
              <div className={styles.Transaction__sort}>
                <FontAwesomeIcon
                  icon={faAngleUp}
                  onClick={() => handleSortChange("date", "asc")}
                  className={classNames({
                    [styles.Transaction__sort_open]: dateSort === "asc",
                  })}
                />
                <FontAwesomeIcon
                  icon={faAngleDown}
                  onClick={() => handleSortChange("date", "desc")}
                  className={classNames({
                    [styles.Transaction__sort_open]: dateSort === "desc",
                  })}
                />
              </div>
            </th>
          </tr>
        </thead>
      </table>
      {transactions.map((t) => (
        <div key={t.id} className={styles.TransactionMobile__card}>
          <div>
            <strong>Id:</strong> {t.id}
          </div>
          <div>
            <strong>Amount: </strong> {t.amount}
          </div>
          <div>
            <strong>Status:</strong> {t.status}
          </div>
          <div>
            <strong>Date:</strong> {t.date}
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="table-responsive">
      <table className={classNames("table table-hover", styles.Transaction)}>
        <thead>
          <tr>
            <th>Id</th>
            <th className={styles.Transaction__head}>
              Amount
              <div className={styles.Transaction__sort}>
                <FontAwesomeIcon
                  icon={faAngleUp}
                  onClick={() => handleSortChange("amount", "asc")}
                  className={classNames({
                    [styles.Transaction__sort_open]: amountSort === "asc",
                  })}
                />
                <FontAwesomeIcon
                  icon={faAngleDown}
                  onClick={() => handleSortChange("amount", "desc")}
                  className={classNames({
                    [styles.Transaction__sort_open]: amountSort === "desc",
                  })}
                />
              </div>
            </th>
            <th>Status</th>
            <th className={styles.Transaction__head}>
              Date
              <div className={styles.Transaction__sort}>
                <FontAwesomeIcon
                  icon={faAngleUp}
                  onClick={() => handleSortChange("date", "asc")}
                  className={classNames({
                    [styles.Transaction__sort_open]: dateSort === "asc",
                  })}
                />
                <FontAwesomeIcon
                  icon={faAngleDown}
                  onClick={() => handleSortChange("date", "desc")}
                  className={classNames({
                    [styles.Transaction__sort_open]: dateSort === "desc",
                  })}
                />
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.amount}</td>
              <td>{t.status}</td>
              <td>{new Date(t.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
