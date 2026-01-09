import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import { IonList } from '@ionic/react';
import './Tab1.css';
import RepoItem from '../components/Repoitem';
import React from 'react';
import { RepositoryItem } from '../interfaces/RepositoryItem';
import { fetchRepositories, deleteRepository, updateRepository } from '../services/GithubService';
import { language } from 'ionicons/icons';

const Tab1: React.FC = () => {
  const [repos, setRepos] = React.useState<RepositoryItem[]>([]);

  const loadRepos = async () => {
    const reposData = await fetchRepositories();
    setRepos(reposData);
  };

  // función al confirmar eliminar
  const onDelete = async (owner: string, repo: string) => {
    try {
      await deleteRepository(owner, repo);
      // refrescar lista
      loadRepos();
    } catch (error) {
      console.error("Error eliminando repositorio:", error);
      alert("No se pudo eliminar el repositorio");
    }
  };

  useIonViewDidEnter(() => {
    console.log("******** Leyendo repos ... ********");
    loadRepos();
  });

  const onUpdate = async (
    owner: string,
    repo: string,
    data: { name?: string; description?: string }
  ) => {
    try {
      await updateRepository(owner, repo, data);
      loadRepos();
    } catch (error) {
      console.error("Error actualizando repositorio:", error);
      alert("No se pudo actualizar el repositorio");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Repositorios</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {repos.map((repo, index) => (
            <RepoItem
              key={index}
              name={repo.name}
              description={repo.description}
              imageUrl={repo.imageUrl}
              owner={repo.owner}
              language={repo.language}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
