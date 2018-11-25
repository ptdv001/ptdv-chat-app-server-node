# NODE SERVER NOTES

---------------------------------------------------------------------------------------------
## RUN
`nodemon index.js -vvv | bunyan`

---------------------------------------------------------------------------------------------
## QUESTIONS
- Event loop?
- Threading?
- Advantages

---------------------------------------------------------------------------------------------
## NOTES
- Cloning: creating multipile instances of an app and loadbalancing (clustering) work between them 
  - cluster allows forking main application process into child processes based on CPUs (default round-robin)
    - so cluster loads the the main file first as master and then clones it N-times as workers that can do work
  - con caching is hard because a returning user may get a new worker and lose state cached in that worker
    - redis or a sticky loadbalancer can help
- Decomposing: keep apps small and simple into microservices
- Splitting: splitting an app into instances responsible for a part of the apps data, sharding




## Motivation
An application that has enough complexity and patterns to test out new technologies but not too much to cause fatigue.

## Design

###Routes
*TODO* V2
/healthCheck
/api/chats                      (returns list of chats)
/api/chats/:chatId              (returns only chat data)
/api/chats/:chatId/messages     (returns only messages)
/api/chats/:chatId/users        (returns only users data)

V1
/healthCheck
/api/chats
/api/chats/:chatId  (returns messages and users)

---------------------------------------------------------------------------------------------
## NOTES
-ARCHITECTURE
    - REST - state stored in route and query params/body
    - Each component has it's own transport/route. For polling it would be better to get the entire chat state but for sockets just getting small changes is more efficent.
    - Prototype functions should manipulate Constructor state but this can also be done by  private functions. I'd say choose a pattern and stick with it, either Prototype or module.
- SECURITY
    - authentication = login - is ascerting someone is who s/he claims to be
    - authorization = permissions - is to do with who is authorized to do what action (groups/levels..)
