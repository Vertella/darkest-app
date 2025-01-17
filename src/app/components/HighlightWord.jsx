const HighlightWord = ({ sentence = "", highlights = [] }) => {
    const regex = new RegExp(
      `(${highlights.map(({ target }) => `\\b${target}\\b`).join("|")})`,
      "gi"
    );
  
    const parts = sentence.split(regex);
  
    return (
      <span>
        {parts.map((part, index) => {
          // Check if the part matches any highlight rule
          const match = highlights.find(
            ({ target }) => new RegExp(`^${target}$`, "i").test(part)
          );
  
          if (match) {
            return (
              <span key={index} className={match.className}>
                {part}
              </span>
            );
          }
  
          return part; // Return unstyled part
        })}
      </span>
    );
  };
  
  export default HighlightWord;