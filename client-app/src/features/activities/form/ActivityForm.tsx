import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Button, Header, Label, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layouts/LoadingComponents";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { Activity } from "../../../app/models/activity";

export default observer(function ActivityForm() {
  //clearing stavlja buttone unutar segemnta
  const { activityStore } = useStore();
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const [activity, setActivity] = useState<Activity>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: null,
    city: "",
    venue: "",
  });

  const ValidationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("description is required"),
    date: Yup.string().required().nullable(),
    category: Yup.string().required(),
    venue: Yup.string().required(),
    city: Yup.string().required(),
  });

  useEffect(() => {
    if (id)
      activityStore.loadActivity(id).then((activity) => setActivity(activity!));
  }, [id, activityStore.loadActivity]);

  function handleFormSubmit(activity: Activity) {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      activityStore
        .createActvity(newActivity)
        .then(() => history.push(`/activities/${newActivity.id}`));
    } else {
      activityStore
        .updateActivity(activity)
        .then(() => history.push(`/activities/${activity.id}`));
    }
  }

  if (activityStore.loadingInitial)
    return <LoadingComponent content="Loadinf activity..." />;

  return (
    <Segment clearing>
      <Header content="Activity details" sub color="teal" />
      <Formik
        validationSchema={ValidationSchema}
        enableReinitialize //omogucava da viudimo u editu sto trenutno pise
        initialValues={activity}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <MyTextInput name="title" placeholder="Title" />
            <MyTextArea rows={3} placeholder="Description" name="description" />
            <MySelectInput
              options={categoryOptions}
              placeholder="Category"
              name="category"
            />
            <MyDateInput
              placeholderText="Date"
              name="date"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy, h:mm aa"
            />
            <Header content="Location details" sub color="teal" />

            <MyTextInput placeholder="City" name="city" />
            <MyTextInput placeholder="Venue" name="venue" />
            <Button
              disabled={isSubmitting || !dirty || !isValid}
              loading={activityStore.loading}
              floated="right"
              positive
              type="submit"
              content="Submit"
            />
            <Button
              as={Link}
              to="/activities"
              floated="right"
              type="button"
              content="Cancel"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
