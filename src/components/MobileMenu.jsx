import { useMatch, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ElapsedTimer from "./ElapsedTime";
import { Navbar, Nav } from "react-bootstrap";
import CountdownTimer from "./CountdownTimer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook,
  faClipboardList,
  faDumbbell,
  faHouse,
  faPersonRunning } from "@fortawesome/free-solid-svg-icons";

const MobileMenu = () => {
  const match = useMatch("/runningWorkout");
  const runningWorkout = useSelector(state => state.runningWorkout);
  const linkStyle = {
    padding: "0.25rem",
  };

  return (
    <Navbar bg="primary" className="ps-1 mb-1 text-light" collapseOnSelect data-bs-theme="dark">
      <Nav>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#" to="/" as="span">
              <Link className="text-light" style={linkStyle} to="/">
                <FontAwesomeIcon icon={faHouse} />
              </Link>
            </Nav.Link>
            <Nav.Link href="#" to="/Workouts" as="span">
              <Link className="text-light" style={linkStyle} to="/Workouts">
                <FontAwesomeIcon icon={faClipboardList} />
              </Link>
            </Nav.Link>
            <Nav.Link href="#" to="/Exercises" as="span">
              <Link className="text-light" style={linkStyle} to="/Exercises">
                <FontAwesomeIcon icon={faDumbbell} />
              </Link>
            </Nav.Link>
            <Nav.Link href="#" to="/completedWorkouts" as="span">
              <Link className="text-light" style={linkStyle} to="/completedWorkouts">
                <FontAwesomeIcon icon={faBook} />
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              {(!match || !runningWorkout)
                && <Link className="text-light" style={linkStyle} to="/runningWorkout">
                  <FontAwesomeIcon icon={faPersonRunning} />
                </Link>
              }
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Nav>
      <Nav className="ms-auto me-3">
        {runningWorkout && runningWorkout.showRestTimer && (
          <Nav.Item className="me-1">
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
  );
}

export default MobileMenu;