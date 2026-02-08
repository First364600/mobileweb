import { useState, useEffect, use} from 'react';
import { Expense } from '../models/Expense';
import { getExpenses } from '../services/expenseService';
import { refresh } from 'ionicons/icons';

export const useExpenses = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchExpenses = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getExpenses();
            setExpenses(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาด');
            console.error('Error fetching expenses:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    useEffect(() => {
        console.log('📊 Expenses loaded:', expenses);  // ✅ เพิ่มบรรทัดนี้
    }, [expenses]);

    return { expenses, loading, error, refetch: fetchExpenses};
};