

import { UserService } from "@/services/user-service";
import { initializeTransactions } from "./fetch-transaction";
import { initializeIncomes } from "./fetch-incomes";
import { initializeExpenses } from "./fetch-expenses";

const userService = new UserService();

export function initializeUsers() {
  return userService.initialize();
}

export const loadAllDataFromUser = (userId: number) => {
  initializeTransactions(userId);
  initializeIncomes(userId);
  initializeExpenses(userId);
}
