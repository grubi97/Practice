import { observer } from "mobx-react-lite";
import React from "react";
import { Tab } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import ProfilePhotos from "./ProfilePhotos";

interface Props {
  profile: Profile;
}

export default observer(function ProfileContent({profile}:Props) {
  const panes = [
    { menuItem: "About", render: () => <Tab.Pane>About</Tab.Pane> },
    {
      menuItem: "Photos",
      render: () => (
        <Tab.Pane>
          <ProfilePhotos profile={profile} />
        </Tab.Pane>
      ),
    },
    { menuItem: "Events", render: () => <Tab.Pane>Events</Tab.Pane> },
    {
      menuItem: "Followers",
      render: () => <Tab.Pane>Followers content</Tab.Pane>,
    },
    {
      menuItem: "Following",
      render: () => <Tab.Pane>Following content</Tab.Pane>,
    },
  ];

  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition="right"
      panes={panes}
    />
  );
});
