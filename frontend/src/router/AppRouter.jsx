import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import PageLoader from "@/components/PageLoader";

const Dashboard = lazy(() =>
  import(/*webpackChunkName:'DashboardPage'*/ "@/pages/Dashboard")
);
const Course = lazy(() =>
  import(/*webpackChunkName:'CoursePage'*/ "@/pages/Course")
);
const Task = lazy(() => import(/*webpackChunkName:'TaskPage'*/ "@/pages/Task"));
const Note = lazy(() => import(/*webpackChunkName:'NotePage'*/ "@/pages/Note"));
const ReviewPlan = lazy(() =>
  import(/*webpackChunkName:'ReviewPlanPage'*/ "@/pages/ReviewPlan")
);
const Statistics = lazy(() =>
  import(/*webpackChunkName:'StatisticsPage'*/ "@/pages/Statistics")
);
const AIAssistant = lazy(() =>
  import(/*webpackChunkName:'AIAssistantPage'*/ "@/pages/AIAssistant")
);

const Logout = lazy(() =>
  import(/*webpackChunkName:'LogoutPage'*/ "@/pages/Logout")
);
const NotFound = lazy(() =>
  import(/*webpackChunkName:'NotFoundPage'*/ "@/pages/NotFound")
);

export default function AppRouter() {
  const location = useLocation();
  return (
    <Suspense fallback={<PageLoader />}>
      <AnimatePresence exitBeforeEnter initial={false}>
        <Switch location={location} key={location.pathname}>
          <PrivateRoute path="/" component={Dashboard} exact />
          <PrivateRoute component={Course} path="/course" exact />
          <PrivateRoute component={Task} path="/task" exact />
          <PrivateRoute component={Note} path="/note" exact />
          <PrivateRoute component={ReviewPlan} path="/review-plan" exact />
          <PrivateRoute component={Statistics} path="/statistics" exact />
          <PrivateRoute component={AIAssistant} path="/ai-assistant" exact />

          <PrivateRoute component={Logout} path="/logout" exact />
          <PublicRoute path="/login" render={() => <Redirect to="/" />} />
          <Route
            path="*"
            component={NotFound}
            render={() => <Redirect to="/notfound" />}
          />
        </Switch>
      </AnimatePresence>
    </Suspense>
  );
}
