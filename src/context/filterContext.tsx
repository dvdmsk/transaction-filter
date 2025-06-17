import { Transaction } from "../types/Transaction";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

//Context for saving filter params
export type SortOrder = "asc" | "desc";

export interface TransactionFilter {
  amountFrom?: number;
  amountTo?: number;
  status?: Transaction["status"] & undefined;
  dateSortOrder?: SortOrder;
  amountSortOrder?: SortOrder;
}

interface TransactionFilterType {
  filter: TransactionFilter;
  setFilter: (newFilter: Partial<TransactionFilter>) => void;
  resetFilter: () => void;
}

const defaultFilter: TransactionFilter = {
  amountFrom: undefined,
  amountTo: undefined,
  status: undefined,
  dateSortOrder: "asc",
  amountSortOrder: "asc",
};

const FilterContext = createContext<
  TransactionFilterType | undefined
>(undefined);

export const TransactionFilterProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [filter, setFilterState] = useState<TransactionFilter>(defaultFilter);

  const setFilter = (newFilter: Partial<TransactionFilter>) => {
    setFilterState((prev) => ({ ...prev, ...newFilter }));
  };

  const resetFilter = () => setFilterState(defaultFilter);

  return (
    <FilterContext.Provider
      value={{ filter, setFilter, resetFilter }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useTransactionFilter = (): TransactionFilterType => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error(
      "useTransactionFilter must be used within a TransactionFilterProvider"
    );
  }
  return context;
};
