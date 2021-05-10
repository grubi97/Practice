import { observer } from 'mobx-react-lite';
import React, { Fragment, SyntheticEvent, useEffect, useState } from 'react'
import { Button, Header, Item, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ActivityListItem from './ActivityListItem';


export default observer(function ActivityList() {

    //kod on clinka kad stavis tako arrow funckiju to zanci da se nece odma renderirat nego tek na klik
    const { activityStore } = useStore()
    const { groupedActivities } = activityStore

    return (
        <>
            {groupedActivities.map(([group, activities]) => (

                <Fragment key={group}><Header sub color='teal'>{group}</Header>

                    {activities.map(activity => (
                        <ActivityListItem key={activity.id} activity={activity} />
                    ))}
                </Fragment>

            ))}
        </>

    )

})