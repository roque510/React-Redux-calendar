import moment from 'moment';

const initialState = {
    reminders: 
    {
        '26/03/2019':[
            {
                sort:34,
                time:"05:00 PM",
                title:"SCHOOL TEST",
                color:"red"
            }
        ]
    }
};

const reducer = (state = initialState , action ) => {
    const newState = { ...state};    
    if (action.type === 'ADD_REMINDER'){
        //check if exists, if not create an empty one.
        newState.reminders[action.payload.date] = newState.reminders[action.payload.date] || [];
        //push new items
        newState.reminders[action.payload.date].push({time:action.payload.time,title:action.payload.title,color:action.payload.color,sort:action.payload.sort});
        // newState.reminders[action.payload.date].title = action.payload.title;
        
        newState.reminders[action.payload.date] = newState.reminders[action.payload.date].sort((a, b) => (a.sort < b.sort) ? 1 : -1);
        
    }
    if (action.type === 'EDIT_REMINDER'){
        
        const newDate = moment(action.payload.date, "YYYY-MM-DD").format("DD/MM/YYYY");

        newState.reminders[newDate] = newState.reminders[newDate] || [];
        //first we delete
        newState.reminders[action.payload.mapDay].splice(action.payload.index,1);
        //then we add
        
        //push new items
        newState.reminders[newDate].push({time:action.payload.ntime,title:action.payload.title,color:action.payload.color,sort:action.payload.sort});
        // newState.reminders[action.payload.date].title = action.payload.title;
        
        newState.reminders[newDate] = newState.reminders[newDate].sort((a, b) => (a.sort < b.sort) ? 1 : -1);

        // newState.reminders[action.payload.mapDay][action.payload.index] = {time:action.payload.ntime,title:action.payload.title,color:action.payload.color,sort:action.payload.sort};
        // newState.reminders[action.payload.date].title = action.payload.title;
    }
    if (action.type === 'DELETE_REMINDER'){
        newState.reminders[action.payload.mapDay].splice(action.payload.index,1);
    }
    
    

    return newState

};

export default reducer;
