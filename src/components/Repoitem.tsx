import './RepoItem.css';
import React from 'react';
import {
  IonItem,
  IonLabel,
  IonThumbnail,
} from '@ionic/react';
import { RepositoryItem } from '../interfaces/RepositoryItem';


const RepoItem: React.FC<RepositoryItem> = ({ name, description, imageUrl, owner, language }) => {
  return (
    <IonItem>
      <IonThumbnail slot="start">
        <img alt="Silhouette of mountains" src={imageUrl || "https://ionicframework.com/docs/img/demos/thumbnail.svg"} />
      </IonThumbnail>
      <IonLabel>
        <h2>{name}</h2>
        <p>{description}</p>
        <p>Propietario:{owner}</p>
        <p>Lenguaje:{language}</p>
      </IonLabel>
    </IonItem>
  );
};


export default RepoItem;