import './RepoItem.css';
import React, { useState } from 'react';
import {
  IonItem,
  IonLabel,
  IonThumbnail,
  IonButtons,
  IonButton,
  IonIcon,
  IonAlert,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonTextarea,
} from '@ionic/react';
import { trash, create } from 'ionicons/icons';
import { RepositoryItem } from '../interfaces/RepositoryItem';

type RepoItemProps = RepositoryItem & {
  onDelete?: (owner: string, repo: string) => Promise<void>;
  onUpdate?: (
    owner: string,
    repo: string,
    data: { name?: string; description?: string }
  ) => Promise<void>;
};

const RepoItem: React.FC<RepoItemProps> = ({
  name,
  description,
  imageUrl,
  owner,
  language,
  onDelete,
  onUpdate,
}) => {
  // DELETE
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  // EDIT (modal)
  const [showEdit, setShowEdit] = useState(false);
  const [editName, setEditName] = useState(name);
  const [editDesc, setEditDesc] = useState(description ?? '');

  const canDelete = !!onDelete && !!owner;
  const canEdit = !!onUpdate && !!owner;

  const openEditModal = () => {
    // cargar valores actuales
    setEditName(name);
    setEditDesc(description ?? '');
    setShowEdit(true);
  };

  const saveEdit = async () => {
    if (!onUpdate || !owner) return;

    const newName = (editName ?? '').trim();
    const newDesc = (editDesc ?? '').trim();

    if (!newName) {
      alert("El nombre del repositorio no puede estar vacío.");
      return;
    }

    // solo enviamos "name" si cambió (para evitar cambios innecesarios)
    const payload: { name?: string; description?: string } = {
      description: newDesc,
    };
    if (newName !== name) payload.name = newName;

    await onUpdate(owner, name, payload);
    setShowEdit(false);
  };

  return (
    <>
      <IonItem>
        <IonThumbnail slot="start">
          <img
            alt="repo"
            src={imageUrl || "https://ionicframework.com/docs/img/demos/thumbnail.svg"}
          />
        </IonThumbnail>

        <IonLabel>
          <h2>{name}</h2>
          <p>{description}</p>
          <p>Propietario: {owner}</p>
          <p>Lenguaje: {language}</p>
        </IonLabel>

        <IonButtons slot="end">
          {/* EDITAR */}
          <IonButton disabled={!canEdit} onClick={openEditModal}>
            <IonIcon icon={create} />
          </IonButton>

          {/* ELIMINAR */}
          <IonButton
            color="danger"
            disabled={!canDelete}
            onClick={() => setShowConfirmDelete(true)}
          >
            <IonIcon icon={trash} />
          </IonButton>
        </IonButtons>
      </IonItem>

      {/* CONFIRM DELETE */}
      <IonAlert
        isOpen={showConfirmDelete}
        onDidDismiss={() => setShowConfirmDelete(false)}
        header="Confirmar eliminación"
        message={`¿Seguro que deseas eliminar el repositorio "${name}"?`}
        buttons={[
          { text: 'Cancelar', role: 'cancel' },
          {
            text: 'Eliminar',
            role: 'destructive',
            handler: async () => {
              if (!onDelete || !owner) return;
              await onDelete(owner, name);
            },
          },
        ]}
      />

      {/* MODAL EDIT */}
      <IonModal isOpen={showEdit} onDidDismiss={() => setShowEdit(false)}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Editar repositorio</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
          <IonInput
            label="Nombre"
            labelPlacement="stacked"
            fill="outline"
            value={editName}
            onIonInput={(e) => setEditName(e.detail.value ?? '')}
          />

          <div style={{ height: 12 }} />

          <IonTextarea
            label="Descripción"
            labelPlacement="stacked"
            fill="outline"
            value={editDesc}
            onIonInput={(e) => setEditDesc(e.detail.value ?? '')}
            autoGrow
          />

          <div style={{ height: 16 }} />

          <IonButton expand="block" onClick={saveEdit}>
            Guardar cambios
          </IonButton>

          <IonButton expand="block" fill="outline" onClick={() => setShowEdit(false)}>
            Cancelar
          </IonButton>

          <p style={{ marginTop: 12, fontSize: 12, opacity: 0.8 }}>
            Nota: si cambias el nombre, GitHub renombra el repositorio.
          </p>
        </IonContent>
      </IonModal>
    </>
  );
};

export default RepoItem;
