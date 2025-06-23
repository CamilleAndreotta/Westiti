| Table            | Champs            | Types         | Constraints                     | Description                                                                |
| ---------------- | ----------------- | ------------- | ------------------------------- | -------------------------------------------------------------------------- |
| **User**         | code_user         | VARCHAR (50)  | PRIMARY KEY, NOT NULL, UNSIGNED | UUID de l'utilisateur                                                      |
| **User**         | name              | VARCHAR (255) | NOT NULL                        | Nom de l'utilisateur                                                       |
| **User**         | email             | VARCHAR (255) | NOT NULL                        | Adresse mail de l'utilisateur                                              |
| **User**         | password          | VARCHAR (255) | NOT NULL                        | Mot de passe de l'utilisateur                                              |
| **User**         | avatar            | VARCHAR (255) | NULLABLE                        | Avatar de l'utilisateur                                                    |
| **User**         | is_admin          | BOOL          | NOT NULL                        | Définit si l'utilisateur est Admin avec un accès total à l'app             |
| **User**         | created_at        | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP       | Date de création de l'utilisateur                                          |
| **User**         | updated_at        | TIMESTAMP     | NULLABLE                        | Date de modification de l'utilisateur                                      |
| **Participant**  | code_participant  | VARCHAR(50)   | PRIMARY KEY, NOT NULL, UNSIGNED | UUID du participant                                                        |
| **Participant**  | role              | ENUM          | NOT NULL                        | Rôle du participant (Participant, Modérateur)                              |
| **Participant**  | created_at        | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP       | Date de création du participant                                            |
| **Participant**  | updated_at        | TIMESTAMP     | NULLABLE                        | Date de modification du participant                                        |
| **Participant**  | user_id           | ENTITY        | NOT NULL                        | Référence à l'entité User                                                  |
| **Participant**  | event_id          | ENTITY        | NOT NULL                        | Référence à l'entité Event                                                 |
| **Participant**  | status            | BOOL          | NULLABLE                        | Statut de participation                                                    |
| **Notification** | code_notification | VARCHAR(50)   | PRIMARY KEY, NOT NULL, UNSIGNED | UUID de la notification                                                    |
| **Notification** | type              | ENUM          | NOT NULL                        | Type de la notification (fin de téléversement, photos disponibles, résumé) |
| **Notification** | sended_at         | TIMESTAMP     | NULLABLE                        | Date d'envoi de la notification                                            |
| **Notification** | content           | TEXT          | NULLABLE                        | Contenu de la notification                                                 |
| **Notification** | event_id          | ENTITY        | NOT NULL                        | Référence à l'entité Event                                                 |
| **Notification** | created_at        | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP       | Date de création de la notification                                        |
| **Notification** | updated_at        | TIMESTAMP     | NULLABLE                        | Date de modification de la notification                                    |
| **Event**        | code_event        | VARCHAR(50)   | PRIMARY KEY, NOT NULL, UNSIGNED | UUID de l'évènement                                                        |
| **Event**        | name              | VARCHAR(255)  | NOT NULL                        | Nom de l'évènement                                                         |
| **Event**        | content           | TEXT          | NULLABLE                        | Descriptif de l'évènement                                                  |
| **Event**        | started_at        | TIMESTAMP     | NOT NULL                        | Date de début de l'évènement                                               |
| **Event**        | ended_at          | TIMESTAMP     | NOT NULL                        | Date de fin de l'évènement                                                 |
| **Event**        | access_code       | VARCHAR(20)   | NOT NULL                        | Code d'accès à l'événement                                                 |
| **Event**        | qr_code           | VARCHAR(255)  | NOT NULL                        | Lien pour générer le QR code                                               |
| **Event**        | upload_status     | BOOL          | NOT NULL                        | Statut des uploads (autorisés ou non)                                      |
| **Event**        | created_at        | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP       | Date de création de l'évènement                                            |
| **Event**        | updated_at        | TIMESTAMP     | NULLABLE                        | Date de modification de l'évènement                                        |
| **Like**         | code_like         | VARCHAR(50)   | PRIMARY KEY, NOT NULL, UNSIGNED | UUID du like                                                               |
| **Like**         | liked_at          | TIMESTAMP     | NOT NULL                        | Date du like                                                               |
| **Like**         | participant_id    | ENTITY        | NOT NULL                        | Référence à l'entité Participant                                           |
| **Like**         | photovideo_id     | ENTITY        | NOT NULL                        | Référence à l'entité PhotoVideo                                            |
| **Like**         | created_at        | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP       | Date de création du like                                                   |
| **Like**         | updated_at        | TIMESTAMP     | NULLABLE                        | Date de modification du like                                               |
| **PhotoVideo**   | code_photovideo   | VARCHAR(50)   | PRIMARY KEY, NOT NULL, UNSIGNED | UUID de la photo ou vidéo                                                  |
| **PhotoVideo**   | url               | VARCHAR(255)  | NOT NULL                        | URL de la photo ou vidéo                                                   |
| **PhotoVideo**   | uploaded_at       | TIMESTAMP     | NOT NULL                        | Date de téléversement                                                      |
| **PhotoVideo**   | status            | BOOL          | NULLABLE                        | Statut de la photo/vidéo (Approuvée, Rejetée)                              |
| **PhotoVideo**   | event_id          | ENTITY        | NOT NULL                        | Référence à l'entité Event                                                 |
| **PhotoVideo**   | participant_id    | ENTITY        | NOT NULL                        | Référence à l'entité Participant                                           |
| **Album**        | code_album        | VARCHAR(255)  | PRIMARY KEY, NOT NULL, UNSIGNED | UUID de l'album                                                            |
| **Album**        | name              | VARCHAR(255)  | NOT NULL                        | Nom de l'album                                                             |
| **Album**        | created_at        | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP       | Date de création de l'album                                                |
| **Album**        | updated_at        | TIMESTAMP     | NULLABLE                        | Date de mise à jour de l'album                                             |
| **Album**        | event_id          | ENTITY        | NOT NULL                        | Référence à l'entité Event                                                 |
