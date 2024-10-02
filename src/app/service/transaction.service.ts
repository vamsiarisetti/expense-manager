import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MonthlyTransaction } from '../model/monthlyTransaction';
import { Observable } from 'rxjs/internal/Observable';
import { TransactionSummary } from '../model/transaction-summary';
import { Trend } from '../model/trend';
import { CategoryExpense } from '../model/category-expense';
import { Transactions } from '../model/transactions';

@Injectable()
export class TransactionService {

  months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  monthName = this.months[new Date().getMonth()];
  fullYear = new Date().getFullYear();

  apiURL = 'http://localhost:8081/expenseapi/transactions/';
  expenseSummaryApiURL = 'http://localhost:8081/expenseapi/monthlySummary/';
  trendSummaryApiUrl = 'http://localhost:8081/expenseapi/trend/';
  categoryExpenseApiUrl = 'http://localhost:8081/expenseapi/category/expense/';
  saveTransactionsApiUrl = 'http://localhost:8081/expenseapi/save';
  constructor(private http: HttpClient) { }

  getMonthlyTransactions() :Observable<MonthlyTransaction[]> {
    console.log("About to hit monthly transactions API for ",this.monthName);

    return this.http.get<MonthlyTransaction[]>(this.apiURL+this.monthName)
  }

  getMonthlysummary() :Observable<TransactionSummary> {
    console.log("Fetching summary details for ", this.monthName);

    return this.http.get<TransactionSummary>(this.expenseSummaryApiURL+this.monthName +'/'+ this.fullYear);
  }

  getTredSummary(trendType: string) :Observable<Trend[]> {
    console.log("Fetching trend for ", trendType);

    return this.http.get<Trend[]>(this.trendSummaryApiUrl+trendType);
  }

  getExpenseByCategory() :Observable<CategoryExpense[]> {
    console.log("Fetching expenses by category for month {} and year {}", this.monthName, this.fullYear);

    return this.http.get<CategoryExpense[]>(this.categoryExpenseApiUrl+ this.monthName +'/'+ this.fullYear);
  }

  saveTransactions(transaction: Transactions) :Observable<Transactions> {
    console.log("Saving expenses ...");

    return this.http.post<Transactions>(this.saveTransactionsApiUrl, transaction);
  }
}
