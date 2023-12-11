import React from "react";
import { json, redirect, useRouteLoaderData } from "react-router-dom";
import EventItem from "../components/EventItem";
const EventsDetailPage = () => {
  const data = useRouteLoaderData("event-detail");
  return (
    <>
      <EventItem event={data.event}></EventItem>
    </>
  );
};

export default EventsDetailPage;

//
export async function loader({ request, params }) {
  // useParams는 훅이라 사용할수없지만, loader 자체에서 제공해주는 params를 통해 접근가능
  const id = params.eventsID;
  const response = await fetch("http://localhost:8080/events/" + id);
  if (!response.ok) {
    throw json({ message: "Could not fetch details" }, { status: 500 });
  } else {
    console.log(response);
    return response;
  }
}

export async function action({ params, request }) {
  const id = params.eventsID;
  const response = await fetch("http://localhost:8080/events/" + id, {
    method: request.method,
  });

  if (!response.ok) {
    throw json({ message: "Could not delete event" }, { status: 500 });
  }

  return redirect("/events");
}
