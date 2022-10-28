import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import wordsJson from "../meanings.json";
import Stats from "./Stats";

export default () => {
  const [words, setWords] = useState();
  const [index, setIndex] = useState();
  const [displayMeaning, setDisplayMeaning] = useState(false);

  useEffect(() => {
    if (words) localStorage.setItem("words", JSON.stringify(words));
  }, [words]);

  useEffect(() => {
    if (!loadWords()) reset();
  }, []);

  const loadWords = () => {
    const storedWords = localStorage.getItem("words");
    if (storedWords) {
      const storedWOrdsObj = JSON.parse(storedWords);
      setWords(storedWOrdsObj);
      setIndex(Math.floor(Math.random() * storedWOrdsObj.length));
      return true;
    }
    return false;
  };

  const reset = () => {
    setWords(wordsJson);
    setIndex(Math.floor(Math.random() * wordsJson.length));
  };

  const hadleReset = () => {
    setDisplayMeaning(false);
    reset();
  };

  const hadleNext = () => {
    let wordsLength = words.length;
    if (!displayMeaning) {
      wordsLength -= 1;
      setWords((currWords) => {
        const newWords = [...currWords];
        newWords.splice(index, 1);
        return newWords;
      });
    }
    setDisplayMeaning(false);
    if (words) setIndex(Math.floor(Math.random() * wordsLength));
  };

  const word = words && words[index];

  const CardComponent = () => (
    <>
      <Card
        sx={{
          width: "345px",
          background: "rgba(255, 255, 255, .005)",
          borderRadius: "15px",
          border: "1px solid rgba(43, 43, 43, 0.568)",
        }}
      >
        <CardContent>
          <>
            <Typography color="white" textAlign="center">
              {word.word}
            </Typography>
            <Box display={displayMeaning ? "block" : "none"} color="grey">
              <Typography my={2}>{word.meaning}</Typography>
              {word.mnemonic && (
                <Typography>Memory Aid : {word.mnemonic}</Typography>
              )}
            </Box>
          </>
        </CardContent>
        <CardActions sx={{ justifyContent: "space-around" }}>
          <Button variant="outlined" color="success" onClick={hadleNext}>
            {displayMeaning ? "Next" : "Know"}
          </Button>
          <Button
            variant="outlined"
            color="warning"
            disabled={displayMeaning}
            onClick={() => setDisplayMeaning(true)}
          >
            Don't Know
          </Button>
          <Button variant="outlined" color="error" onClick={hadleReset}>
            Reset
          </Button>
        </CardActions>
      </Card>
      <Stats allWords={wordsJson.length} words={words.length} />
    </>
  );

  const CompleteComponent = () => (
    <>
      <Typography variant="h5" color="white" textAlign="center">
        Congrtatulations. You memorized all the words.
      </Typography>
      <Button variant="outlined" color="success" onClick={hadleReset}>
        Reset
      </Button>
    </>
  );
  return words && (word ? <CardComponent /> : <CompleteComponent />);
};
