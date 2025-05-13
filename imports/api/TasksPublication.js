import { Meteor } from 'meteor/meteor';
import { TasksCollection } from './tasksCollection';

Meteor.publish('tasks', function () {
    const userId = this.userId;
    if (!userId){
        return this.ready();
    }
    return TasksCollection.find();
});