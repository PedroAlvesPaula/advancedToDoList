import { TasksCollection } from "./tasksCollection";
import { Meteor } from 'meteor/meteor';

Meteor.methods({
    'tasks.insert'(doc){
        return TasksCollection.insertAsync({...doc, userId: this.userId},);
    },
    'tasks.updateTask'({ task }) {
        return TasksCollection.updateAsync(task._id, {
            $set: {
                title: task.title,
                description: task.description,
                updateAt: new Date(),
                isPrivate: task.isPrivate,
                state: task.state,
            }
        })
    },
    'tasks.delete'({_id}){
        return TasksCollection.removeAsync(_id);
    }
})