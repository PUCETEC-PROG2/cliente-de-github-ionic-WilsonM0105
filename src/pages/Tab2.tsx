import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
  IonInput,
  useIonToast,
} from '@ionic/react';
import React, { useState } from 'react';
import './Tab2.css';
import { createRepository } from '../services/GithubService';

const Tab2: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [presentToast] = useIonToast();

  const handleSubmit = async () => {
    if (!name.trim()) {
      presentToast({
        message: 'El nombre del repositorio es obligatorio',
        duration: 2000,
        color: 'danger',
      });
      return;
    }

    try {
      await createRepository(name, description);

      presentToast({
        message: 'Repositorio creado correctamente',
        duration: 2000,
        color: 'success',
      });

      // limpiar formulario
      setName('');
      setDescription('');

      // refrescar lista en Tab1
      window.dispatchEvent(new Event('repos:changed'));
    } catch (error) {
      presentToast({
        message: 'Error al crear el repositorio',
        duration: 2000,
        color: 'danger',
      });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Formulario de Repo</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Formulario de Repositorio</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="form-container">
          <IonInput
            className="form-field"
            label="Nombre del repositorio"
            labelPlacement="floating"
            fill="outline"
            placeholder="android-project"
            value={name}
            onIonInput={(e) => setName(e.detail.value ?? '')}
          />

          <IonTextarea
            className="form-field"
            label="Descripción del repositorio"
            labelPlacement="floating"
            fill="outline"
            placeholder="Descripción del repositorio"
            rows={6}
            autoGrow
            value={description}
            onIonInput={(e) => setDescription(e.detail.value ?? '')}
          />

          <IonButton expand="block" className="form-field" onClick={handleSubmit}>
            Guardar
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
