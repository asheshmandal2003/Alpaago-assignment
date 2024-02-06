import { CircularProgress, InputBase, alpha, styled } from "@mui/material";
import SerachIcon from "@mui/icons-material/Search";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

const Search = styled("form")(({ theme }) => ({
  position: "relative",
  borderRadius: 10,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  margin: 0,
  width: "80%",
  height: 50,
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.up(600)]: {
    width: 500,
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  fontSize: 18,
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up(600)]: {
      width: 430,
    },
  },
}));

interface SearchbarProps {
  onSubmit(
    event: ChangeEvent<HTMLFormElement>,
    query: string,
    setSearching: Dispatch<SetStateAction<boolean>>
  ): void;
}

const Searchbar = ({ onSubmit }: SearchbarProps) => {
  const [query, setQuery] = useState(() => "");
  const [searching, setSearching] = useState(() => false);
  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery((prevQuery) => (prevQuery = event.target.value));
  };
  return (
    <Search
      onSubmit={(event: ChangeEvent<HTMLFormElement>) =>
        onSubmit(event, query, setSearching)
      }
    >
      <SearchIconWrapper>
        {searching ? (
          <CircularProgress size={20} color="inherit" />
        ) : (
          <SerachIcon />
        )}
      </SearchIconWrapper>
      <StyledInputBase
        name="query"
        onChange={handleQueryChange}
        placeholder="Search by city name"
        inputProps={{ "aria-label": "search" }}
      />
    </Search>
  );
};

export default Searchbar;
