import { TasksCollection } from "./tasksCollection";
import { Meteor } from 'meteor/meteor';

Meteor.methods({
    'tasks.insert'(doc){
        return TasksCollection.insertAsync({...doc, userId: this.userId},);
    },
    'tasks.updateTask'({ task }) {
        return TasksCollection.updateAsync(task._id, {
            $set: {
                name: task.title,
                description: task.description,
                createdAt: task.CreatedAt,
                updateAt: new Date(),
            }
        })
    }
})