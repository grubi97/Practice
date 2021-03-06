import React, { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";
import { format } from "date-fns";
import ActivityListItemAttendee from "./ActivityListItemAttendee";

interface Props {
  activity: Activity;
}

export default function ActivityListItem({ activity }: Props) {
  //clearing stavlajs kad je button floated
  const [target, setTarget] = useState("");
  const { activityStore } = useStore();
  const {
    deleteActivity,
    activitiesByDate,
    loading: submitting,
  } = activityStore;
  function hadnleActivityDelete(
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) {
    setTarget(e.currentTarget.name);
    deleteActivity(id);
  }
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src={activity.host?.image ||"/assets/user.png"} />
            <Item.Content>
              <Item.Header as={Link} to={`/activities/${activity.id}`}>
                {activity.title}
              </Item.Header>
              <Item.Description>HOsted by <Link to ={`profiles/${activity.hostUserName}`}>{activity.host?.displayName}</Link></Item.Description>
              {activity.isHost &&(
                <Item.Description>
                  <Label basic color='orange'>
                    You are the host
                  </Label>
                </Item.Description>
              )}
                         {activity.isGoing && !activity.isHost &&(
                <Item.Description>
                  <Label basic color='green'>
                    You are  gojing
                  </Label>
                </Item.Description>
              )}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>

      <Segment>
        <span>
          <Icon name="clock" /> {format(activity.date!, "dd MMMM yyyy h:mm aa")}
          <Icon name="marker" /> {activity.venue}
        </span>
      </Segment>

      <Segment secondary><ActivityListItemAttendee attendees={activity.attendees!}/></Segment>
 
      <Segment clearing>
        <span>{activity.description}</span>
        <Button
          as={Link}
          to={`/activities/${activity.id}`}
          color="teal"
          floated="right"
          content="View"
        ></Button>
      </Segment>
    </Segment.Group>
  );
}
