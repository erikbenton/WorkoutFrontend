const setTypes = {
  nullType: {
    type: null,
    color: "inherit",
    placeholder: ""
  },
  warmup: {
    type: "warm up",
    color: "#20c997",
    placeholder: "warm-up-placeholder"
  },
  work: {
    type: "work",
    color: "#0d6efd",
    placeholder: "work-placeholder"
  },
  light: {
    type: "light",
    color: "#0dcaf0",
    placeholder: "light-placeholder"
  },
  heavy: {
    type: "heavy",
    color: "#dc3545",
    placeholder: "heavy-placeholder"
  },
  formFocused: {
    type: "form-focused",
    color: "#198754",
    placeholder: "form-focused-placeholder"
  },
  explosive: {
    type: "explosive",
    color: "#fd7e14",
    placeholder: "explosive-placeholder"
  },
  slow: {
    type: "slow",
    color: "gray",
    placeholder: "slow-placeholder"
  }
};

const getTypeToValuesDict = () => {
  const typeToValues = {};
  for (let key in setTypes) {
    const { color, placeholder } = setTypes[key];
    typeToValues[setTypes[key].type] = { color, placeholder }
  }
  return typeToValues;
};

const typeToValues = getTypeToValuesDict();

export const setTypeColor = (set) => {
  return typeToValues[set.setType].color
  ? typeToValues[set.setType].color
  : "inherit"
};

export const setTypePlaceholderClass = (set) => {
  return typeToValues[set.setType].placeholder
  ? typeToValues[set.setType].placeholder
  : ""
};

export default setTypes;