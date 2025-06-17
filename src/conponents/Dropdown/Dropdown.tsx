import React, { useState } from "react";
import { useTransactionFilter } from "../../context/filterContext";
import { Transaction } from "../../types/Transaction";

//drop-down list with statuses
const Dropdown = () => {
  const [isStatusList, setIsStatusList] = useState(false);
  const { filter, setFilter } = useTransactionFilter();
  const { status } = filter;

  const handleChange = (status_: string | undefined) => {
    setIsStatusList(false);
    setFilter({ status: status_ as Transaction["status"] & undefined});
  };

  const correctedStatus = (status) ? String(status).charAt(0).toUpperCase() + String(status).slice(1) : 'All';
  return (
    <div className="dropdown w-100 position-relative">
      <button
        className="btn btn-primary w-100 dropdown-toggle d-flex justify-content-between align-items-center"
        type="button"
        onClick={() => setIsStatusList((prev) => !prev)}
      >
        <span>{correctedStatus}</span>
        <span
          className={`ms-2 transition ${isStatusList ? "rotate-180" : ""}`}
          style={{ transition: "transform 0.2s" }}
        ></span>
      </button>

      {isStatusList && (
        <div className="dropdown-menu show w-100 position-absolute mt-1">
          <button
            className="dropdown-item"
            onClick={() => handleChange('success')}
          >
            Success
          </button>
          <button
            className="dropdown-item"
           onClick={() => handleChange('pending')}
          >
            Pending
          </button>
          <button
            className="dropdown-item"
            onClick={() => handleChange('failed')}
          >
            Failed
          </button>

          <button
            className="dropdown-item"
            onClick={() => handleChange(undefined)}
          >
            All
          </button>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
