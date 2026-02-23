import React, { useEffect, useMemo, useState } from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonFooter } from "@ionic/react";
import { MotionService } from "../core/MotionService";
import { TtsService } from "../core/TtsService";
import { HapticsService } from "../core/HapticsService";
import { ArmWorkoutEngine } from "../core/ArmWorkoutEngine";
import type { WorkoutState } from "../core/types";

export const HomePage: React.FC = () => {
  const [state, setState] = useState<WorkoutState | null>(null);

  const engine = useMemo(() => new ArmWorkoutEngine(), []);
  const motion = useMemo(() => new MotionService(), []);
  const tts = useMemo(() => new TtsService(), []);
  const haptic = useMemo(() => new HapticsService(), []);

  useEffect(() => {
    engine.onChange(setState);
  }, [engine]);

  const start = async () => {
    await tts.speak("เริ่มกายบริหารแขน ยกขึ้นจนสุดแล้วลดลง");
    engine.start();
    await motion.start((s) => engine.process(s));
  };

  const stop = async () => {
    await motion.stop();
    engine.stop();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar><IonTitle>Lab09 Sensors</IonTitle></IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h1>{state?.repDisplay ?? 0}</h1>
        <p>คะแนน: {state?.stats.score ?? 0}</p>
        <p>{state?.stats.lastMessage}</p>

        <IonButton expand="block" onClick={start}>Start</IonButton>
        <IonButton expand="block" color="medium" onClick={stop}>Stop</IonButton>
      </IonContent>

      <IonFooter className="ion-padding">
        663380023-1 นายวัชรวิศว์ ชัยปลื้ม
      </IonFooter>
    </IonPage>
  );
};