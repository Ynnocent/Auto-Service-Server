# Auto-Service-Server
Main repository for the Car Service application and web service.

- Author: __Ynno Plucena__
- Date created: 6/2/23
- Tech Stack: 
  - Node.js 
  - Express 
  - React-Vite 
  - PostgreSQL 
  - Render.com 
  - NGROK
- Testing: JIRA, Jest, Supertest

## Key Reminders
- exposed NGROK url's are what is used for test.yml file to run tests
- Make sure when you close your NGROK client make sure the reopen and reconfigure the auto.test.js url's according to the new NGROK exposed url
  - If __not__ configured pushes and commits will yield failed checks
- Make sure to run tests locally before committing and pushing changes into the repository  
