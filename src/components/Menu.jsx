import { useMatch, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ElapsedTimer from "./ElapsedTime";
import { Navbar, Nav } from "react-bootstrap";
import CountdownTimer from "./CountdownTimer";

const Menu = () => {
  const match = useMatch("/runningWorkout");
  const runningWorkout = useSelector(state => state.runningWorkout);
  const linkStyle = {
    padding: "0.25rem",
    color: "white"
  };

  return (
    <Navbar bg="primary" className="ps-1 mb-2" collapseOnSelect expand="md" data-bs-theme="dark" style={{color: "white"}}>
      <Nav>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#" to="/" as="span">
              <Link style={linkStyle} to="/">Home</Link>
            </Nav.Link>
            <Nav.Link href="#" to="/Workouts" as="span">
              <Link style={linkStyle} to="/Workouts">Workouts</Link>
            </Nav.Link>
            <Nav.Link href="#" to="/Exercises" as="span">
              <Link style={linkStyle} to="/Exercises">Exercises</Link>
            </Nav.Link>
            <Nav.Link href="#" to="/completedWorkouts" as="span">
              <Link style={linkStyle} to="/completedWorkouts">Workout History</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              {(!match || !runningWorkout)
                && <Link style={linkStyle} to="/runningWorkout">
                  {runningWorkout ? "Continue Workout" : "Do a Workout"}
                </Link>
              }
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Nav>
      <Nav className="ms-auto me-5">
        {runningWorkout && runningWorkout.showRestTimer && (
          <Nav.Item className="me-3">
            <CountdownTimer startTime={Date.parse(runningWorkout.restStartedAt)} totalTime={runningWorkout.restTime} />
          </Nav.Item>
        )}
        {runningWorkout && (
          <Nav.Item>
            <ElapsedTimer startTime={Date.parse(runningWorkout.startTime)} />
          </Nav.Item>
        )}
      </Nav>
    </Navbar>
  )
}

export default Menu;