import {
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonDatetimeButton,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonSegment,
  IonSegmentButton,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonTitle,
  IonToolbar,
  useIonRouter
} from '@ionic/react';
import React, { use, useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc, updateDoc} from "firebase/firestore";
import './EditExpense.css';
import {
  closeOutline,
  pricetagOutline,
  gridOutline,
  createOutline,
  settings
} from 'ionicons/icons';
import { createExpense, updateExpense, getExpenseById } from '../services/expenseService';
import { ExpenseInput } from '../models/Expense';

const EditExpense: React.FC = () => {

  const router = useIonRouter();
  const { id } = useParams<{id: string}>();

  const [title, setTitle] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [type, setType] = useState<'Revenue' | 'Expense'>('Revenue');
  const [category, setCategory] = useState<string>('Food');
  const [note, setNote] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExpense = async () => {
      if (!id) {
        setError("ไม่พบ ID รายการ");
        setLoading(false);
        return;
      }

      try {
        console.log('loading expense:', id);
        const expense = await getExpenseById(id);

        if (expense) {
          setTitle(expense.title);
          setAmount(expense.amount.toString());
          setType(expense.type);
          setCategory(expense.category);
          console.log('expense loaded:', expense);
        } else {
          setError('ไม่พบรายการที่ต้องการแก้ไข');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchExpense();
  }, [id]);

  const handleSave = async () => {
    if (!title || !amount) {
      console.warn("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    if (!id) {
      alert('ไม่พบ ID รายการ');
      return;
    }
    console.log({ title, amount, type, category, note});
    
  
    try {
      await updateExpense(
        id, {
        title,
        amount: Number(amount),
        type,
        category,
        note 
      });
      
      router.push('/home');
    } catch (err) {
      console.error('Error saving expense:', err);
      alert("Error while saving expense");
    }
  } 
  const handleCancel = () => {
    console.log("cancel Clicked!!");
    router.push("/home");
  }

  return (
    <IonPage>
      <IonHeader translucent={true} className='ion-no-border'>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonButton color='medium' onClick={handleCancel}>
              <IonIcon slot='icon-only' icon={closeOutline}/>
            </IonButton>
          </IonButtons>
          <IonTitle>แก้ไขรายการ</IonTitle>
          <IonButtons slot='end'>
            <IonButton strong={true} color='primary' onClick={handleSave}>
              บันทึก
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className='ion-padding-vertical'>

        <div className='amount-container'>
          <IonLabel class='medium' style={{ fontSize: '1rem', marginBottom: '5px'}}>จำนวน</IonLabel>
          <div className={`amount-input-wrapper ${type === 'Revenue' ? 'text-green' : 'text-red'}`}>
            <span className='currency-symbol'>฿</span>
            <IonInput
              className='big-amount-input'
              value={amount}
              type='number'
              inputmode='decimal'
              placeholder='0'
              onIonChange={e => setAmount(e.detail.value!)}
            />
          </div>
        </div>

        <div className='ion-padding-horizontal ion-margin-bottom'>
          <IonSegment value={type} onIonChange={e => setType(e.detail.value as 'Revenue')} mode="ios">
            <IonSegmentButton value='Revenue'>
              <IonLabel color={type === 'Revenue' ? "success" : 'medium'}>รายรับ</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="Expense">
              <IonLabel color={type === 'Expense' ? "danger" : 'medium'}>รายจ่าย</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </div>

        <IonList inset={true} lines='full'>
          <IonItem>
            <IonIcon icon={createOutline} slot='start' color='medium'/>
            <IonInput
              label='ชื่อรายการ'
              labelPlacement='floating'
              value={title}
              onIonChange={e => setTitle(e.detail.value!)}
              placeholder='เช่น ค่าอาหาร, ค่ารถ'
              
            />
          </IonItem>

          <IonItem>
            <IonIcon icon={gridOutline} slot='start' color='medium'/>
            <IonSelect
              label='หมวดหมู่'
              labelPlacement='floating'
              value={category}
              onIonChange={e => setCategory(e.detail.value)}
              interface='action-sheet'
              placeholder='เลือกหมวดหมู่'
            >
              <IonSelectOption value="Food">อาหาร</IonSelectOption>
              <IonSelectOption value="Travel">การเดินทาง</IonSelectOption>
            </IonSelect>
          </IonItem>

          <IonItem lines='none'>
            <IonIcon icon={pricetagOutline} slot='start' color='medium'/>
            <IonTextarea
              label='หมายเหตุ'
              labelPlacement='floating'
              value={note}
              onIonChange={e => setNote(e.detail.value!)}
              placeholder='รายละเอียดสั้นๆ เพิ่มเติม'
              rows={1}
              autoGrow={true}
            />
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default EditExpense;