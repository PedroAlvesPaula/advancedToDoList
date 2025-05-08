import React from 'react';
import { createBrowserRouter, RouterProvider} from 'react-router-dom'; 
import { createRoot } from 'react-dom/client';
import { Meteor } from 'meteor/meteor';
import { App } from '../imports/ui/App';
import { Tasks } from '../imports/ui/routes/Tasks';
import { Welcome } from '../imports/ui/routes/Welcome';

Meteor.startup(() => {

  const container = document.getElementById('react-target');
  const root = createRoot(container);
  
  const router = createBrowserRouter([
    {
      path:"/",
      element: <App />
    },
    {
      path:"/welcome",
      element: <Welcome />
    },
    {
      path:"/tasks",
      element: <Tasks />
    },
  ]);

  root.render(
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
  )

});
