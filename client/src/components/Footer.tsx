const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white text-center p-4">
      © {new Date().getFullYear()} MyMovieApp. All rights reserved.
    </footer>
  );
};

export default Footer;
