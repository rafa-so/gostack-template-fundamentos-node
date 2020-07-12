import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface ReturnBalanceTransactions {
  transactions: Transaction[];
  balance: Balance;
}

interface ObjectTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance;

  constructor() {
    this.transactions = [];
    this.balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };
  }

  public all(): ReturnBalanceTransactions {
    return {
      transactions: this.transactions,
      balance: this.getBalance(),
    };
  }

  public getBalance(): Balance {
    const incomeTotal = this.transactions
      .filter(transaction => transaction.type === 'income')
      .map(transaction => {
        return transaction.value;
      })
      .reduce((total, values): number => {
        return (total += values);
      }, 0);

    const outcomeTotal = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .map(transaction => {
        return transaction.value;
      })
      .reduce((total, values): number => {
        return (total += values);
      }, 0);

    const total = incomeTotal - outcomeTotal;

    this.balance = {
      income: incomeTotal,
      outcome: outcomeTotal,
      total,
    };

    return this.balance;
  }

  public create({ title, value, type }: ObjectTransaction): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
