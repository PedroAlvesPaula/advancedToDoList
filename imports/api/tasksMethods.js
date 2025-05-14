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
    },
    'tasks.handleNextState'({id, state}) {
        const viewState = (actualState) => {
        let newState;
        if(actualState[0]) {
            newState = {
            registered: false,
            inProgress: true,
            completed: false
            }   
        } else if (actualState[1]){
            newState = {
            registered: false,
            inProgress: false,
            completed: true
            } 
        }
        return newState;
        }
        const newState = viewState(state);

        return TasksCollection.updateAsync(id, {
            $set: {
                state: newState
            }
        })
    }
})