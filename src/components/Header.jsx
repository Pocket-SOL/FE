import "./Header.css";

export default function Header() {
  return (
    <div className="header">
      <header className="headerObj">
        <a href="/main" className="logo">
          LOGO
        </a>
        <nav>
          <ul className="nav-links">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/login">Login</a>
            </li>
            <li>
              <a href="/mypage">Mypage</a>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
