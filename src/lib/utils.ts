import { Expense, Income, Transaction } from "@/types/transaction";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalizeFirstLetter(str: string) {
  return str != null ? str.charAt(0).toUpperCase() + str.slice(1) : "";
}

export function getRandomArbitrary(
  min: number = 1000000,
  max: number = 99999999999999999
) {
  return Math.random() * (max - min) + min;
}

export function isExpense(transaction: Transaction): transaction is Expense {
  return (transaction as Expense).category === "expense";
}

export function isIncome(transaction: Transaction): transaction is Income {
  return (transaction as Income).category === "income";
}

export const getUserInitials = (name: string | undefined) => {
  if (!name) {
    return "";
  }

  name = name.trim();

  if (name.length <= 2) {
    return name;
  }

  return name
    .split(/\s+/)
    .map(w => w.charAt(0))
    .slice(0, 2)
    .join('');
}

export const formatDate = (date: string | undefined) => {
  if (!date) {
    return "";
  }

  return new Date(date).toLocaleString();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getNextId = (something: any[]): number => {
  let lastId = Math.max(...something.map(transaction => transaction.id));

  if (!lastId) {
    lastId = 1;
  } else {
    lastId += 1;
  }

  return lastId;
}