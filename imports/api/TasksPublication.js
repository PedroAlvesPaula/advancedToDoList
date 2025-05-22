import { Meteor } from 'meteor/meteor';
import { TasksCollection } from './tasksCollection';

Meteor.publish('tasks', function (state, findTask, limit=4, skip=0) {
    const userId = this.userId;
    if (!userId){
        return this.ready();
    }

    const query = {
        $or: [
            {isPrivate: false},
            {userId: this.userId}
        ]
    };

    if(state){
        query.state = state;
    }
    if(findTask.trim() !== ''){
        query.title = {$regex: findTask, $options: 'i'};
    }

    return TasksCollection.find(query, {sort: {createdAt: -1}, limit, skip});
});

Meteor.publish('tasksCount', function() {
    return TasksCollection.find(
        {$or: [{isPrivate: false}, {userId: this.userId}]}, 
    {sort: {createdAt: -1}});
});