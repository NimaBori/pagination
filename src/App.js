import { useEffect, useState } from "react";
import SingleFollower from "./SingleFollower";
const url = "https://api.github.com/users/john-smilga/followers?per_page=100";

function App() {
  const [isloading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  let listOfPages = [];

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch the data");
        }
        return res.json();
      })
      .then((data) => {
        setIsLoading(false);
        setData(data);
        // console.log(data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err.message);
      });
  }, []);

  if (!isloading) {
    for (let i = 1; i <= (data.length + 1) / 10; i++) {
      listOfPages.push(i);
    }
  }

  const handleActivePage = (index) => {
    if (index === currentPage) {
      return "pages__page pages__page-active ";
    } else {
      return "pages__page";
    }
  };

  const handlePervBtn = () => {
    currentPage === 1
      ? setCurrentPage(listOfPages.length)
      : setCurrentPage(() => currentPage - 1);
  };

  const handleNextBtn = () => {
    currentPage === listOfPages.length
      ? setCurrentPage(1)
      : setCurrentPage(() => currentPage + 1);
  };

  return (
    <main>
      {isloading ? (
        <section className="header">
          <div className="header__title">
            <h1>Loading..</h1>
            <div></div>
          </div>
        </section>
      ) : (
        <section className="header">
          <div className="header__title">
            <h1>Pagination</h1>
            <div></div>
          </div>
        </section>
      )}
      {data.length > 0 && (
        <section className="followers">
          {data.map((follower, index) => {
            if (index >= (currentPage - 1) * 10 && index < currentPage * 10) {
              const { login, html_url: url, avatar_url: img } = follower;
              return (
                <SingleFollower
                  key={index}
                  name={login}
                  gitHubLink={url}
                  img={img}
                />
              );
            }
          })}
        </section>
      )}
      {listOfPages.length > 1 && (
        <section className="pages">
          <div className="pages__bar">
            <button className="pages__navBtns" onClick={() => handlePervBtn()}>
              Prev
            </button>
            {listOfPages.map((pageNum, index) => (
              <button
                key={index}
                className={handleActivePage(index + 1)}
                onClick={() => setCurrentPage(pageNum)}
              >
                {pageNum}
              </button>
            ))}
            <button className="pages__navBtns" onClick={() => handleNextBtn()}>
              Next
            </button>
          </div>
        </section>
      )}
    </main>
  );
}

export default App;
