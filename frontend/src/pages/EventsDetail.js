import React, { Suspense } from "react";
import {
  Await,
  defer,
  json,
  redirect,
  useRouteLoaderData,
} from "react-router-dom";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";
const EventsDetailPage = () => {
  const { event, events } = useRouteLoaderData("event-detail");
  return (
    // 이렇게 Defer를 통해 지연로딩을 하면, 상세페이지에서 세부정보를 먼저 보여주고, 밑에 리스트를 나중에 받아올수있음
    <>
      <Suspense fallback={<p>로딩중....</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p>로딩중....</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
};

export default EventsDetailPage;

async function loadEvent(id) {
  const response = await fetch("http://localhost:8080/events/" + id);
  if (!response.ok) {
    throw json({ message: "Could not fetch details" }, { status: 500 });
  } else {
    console.log(response);
    const resData = await response.json();
    return resData.event;
  }
}

async function loadEvents() {
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
    const resData = await response.json();
    return resData.events;
  }
}

export async function loader({ request, params }) {
  // useParams는 훅이라 사용할수없지만, loader 자체에서 제공해주는 params를 통해 접근가능
  const id = params.eventsID;

  // defer에서 async가 사용되면 await를 통해 route이동이 될때, await이 걸린 함수를 실행완료하면 라우트 이동, 다른 함수는 라우트 이동 후 로드함..
  return defer({
    event: await loadEvent(id),
    events: loadEvents(),
  });
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
