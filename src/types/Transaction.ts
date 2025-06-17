export interface Transaction {
  id: string;
  amount: number;
  status: "success" | "pending" | "failed";
  date: string;
}
