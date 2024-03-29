import React from "react";
import { Await, Link } from "react-router-dom";

import EventList from "components/Event/EventList";
import { Event } from "interfaces/event";
import { useUserProfile } from "components/UserProfileContext";
import { showNewEventButton } from "profile/functionality";

interface EventsIndexViewProps {
  eventsPromise: Promise<readonly Event[]>;
  newEventLinkToPath: string;
  refreshHandler: () => void;
}

function LoadingError() {
  return (
    <div>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>Please try tapping the refresh button or reloading the page.</p>
    </div>
  );
}

const EventsIndexView: React.FC<EventsIndexViewProps> = ({
  eventsPromise,
  newEventLinkToPath,
  refreshHandler,
}) => {
  const profile = useUserProfile();

  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl font-bold">Events</h1>
        <div className="flex flex-row gap-2">
          {showNewEventButton(profile) ? (
            <Link to={newEventLinkToPath} className="btn-primary btn">
              New event
            </Link>
          ) : null}

          <button className="btn" onClick={() => refreshHandler()}>
            Refresh
          </button>
        </div>
      </div>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Await resolve={eventsPromise} errorElement={<LoadingError />}>
          {(events: readonly Event[]) => <EventList events={events} />}
        </Await>
      </React.Suspense>
    </div>
  );
};

export default EventsIndexView;
