import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; 
import { createRoot } from 'react-dom/client';
import { Meteor } from 'meteor/meteor';
import { App } from '../imports/ui/App';
import { Tasks } from '../imports/ui/routes/Tasks';
import { Welcome } from '../imports/ui/routes/Welcome';
import { AddTask } from '../imports/ui/routes/AddTask';
import { EditTask } from '../imports/ui/routes/EditTask';
import { UserProfile } from '../imports/ui/routes/UserProfile';
import { Login } from '../imports/ui/routes/Login';
import { ViewTask } from '../imports/ui/routes/ViewTask';

Meteor.startup(() => {

  const container = document.getElementById('react-target');
  const root = createRoot(container);

  const router = createBrowserRouter([
    {
      path:"/",
      element: <App />
    },
    {
      path:"/login",
      element: <Login />
    },
    {
      path:"/welcome",
      element: <Welcome />
    },
    {
      path:"/tasks",
      element: <Tasks />
    },
    {
      path:"/addTask",
      element: <AddTask />
    },
    {
      path:"/editTask/:id",
      element: <EditTask />
    },
    {
      path:"/userProfile",
      element: <UserProfile />
    },
    {
      path:"/viewTask/:id",
      element: <ViewTask />
    },
  ]);

  root.render(
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
  )

});
