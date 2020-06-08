# CS374-2020cc 
## KAIST Spring 2020 
### CS374: Introduction to Human-Computer Interaction  
#### Design Project 4: High-fidelity Prototyping

# How to start? 
- Local
    1. git clone this repository.
    2. Open '2020cc-react' directory in terminal.
    3. Enter <pre><code>npm start</code></pre>
- Remote
    - https://project-2020cc.herokuapp.com/

# Explanation

-  CS374-2020cc/2020cc-react/src  
    - Some of top components, .css, .png are here.
- CS374-2020cc/2020cc-react/src/components
    - Manage our components  
- CS374-2020cc/2020cc-react/src/components/authentication
    - For register/login
- CS374-2020cc/2020cc-react/src/components/mainscreen
    - For mainscreen (scheduler). Most important components that need for our prototype are here.
    - __coworkers.js, person.js__ : Show the coworkers in our team. We can see other worker's scheduler.
    - __event.js, eventInputForm.js, eventList.js, eventProcess.js, record.js, recordList.js__ : Send a push event message to each workers and show the answer list.
    - __mainscreen.js, todoList.js, todoInfo.js__ : Show the main screen of our prototype. (Daily Scheduler) We can modify our schduler (add, remove, modify, heart)
    - __notification.js, notificationManager.js__ : Send a push alarm message to each workers that make them to mark the progress regularly.
- CS374-2020cc/2020cc-react/src/components
    - Routes between components

# Developer

20160300 Juhyeong Yu  
20160453 Minji Lee  
20170052 Seongho Keum  
20170708 Hyeonjeong Ha

# Additional Comments
Since using the server(back-end) was prohibited, we managed our data using Firebase.
