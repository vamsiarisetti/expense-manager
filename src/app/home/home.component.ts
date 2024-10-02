import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MonthlyTransaction } from '../model/monthlyTransaction';
import { TransactionSummary } from '../model/transaction-summary';
import { Transactions } from '../model/transactions';
import { Trend } from '../model/trend';
import { TransactionService } from '../service/transaction.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  date1: Date = new Date();
  items = [{
    label: 'Vamsi Arisetti',
    items: [{
      label: 'Edit Account',
      icon: 'pi pi-user-edit',
      command: () => {
        this.editAccount();
      }
    },
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: () => {
        this.logout();
      }
    }
    ]
  }];
  value1: string = "income";
  stateOptions = [{ label: 'Income', value: 'income' }, { label: 'Expense', value: 'expense' }];
  //transactions = [1, 2, 3, 4, 5, 6];
  // incomeData = {
  //   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  //   datasets: [
  //     {
  //       label: 'Income',
  //       backgroundColor: '#FFA726',
  //       data: [28, 48, 40, 19, 86, 27, 90]
  //     }
  //   ]
  // };
  // expenseData = {
  //   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  //   datasets: [
  //     {
  //       label: 'Expense',
  //       backgroundColor: '#42A5F5',
  //       data: [65, 59, 80, 81, 56, 55, 40]
  //     }
  //   ]
  // };

  basicOptions = {
    plugins: {
      legend: {
        labels: {
          color: '#ebedef'
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#ebedef'
        },
        grid: {
          color: 'rgba(255,255,255,0.2)'
        }
      },
      y: {
        ticks: {
          color: '#ebedef'
        },
        grid: {
          color: 'rgba(255,255,255,0.2)'
        }
      }
    }
  };
//   data = {
//     labels: ['A','B','C', 'D'],
//     datasets: [
//         {
//             data: [300, 50, 100, 54],
//             // backgroundColor: [
//             //     "#FF6384",
//             //     "#36A2EB",
//             //     "#FFCE56"
//             // ],
//             // hoverBackgroundColor: [
//             //     "#FF6384",
//             //     "#36A2EB",
//             //     "#FFCE56"
//             // ]
//         }
//     ]
// };
chartOptions={
  plugins: {
    legend: {
        labels: {
            color: '#495057'
        }
    }
  }
}
  transactionData: MonthlyTransaction[] = [];
  currentDate: string | null | undefined ;
  transactionSummaryData: TransactionSummary | undefined;
  trendData: Trend[] = [];
  trendIncomeData = {};
  labels: string[] = [];
  units: number[] = [];
  trendExpenseData = {};
  expenseLabels: string[] = [];
  expenseUnits: number[] = [];
  categoryLabels: string[] = [];
  categoryExpense: number[] = [];
  categoryExpenseData = {};
  // transactionDatetoSave: Transactions = {
  //   transactionName: '',
  //   transactionType: '',
  //   transactionDate: '',
  //   transactionAmount: 0,
  //   transactionMonth: '',
  //   transactionCategory: '',
  //   transactionYear: ''
  // };

myForm: FormGroup ;
// userForm: FormGroup;
// Initialize form with controls

  constructor(private service: TransactionService,
    private datePipe: DatePipe,
    private fb: FormBuilder) {

      this.myForm = this.fb.group({
        transactionType: [null, Validators.required], // Select Button field (required)
        transactionCategory: ['', Validators.required],  // Input Text field (required)
        transactionsName: ['', Validators.required],  // Input Text field (required)
        transactionAmount: ['', Validators.required],  // Input Text field (required)
        transactinDate: ['', Validators.required]  // Input Text field (required)
      });

      /*this.userForm = this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]]
      });*/

    }


  // Check if the form is valid
  isFieldInvalid(field: string) {
    return this.myForm.get(field)?.invalid && this.myForm.get(field)?.touched;
  }

  /*onSubmit() {
    console.log(this.userForm.value);
  }*/

  onSubmit() {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    this.getMonthlyTransactionsData();
    this.currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.getMonthlyTransactionSummaryDate();
    this.getTrendSummaryData("income");
    this.getExpenseTrendData("expense");
    this.getCategoryExpensesData();
  }
  editAccount() {
  }
  logout() {
  }
  getMonthlyTransactionsData() {
    // TODO : get Month name from UI
    this.service.getMonthlyTransactions().subscribe({
      next: data => {
        this.transactionData = data;
      },
      error: error => {
        console.error("caught while fetching data from monthly transaction api", error);
      }
    })
  }
  getMonthlyTransactionSummaryDate() {
    this.service.getMonthlysummary().subscribe({
      next: data => {
        this.transactionSummaryData = data;
      },
      error: error => {
        console.error("caught while fetching data from transaction summary api", error);
      }
    })
  }
  getTrendSummaryData(trendType: string) {
    this.service.getTredSummary(trendType).subscribe({
      next: data => {
        //this.trendData = data;

        data.forEach(e => {
          this.labels.push(e.month);
          this.units.push(e.unit);
        })

        this.trendIncomeData = {
          // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          labels: this.labels,
          datasets: [
            {
              label: trendType,
              backgroundColor: '#FFA726',
              data: this.units
              // data: [28, 48, 40, 19, 86, 27, 90]
            }
          ]
        };

      },
      error: error => {
        console.error("caught while fetching data from trends api", error);
      }
    })
  }
  getExpenseTrendData(trendType: string) {
    this.service.getTredSummary(trendType).subscribe({
      next: data => {

        data.forEach(e => {
          this.expenseLabels.push(e.month);
          this.expenseUnits.push(e.unit);
        })

        this.trendExpenseData = {
          labels: this.expenseLabels,
          // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
            {
              label: 'Expense',
              backgroundColor: '#42A5F5',
              data: this.expenseUnits
              // data: [65, 59, 80, 81, 56, 55, 40]
            }
          ]
        };
      },
      error: error => {
        console.error("caught while fetching data from expense trends api", error);
      }
    })
  }
  getCategoryExpensesData() {
    this.service.getExpenseByCategory().subscribe({
      next: data => {

        data.forEach(e => {
          this.categoryLabels.push(e.transactionType);
          this.categoryExpense.push(e.totalTransactionAmount);
        })

        this.categoryExpenseData = {
          // labels: ['A','B','C', 'D'],
          labels: this.categoryLabels,
          datasets: [
              {
                data: this.categoryExpense
                // data: [300, 50, 100, 54]
              }
          ]
        };
      },
      error: error => {
        console.error("caught while fetching data from category expense api", error);
      }
    })
  }
  saveTransactionData(transactionDatetoSave: Transactions) {

    this.service.saveTransactions(transactionDatetoSave).subscribe({
      next: data => {
        console.log("Transaction Saved successfully for %s on %s", data.transactionName, data.transactionDate);
      },
      error: error => {
        console.error("caught while saving transaction", error);
      }
    })
  }

  addTransaction() {
    if (this.myForm.valid) {
      const myFormJson = JSON.parse(JSON.stringify(this.myForm.value));
      const date = new Date(myFormJson.transactinDate);
      // Get the month (Months are 0-indexed, so add 1)
      // const month = date.getMonth() + 1; // Adding 1 since getMonth() returns 0 for January, 1 for February, etc.

      const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'long' });
      const fullMonthName = monthFormatter.format(date);

      // Get the year
      const year = date.getFullYear();
      // console.log('Month:', fullMonthName);
      // console.log('Year:', year);

      const transactions: Transactions = {
        transactionName: myFormJson.transactionsName,
        transactionType: myFormJson.transactionType,
        transactionDate: myFormJson.transactinDate,
        transactionAmount: myFormJson.transactionAmount,
        transactionMonth: fullMonthName,
        transactionCategory: myFormJson.transactionCategory,
        transactionYear: year+''
      }

      this.saveTransactionData(transactions);
    } else {
      console.info('Form is invalid');
    }
  }

  clearform() {
    this.myForm.get('transactionCategory')?.reset('');
    this.myForm.get('transactionsName')?.reset('');
    this.myForm.get('transactionAmount')?.reset('');
    console.log('Cleared transaction category, name and amount');
  }
}
