import {
  IonButton,
  IonContent,
  IonDatetime,
  IonDatetimeButton,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonListHeader,
  IonModal,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/react';import ExploreContainer from '../components/ExploreContainer';
import React, { use, useState } from 'react';
import './AddExpense.css';

const AddExpense: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [type, setType] = useState<string>('Revenue');
  const [category, setCategory] = useState<string>('Food');
  const [note, setNote] = useState<string>('');

  const handleSave = () => {
    console.log({ title, amount, type, category, note});
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Expense</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItem>
          <IonLabel position='stacked'>Title</IonLabel>
          <IonInput value={title} onIonChange={e => setTitle(e.detail.value!)} placeholder='Enter title'/>
        </IonItem>

        <IonItem>
          <IonLabel position='stacked'>Amount</IonLabel>
          <IonInput value={ amount } onIonChange={e => setAmount(e.detail.value!)} placeholder='Enter amount'/>
        </IonItem>

        <IonItem>
          {/* <IonLabel position='stacked'>Type</IonLabel> */}
          {/* <IonSelect placeholder='กรุณาเลือก'>
            <IonSelectOption value= "revenue">Revenue</IonSelectOption>
            <IonSelectOption value= "expense">Expense</IonSelectOption>
          </IonSelect> */}
          
          <IonRadioGroup value={ type } onIonChange={e => setType(e.detail.value)}>
            <IonListHeader>
              <IonLabel>เลือกประเภท</IonLabel>
            </IonListHeader>
            
            <IonItem>
              <IonLabel>Revenue</IonLabel>
              <IonRadio slot='start' value="Revenue"/>
            </IonItem>
            
            <IonItem>
              <IonLabel>Expense</IonLabel>
              <IonRadio slot='start' value='Expense'/>
            </IonItem>
          </IonRadioGroup>
          
        </IonItem>

        <IonItem>
          <IonLabel>Category</IonLabel>
          <IonSelect value={category} onIonChange={e => setCategory(e.detail.value)}>
            <IonSelectOption value="Food">Food</IonSelectOption>
            <IonSelectOption value="Travel">Travel</IonSelectOption>
            <IonSelectOption value="Utilities">Utilities</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonLabel position='stacked'>Note</IonLabel>
          <IonTextarea value={ note } onIonChange={e => setNote(e.detail.value!)} placeholder='Enter note'/>
        </IonItem>

        <div className='ion-padding'>
          <IonButton expand='block' onClick={handleSave}>Save</IonButton>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default AddExpense;