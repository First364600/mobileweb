import { db } from '../firebase';
import { useIonRouter } from '@ionic/react';
import { 
    collection, 
    addDoc, 
    getDocs, 
    deleteDoc, 
    doc,
    updateDoc,
    Timestamp,
    query,
    orderBy,
    limit,
    getDoc
} from 'firebase/firestore';

import { Expense, ExpenseInput } from '../models/Expense';
import { queries } from '@testing-library/react';

const COLLECTION_NAME = 'expenses';

export const createExpense = async (expenseData: ExpenseInput) => {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...expenseData,
        createAt: Timestamp.now()
    });

    return docRef.id;
};


export const getExpenses = async (): Promise<Expense[]> => {
    const q = query(
        collection(db, COLLECTION_NAME),
        orderBy('createAt', 'desc')
    );

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => {
        const data = doc.data();
        
        return {
            id: doc.id,
            title: data.title,
            amount: data.amount,
            type: data.type,
            category: data.category,
            note: data.note || '',
            createAt: data.createAt?.toDate() || new Date()
        } as Expense;
    })
};

export const getExpenseById = async (id: string): Promise<Expense | null> => {
    try {
        const docRef = doc(db, COLLECTION_NAME, id);
        const docSanp = await getDoc(docRef);
        
        if (docSanp.exists()) {
            return {
                id: docSanp.id,
                ...docSanp.data(),
                createAt: docSanp.data().createAt?.toDate() || new Date()
            } as Expense;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }

    
}

export const deleteExpense = async (id: string) => {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
};

export const updateExpense = async (id: string, data: Partial<ExpenseInput>) => {
    await updateDoc(doc(db, COLLECTION_NAME, id), data);
};