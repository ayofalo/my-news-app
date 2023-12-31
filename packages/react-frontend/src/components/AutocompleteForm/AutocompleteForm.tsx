import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { ArticleType } from "../../types";

interface AutocompleteFormProps {
  data: ArticleType[];
  loading: boolean;

  onOptionSelect: (option?: ArticleType) => void;
  value: ArticleType | undefined;
}

const AutocompleteForm: React.FC<AutocompleteFormProps> = ({
  data,
  loading,
  onOptionSelect,
  value,
}) => {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<string[]>([]);
  const [title, setTitle] = React.useState<string | undefined>(value?.title);
  const optionsArray = data;

  const handleClearInput = React.useCallback(() => {
    setTitle("");
    onOptionSelect(undefined);
  }, [onOptionSelect]);

  React.useEffect(() => {
    if (loading === true) {
      return undefined;
    }
    setOptions(optionsArray.map((article) => article.title));

    if (!value?.title) handleClearInput();
  }, [loading, data, optionsArray, value?.title, handleClearInput]);

  return (
    <Autocomplete
      id="auto-complete"
      sx={{ width: "100%" }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionLabel={(option) => option}
      options={options}
      loading={loading}
      clearOnBlur={false}
      value={title ?? ""}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Title"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}

                {title && (
                  <IconButton edge="end" onClick={handleClearInput}>
                    <CloseIcon />
                  </IconButton>
                )}
              </React.Fragment>
            ),
          }}

          // value={title || ""}
        />
      )}
      onChange={(event, value) => {
        // Find the selected article by its title

        setTitle(value ?? "");

        const selectedArticle = data.find((article) => article.title === value);

        onOptionSelect(selectedArticle ?? undefined);
      }}
    />
  );
};

export default AutocompleteForm;
