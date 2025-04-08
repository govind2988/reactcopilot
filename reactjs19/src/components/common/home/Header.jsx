import FooterHome from "./Footer";

const HeaderHome = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      Header
      <a className="navbar-brand" href="/">
        Home
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/info">
              Info
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/portal">
              Portal
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default HeaderHome;
