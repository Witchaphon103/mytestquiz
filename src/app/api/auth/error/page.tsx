"use client";
import { Typography, Stack, TextField, Button, List, ListItem, ListItemText } from "@mui/material";
import React, { FormEvent } from "react";

interface Transaction {
  amount: number;
  date: string;
  type: "income" | "expense";
  notes: string;
}

export default function TransactionsPage() {
  const [transactionData, setTransactionData] = React.useState<Transaction>({
    amount: 0,
    date: "",
    type: "income",
    notes: "",
  });
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);

  const handleTransactionSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTransactions([...transactions, transactionData]);
    setTransactionData({ amount: 0, date: "", type: "income", notes: "" });
  };

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const netTotal = totalIncome - totalExpense;

  return (
    <>
      <Typography variant="h1">การทำธุรกรรม
      </Typography>
      <form onSubmit={handleTransactionSubmit}>
        <Stack spacing={2}>
          <TextField
            type="number"
            label="จำนวน"
            value={transactionData.amount}
            onChange={(e) => setTransactionData({ ...transactionData, amount: Number(e.target.value) })}
            required
          />
          <TextField
            type="date"
            label="วันที่"
            value={transactionData.date}
            onChange={(e) => setTransactionData({ ...transactionData, date: e.target.value })}
            required
          />
          <TextField
            label="ข้อความฝาก"
            value={transactionData.notes}
            onChange={(e) => setTransactionData({ ...transactionData, notes: e.target.value })}
          />
          <select
            value={transactionData.type}
            onChange={(e) => setTransactionData({ ...transactionData, type: e.target.value as "income" | "expense" })}
          >
            <option value="income">รับ</option>
            <option value="expense">จ่าย</option>
          </select>
          <Button type="submit">เพิ่ม</Button>
        </Stack>
      </form>

      <Typography variant="h2">รายการ</Typography>
      <List>
        {transactions.map((transaction, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`${transaction.type === "income" ? "+" : "-"} ${transaction.amount}`}
              secondary={`${transaction.date} - ${transaction.notes}`}
            />
          </ListItem>
        ))}
      </List>

      <Typography variant="h3">รายรับ : {totalIncome}</Typography>
      <Typography variant="h3">รายจ่าย : {totalExpense}</Typography>
      <Typography variant="h3">ยอดรวมสุทธิ : {netTotal}</Typography>
    </>
  );
}
