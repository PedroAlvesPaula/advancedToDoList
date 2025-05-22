import { TasksCollection } from "./tasksCollection";
import { Meteor } from 'meteor/meteor';

Meteor.methods({
    async 'tasks.insert'(doc){
        return await TasksCollection.insertAsync({...doc, userId: this.userId},);
    },

    async 'tasks.updateTask'({ task }) {
        return await TasksCollection.updateAsync(task._id, {
            $set: {
                title: task.title,
                description: task.description,
                updateAt: new Date(),
                isPrivate: task.isPrivate,
                state: task.state,
            }
        })
    },

    async 'tasks.delete'({_id}){
        return await TasksCollection.removeAsync(_id);
    },

    async 'tasks.handleNextState'({id, state}) {
        const oldState = state.toLowerCase().replace(/\s+/g, '');

        let newState;

        if (oldState === 'cadastrada'){
            newState = 'Em andamento';
        } else if (oldState === 'emandamento'){
            newState = 'Concluída';
        }

        return await TasksCollection.updateAsync(id, {
            $set: {
                state: newState
            }
        })
    },

    async 'tasks.resetState'({ id }){
        const newState = 'Cadastrada';

        return await TasksCollection.updateAsync(id, {$set: {state: newState}});
    },
    async 'tasks.getTaskById'(id){
        return await TasksCollection.findOneAsync(id);
    }
})