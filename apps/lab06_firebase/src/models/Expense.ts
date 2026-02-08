import { Timestamp } from "firebase/firestore";

export interface Expense {
    id: string;
    title: string;
    amount: number;
    type: 'Revenue' | 'Expense';
    category: string;
    createAt: Date;
    note?: string;
}

export type ExpenseInput = Omit<Expense, 'id' | 'createAt'>;

export type ExpenseCategory = 'Food' | 'Travel' | 'Shopping' | 'Bills' | 'Other';