import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import HomePage from "./pages/Home";
import EventsPage, { loader as eventsLoader } from "./pages/Events";
import EventsDetailPage, {
  loader as EventsDetailLoader,
  action as deleteEventAction,
} from "./pages/EventsDetail";
import NewEventsPage from "./pages/NewEvent";
import EditEventsPage from "./pages/EditEvent";
import EventsRootLayout from "./pages/EventsRoot";
import ErrorPage from "./pages/Error";
import { action as manipulateEventAction } from "./components/EventForm";
import NewsletterPage, { action as newsletterAction } from "./pages/Newsletter";
// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "events",
          element: <EventsRootLayout />,
          children: [
            {
              //사용하는 컴포넌트에서 loader 작성 후 여기서 사용
              index: true,
              element: <EventsPage />,
              //상위 컴포넌트에서는 loader의 데이터를 받아올수없음
              loader: eventsLoader,
            },
            {
              path: ":eventsID",
              //loader는 중첩된 라우트 기능에도 사용가능 이러면 children에서 모두 사용가능 ㅋㅋ
              loader: EventsDetailLoader,
              // 그런데 부모의 loader를 쓰려면 id 추가, userouteloaderdata를 써야함
              id: "event-detail",
              children: [
                {
                  index: true,
                  element: <EventsDetailPage />,
                  action: deleteEventAction,
                },
                {
                  path: "edit",
                  element: <EditEventsPage />,
                  // form 이 제출된 방법에 따라 하나의 액션을 여러개의 컴포넌트에서 씀
                  action: manipulateEventAction,
                },
              ],
            },

            {
              path: "new",
              element: <NewEventsPage />,
              // form 이 제출된 방법에 따라 하나의 액션을 여러개의 컴포넌트에서 씀
              action: manipulateEventAction,
            },
          ],
        },
        {
          path: "newsletter",
          element: <NewsletterPage />,
          action: newsletterAction,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
