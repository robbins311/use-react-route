import { json, useLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";

function EventsPage() {
  const data = useLoaderData();
  // if (data.isError) {
  //   return <p>{data.message}</p>;
  // }
  const events = data.events;

  return <EventsList events={events} />;
}

export default EventsPage;

export async function loader() {
  // useState 같은 훅은 사용 X, 기본 내장 브라우저 기능(localstorage 등)는 사용가능
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // Error 페이지를 통해 핸들링...
    // throw new Response(JSON.stringify({ message: "Could not fetch events." }), {
    //   status: 500,
    // });
    // return { isError: true, message: "Could not fetch events" };
    return json({ message: "Could not fetch events." }, { status: 500 });
  } else {
    //어떤것이든 return 할수있음
    return response;
  }
}
