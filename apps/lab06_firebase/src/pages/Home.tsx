import { IonCol, useIonAlert, IonButtons, IonContent, IonFab, IonFabButton, IonFabList, IonGrid, IonHeader, IonIcon, IonItem, IonItemGroup, IonLabel, IonList, IonNote, IonPage, IonRow, IonSegment, IonSpinner, IonText, IonTitle, IonToast, IonToolbar, useIonViewDidEnter, IonModal, IonButton } from '@ionic/react';
import './Home.css';
import { add } from 'ionicons/icons';
import { useIonRouter, useIonViewWillEnter} from '@ionic/react';
import { useExpenses } from '../hooks/useExpenses';
import { getExpenses, deleteExpense} from '../services/expenseService';
import { useRef, useState } from 'react';
import { Expense } from '../models/Expense';
import { close } from 'ionicons/icons';

const Home: React.FC = () => {
  const router = useIonRouter();
  const { expenses, loading, error, refetch} = useExpenses();
  const lastRefetch = useRef<number>(0);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [presentAlert] = useIonAlert();
  const handleAdd = () => {

    router.push('/add-expense');
  };

  const totalRevenue = expenses.filter(expennse => expennse.type === 'Revenue').reduce((sum, item) => sum + item.amount, 0);
  const totalExpense = expenses.filter(expennse => expennse.type === 'Expense').reduce((sum, item) => sum + item.amount, 0);

  useIonViewWillEnter(() => {
    const now = Date.now();

    if (now - lastRefetch.current < 1000) {
      console.log('Refetch too soon, skipping...');
      return;
    }

    console.log('Refetching...');
    lastRefetch.current = now;
    refetch();
  });

  const handleItemClick = (expense: Expense) => {
    setSelectedExpense(expense);
    setShowModal(true);
  }

  const handleDelete = async () => {
    if (!selectedExpense) return;

    presentAlert({
      header: 'ยืนยันการลบ',
      message: `ต้องการลบรายการ "${selectedExpense.title}" ใช่หรือไม่?`,
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel'
        },
        {
          text: 'ลบ',
          role: 'destructive',
          handler: async () => {
            try {
              await deleteExpense(selectedExpense.id);
              setShowModal(false);
              setSelectedExpense(null);
              refetch();
            } catch (error) {
              console.error('Error deleting:', error);
              alert('ไม่สามารถลบได้');
            }
          }
        }
      ]
    });
  };

  const handleEdit = () => {
    setShowModal(false);
    if (selectedExpense) {
      router.push(`/edit-expense/${selectedExpense.id}`)
    }
  }

  if (loading) {
    return 
      <IonPage>
        <IonContent className='ion-padding ion-text-center'>
          <IonSpinner/>
          <p>กำลังโหลดข้อมูล...</p>
        </IonContent>
      </IonPage>
  }

  if (error) {
    return 
      <IonPage>
        <IonContent className='ion-padding'>
          <IonText color='danger'>
            <h3>เกิดข้อผิดพลาด: {error}</h3>
          </IonText>
        </IonContent>
      </IonPage>
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>รายการ</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonGrid class='ion-no-padding'>
          <IonRow>
            <IonCol size='6' style={{ borderRight: '1px solid #212424', padding: '16px'}}>
              <div className='ion-text-center'>
                <IonText color='medium' style={{ fontSize: '0.9rem'}}>รายรับ</IonText>
                <h2 style={{ color: 'green', margin: '4px 0'}}>{totalRevenue}</h2>
              </div>
            </IonCol>
            
            <IonCol size='6' style={{padding: '16px'}}>
              <div className='ion-text-center'>
                <IonText color='medium' style={{ fontSize: '0.9rem'}}>รายจ่าย</IonText>
                <h2 style={{ color: 'red', margin: '4px 0'}}>{totalExpense}</h2>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonList>
          <IonLabel style={{padding: '10px'}}>
            <h2>ประวัติรายการ</h2>
          </IonLabel>
          {expenses.length === 0 ? (
            <IonItem>
              <IonLabel className='ion-text-center'>
                <p>ยังไม่มีรายการ</p>
              </IonLabel>
            </IonItem>
          ) : (
            expenses.map(expense => (
              <IonItem key={expense.id} button onClick={() => handleItemClick(expense)} detail={true}>
                <IonLabel>
                  <h3>{expense.title}</h3>
                  <p>{expense.createAt.toDateString()}</p>
                </IonLabel>
                <IonNote slot='end' color={expense.type === 'Revenue' ? 'success' : 'danger'} style={{ fontSize: '1rem'}}>
                  {expense.type === 'Revenue' ? '+ ' : '- '}{expense.amount}
                </IonNote>
              </IonItem>
            ))
          )
        } 
        </IonList>

        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>รายละเอียด</IonTitle>
              <IonButtons slot='end'>
                <IonButton onClick={() => setShowModal(false)}>
                  <IonIcon icon={close}/>
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>

          <IonContent className='ion-padding'>
            {selectedExpense && (
              <>
                <div style={{ marginBottom: '20px' }}>
                  <IonText color='medium'>
                    <p>ชื่อรายการ</p>
                  </IonText>
                  <h2>{selectedExpense.title}</h2>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <IonText color='medium'>
                    <p>จำนวนเงิน</p>
                  </IonText>
                  <h2 style={{ color: selectedExpense.type === 'Revenue' ? 'green' : 'red' }}>
                    {selectedExpense.type === 'Revenue' ? '+' : '-'}฿{selectedExpense.amount.toLocaleString()}
                  </h2>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <IonText color='medium'>
                    <p>ประเภท</p>
                  </IonText>
                  <h3>{selectedExpense.type === 'Revenue' ? 'รายรับ' : 'รายจ่าย'}</h3>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <IonText color='medium'>
                    <p>หมวดหมู่</p>
                  </IonText>
                  <h3>{selectedExpense.category}</h3>
                </div>

                {selectedExpense.note && (
                  <div style={{ marginBottom: '20px' }}>
                    <IonText color='medium'>
                      <p>หมายเหตุ</p>
                    </IonText>
                    <p>{selectedExpense.note}</p>
                  </div>
                )}

                <div style={{ marginBottom: '20px' }}>
                  <IonText color='medium'>
                    <p>วันที่</p>
                  </IonText>
                  <p>{selectedExpense.createAt.toLocaleDateString('th-TH', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</p>
                </div>

                {/* ✅ ปุ่มต่างๆ */}
                <div style={{ marginTop: '40px' }}>
                  <IonButton 
                    expand='block' 
                    color='primary' 
                    onClick={handleEdit}
                  >
                    แก้ไข
                  </IonButton>
                  
                  <IonButton 
                    expand='block' 
                    color='danger' 
                    onClick={handleDelete}
                    style={{ marginTop: '10px' }}
                  >
                    ลบ
                  </IonButton>
                  
                  <IonButton 
                    expand='block' 
                    fill='outline' 
                    color='medium'
                    onClick={() => setShowModal(false)}
                    style={{ marginTop: '10px' }}
                  >
                    ยกเลิก
                  </IonButton>
                </div>
              </>
            )}
          </IonContent>
        </IonModal>

        <IonFab vertical='bottom' horizontal='center' slot='fixed'>
          <IonFabButton onClick={e => handleAdd()}>
            <IonIcon icon={ add }></IonIcon>
          </IonFabButton>

        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Home;
