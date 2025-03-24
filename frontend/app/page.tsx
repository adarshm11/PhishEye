import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full"> { /* app container */ }
      <div className="h-12 w-full bg-gray-400 mb-10"> { /* nav bar container */ }
        <nav>
          { /* logo */ }
          { /* about us page */ }
          { /* github link */ }
          { /* dark mode / light mode button */ }
        </nav>
      </div>
      <div className="w-full"> { /* body container */ }
        <div className="flex flex-col justify-center items-center"> { /* title container */ }
          <h1 className="text-5xl">PhishShield</h1>
          <p>Description</p>
        </div>
        <div> { /* main content container */ }
          <div> { /* user input container */ }
            <form>
              <input/>
            </form>
          </div>
          <div> { /* result container */ }

          </div>
        </div>
      </div>
    </div>
  );
}
