# Server Node (Ptdv-Chat-App)

IMPORTANT! currently a python error on bunyan install.

## SETUP & RUN
`npm install`
`npm run dev`

## API

Note Postman API tests are in chat-tests.postman_collection

Routes:
/healthCheck
/api/chats
/api/chats/:chatId  (returns messages and users)

Future Planned APIs:
/healthCheck
/api/chats/:chatId/messages     (returns only messages)
/api/chats/:chatId/users        (returns only users data)

/api/locales
