import { Await, defer, json, useLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

function EventsPage() {
  const { events } = useLoaderData();

  return (
    <Suspense fallback={<p>로딩중.......</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

// componenets 가 로딩되기전에 (데이터 받아올떄) 컴포넌트의 일부분만 먼저 렌더링 하는것(defer)

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

export function loader() {
  return defer({
    //사용할 http요청 모두 넣어줘야함.. trigger하는게 아니라 excute // promise가 없으면 defer를 쓸 이유가 없음 ㅋㅋ
    events: loadEvents(),
  });
}
