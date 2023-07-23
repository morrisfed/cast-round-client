import React from "react";
import { Link } from "react-router-dom";
import { Event } from "interfaces/event";

const ReactMarkdown = React.lazy(
  () => import("../lazy/LazyLoadableReactMarkdown")
);

export interface EventItemProps {
  event: Event;
  showEventDescription: boolean;
}

const datetimeFormatter = Intl.DateTimeFormat(undefined, {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
});

const EventDetails: React.FC<EventItemProps> = ({
  event,
  showEventDescription,
}) => {
  return (
    <Link to={`${event.id}`}>
      <div className="card-bordered card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex flex-row gap-4">
            <div className="truncate">
              <h2 className="card-title">{event.name}</h2>
              <p>Open: {datetimeFormatter.format(event.fromDate)}</p>
              <p>Close: {datetimeFormatter.format(event.toDate)}</p>
              {showEventDescription ? (
                <article className="prose">
                  <React.Suspense fallback={<div>Loading...</div>}>
                    <ReactMarkdown>{event.description}</ReactMarkdown>
                  </React.Suspense>
                </article>
              ) : null}
            </div>
          </div>
        </div>
        <div className="card-actions p-4">
          <Link className="btn-primary btn" to={"edit"}>
            Edit
          </Link>
        </div>
      </div>
    </Link>
  );
};

export default EventDetails;
