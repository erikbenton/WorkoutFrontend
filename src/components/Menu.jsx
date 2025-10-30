import { useMatch, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ElapsedTimer from "./ElapsedTime";
import { Table, Form, Button, Alert, Navbar, Nav } from "react-bootstrap";

const Menu = () => {
  const match = useMatch("/runningWorkout")
  const runningWorkout = useSelector(state => state.runningWorkout)
  const padding = {
    padding: "0.25rem"
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Nav>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#" to="/" as="span">
              <Link style={padding} to="/">Home</Link>
            </Nav.Link>
            <Nav.Link href="#" to="/Programs" as="span">
              <Link style={padding} to="/Programs">Programs</Link>
            </Nav.Link>
            <Nav.Link href="#" to="/Workouts" as="span">
              <Link style={padding} to="/Workouts">Workouts</Link>
            </Nav.Link>
            <Nav.Link href="#" to="/Exercises" as="span">
              <Link style={padding} to="/Exercises">Exercises</Link>
            </Nav.Link>
            <Nav.Link href="#" to="/completedWorkouts" as="span">
              <Link style={padding} to="/completedWorkouts">Workout History</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              {(!match || !runningWorkout)
                && <Link style={padding} to="/runningWorkout">
                  {runningWorkout ? "Continue Workout" : "Do a Workout"}
                </Link>
              }
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Nav>
      <Nav className="ms-auto me-5">
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