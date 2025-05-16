import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '../imports/api/tasksCollection';
import { Accounts } from 'meteor/accounts-base';

import '../imports/api/tasksMethods';
import '../imports/api/TasksPublication';
import '../imports/api/usersPublication';
import '../imports/api/usersMethods';

const USER = 'dev';
const PASSWORD = '123';

const insertTask = (task, user) => {
  TasksCollection.insertAsync({ title: task.title, description : task.description, isPrivate: task.isPrivate, createdAt: new Date(), isChecked: task.isChecked, owner: task.owner, userId: user._id});
}

Meteor.startup(async () => {

  if (! await Accounts.findUserByUsername(USER)){
    await Accounts.createUser({username: USER, password: PASSWORD});
  }

  if (await TasksCollection.find().countAsync() === 0) {
    const user = Accounts.findUserByUsername(USER);

    const tasks = [
      {title: "task", isChecked: false, description: 'uma des', isPrivate: false, owner: 'dev', userId: user._id}
    ]
    
    tasks.map((task) => {
      insertTask(task, user);
    })
  }
});
