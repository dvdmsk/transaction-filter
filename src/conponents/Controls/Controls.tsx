import React, { useState } from "react";
import styles from "./Controls.module.scss";
import classNames from "classnames";
import { useTransactionFilter } from "../../context/filterContext";
import Dropdown from "../Dropdown/Dropdown";
import { useSearchParams } from "react-router-dom";

const Controls: React.FC = () => {
  const [isStatusList, setIsStatusList] = useState(false);
  const { setFilter } = useTransactionFilter();
  const { filter } = useTransactionFilter();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChangeFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ amountFrom: +e.target.value });
  };

  const handleChangeTo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ amountTo: +e.target.value });
  };

  //Changing the url when we apply the rules
  const handleApply = () => {
    const newParams = new URLSearchParams(searchParams);

    if (filter.amountFrom !== undefined && !isNaN(filter.amountFrom)) {
      newParams.set("amountFrom", filter.amountFrom.toString());
    } else {
      newParams.delete("amountFrom");
    }

    if (filter.amountTo !== undefined && !isNaN(filter.amountTo)) {
      newParams.set("amountTo", filter.amountTo.toString());
    } else {
      newParams.delete("amountTo");
    }

    if (filter.status) {
      newParams.set("status", filter.status);
    } else {
      newParams.delete("status");
    }

    if (filter.dateSortOrder) {
      newParams.set("sortDate", filter.dateSortOrder.toLowerCase());
    } else {
      newParams.delete("sortDate");
    }

    if (filter.amountSortOrder) {
      newParams.set("sortAmaunt", filter.amountSortOrder.toLowerCase());
    } else {
      newParams.delete("sortAmaunt");
    }

    setSearchParams(newParams);
  };

  return (
    <div
      className={classNames(styles.Controls, "d-flex flex-wrap gap-3 w-100")}
    >
      <div className="flex-grow-1 col-12 col-md mb-3">
        <label htmlFor="statusSelect" className="form-label text-start w-100">
          Status:
        </label>

        <Dropdown />
      </div>

    {/*  inputs to change the value of the sum */}
      <div className="flex-grow-1 col-12 col-md mb-3">
        <label htmlFor="minAmount" className="form-label text-start w-100">
          Min Amount
        </label>
        <input
          type="number"
          className="form-control"
          id="minAmount"
          placeholder="0"
          onChange={handleChangeFrom}
        />
      </div>

      <div className="flex-grow-1 col-12 col-md mb-3">
        <label htmlFor="maxAmount" className="form-label text-start w-100">
          Max Amount
        </label>
        <input
          type="number"
          className="form-control"
          id="maxAmount"
          placeholder="1000"
          onChange={handleChangeTo}
        />
      </div>

      <div className="flex-grow-1  col-12 col-md mb-3">
        <button
          type="button"
          className="btn btn-outline-success w-100"
          onClick={handleApply}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default Controls;
