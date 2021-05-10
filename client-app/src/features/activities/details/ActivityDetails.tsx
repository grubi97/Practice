import { observe } from 'mobx'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { Card, Image, Icon, Button, Grid } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layouts/LoadingComponents'
import { useStore } from '../../../app/stores/store'
import ActivityDetailedChat from './ActivityDetailedChat'
import ActivityDetailedHeader from './ActivityDetailedHeader'
import ActivityDetailedInfo from './ActivityDetailedInfo'
import ActivityDetailedSideBar from './ActivityDetailedSideBar'


export default observer(function ActivityDetails() {
  const { activityStore } = useStore()
  const { selectedActivity: activity } = activityStore
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) activityStore.loadActivity(id);
  }, [id, activityStore.loadActivity])

  if (activityStore.loadingInitial || !activity) return <LoadingComponent />;
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailedHeader activity={activity}/>
        <ActivityDetailedInfo activity={activity}/>
        <ActivityDetailedChat/>
      </Grid.Column>

      <Grid.Column width={6}>
        <ActivityDetailedSideBar/>
      </Grid.Column>
    </Grid>
  )

})