import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import TransactionTable from "./conponents/TransactionTable/TransactionTable";
import { transactions as allTransactions } from "./api/api";
import { Button } from "react-bootstrap";
import Controls from "./conponents/Controls/Controls";
import {
  TransactionFilterProvider,
  useTransactionFilter,
} from "./context/filterContext";
import { useSearchParams } from "react-router-dom";
import { Transaction } from "./types/Transaction";

// The application consists of a table component, a status dropdown component,
// a context to store the current user input. When changing the filtering parameters,
// they first enter the context. Then, if the user clicks "apply", the URL address is
// changed and filtering occurs in the useEffect in App.tsx
function App() {
  const { filter } = useTransactionFilter();

  const [searchParams] = useSearchParams();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const prevSortAmount = useRef<string | null>(null);
  const prevSortDate = useRef<string | null>(null);

  //sorting and filtering logic
  useEffect(() => {
    const sortAmount = searchParams.get("sortAmount") as "asc" | "desc" | null;
    const sortDate = searchParams.get("sortDate") as "asc" | "desc" | null;

    const amountFrom = parseFloat(searchParams.get("amountFrom") || "");
    const amountTo = parseFloat(searchParams.get("amountTo") || "");
    const status = searchParams.get("status");

    let result = [...allTransactions];

    if (!isNaN(amountFrom)) {
      result = result.filter((t) => t.amount >= amountFrom);
    }

    if (!isNaN(amountTo)) {
      result = result.filter((t) => t.amount <= amountTo);
    }

    if (status && status !== "All") {
      result = result.filter((t) => t.status === status);
    }

    if (sortAmount && sortAmount !== prevSortAmount.current) {
      // If sortAmount has changed — sort by amount
      result.sort((a, b) =>
        sortAmount === "asc" ? a.amount - b.amount : b.amount - a.amount,
      );
    } else if (sortDate && sortDate !== prevSortDate.current) {
      // If sortAmount has not changed, but sortDate has changed — sort by date
      result.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortDate === "asc" ? dateA - dateB : dateB - dateA;
      });
    } else if (sortAmount) {
      // If sortAmount has not changed, but it is there, we still sort by amount
      result.sort((a, b) =>
        sortAmount === "asc" ? a.amount - b.amount : b.amount - a.amount,
      );
    } else if (sortDate) {
      // If sortDate exists, but sortAmount has not changed, sort by date
      result.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortDate === "asc" ? dateA - dateB : dateB - dateA;
      });
    }
    // Updating previous values
    prevSortAmount.current = sortAmount;
    prevSortDate.current = sortDate;

    setTransactions(result);
  }, [searchParams]);

  return (
    <div className="App">
      <div className="container">
        <Controls />
        <TransactionTable transactions={transactions} />
      </div>
    </div>
  );
}

export default App;
