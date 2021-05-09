import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { Grid, List } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layouts/LoadingComponents'
import { useStore } from '../../../app/stores/store'
import ActivityList from './ActivityList'



export default observer( function ActivityDashboard(){
// width 10 znaci 10 stupaca semantic ima sveukupno 16

const {activityStore}=useStore()
const {loadActivities,activityRegistry}=activityStore
useEffect(()=>{
  if(activityRegistry.size<=1)loadActivities();
},[activityStore])


if (activityStore.loadingInitial) return <LoadingComponent content='App loading'/>
    return(
        <Grid>
            
            <Grid.Column width='10'>
                <ActivityList/>
            </Grid.Column>
            <Grid.Column width='6'>
            </Grid.Column>
        </Grid>
    )
})