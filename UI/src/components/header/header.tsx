import "./header.css";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <header className="header">
      <div className="header-title">{title}</div>
    </header>
  );
};

export default Header;
