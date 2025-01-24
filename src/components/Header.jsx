function Header({ setMode }) {
  return (
    <header className="container__header">
      <h1 className="header__logo">TODO</h1>
      <button className="header__mode">
        <img src="/images/icon-moon.svg" alt="Dark Mode" onClick={() => setMode("dark")} />
        <img src="/images/icon-sun.svg" alt="Light Mode" onClick={() => setMode("light")} />
      </button>
    </header>
  );
}

export default Header;
