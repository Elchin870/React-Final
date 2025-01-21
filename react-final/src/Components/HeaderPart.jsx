import "../css/HeaderPart.css";

function HeaderPart() {
  return (
    <div className="headerPart">
      <h1 className="appName">BitTest</h1>
      <div className="userSection">
        <div className="userIcon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="30"
            height="30"
            fill="white"
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M12 14c-5 0-9 2.5-9 5v1h18v-1c0-2.5-4-5-9-5z" />
          </svg>
        </div>
        <div className="userDetails">
          <p className="userGreeting">You are logged in</p>
          <p className="userRole">Administrator</p>
        </div>
      </div>
    </div>
  );
}

export default HeaderPart;
