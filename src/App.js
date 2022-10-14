import React from 'react';
import { useState, useEffect } from 'react';
import { FiChevronsRight } from 'react-icons/fi';

const url = 'https://course-api.com/react-tabs-project';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
      setIndex(0);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    );
  }

  const { company, dates, duties, title } = data[index];
  const companys = data.map((item) => {
    return item.company;
  });

  return (
    <main>
      <header>
        <h1>Experience</h1>
        <div className="underline"></div>
      </header>

      <section>
        <div className="btn-container">
          {companys.map((item, indexx) => {
            return (
              <button
                key={indexx}
                onClick={() => setIndex(indexx)}
                className={`${indexx === index && 'btn-active'}`}
              >
                {item}
              </button>
            );
          })}
        </div>

        <div className="content">
          <h2>{title}</h2>
          <h3>{company}</h3>
          <h4>{dates}</h4>
          <ul>
            {duties.map((item, index) => {
              return (
                <li key={index}>
                  <FiChevronsRight /> {item}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </main>
  );
};

export default App;
