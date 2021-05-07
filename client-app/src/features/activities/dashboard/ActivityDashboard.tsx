import { observer } from 'mobx-react-lite'
import React from 'react'
import { Grid, List } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store'
import ActivityDetails from '../details/ActivityDetails'
import ActivityForm from '../form/ActivityForm'
import ActivityList from './ActivityList'



export default observer( function ActivityDashboard(){
// width 10 znaci 10 stupaca semantic ima sveukupno 16

const {activityStore}=useStore()
const {selectedActivity,editMode}=activityStore
    return(
        <Grid>
            
            <Grid.Column width='10'>
                <ActivityList/>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                <ActivityDetails/>}
                {editMode &&
                <ActivityForm/>}
            </Grid.Column>
        </Grid>
    )
})