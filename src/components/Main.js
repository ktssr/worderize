import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import wordsJson from "../meanings.json";
import Stats from "./Stats";

export default () => {
  const [words, setWords] = useState([]);
  const [index, setIndex] = useState();
  const [displayMeaning, setDisplayMeaning] = useState(false);

  useEffect(() => {
    reset();
  }, []);

  const disableDisplayMeaning = useCallback(() => {
    if (displayMeaning) setDisplayMeaning(false);
  }, [displayMeaning]);

  const showDisplayMeaning = useCallback(() => {
    setDisplayMeaning(true);
  }, []);

  const reset = useCallback(() => {
    setWords(wordsJson);
    setIndex(Math.floor(Math.random() * wordsJson.length));
  }, []);

  const hadleReset = useCallback(() => {
    disableDisplayMeaning();
    reset();
  }, []);

  const hadleNext = useCallback(() => {
    if (!displayMeaning) {
      setWords((currWords) => {
        const newWords = [...currWords];
        newWords.splice(index, 1);
        return newWords;
      });
    }
    disableDisplayMeaning();
    setIndex(Math.floor(Math.random() * wordsJson.length));
  }, [displayMeaning]);

  const word = words[index];

  return (
    word && (
      <>
        <Card
          sx={{
            width: "345px",
            background: "rgba(255,255,255,.005",
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
                  <Typography>mnemonic : {word.mnemonic}</Typography>
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
              onClick={showDisplayMeaning}
            >
              Don't Know
            </Button>
            <Button variant="outlined" color="error" onClick={hadleReset}>
              Reset
            </Button>
          </CardActions>
        </Card>
        <Stats allWords={wordsJson} words={words} />
      </>
    )
  );
};
