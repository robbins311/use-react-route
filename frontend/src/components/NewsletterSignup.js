import { useFetcher } from "react-router-dom";
import classes from "./NewsletterSignup.module.css";
import { useEffect } from "react";

function NewsletterSignup() {
  // 모든곳에서 사용되는 route에서 사용.(기본 form을 사용하면 해당 페이지로 forwarding 됨) // 실제로 액션을 ㅍ트리거하지만 라우트 전환을 하지않음
  const fetcher = useFetcher();
  // 배후에서 사용(알람 등)
  const { data, state } = fetcher;

  useEffect(() => {
    if (state === "idle" && data && data.message) {
      window.alert(data.message);
    }
  }, [data, state]);

  return (
    <fetcher.Form method="post" className={classes.newsletter}>
      <input
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;
