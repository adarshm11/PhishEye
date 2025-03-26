export default function NavBar() {
  return (
    <div className="h-12 w-full bg-neutral-700 mb-10">
      <nav className="mx-4 my-1">
        <button
          onClick={() => alert("You Clicked")}
          className="cursor-pointer rounded-md hover:bg-neutral-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M21 12.808c-.5 5.347-5.849 9.14-11.107 7.983C-.078 18.6 1.15 3.909 11.11 3C6.395 9.296 14.619 17.462 21 12.808"
            />
          </svg>
        </button>
      </nav>
    </div>
  );
}
