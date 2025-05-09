import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '../imports/api/tasksCollection';
import { Accounts } from 'meteor/accounts-base';

import '../imports/api/tasksMethods';
import '../imports/api/TasksPublication';

const USER = 'dev';
const PASSWORD = '123';

const insertTask = (taskText, isChecked, user) => {
  TasksCollection.insertAsync({ text : taskText, createdAt: new Date(), isChecked: isChecked, userId: user._id});
}

Meteor.startup(async () => {

  if (! await Accounts.findUserByUsername(USER)){
    await Accounts.createUser({username: USER, password: PASSWORD});
  }

  if (await TasksCollection.find().countAsync() === 0) {
    const user = Accounts.findUserByUsername(USER);

    const tasks = [
      {taskText: "task", isChecked: false}
    ]
    
    tasks.map(({ taskText, isChecked }) => {
      insertTask(taskText, isChecked, user);
    })
  }
});
