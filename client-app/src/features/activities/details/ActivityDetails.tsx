import { observe } from 'mobx'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { Card,Image,Icon, Button } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layouts/LoadingComponents'
import { useStore } from '../../../app/stores/store'


export default observer( function ActivityDetails(){
const {activityStore}=useStore()
const {selectedActivity:activity}=activityStore
const{id}=useParams<{id:string}>();

useEffect(()=>{
  if(id) activityStore.loadActivity(id);
},[id,activityStore.loadActivity])

if ( activityStore.loadingInitial || !activity) return <LoadingComponent/>;
    return(
        <Card>
        <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
        <Card.Content>
          <Card.Header>{activity.title}</Card.Header>
          <Card.Meta>
            <span >{activity.date}</span>
          </Card.Meta>
          <Card.Description>
            {activity.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <Button.Group widths='2'>
                <Button as={Link} to={`/edit/${activity.id}`} basic color='blue' content='Edit'/>
                <Button as={Link} to='/activities' basic color='grey' content='Cnacel'/>

            </Button.Group>
        </Card.Content>
      </Card>
    )

})