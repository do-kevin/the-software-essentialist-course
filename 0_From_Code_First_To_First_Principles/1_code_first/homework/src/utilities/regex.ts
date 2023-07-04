import {
  createRegExp,
  oneOrMore,
  wordChar,
  letter,
  digit,
  exactly,
} from "magic-regexp";

export const emailRegex = createRegExp(
  oneOrMore(wordChar)
    .and("@")
    .and(oneOrMore(letter.or(digit)))
    .and(
      exactly(".")
        .and(oneOrMore(letter.or(digit)))
        .times.atLeast(1)
    )
);
