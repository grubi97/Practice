import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';


export default observer(function  ActivityList(){

//kod on clinka kad stavis tako arrow funckiju to zanci da se nece odma renderirat nego tek na klik
const[target,setTarget]=useState('')
const {activityStore}=useStore()
const {deleteActivity,activitiesByDate,loading:submitting}=activityStore
function hadnleActivityDelete(e:SyntheticEvent<HTMLButtonElement>,id:string){
setTarget(e.currentTarget.name)
deleteActivity(id)
}

    return(
        <Segment>
            <Item.Group divided>
            {activitiesByDate.map(activity=>(
                <Item key={activity.id}>
                    <Item.Content>
                        <Item.Header as='a'>{activity.title}</Item.Header>
                        <Item.Meta>{activity.date}</Item.Meta>
                        <Item.Description>
                            <div>{activity.description}</div>
                            <div>{activity.city},{activity.venue}</div>

                        </Item.Description>
                        <Item.Extra>
                            <Button as={Link} to={`/activities/${activity.id}`} floated='right' content='View' color='blue'/>
                            <Button
                            name={activity.id} 
                            loading={submitting && target===activity.id} 
                            onClick={(e)=>hadnleActivityDelete(e,activity.id)} 
                            floated='right' content='Delete' color='red'/>
                            <Label basic content={activity.category}/>
                        </Item.Extra>
                    </Item.Content>

                </Item>
            ))}
            </Item.Group>
        </Segment>
    )

})