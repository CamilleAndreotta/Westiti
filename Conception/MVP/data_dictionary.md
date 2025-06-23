| Table            | Champs            | Types         | Constraints                     | Description                                                                |
| ---------------- | ----------------- | ------------- | ------------------------------- | -------------------------------------------------------------------------- |
| **User**         | code_user         | VARCHAR (50)  | PRIMARY KEY, NOT NULL, UNSIGNED | UUID de l'utilisateur                                                      |
| **User**         | name              | VARCHAR (255) | NOT NULL                        | Nom de l'utilisateur                                                       |
| **User**         | email             | VARCHAR (255) | NOT NULL                        | Adresse mail de l'utilisateur                                              |
| **User**         | password          | VARCHAR (255) | NOT NULL                        | Mot de passe de l'utilisateur                                              |
| **User**         | avatar            | VARCHAR (255) | NULLABLE                        | Avatar de l'utilisateur                                                    |
| **User**         | created_at        | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP       | Date de création de l'utilisateur                                          |
| **User**         | updated_at        | TIMESTAMP     | NULLABLE                        | Date de modification de l'utilisateur                                      |
| **Event**        | code_event        | VARCHAR(50)   | PRIMARY KEY, NOT NULL, UNSIGNED | UUID de l'évènement                                                        |
| **Event**        | name              | VARCHAR(255)  | NOT NULL                        | Nom de l'évènement                                                         |
| **Event**        | content           | VARCHAR(255)          | NULLABLE                        | Descriptif de l'évènement                                                  |
| **Event**        | started_at        | TIMESTAMP     | NOT NULL                        | Date de début de l'évènement                                               |
| **Event**        | ended_at          | TIMESTAMP     | NOT NULL                        | Date de fin de l'évènement                                                 |
| **Event**        | access_code       | VARCHAR(6)   | NOT NULL                        | Code d'accès à l'événement                                                 |
| **Event**        | upload_status     | BOOL          | NOT NULL                        | Statut des uploads (autorisés ou non)                                      |
| **Event**        | created_at        | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP       | Date de création de l'évènement                                            |
| **Event**        | updated_at        | TIMESTAMP     | NULLABLE                        | Date de modification de l'évènement                                        |                                           |
| **Photo**   | code_photo   | VARCHAR(50)   | PRIMARY KEY, NOT NULL, UNSIGNED | UUID de la photo ou vidéo                                                  |
| **Photo**   | url               | VARCHAR(255)  | NOT NULL                        | URL de la photo ou vidéo                                                   |
| **Photo**   | uploaded_at       | TIMESTAMP     | NOT NULL                        | Date de téléversement                                                      |
| **Photo**   | event_id          | ENTITY        | NOT NULL                        | Référence à l'entité Event                                                 |
| **Photo**   | participant_id    | ENTITY        | NOT NULL                        | Référence à l'entité Participant                                           |
