const setTypes = {
  nullType: {
    type: null,
    color: "inherit"
  },
  warmup: {
    type: "warm up",
    color: "#198754"
  },
  work: {
    type: "work",
    color: "#0d6efd"
  },
  light: {
    type: "light",
    color: "#0dcaf0"
  },
  heavy: {
    type: "heavy",
    color: "#dc3545"
  },
  formFocused: {
    type: "form-focused",
    color: "#20c997"
  },
  explosive: {
    type: "explosive",
    color: "#fd7e14"
  },
  slow: {
    type: "slow",
    color: "gray"
  }
};

const getTypeToColorDict = () => {
  const typeToColor = {};
  for (let key in setTypes) {
    typeToColor[setTypes[key].type] = setTypes[key].color
  }
  return typeToColor;
};

const typeToColor = getTypeToColorDict();

export const setTypeColor = (set) => {
  return typeToColor[set.setType]
  ? typeToColor[set.setType]
  : "inherit"
};

export default setTypes;