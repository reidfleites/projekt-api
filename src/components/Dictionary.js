import { useContext, useEffect, useState } from "react";
import { Context } from "../Context";
import { BsSearch } from "react-icons/bs";
import { AiFillSound } from "react-icons/ai";
import book from "../img/book.gif";

function Dictionary() {
  const [message, setMessage] = useState("");
  const { flag } = useContext(Context);
  const [word, setWord] = useState("");
  const [searchingDictionary, setSearchDicionary] = useState([]);
  const [arrayMeaning, setMeaning] = useState([]);
  const [audioURL, setAudio] = useState("");

  const fetchData = async (e) => {
    e.preventDefault();
    setSearchDicionary([]);
    if (word === "") {
      setMessage("enter a word!");
    } else {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
        { method: "GET" }
      );
      if (!response.ok) {
        setMessage("not results");
      } else {
        const data = await response.json();
        setTimeout(() => {
          makeDictionary(data);
        }, 2000);
        setMessage("");
      }
    }
  };

  const makeDictionary = (data) => {
    const result = data.map((word) => ({
      word: word.word,
      phonetic: word.phonetic,
      phone: word.phonetics[0].audio,
      origin: word.origin,
      m: word.meanings.map((m) => ({
        speach: m.partOfSpeech,
        definitions: m.definitions.map((d) => ({
          definition: d.definition,
          example: d.example,
        })),
      })),
    }));

    setSearchDicionary(result);

    setAudio(result[0].phone);
  };

  ////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (word !== "" && word !== null) {
      localStorage.setItem("word", JSON.stringify(word));
    }

    if (searchingDictionary !== null && searchingDictionary.length > 0) {
      localStorage.setItem(
        "arrayOfmeaning",
        JSON.stringify(searchingDictionary)
      );
    }
    if (arrayMeaning !== null && arrayMeaning.length > 0) {
      localStorage.setItem("arrayMeaning", JSON.stringify(arrayMeaning));
    }
    if (audioURL !== "" && audioURL != null) {
      localStorage.setItem("audio", JSON.stringify(audioURL));
    }
  }, [word, searchingDictionary, arrayMeaning, audioURL]);
  //////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    const storeword = JSON.parse(localStorage.getItem("word"));
    if (storeword !== null) {
      setWord(storeword);
    }

    const storedArrayOfmeaning = JSON.parse(
      localStorage.getItem("arrayOfmeaning")
    );
    if (storedArrayOfmeaning !== null && storedArrayOfmeaning.length > 0) {
      setSearchDicionary(storedArrayOfmeaning);
    }
    const storedarrayMeaning = JSON.parse(localStorage.getItem("arrayMeaning"));
    if (storedarrayMeaning !== null && storedarrayMeaning.length > 0) {
      setMeaning(storedarrayMeaning);
    }
    const storedAudio = JSON.parse(localStorage.getItem("audio"));
    if (storedAudio != null) {
      setAudio(storedAudio);
    }
  }, []);
  //////////////////////////////////////////////////////////////////////////////
  const handleWord = (e) => {
    setWord(e.target.value);
  };
  function play() {
    const audio = new Audio(audioURL);

    audio.play();
  }

  return (
    <div className="dictionary">
      <div className="div-form">
        {flag === true && (
          <>
            <form action="">
              <input type="text" value={word} onChange={handleWord} />
              <button onClick={fetchData} className="button-search">
                <BsSearch className="search-icon" />
              </button>
            </form>
          </>
        )}
        <div>{message}</div>
      </div>

      {flag === false || searchingDictionary.length === 0 ? (
        <div>
          <img src={book} alt="loading..." />
        </div>
      ) : (
        searchingDictionary.map((word, index) => {
          return (
            <div key={index}>
              <h2>
                {word.word}
                {flag}
              </h2>

              <div>
                [{word.phonetic}]
                <button onClick={play} className="button-sound">
                  <AiFillSound className="sound-icon" />
                </button>
              </div>
              <div>
                <span>origin:</span>
                {word.origin}
              </div>
              <div className="definition">
                <span className="mean">meanings: {word.m.length}</span>
              </div>
              {word.m.map((meanings, index) => {
                return (
                  <div key={index}>
                    <div>
                      <span className="mean">
                        {index + 1 + "."}
                        {meanings.speach}
                      </span>
                      <div>
                        {meanings.definitions.map((d, index) => {
                          return (
                            <div key={index} className="div-mean">
                              <span className="def">definition:</span>{" "}
                              {d.definition} <br />{" "}
                              <span className="ex">example:</span> {d.example}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })
      )}
    </div>
  );
}
export default Dictionary;
